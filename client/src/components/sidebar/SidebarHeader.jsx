import React from 'react'
import styled from 'styled-components'
import profile_img from '../../assets/profile_img.jpg'
import {UseUserContext} from '../../mainIndex'

const SidebarHeader = ({currentUser}) => {
    const {profileImage, username, spaceName, role} = currentUser
  return (
    <Wrapper>
    <div className='sidebar-header'>
        <img src={!profileImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${profileImage?.name}` } alt={profileImage?.name} className='profile-img'/>
        {/* <h3>RK</h3> */}
        <div className='header-right'>
            <h4 className=''>{username}</h4>
            <p className='m-0'>{role}</p>
            <p className='m-0'>{spaceName}</p>

        </div>
    
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.sidebar-header {
    display: flex;
    justify-content: start;
    align-items: center;
    color: var(--color-1);
    margin-bottom: 10px;
    
    img{
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 50%;
        margin-right: 10px;
        object-fit: cover;
    }

    h3{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 50%;
        margin: 0px 10px 0px 0px;
        border-radius: 50%;
        border: solid 1px red;
        font-weight: 20px;
        
    }

    .header-right {
        margin-left: 0px;
        h4 {
            margin: 1px 0px;
        }
        p{
            font-size: 10px;
        }
    }
}
`

export default SidebarHeader
