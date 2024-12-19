import React, { useState } from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'

const SearchBar1 = () => {
  return (
    <Wrapper>
        <div className='search-bar1-container'>
        <FaSearch />
      <input type='text' className='search-bar1' placeholder='Find a content creator'/>
      
      </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.search-bar1-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    border-radius: 30px;
    padding: 0px 10px;
    background-color: rgba(255, 255, 255, 0.7);

    input {
        height: 3rem;
        width: 100%;
        outline: none;
        font-size: 16px;
        padding: 5px 10px 5px 10px;
        color: var(--black);
        background-color: transparent;
        border: none;
}

    svg {
        color: var(--white);
        font-size: 20px;
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

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.search-bar1-container {

  border-radius: 30px;
  padding: 0px 10px;

  input {
    
  }

  svg {
      font-size: 15px;
}
}
}

@media (max-width: 576px) {
  .search-bar1-container {

  width: 60vw;
  border-radius: 30px;
  padding: 0px 10px;

  input {
    font-size: 14px;
  }

  svg {
      font-size: 15px;
  }
}
}

@media (max-width: 366px) {

}


`

export default SearchBar1
