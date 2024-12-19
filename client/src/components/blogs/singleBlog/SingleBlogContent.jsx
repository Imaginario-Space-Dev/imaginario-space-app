import React from 'react'
import styled from 'styled-components'

const SingleBlogContent = ({list}) => {
    const { text, section} = list[0].blogContent[0]
  return (
    <Wrapper>
    <div className='content-container'>
        <p className=''>{text}</p>
            {section.map((i, index) => {
                const {title, text, image} = i
                return(
                    <div key={index} className='blog-section'>
                        <h3>{title}</h3>
                        <img src={image} alt='img-blog'/>
                        <p className='my-3'>{text}</p>
                    
                    </div>
                )
            })}
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.content-container{
    p{
        color: var(--color-9);
    } 
    .blog-section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h3{
            color: var(--color-2);
        }
        img{
            object-fit: cover;
        } 
        p{
            color: var(--color-9);
        } 
    }
}
@media (min-width: 991px) {
.content-container{
    p{
        font-size: 20px;
    } 
    .blog-section{
        h3{
            
        }
        img{
            height: 300px;
            width: 100%;
        }  
        p{
            font-size: 20px;
        }
    }
}
}
@media (max-width: 991px) {
.content-container{
    p{
        font-size: 20px;
    } 
    .blog-section{
        h3{
            
        }
        img{
            height: 300px;
            width: 100%;
        }  
        p{
            font-size: 20px;
        }
    }
    }
}
/* Medium devices (tablets) */
@media (max-width: 767px) {
.content-container{
    p{
        font-size: 15px;
    } 
    .blog-section{
        h3{
            
        }
        img{

        }  
        p{
            font-size: 15px;
        }
    }
    
}
}
`

export default SingleBlogContent
