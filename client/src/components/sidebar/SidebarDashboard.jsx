import React from 'react'
import styled from 'styled-components'
import {UseUserContext, UseGeneralContext} from '../../mainIndex'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { BiSolidLogOut } from "react-icons/bi";
import useWindowResize from '../../hooks/useWindowResize'
import { FaTimes } from 'react-icons/fa';

const SidebarDashboard = ({item, closeSidebar}) => {
  const {width} = useWindowResize()
  const {logout, currentUser} = UseUserContext()
  const { isDashboard} = UseGeneralContext()

  const logoutUser = () => {
    logout(false)
    navigate('/')
  }

  return (
    <Wrapper>
    <ul className='links-container w-100'>
        {item.map((i) => {
            const {id, group} = i
            return (
                <li className='d-flex w-100 my-2' key={id}>
                    
                    <ul className='w-100'>
                        {group.map((x) => {
                            const {id, text, icon, url, number, lgn} = x
                            return (
                                <li className='d-flex justify-content-between w-100'  key={id}>                                                                
                                    <NavLink to={url} className='d-flex justify-content-start align-items-center w-100'
                                    onClick={width <=991 ? closeSidebar : undefined}>                                       
                                        <span className='d-flex justify-content-start align-items-center'>{icon}</span>                     
                                       <span className= 'mx-2'>{text}</span>                                                                   
                                       </NavLink>                              
                                      {/* {(lgn || number) && <span className='right-side'>{number || lgn}
                                      </span>}                         */}
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })}
            
        <button onClick={logoutUser} className='logout-buttom d-flex'>
        
            <BiSolidLogOut />
            <span className='logout'>Logout</span>
        </button>
        
        
    </ul>
    </Wrapper>)
}

const Wrapper = styled.main`
.links-container {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;

    ul{
        border-top: solid 1px var(--color-5);
        
    }
    li{
        font-size: var(--font-size-lg);
        
        a {
            margin: 3px 0px;
            color: var(--color-1);
            margin: 3px 0px;
            padding: 5px;
            border-radius: var(--borderRadius);
            margin-right: 2px;
            transition: var(--transition);
        }
        a:hover{
            background-color: var(--color-9);
        }
        a.active{
            background-color: var(--color-9);
        }
        svg {
        font-size: 15px;
        color: var(--color-5);
        margin-right: 5px;
    }
        .right-side{
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 1rem;
            padding: 1px 3px;
            border-radius: 5px;
            background-color: var(--color-4);
            color: var(--color-6);
            margin: 3px 0px;
        }  
    }
    .logout-buttom {
          display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        border: none;
        background-color: transparent;
        width: 30%;
        color: var(--color-6);
        font-size: var(--font-size-lg);

    }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
  .links-container {
    height: calc(100vh - (4rem));

    svg {
        font-size: 15px;
        color: var(--color-5);
        margin-right: 5px;
    }
    
}

}
/* Large devices (desktops) */
@media (max-width: 991px) {
  .links-container {
    height: calc(100vh - (7rem));

    svg {
        font-size: 15px;
        color: var(--color-5);
        margin-right: 5px;
    }


        /* .logout-buttom {
          display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        border: none;
        background-color: transparent;
        width: 30%;
        color: var(--color-6);
        font-size: var(--font-size-lg);

    }
     */
  
    button:hover{
        color: var(--color-1);
        svg {
            color: var(--color-1);
    }

    
    }
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

export default SidebarDashboard
