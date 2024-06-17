// API Documentation: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
import path from "path";

import {
    mdxRootFolder,
    localeFolder,
    translationsFolder,
} from "./gatsby-config";
const locales = require(`${localeFolder}/i18n.ts`).configuration;

const templateFolder = path.resolve(`./src/templates`);

// Add locale type definitions
exports.sourceNodes = async ({ actions }: any) => {
    const { createTypes } = actions;

    const typeDefs = `
        type locale implements Node {
            id: ID!
            ns: String!
            language: String!
            data: JSON!
        }
    `;
    createTypes(typeDefs);
};

// Add the language info to the node of each MDX file in the database
exports.onCreateNode = ({
    node,
    actions,
    createNodeId,
    createContentDigest,
}: any) => {
    const { createNodeField, createNode } = actions;

    switch (node.internal.type) {
        case "Mdx": {
            const name = path
                .basename(node.internal.contentFilePath, `.mdx`)
                .split(".");

            // If there is no language code in the filename, use the default language
            const defaultLang = locales.defaultLanguage;
            const lang = name.length > 1 ? name[1] : (defaultLang as string);

            createNodeField({ node, name: "language", value: lang });

            // Create a localized slug based on the language and the file path
            const relativeFilePath = path
                .dirname(node.internal.contentFilePath)
                .split(mdxRootFolder)
                .pop();
            const slug =
                name[0] === "index"
                    ? relativeFilePath
                    : `${relativeFilePath}${name[0]}`;
            const localizedSlug =
                lang === defaultLang ? `/${slug}` : `/${lang}/${slug}`;
            const localizedPath =
                localizedSlug === `/`
                    ? localizedSlug
                    : localizedSlug.replace(/\/$/, ``);

            createNodeField({ node, name: "path", value: `/${slug}` });
            createNodeField({ node, name: "localizedPath", value: localizedPath });
            break;
        }
        case "File": {
            if (node.absolutePath.startsWith(translationsFolder)) {
                const lang = node.relativeDirectory;
                const ns = path.basename(node.relativePath, ".json");
                const data = JSON.parse(node.internal.content);

                const localeNode: any = {
                    id: createNodeId(`locale-${node.id}`),
                    children: [],
                    internal: {
                        type: "locale",
                        contentDigest: createContentDigest(data),
                        contentFilePath: node.absolutePath,
                    },
                    ns,
                    language: lang,
                    data,
                };

                createNode(localeNode);
            }
        }
        case "LanguagesJson": {
            // Add the default field to the database nodes
            createNodeField({
                node,
                name: "isDefault",
                value: node.code === locales.defaultLanguage,
            });
            break;
        }
        default: {
            break;
        }
    }
};

exports.createPages = async ({ graphql, actions }: any) => {
    const { createPage, createRedirect } = actions;

    const result = await graphql(`
        query {
            allMdx {
                nodes {
                    id
                    frontmatter {
                        pageType
                    }
                    fields {
                        path
                        localizedPath
                        language
                    }
                    internal {
                        contentFilePath
                    }
                }
            }
        }
    `);

    if (result.errors) {
        console.error(result.errors);
        return;
    }

    for (const node of result.data.allMdx.nodes) {
        // Use the fields created in exports.onCreateNode
        const id = node.id;
        const language = node.fields.language;
        const pageType = node.frontmatter.pageType;

        const languagesInfo = await graphql(
            `query ($language: String!, $pageType: String!) {
                allLocale(
                    filter: {
                        language: { eq: $language }
                        ns: { in: ["common", $pageType] }
                    }
                ) {
                    nodes {
                        ns
                        language
                        data
                    }
                }
                languagesJson(code: { eq: $language }) {
                    name
                    langDir
                    code
                    hrefLang
                }
            }
            `,
            { language, pageType }
        );

        let translation: any = {};
        languagesInfo.data.allLocale.nodes.forEach(
            (trans: any) => (translation = { ...translation, ...trans.data })
        );

        const langInfo = languagesInfo.data.languagesJson;
        const template = `${templateFolder}/${node.frontmatter.pageType}.tsx`;

        createPage({
            path: node.fields.localizedPath,
            component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id,
                pageType,
                language: langInfo,
                translation,
                supportedLanguages: locales.languagesAvailable
            },
        });
    }
};
