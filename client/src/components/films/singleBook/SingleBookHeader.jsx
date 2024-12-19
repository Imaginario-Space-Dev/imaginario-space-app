import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useParams, useLocation } from 'react-router-dom';
import { FaBookmark, FaHeart, FaShoppingCart} from 'react-icons/fa';
import { GiPapers} from 'react-icons/gi';
import { IoIosSend } from "react-icons/io";
import {UseGeneralContext, UseUserContext} from '../../../mainIndex'
import {ProfileContentTrackHeader, LinkAndEditBtn, PreviewActionBtns} from '../../index';
import {axiosInstance} from '../../../fetch/axiosConfig'
import { toast } from 'react-toastify';



const SingleBookHeader = ({list, trackProfile, TrackName, previewBtns, createCollab}) => {
    // Check if fetched data exists
  if (!list) return <p>Loading...</p>;
    const {authorName, author, title, category, genre, targetAudience,
        coverImage, desc, bookPDF, like, save, share, cart, conbuy, createdBy, collabs, _id, contentType } = list
    const {openModal, modalContent} = UseGeneralContext()
    const {currentUser, updateCart, getShareItem, getBuyItem, shareItem, updateShareProduct} = UseUserContext()
    const [language, setLanguage] = useState()
    const [myLike, setMyLike] = useState(like)
    const [mySave, setMySave] = useState(save)
    const [myShare, setMyShare] = useState(share)
    const [myCart, setMyCart] = useState(cart)
    const [loadingAction, setLoadingAction] = useState(false);
    const { userId} = useParams();
    
    let collabId
    if(userId && trackProfile){
        collabId = collabs?.filter(item => item.collaboratorId?._id === userId)[0]?._id
    }

    const onClickShareButton = (item) => {

        // contentType == 'book' ? (modalContent('share-book') && getShareItem(item)) : contentType == 'video' ?  (modalContent('share-course') && getShareItem(item)) : undefined
        if (Object.keys(currentUser).length === 0){
            toast.error(`You need to be authenticated to share this ${contentType === 'book' ? 'book' : 'course'}. Kindly click on "Register" to request an account`)
            return; // Prevent unauthenticated users
        }
       
        if(contentType == 'book'){
            modalContent('share-book')
            getShareItem(item)
        }

        if(contentType == 'course'){
            modalContent('share-course')
            getShareItem(item)
        }
        openModal() 
      }

      const buyButton = (item) => {
        // contentType == 'book' ? (modalContent('share-book') && getShareItem(item)) : contentType == 'video' ?  (modalContent('share-course') && getShareItem(item)) : undefined
        if(contentType === 'book'){
            modalContent('buy-book')
            if(userId && trackProfile){
                getBuyItem({...item, collabId: collabId})
                // getBuyItem({...item, collabId: collabId, currentUserId: currentUser?._id, username: currentUser?.username})
            } else{
                getBuyItem(item)
                // getBuyItem({...item, currentUserId: currentUser?._id, username: currentUser?.username})
            }
        }

        if(contentType === 'course'){
            modalContent('buy-course')
            getBuyItem(item)
        }
        openModal() 
      }
    
    let bodyData = {}
    // check if it's a collab or not
    if(userId && trackProfile){
        bodyData.collabId = collabId
    }

      const handleActionButton = async (action) => {

        if (Object.keys(currentUser).length === 0){
            toast.error(`You need to be authenticated to ${action} this ${contentType === 'book' ? 'book' : 'course'}. Kindly click on "Register" to request an account`)
            return; // Prevent unauthenticated users
        }
        
        if (loadingAction === true) return; // Prevent multiple clicks

        setLoadingAction(true);
        
        try {
          const response = await axiosInstance.put(`/${contentType}s/${_id}/${action}`, bodyData);
          setLoadingAction(false);
          if (response?.data?.success) {
            if(action === 'like') {
                setLoadingAction(false) 
                return setMyLike(response?.data?.data)} 
            if(action === 'save') {
                setLoadingAction(false) 
                return setMySave(response?.data?.data)}  
            if(action === 'cart'){
                updateCart(list)
                setLoadingAction(false)
                return setMyCart(response?.data?.data)
            } 
          } 
          
        } catch (error) {
          console.error('Error sending the like request:', error);
          setLoadingAction(false);
        }
    
        
      };
    
      useEffect(() => {
        setMyLike(like)
        setMySave(save)
        setMyShare(share)
        setMyCart(cart)
      }, [like, save, share,  cart]);

      useEffect(() => {
        setMyShare(updateShareProduct)
      }, [updateShareProduct]);

    useEffect(() => {
        const clickOnBook = async () => {
            const infoData = collabId ? {collabId: collabId} : {}
        
            try { 
              const res = await axiosInstance.put(`/${contentType}s/${_id}/clickOnBook`, infoData);
              console.log(res?.data?.data);
            } catch (error) {
              console.log(error?.response?.data?.error || error);
            }
          };
          
        //   clickOnBook()
    }, [])
      
    //   console.log(createdBy?._id)
    //   console.log(shareItem)
  return (
    <Wrapper>
        
        
        <div className='singleBook-container'>
        {/* {trackProfile !== null && <ProfileContentTrackHeader TrackName={TrackName} path={trackProfile} createCollab={collaboratorId !== currentUser?._id}/>} */}
        {/* {(trackProfile == null && previewBtns == false ) && <LinkAndEditBtn createCollab={collaboratorId !== currentUser?._id}/> } */}
        {/* {previewBtns && <PreviewActionBtns setLanguage={setLanguage}/>} */}
        {/* <LinkAndEditBtn createCollab={createCollab} currentUser={currentUser} collabPage={true}/> */}
         <ProfileContentTrackHeader TrackName={TrackName} contentType={contentType} path={trackProfile} createCollab={createCollab} 
         currentUser={currentUser} collabPage={true} userId={userId} itemId={_id} collabId={collabId} createdById={createdBy?._id} />
        
            <div className='header-container '>
                <div className='img-interactions'>
                <img src={!coverImage?.name ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/no-img-${contentType}.jpg` : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${coverImage?.name}` } alt={coverImage?.name}/>
                </div>
                
                <div className='book-details'>
                    <h2 className='m-0 mb-1'>{title}</h2>
                    <p className='m-0 '>{author || authorName}</p>
                    <p className='m-0 mb-1'>{category }</p>
                    <p className='m-0 mb-1'>{genre}</p>
                    {/* <p className='m-0 mb-1'>Intermediate</p> */}
                    <p className='m-0 mb-2'>{list?.language.length > 0 && list?.language.join(', ')}</p>
                    <p className='desc m-0 mb-1'><div dangerouslySetInnerHTML={{ __html: desc }} /></p>
                    <div className='icons d-flex justify-content-between align-items-center'>
                        <span className='d-flex flex-column justify-content-center align-items-center'><FaHeart onClick={() => handleActionButton('like')} className={myLike?.find(item => item.userId === currentUser?._id) ? 'headerIconIn' : 'headerIcon'} /> <p>{myLike?.length}</p></span> 
                        <span className='d-flex flex-column justify-content-center align-items-center mx-2'><IoIosSend onClick={() => onClickShareButton(list)} className={myShare?.find(item => item.sender === currentUser?._id) ? 'headerIconIn' : 'headerIcon'}/> <p>{myShare?.length}</p></span>
                        <span className='d-flex flex-column justify-content-center align-items-center'><FaBookmark onClick={() => handleActionButton('save')} className={mySave?.find(item => item.userId === currentUser?._id) ? 'headerIconIn' : 'headerIcon'}/> <p>{mySave?.length}</p></span>
                        <span className='d-flex flex-column justify-content-center align-items-center mx-2'><FaShoppingCart onClick={() => handleActionButton('cart')} className={myCart?.find(item => item.userId === currentUser?._id) ? 'headerIconIn' : 'headerIcon'}/> <p>{myCart?.length}</p></span>
                        </div>
                    <button type='buttom' onClick={() => buyButton(list)}>{`Buy ${contentType === 'book' ? 'Book' : 'Course'}`}</button>
                       
                </div>
            </div>
        
        </div>
    </Wrapper>)
}

