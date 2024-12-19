import React from 'react'
import styled from 'styled-components'
import {listNotifications} from '../../data/carousel'
import {CartMouseHover, ChatMouseHover, NotificationMouseHover, ProfileMouseHover, ModalContent} from '../index'

const HoverIcon = ({right, widthOnHover, cartHover, chatHover, 
    notificationHover, profileHover, showNotifMobile, width}) => {
    const styleOnline = {
        // transform: `translate(${right}%)`,
        width: `${widthOnHover}vw`,
        right: `${right}px`
    }

  return (
    <Wrapper>
        <div className='hover-icon' 
        // style={notificationHover ? styleOnline : {}}
        // style={styleOnline}
        >
        {/* {cartHover &&  <CartMouseHover notifType={'cart'}/>}
        {notificationHover && <NotificationMouseHover notifType={"notif"}/> } 
        {profileHover && <ProfileMouseHover /> } */}
         {/* {cartHover &&  <ModalContent list={listNotifications} modalType={'cart'}/>}
        {notificationHover && <ModalContent list={listNotifications} modalType={'notification'}/> }  */}
        {profileHover && <ProfileMouseHover /> }

        {/* <ModalContent notifType={'cart'}/> */}
        </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.hover-icon{
    /* position: absolute; */
    /* display: none; */
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.hover-icon{
    position: absolute;
    top: 2.4rem;
    height: calc(100vh - 6rem);
    border-radius: var(--borderRadius);
    /* border: solid 1px var(--color-6); */
    background-color: var(--color-2);
    /* padding: 15px; */
    
}

}

/* Large devices (desktops) */
@media (max-width: 991px) {
.hoverIcon{
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

export default HoverIcon
