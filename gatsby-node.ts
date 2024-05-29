const path = require("path");
const template = path.resolve(`./src/templates/template.tsx`);

interface createPagesProps {
    graphql: any;
    actions: any;
    reporter: any;
}

exports.createPages = async ({
    graphql,
    actions,
    reporter,
}: createPagesProps) => {
    const { createPage } = actions;

    // taqi hamoda: تقي حموده
    // last update: أخر تحديث
    // source code repository: مصدر أصل الموقع
    // inspired by al-folio theme: تصميم الموقع مستوحى من مشروع الفوليو
    // powered by Gatsby: مبني بجتسبي

    const result = await graphql(`
        query {
            allMdx {
                nodes {
                    id
                    frontmatter {
                        slug
                    }
                    internal {
                        contentFilePath
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild("Error loading MDX result", result.errors);
    }

    // Create blog post pages.
    const posts: any[] = result.data.allMdx.nodes;

    // you'll call `createPage` for each result
    posts.forEach((node) => {
        createPage({
            // As mentioned above you could also query something else like frontmatter.title above and use a helper function
            // like slugify to create a slug
            path: node.frontmatter.slug,
            // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
            component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
            // You can use the values in this context in
            // our page layout component
            context: { id: node.id },
        });
    });
};
