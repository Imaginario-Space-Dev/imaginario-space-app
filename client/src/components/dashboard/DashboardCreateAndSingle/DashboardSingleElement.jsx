import React from 'react'
import styled from 'styled-components'

import {DashboardSingleBlog, DashboardSingleBook, DashboardSingleBugReport, 
  DashboardSingleCollaboration, DashboardSingleCollaborator, DashboardSingleCourse,
  DashboardSinglePartner, DashboardSinglePublisher,DashboardSingleUserProfile,
  DashboardSingleViolationReport,
} from '../../index'
import {UseUserContext} from '../../../mainIndex'

const DashboardSingleElement = ({FetchedData, path}) => {
  const {currentUser} = UseUserContext()


  return (
    <Wrapper>
      {path == 'books' && <DashboardSingleBook FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'blogs' && <DashboardSingleBlog FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'courses' && <DashboardSingleCourse FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'incidents' && <DashboardSingleBugReport FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'collaborations' && <DashboardSingleCollaboration FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'collaborators' && <DashboardSingleCollaborator FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'partners' && <DashboardSinglePartner FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'publishers' && <DashboardSinglePublisher FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'users' && <DashboardSingleUserProfile FetchedData={FetchedData} currentUser={currentUser}/>}
      {path == 'violations' && <DashboardSingleViolationReport FetchedData={FetchedData} currentUser={currentUser}/>}
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

export default DashboardSingleElement
