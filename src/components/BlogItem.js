import { Link } from "gatsby"
import React from 'react'
import PropTypes from "prop-types"
import { Image } from 'semantic-ui-react'
import styled from '../css/modules/blogItem.module.css'

const BlogItem = ({ image, title, path }) => (
  <Link to={path} className={styled.blogItem}>
    <div className={styled.blogItem__header}>
      <Image src={image}/>
    </div>
    <div className={styled.blogItem__body}>
      <h3 className={styled.blogItem__title}>{title}</h3>
      <p className={styled.blogItem__info}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, necessitatibus soluta...</p>
    </div>
  </Link>
)


export default BlogItem
