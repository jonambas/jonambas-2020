/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      // Individual MDX node
      node,
      // Name of the field you are adding
      name: "slug",
      // Generated value based on filepath with "posts" prefix
      value: `/posts${value}`,
    })
  }
}

// Creates pages for MDX posts
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        nodes {
          body
          id
          frontmatter {
            title
            date(formatString: "MMMM D YYYY")
            serifs
            description
            author
            image {
              childImageSharp {
                fixed(height: 630, width: 1200) {
                  src
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.nodes

    // Create page for each mdx file
    posts.forEach(({ body, fields, id, frontmatter }) => {
      createPage({
        path: `${fields.slug}`,
        component: path.resolve("src/components/blogLayout.js"),
        context: {
          body: body,
          slug: fields.slug,
          id: id,
          title: frontmatter.title,
          date: frontmatter.date,
          serifs: frontmatter.serifs,
          description: frontmatter.description,
          author: frontmatter.author,
          image: frontmatter.image,
        },
      })
    })
  })
}
