import React from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'
import { FaUser   } from 'react-icons/fa'

const ProfileUnlogged = () => {
  return (
    <Wrapper>
    <div className='profileUnlogged-container'>
      <button><FaUser  /></button>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.profileUnlogged-container {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 2rem;
  width: 2rem;
  margin-left: 10px;

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

/* Large devices (desktops) */
@media (max-width: 991px) {
.profileUnlogged-container {
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
}
}
`

export default ProfileUnlogged
