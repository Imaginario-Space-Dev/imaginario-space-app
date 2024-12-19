import React from 'react'
import styled from 'styled-components'
import {UseGeneralContext} from '../../mainIndex'
import { SidebarDashboard } from '../index'
import {sidebarDashboardLinks} from '../../utils/utils'

const SidebarContainer = () => {
  const {closeSidebarDashboard} = UseGeneralContext()

  return (
    <Wrapper>
      <SidebarDashboard item={sidebarDashboardLinks} closeSidebar={closeSidebarDashboard}/>
    </Wrapper>)
}
const Wrapper = styled.div`

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {

}

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

export default SidebarContainer
