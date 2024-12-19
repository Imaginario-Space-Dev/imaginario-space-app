import React from 'react'
import styled from 'styled-components'
import {LandingCarousel, BlogBody, BlogSliderContainer, BookSimilar} from '../index'
import {listBlogs} from '../../data/carousel'


const Blogs = () => {
    
 return (
    <Wrapper>
        <div className='blogs'>
            <LandingCarousel list={listBlogs}/>
            <BlogBody list={listBlogs}/>
            {/* <BlogSliderContainer list={listBlogs} content={'popular-blogs'}/> */}
            <BookSimilar list={listBlogs} contentType={'blog'} title={'Recommendation'}/>
            <BookSimilar list={listBlogs} contentType={'blog'} title={'Popular'}/>
            <BookSimilar list={listBlogs} contentType={'blog'} title={'Top 10'}/>
            
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.blogs{
    /* background-color: var(--color-1); */
}
@media (min-width: 991px) {
.blogs{
    margin-top: 6rem;
    margin-left: 120px;
    margin-right: 120px;
}
}


@media (max-width: 991px) {
    margin-top: 6rem;
    margin-left: 20px;
    margin-right: 20px;
    
}
    
`

export default Blogs
