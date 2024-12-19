import React from 'react'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom';
import {DashboardCreateBlog, DashboardCreateBook, DashboardCreateCollaboration, DashboardCreateCourse
} from '../index'


const CreateSingleElement = ({currentUser, path}) => {

  return (
    <Wrapper>
    {path == 'book' && <DashboardCreateBook currentUser={currentUser} path={path}/>}
    {path == 'blog' && <DashboardCreateBlog currentUser={currentUser} path={path}/>}
    {path == 'course' && <DashboardCreateCourse currentUser={currentUser} path={path}/>}
    {path == 'collaboration' && <DashboardCreateCollaboration currentUser={currentUser} path={path}/>}
    </Wrapper>)
}

const Wrapper = styled.main`

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

export default CreateSingleElement
