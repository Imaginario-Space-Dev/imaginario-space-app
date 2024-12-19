import React, { useState } from 'react'
import styled from 'styled-components'

const FilterResult = () => {
  return (
    <Wrapper>
    <div className='filter-result-container text-white'>
      <p>No result was found for "Roy"</p>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.filter-result-container {
  position: fixed;
  top: 6rem;
  left: 60px;
  right: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 6rem);
  /* background-color: rgba(255, 255, 255, 0.9); */
  background-color: rgba(0, 0, 0, 0.9);
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.filter-result-container { 
  position: fixed;
  top: 6rem;
  left: 0;
  right: 0;
  height: calc(100vh - 6rem);
  /* background-color: rgba(255, 255, 255, 0.9); */
  background-color: rgba(0, 0, 0, 0.9);
  
} 
}
`

export default FilterResult
