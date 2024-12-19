import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import {UseUserContext, UseGeneralContext} from '../mainIndex'
import useWindowResize from '../hooks/useWindowResize'
import {useParams, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {axiosInstance} from '../fetch/axiosConfig'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  FixedLayoutDashboard,
    Navbar,
    Footer,
    MenuMobile,
    Modales,
    NavbarContainer,
    NavbarSigned,
    SidebarContainer,
    SidebarMobile  
  } from './index'


const FixedLayouts = () => {
  const {currentUser, getCurrentUser, cart, notifications, getNotification, updateCart, updateSharedItem} = UseUserContext()
  const {isModal, isSidebarDashboardOpen, isDashboard, openDashboard, closeDashboard} = UseGeneralContext()
  const {width} = useWindowResize()
  const [isDashboardPage, setIsDashboardPage] = useState(undefined)
  const location = useLocation();
  const path = location.pathname.split("/")[1]
  // const {data, loading, error} = useFetch(`/auth/me`)


    useEffect(() => {
        path === 'dashboard' ?  openDashboard() : closeDashboard()
    }, [path])

useEffect(() => {
    
  const fn = async () => {
    try{
      const res = await axiosInstance.get('/auth/me')
      const {} = res?.data?.data
      getCurrentUser(res?.data?.data)
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  fn() 
  }, [])
  
  useEffect(() => {
    const PlatformVisits = async () => {
        try { 
          const res = await axiosInstance.put(`/platform/66cf81afde6fd63d681b8dd0/visits`);
        } catch (error) {
          console.log(error?.response?.data?.error || error);
        }
      };
      
      PlatformVisits()
}, [])
  // console.log(currentUser?.notications)
  return (
    <Wrapper>
      {/* TOAST NOTIFICATIONS */}
      <ToastContainer />

    <div className='flixedLayouts'>
    
    {isDashboard ?  <NavbarSigned /> : <Navbar />}
    
  
    {/* <NavbarContainer /> */}

    <div className='sidabar-content'>
    {(isDashboard) &&
    <div className={isSidebarDashboardOpen ? 'sidebar-container sidebar-container-show' : 'sidebar-container'}>
    <SidebarContainer />
    </div>
    }

    {
     (width <= 991) && <SidebarMobile />
    }

    <div className={isDashboard ? isSidebarDashboardOpen ? 'outlet-signed outlet-signed-full' 
    :
    'outlet-signed' 
    : 
    'outlet-landing'}>
    <Outlet/>
    </div>
    </div>

    {/* {currentUser &&  */}
    <div className='menu-mobile'>
    <MenuMobile />
    </div>

    {isModal && 
    <div className='modales'>
      <Modales currentUser={currentUser} cart={cart} notifications={notifications}
       getNotification={getNotification} updateCart={updateCart} updateSharedItem={updateSharedItem}
       getCurrentUser={getCurrentUser}/>
    </div>
    }

    {/* {!isDashboard && 
    <div className='footter'>
    <Footer />
    </div>
    } */}
    
     
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.flixedLayouts {
  margin: 0;
  /* width: 100%; */
  height: 100%;
  width: 100vw;

  .footter{
    background-color: var(--color-12);
    /* padding: 10px; */
    /* margin-bottom: 6rem; */
  }
}



.outlet-landing {
  width: 100%;
}



/* FOR TABLETS AND MOBILES */
@media only screen and (min-width: 992px) {
.sidabar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
}

.outlet-signed {
  position: fixed;
  top: 3rem;
  right: 0;
  height: calc(100vh - 3rem);
  width: 100%;
  padding: 0px 0px;
  transition: var(--transition);
}

.outlet-signed-full {
  width: 83%;
}

.sidebar-container {
    position: fixed;
    top: 3rem;
    left: 0;
    height: calc(100vh - 3rem);
    width: 17%;
    padding: 0px 20px;
    background-color: var(--color-12);
    transform: translate(-105%);
    transition: var(--transition);
    border-right: solid 3px var(--color-12);
    z-index: 1;
}

.sidebar-container-show {
    transform: translate(0);
}

.menu-mobile {
  display: none;
}



}

/* Large devices (desktops) */
@media (max-width: 991px) {
.menu-mobile {
  position: fixed;
  bottom: 0.5rem;
  left: 0;
  transform: translate(calc(50vw - 50%));
  padding-left: 20px;
  padding-right: 20px;
  min-width: 90%;
  z-index: 2;
}

.sidebar-container, .sidebar-container-show {
    display: none;
}
.outlet-signed-full {
    width: 100%;
}
}

`

export default FixedLayouts
