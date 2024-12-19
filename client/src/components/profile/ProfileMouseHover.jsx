import React from 'react'
import styled from 'styled-components'
import {UseGeneralContext} from '../../mainIndex'
import {UseUserContext} from '../../mainIndex'
import { NavLink, useNavigate  } from 'react-router-dom'
import {SidebarLaptop} from '../index'

const ProfileMouseHover = () => {
  const {dashboardMode, dashboard} = UseGeneralContext()
  const {logout} = UseUserContext()
  const navigate = useNavigate()

  const goToDashboard = () => { 
    dashboardMode()
    // navigate('/dashboard')
  }

  const LogUserOut = () => {
    logout(false)
    dashboard && goToDashboard()
    // navigate('/dashboard')
  }

  return (
    <Wrapper>
      <div >
      {/* <NavLink to='/' onClick={goToDashboard} disabled={!dashboard} >Home</NavLink>
      <NavLink to='/dashboard' onClick={goToDashboard} disabled={dashboard} >Dashboard</NavLink>
      <NavLink to='/' onClick={LogUserOut} >Logout</NavLink> */}

      <SidebarLaptop />

      </div>
      
    </Wrapper>)
}
const Wrapper = styled.div`


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

export default ProfileMouseHover
