import React from 'react'
import styled from 'styled-components'
import {listProfiles} from '../../../data/carousel'
import useFetch from '../../../fetch/useFetch' 
import {BookSimilar, FromTheSameAuthor, AuthorInfoDiv, 
  ProfileHeader, MyPixIsTo, ShareProfile, Niches, SinglePublishersFilter} from '../../index'
  
const SingleProfile = ({FetchedData, setUrl}) => {
  
  return (
    <Wrapper>
      <div className='singlePublisher-container'>
            <div className='marginLR pb-3'>
            <ProfileHeader FetchedData={FetchedData}/>
            {/* <MyPixIsTo /> */}
            {/* <SinglePublishersFilter action={'profile'} list={listProfiles} trackProfile={'/profile/'}/> */}
            {/* <button type='button' className='bg-white border-0 p-1'>Save recommendation</button> */}
            {/* <ShareProfile action={'share-profile'}/> */}
            {/* <AuthorInfoDiv list={listProfiles}/> */}
            {/* <Niches /> */}
            
            <BookSimilar list={FetchedData?.cart} title={'In cart'}/>
            <BookSimilar list={FetchedData?.liked} title={'Liked'}/>
            <BookSimilar list={FetchedData?.saved} title={'Saved'}/>
            <BookSimilar list={FetchedData?.shared} title={'Shared'}/>
            <BookSimilar list={FetchedData?.sharedWithMe} title={'Shared With me'}/>

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

export default SingleProfile
