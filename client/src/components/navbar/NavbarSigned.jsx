import React, { useState } from 'react'
import styled from 'styled-components'
import useWindowResize from '../../hooks/useWindowResize'
import {NotificationNumber} from '../components/index'
import { NavLink } from 'react-router-dom'
import {Logo, Arrow, SearchBar, Filter, Cart, Chat, Notifications, HoverIcon, ToggleBar, Profile,} from '../index'


const NavbarSigned = () => {
    const [showNotif, setShowNotif] = useState(undefined)
    const {width} = useWindowResize()
  return (
    <Wrapper>
    <div className='nav-signed'>

    <div className='left-side'>
      <div className='logo'>
        <Logo width={width}/>
      </div>
      <div className='arrow'>
        <Arrow />
      </div>
      </div>

      <div className='center-side'>
        <SearchBar />
      </div>
        
      <div className='right-side'>
        <div className='search-mobile'>
            <SearchBar />
        </div>
    
        <Cart />
        
        
        <Notifications />
        
        <Profile />
      </div>
    </div>

    </Wrapper>)
}

const Wrapper = styled.div`
.nav-signed {
    position: fixed;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* height: 3rem; */
    padding-left: 0px;
    background-color: var(--color-12);
    z-index: 2;

    svg{
        color: var(--color-1);
        transition: var(--transition);
        box-shadow: var(--shadow-4);

    }

    .left-side {
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;

        .arrow{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 2rem;
            padding: 5px;
            transition: var(--transition);
        }

        .arrow:hover {
            background-color: var(--color-6);
            border-radius: var(--borderRadius);
            svg {
            color: var(--grey-900);
            }
        }
    }

    .center-side {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .right-side {
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
        svg{
            /* font-size: 18px; */
    }
        .search-mobile {
            display: none;
    }
    }
}
 
 /* Extra large devices (large desktops) */
 @media (min-width: 992px) {
.nav-signed {
    .left-side {
        width: 15%;
    }
    .right-side {
        height: 3rem;
        display: flex;
        justify-content: end;
        align-items: center;
        width: 15%;

        .filter{
            display: none;
        }

        a.active{
            background-color: var(--color-6);
            border-radius: var(--borderRadius);
            box-shadow: var(--shadow-4);
            svg {
                color: var(--grey-900);
            }
        }
    }
    }
}


 
 /* Large devices (desktops) */
  @media (max-width: 991px) {
.nav-signed {
    
    .left-side {
        .arrow {
            display: none;
        }
    }

    .center-side {
        display: none;

    }

    .right-side {
        display: flex;
        justify-content: end;
        align-items: center;
        min-width: 30% !important; 
        .profile {
            display: none;
        }
        .search-mobile {
            display: contents;
    }
    }
}
}
 
 /* Medium devices (tablets) */
@media (max-width: 767px) {
.nav-signed {
    .right-side {
        display: flex;
        justify-content: end;
        align-items: center;
        min-width: 50% !important; 
}
}
}
 
@media (max-width: 576px) {

}
`

export default NavbarSigned
