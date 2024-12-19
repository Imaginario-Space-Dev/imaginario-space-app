import React from 'react'
import styled from 'styled-components'
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { FaArrowCircleLeft, FaEdit,FaLink, FaChartLine, FaHandshake} from "react-icons/fa";

const ProfileContentTrackHeader = ({TrackName, path, createCollab, createdById, currentUser, collabPage, userId, mySpace, itemId, contentType, collabId}) => {
    const navigate = useNavigate();

  return (
    <Wrapper>
    <div className='tracker-container d-flex justify-content-between align-items-center mb-3'>
    <div className='ProfileContent-header d-flex justify-content-start align-items-center'>
    {path && <FaArrowCircleLeft className='' onClick={() => navigate(`/imaginario-spaces/${userId}`)}/>}
    <h3 className='m-0 '>
    {path == 'book' && `Book from ${TrackName || ''}` }
    {path == 'course' && `Course from ${TrackName || ''}`}
    {path == 'blog' && `Blog from ${TrackName || ''}`}
    </h3>
    </div>

<div className='right-side d-flex justify-content-center align-items-center'>
<div className=''>Copy Link</div>

    {currentUser?._id && 
    <>

    {!createCollab && collabPage && 
    <Link to={`/imaginario-spaces/${itemId}/collaboration/new-collaboration`} className='mx-3 d-flex justify-content-center align-items-center'>
    <span className='border-0 mx-1'>+collab</span>
    <FaHandshake  />
    </Link>}

    {(currentUser?._id === createdById || currentUser?.role === 'admin') &&
    <Link to={`/imaginario-spaces/${createdById}/${contentType}/${itemId}/edit`} className='mx-0 d-flex justify-content-center align-items-center'>
    <span className='border-0 mx-1'>Edit+</span>
    <FaEdit />
    </Link>}

    {createCollab &&
    <Link to={`/imaginario-spaces/${itemId}/${contentType}/collaboration/${itemId}/edit`} className='mx-3 d-flex justify-content-center align-items-center'>
    <span className='border-0 mx-1'>Edit</span>
    <FaEdit />
    </Link>}

    { mySpace && 
    <Link to={ `/my-space/${currentUser?._id}/edit`} className='mx-3 d-flex justify-content-center align-items-center'>
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
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.tracker-container{

.ProfileContent-header{
    svg{
        margin-right: 10px;
        cursor: pointer;
        color: var(--color-1);
    }
    svg:hover{
        color: var(--color-4);
    }
}

.right-side{
    div, a{
     background-color: var(--color-12);
     color: var(--color-1);
     border: 1px solid var(--color-9);
     padding: 3px 6px;
     border-radius: var(--borderRadius);
     font-size: 12px;
     cursor: pointer;
     svg{
        font-size: 12px;
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


}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.tracker-container{
.ProfileContent-header{
    svg{
      
    }
    svg:hover{
        
    }
}
div{
    font-size: 12px;
}

}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.tracker-container{
.ProfileContent-header{
    svg{
      
    }
    svg:hover{
        
    }
}
div{
    font-size: 10px;
}

}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default ProfileContentTrackHeader
