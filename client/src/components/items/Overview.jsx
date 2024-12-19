import React from 'react'
import styled from 'styled-components'

const Overview = ({list}) => {

    // Check if fetched data exists
  if (!list) return <p>Loading...</p>;
    const {authorName, author, title, category, genre, targetAudience,
        desc, language, conbuy, contentType } = list
  return (
    <Wrapper>
    <div className='overview'>
        <h3>{title}</h3>
        <p>Author: {authorName || author}</p>
        {contentType === 'book' && <>
            <p>Category: {category}</p>
            <p>Genre: {genre?.length > 0 ? genre?.join(', ') : genre}</p>
        </>}
        {/* <p>Skill Level: All levels</p> */}
        <p>Target Audience: {targetAudience?.length > 0 ? targetAudience?.join(', ') : targetAudience}</p>
        <p>Language: {language?.length > 0 ? language?.join(', ') : language}</p>
        <p className='my-3'>Description</p>

        <p><div dangerouslySetInnerHTML={{ __html: desc }} /></p>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.overview {
    p{
        margin: 0;
    }
}
/* Large devices (desktops) */
@media (min-width: 991px) {
.overview {
    width: 40%;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}
`

export default Overview
