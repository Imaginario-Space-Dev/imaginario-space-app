import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const SingInUp = () => {
  return (
    <Wrapper>
    <div className='sign-container'>
        <NavLink to='login' className='b-left'><button  type='button-left' className='btn-left'>Login</button></NavLink>
        {/* <NavLink to='register' className='b-right'><button type='button-right' className='btn-right'>Register</button></NavLink> */}
        <NavLink to='account-request' className='b-right'><button type='button-right' className='btn-right'>Register</button></NavLink>
        
        
    </div>

   
    </Wrapper>)
}

const Wrapper = styled.div`
.sign-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 11rem;
    
    button {
        background: transparent;
        color: var(--white);
        padding: 3px 10px;
        border: solid 2px var(--color-4);
        font-size: 15px;
    }

     a  {
        display: flex;
        align-items: center;
        min-width: 11rem;
    }

    .b-left{
        justify-content: end;
        min-width: 5rem;
    }

    .b-right{
        justify-content: start;
        min-width: 6rem;
    }

    .btn-left {
        border-top-left-radius: var(--borderRadius);
        border-bottom-left-radius: var(--borderRadius);
        transition: var(--transition);
        width: 4rem;
    }
    .btn-left:hover {
        background-color: var(--black);
        width: 5rem;
    }

    .btn-right {
        border-top-right-radius: var(--borderRadius);
        border-bottom-right-radius: var(--borderRadius);
        transition: var(--transition);
        width: 5rem;
    }

    .btn-right:hover {
        background-color: var(--black);
        width: 6rem;
    }
}

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {

}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {

}

/* Large devices (desktops) */
@media (max-width: 991px) {
    button {
        border: solid 1px var(--color-4) !important;
    }
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

  }

@media (max-width: 576px) {
    .sign-container {
    width: 9rem;

    button {
        padding: 3px 0px;
        font-size: 10px;
    }

     a  {
        min-width: 9rem;
    }

    .b-left{
        min-width: 4rem;
    }

    .b-right{
        min-width: 5rem;
    }

    .btn-left {
        width: 3rem;
    }
    .btn-left:hover {
        width: 5rem;
    }

    .btn-right {
        width: 4rem;
    }

    .btn-right:hover {
        width: 5rem;
    }
}
}

@media (max-width: 366px) {
    .sign-container {
    width: 7rem;

     a  {
        min-width: 7rem;
    }

    .b-left{
        min-width: 3rem;
    }

    .b-right{
        min-width: 4rem;
    }

    .btn-left {
        width: 2rem;
    }
    .btn-left:hover {
        width: 3rem;
    }

    .btn-right {
        width: 3rem;
    }

    .btn-right:hover {
        width: 4rem;
    }
}
}

`

export default SingInUp
