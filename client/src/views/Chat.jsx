import React from 'react'
import styled from 'styled-components'
import {ChatContainer} from '../components/index'

const Chat = () => {
  return (
    <Wrapper>
    <div className='chat-page'>
      <ChatContainer />
    </div>
    </Wrapper>)
}
const Wrapper = styled.div`

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.chat-page {
  position: relative;
  width: 100%;
  height: calc(100vh - 3rem);
  background-color: var(--color-2);
}

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
export default Chat