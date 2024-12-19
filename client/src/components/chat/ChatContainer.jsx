import React from 'react'
import styled from 'styled-components'

const ChatContainer = () => {
  return (
    <Wrapper>
      <div className='chat-container border border-danger'>
      Chat container
      </div>
      
    </Wrapper>)
}
const Wrapper = styled.div`
.chat-container {
  position: absolute;
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.chat-container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: calc(100vh - 9rem);
}

}

/* Large devices (desktops) */
@media (max-width: 991px) {
.chat-container {
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default ChatContainer
