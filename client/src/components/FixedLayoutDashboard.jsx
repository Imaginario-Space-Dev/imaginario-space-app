import React from 'react'
import styled from 'styled-components'
import {NavbarSigned} from './index'

const FixedLayoutDashboard = () => {
  return (
    <Wrapper>
    <div>
    <NavbarSigned />
    </div>
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

export default FixedLayoutDashboard