const Wrapper = styled.main`


.singleBook-container{
    margin-top: 6rem;
}
.singleBook-container {
    margin-bottom: 3rem;
}
.header-container{
    display: flex;
    justify-content: start;
    align-items: start;
    height: 20rem;
    

    
    .img-interactions {
        display: flex;
        flex-direction: column;

        img{
        object-fit: cover;
    }
    }
    

    .book-details {
        display: flex;
        flex-direction: column;
        height: 100%;
        svg{
            cursor: pointer;
        }

        .headerIconIn {
        color: var(--color-4);
        }
        .headerIcon {
        color: var(--color-1);
        }
        .headerIcon:hover{
            color: var(--color-4);
        }
        
        /* }
        svg:hover{
            color: var(--color-4);
        }
     */
        button {
            margin-top: auto;
            background-color: var(--color-1);
            color: var(--color-2);
            border: none;
            border-radius: var(--borderRadius);
            
        }
        button:hover {
            background-color: var(--color-4); 
            color: var(--color-1);
        }
    }

    
}

@media (min-width: 991px) {
.header-container{
     
    .img-interactions {
        display: flex;
        flex-direction: column;
        margin-right: 60px;
        height: 20rem;

        img{
        height: 100%;
        width: 200px;
        object-fit: cover;
    }

    }

    .book-details {
        width: 50%;
        
        .desc {
            height: 4rem;
            overflow-y: scroll;
        }
        button {
            padding: 2px;
            width: 20%;
            font-size: 15px;
            margin-bottom: 5px;
        }

        .iconss{
            margin-top: auto;
            width: 20%;
            svg{
                font-size: 25px;
                cursor: pointer;
            }
        }
    }
}
}

@media (max-width: 991px) {
.header-container{
    
    height: 13rem;

    .img-interactions {
        margin-right: 20px;
        height: 12rem;

        img{
            height: 100%;
        width: 120px;
        object-fit: cover;
    }
    }
    .book-details {
        width: 40%;
        height: 12rem;

        .desc {
            display: none;
        }

        svg{
            font-size: 20px;
        }
        

        button {
            padding: 2px;
            width: 100%;
            font-size: 12px;
            margin-bottom: 5px;
        }
    }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.book-details {
        width: 100% !important;
        height: 12rem;

        .desc {
            height: 4rem;
            overflow-y: scroll;
        }

        button {
            padding: 2px;
            width: 100%;
            font-size: 12px;
            margin-bottom: 5px;
        }
    }

}
`

export default SingleBookHeader
