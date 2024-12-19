import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {SingleCourse, SingleBook, SingleBlog, HeaderImgBackground} from '../../components/index'
import {list, listBlogs} from '../../data/carousel'
import { useLocation } from 'react-router-dom';
import {useParams } from 'react-router-dom';
import useFetch from '../../fetch/useFetch' 
import {UseUserContext} from '../../mainIndex'

const ProfileContentPage = () => {
  const { id } = useParams();
  const { userId } = useParams();
  const {currentUser} = UseUserContext()

  const {data: fetchedUser} = useFetch(`/users/${userId}`)

  const location = useLocation();
  const path = location.pathname.split("/")[3]

  const {data: fetchedContent} = useFetch(`${path && path === 'book' ? '/books/' : path === 'course' ? '/courses/' : undefined}${id}`)

  const {data: fetchedContentList} = useFetch(`${path && path === 'book' ? '/books' : path === 'course' ? '/courses' : undefined}`)

    // USE AFFILIATE LINK POLICY IN THIS PAGE
    const affiliate = true

  const [trackProfileInstance, settrackProfileInstance] = useState(null)
  useEffect(() => {
      (path == 'book' || path == 'course' || path == 'blog') &&  settrackProfileInstance(path)
  }, [path])

  let blogPages = [{blogPage: true}]

  // console.log(fetchedContent)
  return (
    <Wrapper>
    
    {(path == 'book' || path == 'course') &&
    <div className='profiles-page'>

    <HeaderImgBackground list={list}
    BgImage={fetchedContent?.data?.coverImage?.name ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${fetchedContent?.data?.coverImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>

    <div className='book-cont'>
    {path == 'book' && 
    <SingleBook 
    list={fetchedContent?.data} 
    fetchedContentList={fetchedContentList?.data} 
    imaUserContent={fetchedUser?.data} 
    trackProfile={trackProfileInstance} 
    TrackName={fetchedUser?.data?.username}
    setUrl={fetchedUser?.data?.role === "publisher" ? '/publishers/' : '/imaginario-spaces/'}
    imaUserId={userId}
    createCollab={fetchedContent?.data?.collabs?.find(item => item.collaboratorId?._id === currentUser?._id)}
    />}

{path == 'course' && 
    <SingleCourse 
    list={fetchedContent?.data} 
    fetchedContentList={fetchedContentList?.data} 
    imaUserContent={fetchedUser?.data} 
    trackProfile={trackProfileInstance} 
    TrackName={fetchedUser?.data?.username}
    setUrl={fetchedUser?.data?.role === "publisher" ? '/publishers/' : '/imaginario-spaces/'}
    imaUserId={userId}
    createCollab={fetchedContent?.data?.collabs?.find(item => item.collaboratorId?._id === currentUser?._id)}
    />}
    


    {/* {path == 'course' && <SingleCourse list={fetchedContent?.data} fetchedContentList={fetchedContentList?.data} imaUserContent={fetchedUser?.data} trackProfile={trackProfileInstance} TrackName={fetchedUser?.data?.username}/>} */}
    </div>
    </div>
    }

    {(path == 'blog') && 
    <div className='singleBlogsPage'>

    <HeaderImgBackground list={[...blogPages, ...list]}/>

    <div className='book-cont'>
    {path == 'blog' && <SingleBlog trackProfile={trackProfileInstance} TrackName={fetchedUser?.data?.username} list={listBlogs}/>}
    </div>
    </div>
    }
    
      
    
    </Wrapper>)
}

const Wrapper = styled.main`
.singleBlogsPage {
  position: relative;
  margin-top: 0rem;
  /* background-color: var(--color-1); */

}
.profiles-page {
  position: relative;
  margin-top: 0rem;
  background-color: var(--color-2);

}

.book-cont{
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: 0;
}


/* Large devices (desktops) */
@media (max-width: 991px) {
  .profiles-page {
  margin-top: 0rem;
}
}
`

export default ProfileContentPage
