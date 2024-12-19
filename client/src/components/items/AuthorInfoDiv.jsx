import React from 'react'
import styled from 'styled-components'

const AuthorInfoDiv = ({list}) => {
     // Check if fetched data exists
  const {title, desc, contentType, chapterList, coverImage } = list
  return (
    <Wrapper>
    <div className='author-info d-flex flex-column justify-content-center align-item-center'>
        <div className='author-info-det'>
        <p className='mb-3'>{desc}</p>
        <img src={coverImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${coverImage?.name}`}/>
        <p>{list[0].title}</p>
        <p>Prossional Accountant</p>
        {/* <button type='button' className='mt-2'>Connect</button> */}
        </div>
    </div>
    </Wrapper>
    )
}

const Wrapper = styled.div`
.author-info {
    margin-top: 1rem;
    margin-bottom: 1rem; 
    padding: 10px;
    background-color: var(--color-12);
    border-radius: var(--borderRadius);
    .author-info-det {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        P{
            margin: 0px;
        }
    }
    
    img{
        border-radius: 50%;
        object-fit: cover;
}
button{
        background-color: var(--color-1);
        padding: 2px 10px;
        border: none;
        border-radius: var(--borderRadius);
        color: var(--color-2);
    }

    button:hover{
        background-color: var(--color-4);
        border-radius: var(--borderRadius);
        color: var(--color-1);
    }
}

/* Large devices (desktops) */
@media (min-width: 991px) {
.author-info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .author-info-det {
        width: 40%;
    }

    img{
        height: 60px;
        width: 60px;
}
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.author-info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .author-info-det {
        width: 70%;
    }

    img{
        height: 70px;
        width: 70px;
}
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.author-info {
    .author-info-det {
        width: 100%;
    
    }

    img{
        height: 60px;
        width: 60px;
}
}

}
`

export default AuthorInfoDiv
