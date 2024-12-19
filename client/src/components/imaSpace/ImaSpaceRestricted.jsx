import React from 'react'
import styled from 'styled-components'
import {listProfiles} from '../../data/carousel'
import {BookSimilar, FromTheSameAuthor, AuthorInfoDiv, 
  ProfileHeader, MyPixIsTo, ShareProfile, Niches, SinglePublishersFilter} from '../index'


const ImaSpaceRestricted = () => {
  return (
    <Wrapper>
      <div className='singlePublisher-container'>
            <div className='marginLR pb-3'>
            <ProfileHeader />
            <MyPixIsTo />
            <SinglePublishersFilter action={'profile'} list={listProfiles} trackProfile={'/profile/'}/>
            <button type='button' className='bg-white border-0 p-1'>Save recommendation</button>
            <ShareProfile action={'share-profile'}/>
            {/* <AuthorInfoDiv list={listProfiles}/> */}
            <Niches />
            <BookSimilar list={listProfiles} title={'publisher'}/>
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

export default ImaSpaceRestricted
