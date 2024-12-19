import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {Translation} from '../index'
import { FaGlobe  } from 'react-icons/fa'

const TranslatePage = () => {
    const [showLangs, setShowLangs] = useState(false)
    const clickOutDetect1 = useRef(null)

    const handleClickOutsideTranslate = (e) => {
      if(!clickOutDetect1.current?.contains(e.target)){
        setShowLangs(false)
    }
      
    }

    useEffect(() => {
      document.addEventListener("click", handleClickOutsideTranslate, true)
    },[])

  return (
    <Wrapper>
    <div className='translate-container' ref={clickOutDetect1} 
    >
      <button onClick={() => setShowLangs(!showLangs)}><FaGlobe /></button>
       
      <div className=
      {showLangs ? 
        'translate-language translate-language-mobile' 
        :
        'translate-language'}
        >
      <Translation />
      </div>
    </div>
    </Wrapper>)
}


const Wrapper = styled.div`
.translate-container {
   position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 2rem;
  width: 2rem;

  button {
    background-color: transparent;
    border: none;
    color: var(--color-4);
    transition: var(--transition);
    height: 1.8rem;
    width: 1.8rem;

    svg{
        font-size: 20px;
        height: 100%;
        width: 100%;
    }
  }

  button:hover {
    height: 2rem;
  width: 2rem;
  }
}

.translate-language {
    position: absolute;
    top: 2rem;
    left: -80px;
    width: 8rem;
    display: none;
}



 /* Extra large devices (large desktops) */
@media (min-width: 1200px) {
.translate-container:hover {
  .translate-language {
    display: block;
}
}
}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {
.translate-container:hover {
  .translate-language {
    display: block;
}
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.translate-container {
  height: 2rem;
  width: 2rem;

  button {
    height: 1.5rem;
    width: 1.5rem;

    svg{
        font-size: 20px;
    }
  }

  button:hover {
    height: 1.7rem;
  width: 1.7rem;
  }

  .translate-language {
    display: none !important;
  }

  .translate-language-mobile {
  display: block !important;
}
}


}
`

export default TranslatePage
