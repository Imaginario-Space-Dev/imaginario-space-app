import React from 'react'
import styled from 'styled-components'
import {Logo, Menu, SearchBar, ToggleBar, SingInUp, Profile, TranslatePage, ProfileUnlogged,
  Arrow, Filter, Cart, Chat, Notifications} from '../index'
import {UseUserContext} from '../../mainIndex'
import {UseGeneralContext} from '../../mainIndex'
import useWindowResize from '../../hooks/useWindowResize'


const Navbar = () => {
  const {dashboard} = UseGeneralContext()
  const {width} = useWindowResize()
  // console.log(width)
  
  const {currentUser, cart, notifications} = UseUserContext()

  return (
    <Wrapper>
    <div className='navbar m-0 '>

      <div className='left-side '>
      <div className='logo'>
      <Logo />
      </div>

      <div className='menu '>
        <Menu />
      </div>
      </div>
   
      
        
      

      <div className='right-side '>

      {/* {currentUser &&
      <div className='search'>
        <SearchBar width={width}/>
      </div>
      } */}
      
      <SearchBar width={width}/>

      {Object.keys(currentUser).length !== 0 &&
      <>
      {/* <SearchBar width={width}/> */}
      <Cart cart={cart}/>
      <Notifications notifications={notifications}/>
      </>
    }
      
      {Object.keys(currentUser).length === 0 &&
      <div className='signInUp'>
      <SingInUp />
      </div>
      }

    {Object.keys(currentUser).length === 0 &&
      <div className='Translate-page'>
        <TranslatePage />
      </div>
      } 
      
      {/* {(currentUser & width <= 991) ?
      <div className='toggleBar'>
        <ToggleBar /> 
      </div>: ""
        } */}
        
      {Object.keys(currentUser).length !== 0 &&  
      <div className='profile'>
        <Profile />
      </div>
      }

       

      </div>

      </div>


    </Wrapper>)
}

const Wrapper = styled.div`
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  z-index: 2;
  /* background-image: linear-gradient(to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, .9),
    rgba(0, 0, 0, .8),
    rgba(0, 0, 0, .6),
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, 0)
); */
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.left-side {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.right-side {
  display: flex;
  justify-content: center;
  align-items: center;
}


/* .search-center {
  width: 80%;
} */

/* FOR DESKTOP */
@media only screen and (min-width: 1024px) {
.navbar {
  padding-left: 60px;
  padding-right: 60px;
}
.toggleBar {
  display: none;
}
}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {
.toggleBar {
  display: none;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.navbar {
  padding-left: 20px;
  padding-right: 30px;
}
.menu, .profile{
  display: none;
}

.toggleBar {
  display: contents;
}
}


`

export default Navbar
