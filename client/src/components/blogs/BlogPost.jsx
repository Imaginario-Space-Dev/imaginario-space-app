import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaBookmark} from 'react-icons/fa';

const BlogPost = ({id, image, title, desc, url }) => {
  return (
    <Wrapper>

    <div className='post-content '>
        <Link to={url}>
        <img src={image} className='img-post mb-3'/>
        </Link>
                    
                    <div className='details'>
                        <h4 className='m-0'>Mindset, Personal Developement</h4>
                        <div className='details-info'>
                        <h1>{title}</h1>
                        <p className='mb-4'>{desc}</p>
                        </div>
                        
                        <div className='author-date d-flex justify-content-between align-items-center'>
                            <div className='author-info d-flex'>
                            <img src={image} className='img-author'/>
                            <div className='d-flex flex-column mx-3 justify-content-center'>
                                <p className='author m-0'>Rogerio Kusuti</p>
                                <p className='author-roll m-0'>CEO and Founder</p>
                            </div>
                            </div>
                            <div>
                        <div className='blog-interact d-flex justify-content-end'> 
                        <select className='mx-2' >
                            <option>EN</option>
                            <option>PT</option>
                            <option>FR</option>
                            <option>ES</option>
                        </select>
                            <span><FaBookmark /></span>
                        </div>
                        <span className='align-self-center'>10 mins read | 17, June 2024</span>
                        </div>
                            {/* <span className='align-self-center'>17, June 2024</span> */}
                        </div>
                    </div>
                </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.post-content{
    display: flex;
    justify-content: start;
    flex-direction: column;
    transition: var(--transition);
    
    img{
        border-top-left-radius: var(--borderRadius);
        border-top-right-radius: var(--borderRadius);
    }

    .details{
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 100%;
        padding: 5px;
        h4{
            color: var(--color-2);
        }
        .details-info{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            h1{
                color: black;
                margin-bottom: 5px;
                font-weight: bold;
            }
            p{
            margin: 0;
            color: var(--color-9);
            
        }
        }
        .author-date{
            margin-top: auto;
            .author-info{
                img{
                border-radius: 50%;
                object-fit: cover;
            }
            div {
                    .author {
                        color: var(--color-2);
                        font-weight: bold;
                        
                    }
                    .author-roll {
                        color: var(--color-9);
                    }
                }
        }
        .blog-interact{
            span{
            color: var(--color-9);
            cursor: pointer;
        }
        span:hover{
            color: var(--color-4);
        }
        }
        
    }
    }
}

.post-content:hover{
    margin: 0px;
}
@media (min-width: 991px) {
.post-content{
    height: 500px;
    margin: 10px;
    img{
        height: 250px;
        width: 100%;
    }
    .details{
        height: 240px;
        h4{
        font-size: 14px;
    }
        .details-info{
            h1{
                font-size: 20px;
            }
            p{
                font-size: 16px;
        }

        }
        .author-date{
            .author-info{
            img{
                height: 60px;
                width: 60px;
            }
        }
        span{
            font-size: 14px;
        }
    }
    }
}
}


@media (max-width: 991px) {
.post-content{
    height: 400px;
    margin: 5px;
    border: 1px solid var(--color-6);
    border-radius: var(--borderRadius);
    img{
        height: 200px;
        width: 100%;
    }
    .details{
        height: 240px;
        h4{
        font-size: 10px;
    }
        .details-info{
            h1{
                font-size: 18px;
            }
            p{
                font-size: 12px;
        }

        }
        .author-date{
            .author-info{
            img{
                height: 40px;
                width: 40px;
            }
        }
        span{
            font-size: 10px;
        }
    }
    }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.post-container{

}
}
`

export default BlogPost
