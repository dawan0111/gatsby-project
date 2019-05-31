import React from "React"
import { graphql } from 'gatsby'

export default function MarkdownTemplate({data}) {
  if (data.markdownRemark === null) {
    return (
      <div>Error</div>
    )
  }
  const { markdownRemark: { frontmatter, html } } = data;
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
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
