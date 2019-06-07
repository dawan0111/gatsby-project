import React from 'react'
import { graphql } from 'gatsby'

import { Grid, Pagination } from 'semantic-ui-react'

import style from '../css/modules/blogTemplate.module.css'
import Layout from '../components/layout'
import BlogItem from '../components/BlogItem'

export default class BlogList extends React.Component {

  state = {
    limit: 12,
  }

  componentDidMount () {
    window.addEventListener('scroll', () => this._handlerScroll())
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', () => this._handlerScroll())
  }

  _handlerScroll (event) {
    const scrollTop = event.scrElement.body.scrollTop;
    const scrollBottom = scrollTop + window.innerHeight;

    if (scrollBottom >= document.body.scrollHeight - 200) {
      this.setState({
        limit: this.state.limit + this.state.limit,
      });
    }
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { limit } = this.state;

    return (
      <Layout containerClassName={style.blogTemplate__container}>
        <Grid columns={3}>
          <Grid.Row>
            {posts.slice(0, limit).map(({ node }, index) => {
              const { title, thumbnail, path } = node.frontmatter;
              return (
                <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                  <BlogItem
                    title={title}
                    image={thumbnail.publicURL}
                    path={path}
                  />
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`
