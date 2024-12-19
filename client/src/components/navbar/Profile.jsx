import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import {SidebarLaptop} from '../index'
import {NotificationNumber} from '../components/index'
import {HoverIcon} from '../index'
import { NavLink } from 'react-router-dom'
import {UseGeneralContext} from '../../mainIndex'

const Profile = () => {
  const [showNotif, setShowNotif] = useState(undefined)
  return (
    <Wrapper>
      <div className='profile' onMouseOver={() => setShowNotif('profileHover')}>
        <div className='prof' >

            <div className='profile-1-container m-0 p-0'>
              <div className='profile-1 m-0 p-0'>
              RG
              </div>
              <div className='sideLap'>
              {/* <SidebarLaptop /> */}
              </div>
            </div>

            <HoverIcon right={0} widthOnHover={20} profileHover={showNotif}/>
            </div>
        </div>
     
    
    </Wrapper>)
}
const Wrapper = styled.div`

.profile {
            /* position: relative; */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 3rem;
            cursor: pointer;    
            
            .prof {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 2rem;

                .hover-icon{
                transition: var(--transition);
                display: none;
                }
            }
            
        }

.profile-1-container {
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 2rem;
  width: 2rem;

  .sideLap {
    display: none;
  }
}

.profile-1-container:hover {
  .sideLap {
    display: block;
  }
}
.profile-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  padding: 10px;
  border-radius: 50%;
  border: solid 2px var(--color-1);
  color: var(--color-1);
  transition: var(--transition);
  font-weight: bold;
}

.profile-1:hover {
  border: solid 2px var(--color-4);
}

 /* Extra large devices (large desktops) */
 @media (min-width: 992px) {
     
     .profile:hover{
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
`

export default Profile
