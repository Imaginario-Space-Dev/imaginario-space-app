import React, {useState} from 'react'
import styled from 'styled-components'
import {NotificationNumber} from '../components/index'
import {HoverIcon} from '../index'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import {UseGeneralContext} from '../../mainIndex'


const Cart = ({cart}) => {
  const [showNotif, setShowNotif] = useState(undefined)
  const {openModal, modalContent} = UseGeneralContext()

  const onClickAction = () => {
    openModal() 
    modalContent('cart')
  }
  return (
    <Wrapper>
      <div className='cart' 
      onClick={onClickAction} 
      onMouseOver={() => setShowNotif('cartHover')}>
            <NavLink>
                <FaShoppingCart />
                <NotificationNumber notif_number={cart?.length}/>
                <HoverIcon right={-30} widthOnHover={20} cartHover={showNotif}/>
            </NavLink>
        </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.cart{
  

  svg{
        color: var(--color-1);
        transition: var(--transition);
        box-shadow: var(--shadow-4);

    }
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
            cursor: pointer;
            transition: var(--transition);
            a {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 2rem;
                padding: 5px;
            }
            .hover-icon{
                display: none;
            }
        }

 /* Extra large devices (large desktops) */
 @media (min-width: 992px) {

.cart {
  margin-right: 15px;
}
     
.cart:hover{
            a {
                background-color: var(--color-6);
                border-radius: var(--borderRadius);
                box-shadow: var(--shadow-4);
                svg {
                color: var(--grey-900);
            }
                .hover-icon{
                display: block;
                }
            }
            .prof {
                .hover-icon{
                display: block;
            }
            }
            
            
        }
}


/* Large devices (desktops) */
@media (max-width: 991px) {
  .cart {
  margin-right: 10px;
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

export default Cart
