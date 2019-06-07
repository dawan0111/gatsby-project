import React from 'react'
import { graphql } from 'gatsby'

import { Grid, Pagination } from 'semantic-ui-react'

import Layout from '../components/layout'
import BlogItem from '../components/BlogItem'

export default class BlogList extends React.Component {
  render() {
    const { numPages, currentPage } = this.props.pathContext;
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <Grid columns={3}>
          <Grid.Row>
            {posts.map(({ node }, index) => {
              const { title, thumbnail } = node.frontmatter;
              return (
                <Grid.Column key={index}>
                  <BlogItem
                    title={title}
                    image={thumbnail.publicURL}
                  />
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>

        <Pagination
          defaultActivePage={currentPage}
          totalPages={numPages}
        />
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`
