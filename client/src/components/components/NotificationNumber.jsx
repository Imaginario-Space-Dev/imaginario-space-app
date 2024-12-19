import React from 'react'
import styled from 'styled-components'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'

const NotificationNumber = ({notif_number}) => {
  return (
    <Wrapper>
    <div className='notification-Number'>
        {notif_number}
    </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.notification-Number{
    position: absolute;
    top: -1px;
    left: 18px;
    background-color: var(--color-4);
    color: var(--white);
    border-radius: var(--borderRadius);
    font-size: 12px;
    padding: 1px 3px;
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

export default NotificationNumber
