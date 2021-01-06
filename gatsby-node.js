const path = require(`path`)
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPage = path.resolve(`./src/templates/tag-page.js`)
  
  return graphql(`
  {
    allShopifyProduct {
      edges {
        node {
          handle,
          tags
        }
      }
    }
  }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allShopifyProduct.edges
    const tagSet = new Set();

    posts.forEach(({node}, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      // Get tags for tags pages.
      if (node.tags) {
        node.tags.forEach(tag => {
          tagSet.add(tag);
        });
      }

      createPage({
        path: `/product/${node.handle}/`,
        component: blogPost,
        context: {
          handle: node.handle,
          previous,
          next,
        },
      })
    })

    // Create tags pages.
    tagSet.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagPage,
        context: {
          tag
        }
      });
    });

    return null
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
