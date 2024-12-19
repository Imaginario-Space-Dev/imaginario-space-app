import React from 'react'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'
import {SidebarMobile} from '../index'
import {UseGeneralContext} from '../../mainIndex'

const ToggleBar = () => {
  const {isSidebarOpen, openSidebar} = UseGeneralContext()

  console.log(isSidebarOpen) 
  
  return (
    <Wrapper>
    <div className='toggle-1'>
      <div onClick={openSidebar}>
      <FaBars className='toggle-1-size'/>
      </div>
      <SidebarMobile />
    </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.toggle-1 {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 2rem;
  width: 2rem;
  
  .toggle-1-size {
    cursor: pointer;
    color: var(--color-4);
    transition: var(--transition);
  }

}

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {

}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {

}

/* Large devices (desktops) */
@media (max-width: 991px) {
.toggle-1-size {
  height: 1.5rem;
  width: 1.5rem;
  font-size: 10px;

.toggle-1-size:hover {
  height: 2rem;
  width: 2rem;
}
}
}
`

export default ToggleBar
