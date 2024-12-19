import React, {useState} from 'react'
import styled from 'styled-components'
import {NotificationNumber} from '../components/index'
import {HoverIcon} from '../index'
import { NavLink } from 'react-router-dom'
import { FaBell } from "react-icons/fa";
import useWindowResize from '../../hooks/useWindowResize'
import {UseGeneralContext} from '../../mainIndex'



const Notifications = ({notifications}) => {
  const [showNotif, setShowNotif] = useState(undefined)
  const [showNotifMobile, setShowNotifMobile] = useState(false)
  const {width} = useWindowResize()
  const {openModal, modalContent} = UseGeneralContext()
   
  const onClickAction = () => {
    openModal() 
    modalContent('notification')
  }
  return (
    <Wrapper>
        <div className='notifications ' 
        // onClick={() => setShowNotifMobile(!showNotifMobile)} 
        onClick={onClickAction} 
        onMouseOver={() => setShowNotif('notificationHover')}>
            <NavLink >
            <FaBell />
                <NotificationNumber notif_number={notifications?.length}/>
                
                <HoverIcon right={-30} widthOnHover={20} notificationHover={showNotif}/>
                
                {/* } */}
                
            </NavLink>
        </div>
    </Wrapper>)
}
const Wrapper = styled.div`
.notifications{
  
svg{
      color: var(--color-1);
      transition: var(--transition);
      box-shadow: var(--shadow-4);

  }
          display: flex;
          justify-content: center;
          align-items: center;
          height: 3rem;
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
.notifications {
  margin-right: 15px;
}
.notifications:hover{
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
.notifications {
    /* .test{
        
  background-color: #0d0e0e;
  position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9 ;
    } */
  .hover-icon{
              display: none;
              }
}

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

export default Notifications
