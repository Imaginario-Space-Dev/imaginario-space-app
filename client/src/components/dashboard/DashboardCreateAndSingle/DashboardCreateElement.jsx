import React from 'react'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom';
import {DashboardCreateBook, DashboardCreateBlog, DashboardCreateCourse,
  DashboardCreateBugReport, DashboardCreateCollaboration, DashboardCreateCollaborator,
  DashboardCreatePartner, DashboardCreatePublisher, DashboardCreateUserProfile, DashboardCreateViolationReport
} from '../../index'
import {UseUserContext} from '../../../mainIndex'

const DashboardCreateElement = ({path,}) => {
  const {currentUser} = UseUserContext()

  return (
    <Wrapper className=''>
    {path == 'books' && <DashboardCreateBook currentUser={currentUser} />}
    {path == 'blogs' && <DashboardCreateBlog currentUser={currentUser} />}
    {path == 'courses' && <DashboardCreateCourse currentUser={currentUser} />}
    {path == 'incidents' && <DashboardCreateBugReport currentUser={currentUser} />}
    {path == 'collaborations' && <DashboardCreateCollaboration currentUser={currentUser} />}
    {path == 'collaborators' && <DashboardCreateCollaborator currentUser={currentUser} />}
    {path == 'partners' && <DashboardCreatePartner currentUser={currentUser} />}
    {path == 'publishers' && <DashboardCreatePublisher currentUser={currentUser} />}
    {path == 'users' && <DashboardCreateUserProfile currentUser={currentUser} />}
    {path == 'violation-report' && <DashboardCreateViolationReport currentUser={currentUser} />}
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

export default DashboardCreateElement
