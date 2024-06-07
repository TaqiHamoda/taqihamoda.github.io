// API Documentation: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
import fs from "fs";
import path from "path";

import { locales } from "./locales/i18n";


const mdxRootFolder = "/content";
const localeFolder = "./locales";

interface Translation {
    ns: string;
    filePath: string;
    language: string;
    data: any;
};

function getTranslations() {
    const translations: Translation[] = [];
    const translationDir = `${__dirname}/${localeFolder}/translations`;

    for (const lang in locales) {
        fs.readdirSync(`${translationDir}/${lang}`).forEach((file) => {
            const filePath = path.join(translationDir, lang, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile() && path.extname(file) === ".json") {
                const fileContents = fs.readFileSync(filePath, "utf8");
                const data = JSON.parse(fileContents);

                translations.push({
                    language: lang,
                    ns: path.basename(filePath, ".json"),
                    data,
                    filePath,
                });
            }
        });
    }

    return translations;
}

// Load Translations
exports.sourceNodes = async ({
    actions,
    createNodeId,
    createContentDigest,
}: any) => {
    const { createNode, createTypes } = actions;

    const typeDefs = `
        type locale implements Node {
            id: ID!
            ns: String!
            language: String!
            data: JSON!
        }
    `;
    createTypes(typeDefs);

    getTranslations().forEach((trans) => {
        const node: any = {
            id: createNodeId(`locale-${trans.filePath}`),
            children: [],
            internal: {
                type: "locale",
                contentDigest: createContentDigest(trans.data),
                contentFilePath: trans.filePath,
            },
            ns: trans.ns,
            language: trans.language,
            data: trans.data,
        };

        createNode(node);
    });
};

// Add the language info to the node of each MDX file in the database
exports.onCreateNode = ({ node, actions }: any) => {
    const { createNodeField } = actions;

    switch (node.internal.type) {
        case "Mdx": {
            const name = path
                .basename(node.internal.contentFilePath, `.mdx`)
                .split(".");

            // If there is no language code in the filename, use the default language
            const defaultLang = Object.keys(locales)
                .filter((l) => locales[l].default)
                .pop();
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
            const localizedSlug = locales[lang].default
                ? `/${slug}`
                : `/${lang}/${slug}`;
            const localizedPath =
                localizedSlug === `/`
                    ? localizedSlug
                    : localizedSlug.replace(/\/$/, ``);

            createNodeField({ node, name: "path", value: localizedPath });
            break;
        }
        case "LanguagesJson": {
            // Add the default field to the database nodes
            createNodeField({ node, name: "isDefault", value: locales[node.code].default });
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

    result.data.allMdx.nodes.forEach((node: any) => {
        // Use the fields created in exports.onCreateNode
        const id = node.id;
        const language = node.fields.language;

        createPage({
            path: node.fields.path,
            component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
            context: { id, language },
        });
    });
};
