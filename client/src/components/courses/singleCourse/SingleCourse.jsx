import React, { useState } from 'react'
import styled from 'styled-components'
// import {list} from '../../../data/carousel'
import {useParams } from 'react-router-dom';
import {BookSimilar, SingleBookHeader, SingleBookbody, FromTheSameAuthor, DetailsHeader, ImaUserInfo} from '../../index'
import {UseUserContext} from '../../../mainIndex'


const SingleCourse = ({list, setUrl, imaUserId, imaUserContent, fetchedContentList, trackProfile, TrackName, previewBtns}) => {
  const {currentUser} = UseUserContext()

const From_the_same_author = fetchedContentList?.filter(item => item?.author === list?.author && item?._id !== list?._id)
const Similar = fetchedContentList?.filter(item => list?.targetAudience?.some((i) => item?.targetAudience?.includes(i)) && item?._id !== list._id)?.sort((a, b) => a?.title - b?.title)
// console.log(Similar) 
return (
    <Wrapper>
        <div className='singleBook-container'>
            <div className='marginLR pb-3'>
            <SingleBookHeader list={list} trackProfile={trackProfile} TrackName={TrackName} previewBtns={previewBtns}
            createCollab={list?.collabs?.find(item => item.collaboratorId?._id === currentUser?._id)}/>
            <SingleBookbody list={list}/>
            <DetailsHeader list={list}/>
            <ImaUserInfo list={imaUserContent}/>
            {fetchedContentList && !trackProfile && list ? From_the_same_author.length > 0 &&
              <FromTheSameAuthor list={From_the_same_author} currentItem={list} title={'From the same author'} setUrl={setUrl} imaUserId={imaUserId}/> : 'loading'}
             {fetchedContentList && !trackProfile && list ?  Similar.length > 0 && 
             <FromTheSameAuthor list={Similar} currentItem={list} title={'Similar '} setUrl={'/courses/'} /> : 'loading'
              }
             
            
            </div>
           
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`
@media (min-width: 991px) {
.marginLR{
  margin-left: 60px;
  margin-right: 60px;
}
}

@media (max-width: 991px) {
.marginLR{
  margin-left: 20px;
  margin-right: 20px;
}
}

`

export default SingleCourse
