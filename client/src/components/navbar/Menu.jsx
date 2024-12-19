import React from 'react'
import styled from 'styled-components'
import { useTranslation } from "react-i18next"
import {menuLinks} from '../../utils/utils'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
    <ul className='menu-ul'>
    {menuLinks.map((item) => {
      const {id, url, text} = item
      return (
        <li key={id} className='menu-li h-100'>
          <NavLink to={url}>
            <p className='menu-text m-0 p-0'>{t(`${text}`)}</p>
            <p className='bar m-0 p-0 '></p>

            
            </NavLink>
        </li>
      )
    })}
    </ul>
    </Wrapper>)
}

const Wrapper = styled.div`
.menu-ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    height: 4.5rem;
}

.menu-li {
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-li a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    padding: 2px 0px 2px 0px;
    margin-left: 20px;
    margin-right: 20px;
    
    width: 100px;
    height: 100%;
    p {
      font-size: 15px;
    }
}

.menu-text {
  color: var(--white);
}

.bar {
  height: 4px;
    width: 100%;
  }

.menu-li a.active {
  .bar {
    height: 4px;
    width: 100%;
    background-color: var(--color-4);
  }
}
`

export default Menu
