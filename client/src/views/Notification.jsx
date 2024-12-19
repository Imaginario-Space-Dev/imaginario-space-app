import React from 'react'
import styled from 'styled-components'
import {NotificationContainer} from '../components/index'

const Notification = () => {
  return (
    <Wrapper>
    <div className='notification-page'>
      <NotificationContainer />
    </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.notification-page {
  position: relative;
  width: 100%;
  height: calc(100vh - 3rem);
  background-color: var(--color-2);
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
export default Notification