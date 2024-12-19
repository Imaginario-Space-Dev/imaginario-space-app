import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const BlogSliderItem = ({item}) => {
    const {id, url, title, image, desc} = item
  return (
    <Wrapper>
        <Link to={url + id} className='blog-item'>
        <img src={image} alt={title}/>
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
                            <span className='align-self-center'>17, June 2024</span>

                        </div>
                    </div>
              
        </Link>
    </Wrapper>)
}

const Wrapper = styled.main`

.blog-item{
    img{
        height: 100px;
        width: 90%;
        border-top-left-radius: var(--borderRadius);
        border-top-right-radius: var(--borderRadius);
    }
    .details{
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 90%;
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
        span{
            color: var(--color-9);
        }
    }
    }

}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.blog-item{
    /* height: 400px; */
    
    img{
        height: 200px;
        
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
                height: 40px;
                width: 40px;
            }
        }
        span{
            font-size: 12px;
        }
    }
    }
}

}
/* Large devices (desktops) */
@media (max-width: 991px) {
.blog-item{
    height: 400px;
    img{
        height: 200px;
        width: 95%;
        
    }
    .details{
        height: 240px;
        width: 95%;
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
.blog-item{
    height: 400px;
    img{
        height: 200px;
        width: 50%;
    }
}
}

@media (max-width: 576px) {
.blog-item{
    height: 400px;
    img{
        height: 200px;
        width: 350px;
    }
}
}

@media (max-width: 366px) {
}
`

export default BlogSliderItem
