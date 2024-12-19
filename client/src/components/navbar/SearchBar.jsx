import React, { useState } from 'react'
import styled from 'styled-components'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {FilterResult} from "../index"
import {UseGeneralContext} from '../../mainIndex'
import useWindowResize from '../../hooks/useWindowResize'

const SearchBar = () => {
  const { openSidebar, closeSidebar, isSidebarOpen, dashboard } = UseGeneralContext()
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [textInput, setTextInput] = useState('')
    const {width} = useWindowResize()

    const openCloseInput = () => {
      if(width <= 991) {
        const res = setShowSearchInput(!showSearchInput) 
        return res
      }
      
    }

  return (
    <Wrapper>
        <div>
        <div className={showSearchInput ? 'search-container-show' : 'search-container'}>
        
        <input type='text' className='w-100' placeholder='Find a content creator'
          onChange={(e) => setTextInput(e.target.value)}/>
        
        <div className='search-icon-container'
        onClick={openCloseInput}>
        {showSearchInput ? 
        <FaTimes /> :
        <FaSearch />}
        </div>

        </div>
        {(!textInput.length == 0) 
        ?
        <FilterResult /> 
        : undefined
        }
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.search-container {
  display: flex;
  justify-content: start;
  align-items: center;
  overflow-x: hidden;
  background-color: transparent;
  
  input {
    height: 100%;
    width: 80%;
    outline: none;
    font-size: 15px;
    padding: 5px 10px 5px 10px;
    color: var(--text-color-1);
    background-color: transparent;
    /* border-top-left-radius: 10px;
    border-bottom-left-radius: 10px; */
    transition: var(--transition);
    border: 2px solid var(--color-5);
  }

  input:focus {
    width: 100%;
    background-color: var(--color-2);
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    
    svg{
      color: var(--color-1);
    }
    
    
  }
  
}

 /* Extra large devices (large desktops) */
 @media (min-width: 991px) {
.search-container {
  margin-right: 10px;
  height: 2rem;
  width: 20rem;
  border-radius: var(--borderRadius);

  div {
    height: 100%;
    padding: 5px;
    border: 2px solid var(--color-5);

    svg{
      margin: 0px 6px;
      /* color: var(--color-4); */
    }
  }

  
}


}


/* Large devices (desktops) */
@media (max-width: 991px) {
.search-container {
  transition: var(--transition);

  input {
    display: none;
  }

  div {
    background-color: transparent;
  }

  .search-icon-container {
    margin-right: 10px;
  }
}

.search-container-show {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  /* border: none; */
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1;


  input {
    color: var(--color-2);
    height: 2rem;
    width: 100%;
    border: solid 1px var(--color-6);
    outline: none;
    font-size: 14px;
    padding: 5px 10px 5px 10px;
    color: var(--color-1);
    background-color: var(--color-2);
    border-radius: var(--borderRadius);
  }

  div {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 3rem;
    background-color: transparent;

    svg{
      font-size: 30px;
      color: var(--color-4);
    }
  }
}
}
  
`

export default SearchBar
