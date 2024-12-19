import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaStar, FaBook, FaPlay, FaMicroblog, FaUserEdit, FaUser, FaBookmark, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdVerified } from "react-icons/md";
import {UseUserContext} from '../../mainIndex'
import { Link } from 'react-router-dom'
import {axiosInstance} from '../../fetch/axiosConfig'
import {useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const FilmsTest = ({film, trackProfile, platform, setUrl, imaUserId}) => {
    const {currentUser} = UseUserContext()
    const {id, coverImage, url, _id, authorName, author, promotion, role, connection, promo, display, 
        profileImage, username, spaceName, category, targetAudience, icon, save, collabs, title, contentType, urlContent, index, position, 
        genre, file} = film;
    const location = useLocation();
    const path = location.pathname.split("/")[1]
    const { userId } = useParams();
    const [loadingSave, setLoadingSave] = useState(false)
    const [trackUrlPath, setTrackUrlPath] = useState(path)
    const [mySave, setMySave] = useState(save)

    useEffect(() => {
        setTrackUrlPath(path)
    }, [path])
    // Function to delete notifs
const saveItem = async () => {
    if (Object.keys(currentUser).length === 0){
        toast.error(`You need to be authenticated to save this ${contentType === 'book' ? 'book' : 'course'}. Kindly click on "Register" to request an account`)
        return; // Prevent unauthenticated users
    }

    if (loadingSave === true) return; // Prevent multiple clicks

    setLoadingSave(true);

    let bodyData = {}
    // check if it's a collab or not
    if(trackUrlPath === 'imaginario-spaces'){
        bodyData.collabId = collabs?.filter(item => item.collaboratorId === userId)[0]?._id
    }

    try { 
        const res = await axiosInstance.put(`/${contentType}s/${_id}/save`, bodyData);
        setMySave(res?.data?.data)
        setLoadingSave(false);
        console.log(bodyData)

    } catch (error) {
      console.log(error);
      setLoadingSave(false);
    }

  };

  useEffect(() => {
    setMySave(save)
  }, [save]);
//   console.log(contentType)
 return (
    <Wrapper>
   <div className='film-item'>   
    {/* <Link to={trackProfile ? url + id + urlContent + id : url + id} className='w-100 h-100'> */}
    <Link to={(imaUserId ? setUrl + imaUserId + `/${contentType}/` + _id : setUrl !== undefined && setUrl  + _id) || !setUrl && `/${contentType}s/`  + _id} className='w-100 h-100'>
    <img src={(!coverImage?.name && !profileImage?.name && !file) ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/no-img-${contentType}.${contentType === 'user' ? 'png' :'jpg'}` : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${coverImage?.name ?  coverImage?.name :  profileImage?.name ? profileImage?.name : file ?  file : undefined}` } alt={coverImage?.name ? title :username}  className='film-img ' />
    </Link>
        
            {(platform && promo > 0) && <div className='top-10'>-{promo}%</div>}
            {promotion?.reduction > 0 && <div className='top-10'>-{promotion?.reduction}%</div>}
            <div className='films-info'>
            <h1 className='title m-0'>{title || spaceName}</h1>
            {/* <p className='m-0'>{role?.charAt(0)?.toUpperCase() + role?.slice(1) || author}</p> */}
            <p className='m-0'>{ username || author}</p>
            <p className='m-0'>{Array.isArray(category) ? category?.slice(0,2).join(', ') : genre ? genre?.slice(0,2).join(', ') : targetAudience?.slice(0,2).join(', ')}</p>
                <div className='films-details'>
                    <span className='m-0'>
                    {contentType == 'book' && !platform ? '20 p':
                         contentType == 'course' && !platform ? '2h' :
                         username && !platform ? connection?.length + ' cons' :
                         contentType == 'blog' ? '3000 c' :
                         contentType == 'profile' ? '263 view' :
                         platform ? `${index}` :
                         ''}
                    </span>
                    <span className='m-0 d-flex align-items-center'>
                        {contentType === 'book' ? <FaBook className='mx-1 my-0'/> :
                         contentType === 'course' ? <FaPlay className='mx-1 my-0'/> :
                         role === 'publisher' ? <FaUserEdit  className='mx-1 my-0'/> :
                         contentType == 'blog' ? <FaMicroblog className='mx-1 my-0'/> :
                         role === 'regular' ? <FaUser className='mx-1 my-0'/> :
                         ''}
                        </span>
                    <span className='m-0'>
                        {
                         role === 'publisher' && !platform ? <MdVerified  className='mx-1 my-0 text-success'/> :
                         role == 'collaborator' && !platform ? <MdVerified className='mx-1 my-0 text-warning'/> :
                         role == 'regular' && !platform ? <MdVerified className='mx-1 my-0 text-secondary'/>  :
                         role == 'admin' && !platform ? <MdVerified className='mx-1 my-0 text-primary'/> :
                         platform ? display ? <FaEye  className='mx-1 my-0 text-secondary'/> : <FaEyeSlash   className='mx-1 my-0 text-danger'/> : 
                         <FaBookmark className={Array.isArray(mySave) && mySave?.find(item => item.userId === currentUser?._id) ? 'save-item save-item-saved' : 'save-item'} onClick={saveItem}/>
                         }
                        </span>
                </div>  
            </div>

        </div>
    </Wrapper>)
}

const Wrapper = styled.div`

.film-item {
    /* justify-content: center !important; */
    align-items: center;
    transition: var(--transition);
    /* margin: 0; */
    border-radius: var(--borderRadius); 

    width: 300px; /* Set a fixed width for the card */
    height: 400px; /* Set a fixed height for the card */
    overflow: hidden; /* Ensure content doesn't overflow */
    position: relative; /* Allows positioning internal elements */
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  a{
    width: 100%; /* Make sure the image covers the width of the card */
    height: auto; /* Ensure it scales correctly */
    object-fit: cover; /* Ensures the image fits within the container without distortion */
    max-height: 60%; /* Limits the image height to a fixed portion of the card */

  img{
    width: 100%;
    height: 100%;
  }
  }
    
}

.top-10 {
    position: absolute;
    top: 0;
    right: 0;
    height: 1.2rem;
    min-width: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-12);
    color: var(--color-4);
    border-left: solid 1px var(--color-5);
    border-bottom: solid 1px var(--color-5);
    font-size: 10px;
    font-weight: bold;
    border-bottom-left-radius: var(--borderRadius);
}

.film-imgs{
    /* height: 100%;
    width: 100%;
    object-fit: cover;

    border-radius: var(--borderRadius);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px; */

    width: 100%; /* Make sure the image covers the width of the card */
  height: auto; /* Ensure it scales correctly */
  object-fit: cover; /* Ensures the image fits within the container without distortion */
  max-height: 60%; /* Limits the image height to a fixed portion of the card */
    
}

.films-info {
    display: flex;
    flex-direction: column;
    width: 100%;

    border-bottom-left-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);

    background-color: var(--grey-800);
    height: 40%; /* Occupies the remaining portion of the card */

    p{
        font-size: 10px;
        color: var(--color-6)
    }
}

/* .title {
  font-size: 14px;
  padding-bottom: 2px;
  color: var(--color-1)
} */


.films-details  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    width: 100%;
    margin-top: auto;

    span{
        color: var(--color-5);
        font-size: 9px;
        svg{
            font-size: 12px;
        }
        .save-item{
            cursor: pointer;
        }
        .save-item-saved{
            color: var(--color-4);
        }
    }
    
    svg:hover{
        color: var(--color-4);
    }
   
} 


/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.film-item {
    height: 17vw !important;
    width: 10vw !important;
}

.films-info {
    padding: 5px;
}


.film-item:hover {
    height: 17.5vw !important;
    width: 11vw !important;
    /* width: 100% !important; */
}

.title {
    font-size: 1vw !important;
}

.films-details  {
    font-size: 11px;
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.film-item {
    /* height: 10vw !important;
    width: 10vw !important; */
    /* height: 25.5vw !important; */
}
/* .film-item:hover {
    height: 24.5vw !important;
    width: 16.5vw !important;
} */

.films-info {
    padding: 1px 5px 5px 5px;
}


.title {
    font-size: 1.5vw;
}

.films-details  {
    font-size: 9px;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.film-item {
    height: 34vw !important;
    width: 24vw !important;
    
}

/* .film-item:hover {
    height: 34.5vw !important;
    width: 22.5vw !important;
} */
.title {
    font-size: 1.9vw;
}

.films-details  {
    font-size: 8px;
}
  }

@media (max-width: 576px) {
.film-item {
    height: 48vw !important;
    width: 38vw !important;
}

/* .film-item:hover {
    height: 48.5vw !important;
    width: 38.5vw !important;
} */

.title {
    font-size: 3vw;
}

.films-details  {
    font-size: 8px;
}
}

@media (max-width: 366px) {

.film-item {
    height: 48vw !important;
    width: 33.5vw !important;
}

/* .film-item:hover {
    height: 48.5vw !important;
    width: 34vw !important;
} */
}

`

export default FilmsTest
