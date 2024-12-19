import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {menuLinksMobile} from '../../utils/utils'
import { NavLink } from 'react-router-dom';
import {UseGeneralContext} from '../../mainIndex'
import logo1 from '../../assets/logo1.png'
import {useParams, useLocation } from 'react-router-dom';

const MenuMobile = () => {
    const {isSidebarOpen, openSidebar, isDashboard, isSidebarDashboardOpen, openSidebarDashboard} = UseGeneralContext()
    const [isDashboardPage, setIsDashboardPage] = useState(undefined)
    const location = useLocation();
    const path = location.pathname.split("/")[1]

    useEffect(() => {
        path === 'dashboard' ?  setIsDashboardPage(path) : setIsDashboardPage(undefined)
    }, [path])

    const mobileSideBar = (item) => {

        if(item == "Menu") {

            if(isDashboardPage){
                !isSidebarDashboardOpen &&  openSidebarDashboard()
                
            } else {
                !isSidebarOpen && openSidebar()
            }
           
        }
    }

  return (
    <Wrapper >
    <ul className='ul-menu-mobile d-flex justify-content-around align-items-center'>
        {menuLinksMobile.map((link) => {
            const {id, text, url, urlDashboard, icon} = link
            return (
                <li key={id} 
                className={text == 'Menu' ? 'li-menu-mobile-menu d-flex justify-content-center align-items-center'
                :
                'li-menu-mobile d-flex justify-content-center align-items-center'}>       
                    <NavLink to={!isDashboard ? url : urlDashboard} onClick={() => mobileSideBar(text)} className='d-flex flex-column justify-content-center align-items-center'>
                    
                    <div >{icon}</div> 
                    
                    <p className='menu-text m-0'>{text}</p>
                    </NavLink>                  
                </li>
            )
        })}
      
    </ul>
    </Wrapper>)
}

const Wrapper = styled.div`
.ul-menu-mobile {
  height: 3rem;
  border-radius: 20px;
  width: 100%; 
  background-color: var(--color-6);
  box-shadow: var(--shadow-4);
}

.li-menu-mobile a {
    padding: 3px;
    border-radius: var(--borderRadius);
    border: solid 1px transparent;
    
    svg{
        color: var(--color-2);
    }
}

.li-menu-mobile-menu a {
    padding: 3px;
    border-radius: var(--borderRadius);
    border: solid 1px transparent;
    
    svg{
        color: var(--grey-900);
    }
}

.li-menu-mobile a.active{
    svg{
        color: var(--color-4);
    }
    
}
.menu-text {
    color: var(--color-2)
}


/* Large devices (desktops) */
@media (max-width: 991px) {
.li-menu-mobile a{
    
}

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.li-menu-mobile a{

}
}


@media (max-width: 575px) {

}

@media (max-width: 366px) {

}
    
`

export default MenuMobile
