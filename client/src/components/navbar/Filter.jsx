import React from 'react'
import styled from 'styled-components'
import {NotificationNumber} from '../components/index'
import {FaFilter, FaWindowClose } from 'react-icons/fa'

const Filter = () => {
  return (
    <Wrapper>
      <div className='filter '>
        <FaFilter />
          <NotificationNumber notif_number={1}/>
        </div>
    </Wrapper>)
}
const Wrapper = styled.div`
  .filter{
     display: none;
    }
    
 /* Extra large devices (large desktops) */
 @media (min-width: 992px) {
  .filter{
     display: none;
    }
}

/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {

}
`

export default Filter
