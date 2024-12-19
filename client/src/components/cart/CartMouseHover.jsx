import React, { useState } from 'react'
import styled from 'styled-components'
import { FaShoppingCart } from "react-icons/fa";
import {Modales, NotificationHeader} from '../index'
import useWindowResize from '../../hooks/useWindowResize'

const CartMouseHover = ({notifType}) => {
  const {width} = useWindowResize()
  const [showCart, setShowCart] = useState('')
  return (
    <Wrapper>
    <div className='d-flex flex-collumn justify-content-center align-items-center'>
    {/* <NotificationHeader notifType={notifType}/> */}
    {width > 991 ? <NotificationHeader notifType={notifType}/> : <Modales notifType={notifType}/>}
    </div>
  </Wrapper>)
}
const Wrapper = styled.div`


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

export default CartMouseHover
