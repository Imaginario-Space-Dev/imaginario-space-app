import React from 'react'
import styled from 'styled-components'
import {Modales, NotificationHeader} from '../index'
import useWindowResize from '../../hooks/useWindowResize'

const NotificationMouseHover = ({notifType}) => {
  const {width} = useWindowResize()
  return (
    <Wrapper>
      <div className='notificationMouseHover d-flex flex-column justify-content-center align-items-center'>
      
      {width > 991 ? <NotificationHeader notifType={notifType}/> 
      : 
      <Modales notifType={notifType}/>
   
      }
      </div>
    </Wrapper>)
}
const Wrapper = styled.div`


/* Extra large devices (large desktops) */
@media (min-width: 992px) {
  height: calc(100vh - 7rem);

}

/* Large devices (desktops) */
@media (max-width: 991px) {
.notificationMouseHover {
  height: 100vh;
  width: 100vw;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default NotificationMouseHover
