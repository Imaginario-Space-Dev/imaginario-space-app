import React from 'react'
import styled from 'styled-components'
import {SingleBlog} from '../../index'
import { Link } from 'react-router-dom'
import {UseGeneralContext} from '../../../mainIndex'
import {listBlogs} from '../../../data/carousel'

const DashboardBlogCreationPreview = () => {
  const {createBlog, createBlogData}  = UseGeneralContext()
  return (
    <Wrapper>
    <div className='blog-creation-preview '>
    <div className='header'>
        <div className='action-btn-1 d-flex justify-content-center align-items-center'>
            <Link to='/dashboard/blogs/new-blog/' type='button' className=''>Edit</Link>
            <select className='mx-3' name="" id="">
            <option value='EN'>EN</option>
            <option value='PT'>PT</option>
            </select>
        </div>
        
      <div className='action-btn'>
        <button to='preview' type='button' className='mx-3'>Save</button>
        <button to='preview' type='button' className=''>Cancel</button>
      </div>
      </div>

      <SingleBlog list={listBlogs}/>
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.blog-creation-preview{
    /* overflow-y: scroll ; */
    .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

  .action-btn, .action-btn-1{
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    button, a, select{
      border: none;
      border-radius: var(--borderRadius);
      padding: 2px 10px;
      background-color: var(--color-12);
      color: var(--color-1);
      font-size: 12px;
    }
    button:hover, a:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardBlogCreationPreview

