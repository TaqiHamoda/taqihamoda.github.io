// API Documentation: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
import path from "path";

import { mdxRootFolder, localeFolder, translationsFolder } from "./gatsby-config";
const locales = require(`${localeFolder}/i18n.ts`).configuration;


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
exports.onCreateNode = ({ node, actions, createNodeId, createContentDigest }: any) => {
    const { createNodeField, createNode } = actions;

    switch (node.internal.type) {
        case "Mdx": {
            const name = path
                .basename(node.internal.contentFilePath, `.mdx`)
                .split(".");
            createNodeField({ node, name: "name", value: name[0] });

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
                    : `${relativeFilePath}/${name[0]}`;
            const localizedSlug =
                lang === defaultLang ? `/${slug}` : `/${lang}/${slug}`;
            const localizedPath =
                localizedSlug === `/`
                    ? localizedSlug
                    : localizedSlug.replace(/\/$/, ``);

            createNodeField({ node, name: "path", value: localizedPath });
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
    const { createPage } = actions;

    const template = path.resolve(`./src/templates/template.tsx`);

    const result = await graphql(`
        query {
            allMdx {
                nodes {
                    id
                    fields {
                        name
                        path
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

    result.data.allMdx.nodes.forEach(async (node: any) => {
        // Use the fields created in exports.onCreateNode
        const id = node.id;
        const language = node.fields.language;

        const translations = await graphql(`
            query ($language: String!, $page_name: String!) {
                allLocale(filter: {language: {eq: $language}, ns: {in: ["common", $page_name]}}) {
                    nodes {
                        ns
                        language
                        data
                    }
                }
            }
        `, { language, page_name: node.fields.name });

        let translation: any = {};
        translations.data.allLocale.nodes.forEach((trans: any) => (translation = { ...translation, ...trans.data }));

        createPage({
            path: node.fields.path,
            component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id,
                language,
                translation,
                supportedLanguages: locales.languagesAvailable,
            },
        });
    });
};
