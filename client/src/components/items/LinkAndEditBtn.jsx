import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {FaEdit, FaLink, FaChartLine,FaHandshake} from "react-icons/fa";

const LinkAndEditBtn = ({createCollab, currentUser, EditProfile, collabPage}) => {
  return (
    <Wrapper>
    <div className='right-side-btn d-flex justify-content-end align-items-center mb-3'>
         <div className=''>Copy Link</div>

        {currentUser?._id && 
        <>

        {!createCollab && !EditProfile && collabPage && 
        <Link to={`/imaginario-spaces/${currentUser?._id}/collaboration/new-collaboration`} className='mx-3 d-flex justify-content-center align-items-center'>
        <span className='border-0 mx-1'>+collab</span>
        <FaHandshake  />
        </Link>}
        
        {createCollab && 
        <Link to='edit' className='mx-3 d-flex justify-content-center align-items-center'>
        <span className='border-0 mx-1'>Edit</span>
        <FaEdit />
        </Link>}

        {createCollab && 
        <Link to='stats' className='d-flex justify-content-center align-items-center'>
       <span className='border-0 mx-1'>Stats</span>
       <FaChartLine  />
       </Link>
    }

        </>}
       

    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.right-side-btn{
    div, a{
     background-color: var(--color-12);
     color: var(--color-1);
     border: 1px solid var(--color-9);
     padding: 3px 6px;
     border-radius: var(--borderRadius);
     font-size: 10px;
     cursor: pointer;
     svg{
        font-size: 10px;
     }
} 
    div:hover{
    color: var(--color-4);
    border: 1px solid var(--color-4);
}
    div:hover, a:hover{
    border: 1px solid var(--color-4);
}
 
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

export default LinkAndEditBtn

