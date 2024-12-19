import React from 'react'
import styled from 'styled-components'
import {Niches, SingleBlogHeader, SingleBlogContent, BlogSliderContainer, BookSimilar} from '../../index'


const SingleBlog = ({list, trackProfile, TrackName}) => {
    
 return (
    <Wrapper>
        <div className='single-blogs'>
            <div className='single-blogs-div'>
            <SingleBlogHeader list={list} trackProfile={trackProfile} TrackName={TrackName}/>
            <SingleBlogContent list={list}/>
            {/* <BlogSliderContainer list={list} content={'popular-blogs'}/> */}
            <Niches />
            {/* <BookSimilar list={list}/> */}
            
            </div>
            
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.single-blogs{
    display: flex;
    justify-content: center;
    align-items: center;
}
@media (min-width: 991px) {
.single-blogs{
    margin-top: 6rem;
    margin-left: 120px;
    margin-right: 120px;
    
    .single-blogs-div {
        width: 70%;
    }

}
}


@media (max-width: 991px) {
    margin-top: 6rem;
    margin-left: 20px;
    margin-right: 20px;
    
}
    
`

export default SingleBlog
