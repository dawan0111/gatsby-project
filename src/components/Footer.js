import React from 'react'
import { Container } from 'semantic-ui-react'

import style from '../css/modules/footer.module.css'

const Footer = () => (
  <footer className={style.footer}>
    <Container className={style.footer__container}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </Container>
  </footer>
)

export default Footer
