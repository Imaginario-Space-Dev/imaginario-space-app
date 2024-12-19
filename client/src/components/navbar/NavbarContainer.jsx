import React from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'
import {Navbar, NavbarSigned} from '../index'
import {UseGeneralContext} from '../../mainIndex'
import useWindowResize from '../../hooks/useWindowResize'

const NavbarContainer = () => {
    const {dashboard} = UseGeneralContext()
    const {width} = useWindowResize()
  return (
    <Wrapper>
    <div className='navbar-container'>
    {!dashboard ?
     <div className='w-100'>
        <Navbar />
      </div>
      :
      <div className='navbar-dashboard w-100'>
        <NavbarSigned />
      </div>
    }
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.navbar-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 2;

}
`

export default NavbarContainer
