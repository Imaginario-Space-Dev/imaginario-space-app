import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {SidebarHeader, SidebarBody, SidebarDashboard} from '../index'
import {sidebarLinks, sidebarDashboardLinks} from '../../utils/utils'
import {UseGeneralContext} from '../../mainIndex'
import {UseUserContext} from '../../mainIndex'
import {useParams, useLocation } from 'react-router-dom';

const SidebarMobile = () => {
  const {currentUser} = UseUserContext()
  const {isSidebarOpen, closeSidebar, isDashboard, isSidebarDashboardOpen, closeSidebarDashboard} = UseGeneralContext()
  const clickOutDetect3 = useRef(null)

  const handleClickOutsideSidebarMobile = (e) => {
    if(!clickOutDetect3.current?.contains(e.target)){
      closeSidebar()
      closeSidebarDashboard()
  }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSidebarMobile, true)
  },[])


  return (
    <Wrapper>
      {isDashboard ? 
    <div className={isSidebarDashboardOpen ? 'cont cont-show' : 'cont'}>
    <div className={isSidebarDashboardOpen ? 'sidebar-mobile-content sidebar-mobile-content-show' :  
          'sidebar-mobile-content'} ref={clickOutDetect3}>
          <SidebarHeader currentUser={currentUser}/>
          <SidebarDashboard item={sidebarDashboardLinks} closeSidebar={closeSidebarDashboard} currentUser={currentUser}/>
      </div>

     <div className={isSidebarDashboardOpen ? 'sidebar-mobile-container sidebar-mobile-container-show' 
      : 'sidebar-mobile-container'}>
     </div>
    </div>  
    : 
    <div className={isSidebarOpen ? 'cont cont-show' : 'cont'}>
      <div className={isSidebarOpen ? 'sidebar-mobile-content sidebar-mobile-content-show' :  
          'sidebar-mobile-content'} ref={clickOutDetect3}>
          <SidebarHeader currentUser={currentUser}/>
          <SidebarBody item={sidebarLinks} closeSidebar={closeSidebar} currentUser={currentUser}/>
      </div>

      <div className={isSidebarOpen ? 'sidebar-mobile-container sidebar-mobile-container-show' 
      : 'sidebar-mobile-container'}>
     </div>
    </div>  
    }
      
    </Wrapper>)
}

const Wrapper = styled.div`
.cont {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  z-index: -1;
}

.cont-show {
  z-index: 3;
}
.sidebar-mobile-container {
  height: 100%;
  transition: var(--transition);
  background-color: rgba(255, 255, 255, 0.6);
  opacity: 0;
  display: none;
  z-index: -1;
}

.sidebar-mobile-container-show {
  opacity: 1;
  z-index: 3;
  display: block;
}

.sidebar-mobile-content{
  height: 100%;
  padding: 20px;
  background-color: var(--color-12);
  border: solid 1px var(--color-5);
  border-radius: var(--borderRadius);
  opacity: 0;
  transform: translate(-105%);
  z-index: -1;
}

.sidebar-mobile-content-show {
  transform: translate(0);
    z-index: 2;
    opacity: 1;
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.sidebar-mobile-container {
  width: 60%;
}
.sidebar-mobile-content{
  width: 40%;
}
}
/* Medium devices (tablets) */
@media (max-width: 767px) {
.sidebar-mobile-container {
  width: 60%;
}
.sidebar-mobile-content{
  width: 40%;
}
}

@media (max-width: 576px) {
.sidebar-mobile-container {
  width:40%;
}
.sidebar-mobile-content{
  width: 60%;
}

@media (max-width: 366px) {
  .sidebar-mobile-container {
  width: 30%;
}
.sidebar-mobile-content{
  width: 70%;
}
}
}




`

export default SidebarMobile

