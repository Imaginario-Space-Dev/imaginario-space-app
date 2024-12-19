import React from 'react'
import styled from 'styled-components'
import { BiSolidMessage } from "react-icons/bi";

const Chat = () => {
  return (
    <Wrapper>
      <BiSolidMessage />
    </Wrapper>)
}
const Wrapper = styled.div`

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
img{
  width: 100px;
}
}
`

export default Chat
