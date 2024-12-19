import React from 'react'
import styled from 'styled-components'
import {DashboardSingleBlog, DashboardSingleBook, DashboardSingleCollaboration, DashboardSingleCourse
} from '../index'

const EditSingleElement = ({FetchedData, FetchedPlatforms, currentUser, path, path2, FetchedCollab}) => {

  return (
    <Wrapper>
    {(path === 'book' && path2 !== 'collaboration') && <DashboardSingleBook FetchedData={FetchedData} FetchedPlatforms={FetchedPlatforms} currentUser={currentUser}/>}
    {(path === 'course' && path2 !== 'collaboration') && <DashboardSingleCourse FetchedData={FetchedData} FetchedPlatforms={FetchedPlatforms} currentUser={currentUser}/>}
    {(path === 'book' && path2 === 'collaboration') && <DashboardSingleCollaboration FetchedData={FetchedData} FetchedPlatforms={FetchedPlatforms} FetchedCollab={FetchedCollab} currentUser={currentUser}/>}
    {path === 'blog' && <DashboardSingleBlog FetchedData={FetchedData}/>}
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

export default EditSingleElement
