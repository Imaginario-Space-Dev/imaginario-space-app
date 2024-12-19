import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import {UseGeneralContext} from '../../mainIndex'
import { Link } from 'react-router-dom'

const Arrow = () => {
  const [openSide, setOpenSide] = useState(true)
    const {openSidebarDashboard, closeSidebarDashboard} = UseGeneralContext()
    // console.log(isSidebarOpen)

    const openCloseSidebarDashboard = (action) => {
      if(action === 'open') {
        openSidebarDashboard()
        return setOpenSide(true)
      }
      if(action === 'close') {
        closeSidebarDashboard()
        return setOpenSide(false)
      }
    }
  return (
    <Wrapper>
        {openSide ? 
        <button className='border-0 bg-transparent m-0 p-0' onClick={() => openCloseSidebarDashboard('close')}>
            <FaArrowCircleLeft />
        </button>
      
      :
      <button className='border-0 bg-transparent m-0 p-0' onClick={() => openCloseSidebarDashboard('open')}>
            <FaArrowCircleRight />
      </button>
      
        }
    </Wrapper>)
}
const Wrapper = styled.div`
button{
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    font-size: 18px;
    margin: 0;
    padding: 0;
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

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default Arrow
