/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')


exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/MarkdownTemplate.js`)

  createPage({
    path: '/about',
    component: path.resolve('./src/templates/AboutTemplate.js'),
    context: {},
  })

  createPage({
    path: '/blog',
    component: path.resolve(`./src/templates/BlogListTemplate.js`),
  })

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }, index, array) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          prevPostPath: index === 0 ? '' : array[index - 1].node.frontmatter.path,
          nextPostPath: index === array.length - 1 ? '' : array[index + 1].node.frontmatter.path
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
