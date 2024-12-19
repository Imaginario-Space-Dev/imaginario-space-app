import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CreateButton = ({url, action}) => {
  
  return (
    <Wrapper>
    <Link to={url} className='create-button'>
      {action}
    </Link>
    </Wrapper>)
}

const Wrapper = styled.main`
.create-button{
    padding: 2px 6px;
    color: var(--color-1);
    border-radius: var(--borderRadius);
    background-color: var(--color-12);
    transition: var(--transition);
}

.create-button:hover{
    background-color: var(--color-10);
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {

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

export default CreateButton
