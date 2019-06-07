import { Link } from "gatsby"
import { Container, Menu } from 'semantic-ui-react'
import PropTypes from "prop-types"
import React from "react"

import styles from '../css/modules/header.module.css'
import { headerNavs } from '../_config';

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <Container fluid={true}>
      <div className={`container-main ${styles.header__rap}`}>
        <h2 style={{ margin: 0 }}>
          <Link
            to="/"
            className={styles.header__logo}
          >
            {siteTitle}
          </Link>
        </h2>

        <nav>
          <Menu secondary>
            {headerNavs.map((headerNav, index) => (
              <Menu.Item key={index}>
                <Link to={headerNav.link}>{headerNav.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </nav>
      </div>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
