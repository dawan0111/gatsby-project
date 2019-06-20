import React from "React"
import { graphql, Link } from 'gatsby'
import { Icon, Container } from 'semantic-ui-react'

import Layout from '../components/layout'
import style from '../css/modules/postView.module.css'

export default function MarkdownTemplate({data, pageContext}) {
  if (data.markdownRemark === null) {
    return (
      <div>Error</div>
    )
  }
  console.log(pageContext);

  const { markdownRemark: { frontmatter, html } } = data;
  const { prevPostPath, nextPostPath } = pageContext;
  return (
    <Layout>
      <div className={style.container}>
        <div className={style.control}>
          <ul className={style.control__list}>
            <li>
              <Link to="/blog">
                <Icon name="list"/> 목록으로
              </Link>
            </li>
            {prevPostPath !== '' &&
              <li>
                <Link to={prevPostPath}>
                  <Icon name="arrow left"/> 이전글
                </Link>
              </li>
            }
            {nextPostPath !== '' &&
              <li>
                <Link to={nextPostPath}>
                  <Icon name="arrow right"/> 다음글
                </Link>
              </li>
            }
          </ul>
        </div>
        <Container text>
          <header className={style.header}>
            <h3 className={style.title}>{frontmatter.title}</h3>
            <div className={style.datetime}>
              <Icon name="clock outline"/> {frontmatter.date}
            </div>
          </header>
          <div
            className={style.contents}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        title
      }
    }
  }
`
