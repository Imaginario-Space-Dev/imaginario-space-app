import React from 'react'
import styled from 'styled-components'

const NotificationContainer = () => {
  return (
    <Wrapper>
      <div className='notification-container border border-danger'>
      Notification container
      </div>
      
    </Wrapper>)
}
const Wrapper = styled.div`
.notification-container {
  position: absolute;
  overflow-y: scroll;
  padding: 0 20px;

  .overf{
    height: 6rem;
    width: 80%;
    background-color: var(--color-1);
    margin-bottom: 10px;
  }
}


/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.notification-container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: calc(100vh - 9rem);
}

}

/* Large devices (desktops) */
@media (max-width: 991px) {
.notification-container {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--color-2);
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

export default NotificationContainer
