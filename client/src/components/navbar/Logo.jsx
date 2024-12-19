import React from 'react'
import styled from 'styled-components'
import logo1 from '../../assets/logo1.png'
import logo2 from '../../assets/logo2.png'
import { Link } from 'react-router-dom'

const Logo = ({width}) => {

  return (
    <Wrapper>
      <Link to='/'>
      <img src={width > 993 ? logo2 : logo1} className='logo-1' alt='logo' />
      </Link>
    
    </Wrapper>)
}
const Wrapper = styled.div`


img{
    height: 2rem;
    /* width: 20; */
    object-fit: fill;
    cursor: pointer;
  
}

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {

}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {

}

/* Large devices (desktops) */
@media (max-width: 991px) {
img{
  /* width: 130px; */
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
img{
  /* width: 100px; */
}
}
`

export default Logo
