import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {UseGeneralContext} from '../../mainIndex'
import {SidebarHeader, SidebarBody} from '../index'
import {sidebarLinks} from '../../utils/utils'
import {UseUserContext} from '../../mainIndex'

const sidebarLaptop = () => {
  const {currentUser} = UseUserContext()
  const {dashboard, closeSidebar} = UseGeneralContext()
  const clickOutDetect2 = useRef(null)

  // const handleClickOutsideSidebarLaptop = (e) => {
  //   if(!clickOutDetect2.current?.contains(e.target)){
  //     closeSidebar()
  // }
    
  // }

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutsideSidebarLaptop, true)
  // },[])

  return (
    <Wrapper>
    <div className='sidebar-laptop-container'>
       <SidebarHeader currentUser={currentUser}/>
       <SidebarBody item={sidebarLinks} closeSidebar={closeSidebar} dashboard={dashboard} currentUser={currentUser}/>
     </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.sidebar-laptop-container {
    position: absolute;
    top: 0rem;
    right: 0;
    width: 15rem;
    padding: 15px;
    background-color: var(--color-2);
    border: solid 1px var(--color-5);
    border-radius: var(--borderRadius);

}`

export default sidebarLaptop

