import React from 'react'
import styled from 'styled-components'
import { FaStar } from 'react-icons/fa'
import {UseUserContext} from '../../mainIndex'


const Film = ({film}) => {
    const {currentUser} = UseUserContext()
    const {id, image, rating, title} = film;
    
 return (
    <Wrapper>
   <div className={!currentUser ? 'film-item film-item-blur border ' :'film-item'}
    >
        <img src={image} alt={title}  className={!currentUser ? 'film-img film-img-blur' : 'film-img'} />
            {/* <div className='top-10'>{id}</div> */}
            <div className='films-info w-100 border'>
                <div className='films-details-div border'>
                <h1 className='title m-0'>{title}</h1>
                <div className='films-details'>
                    <span className='m-0'>2023</span>
                    <span className='m-0 d-flex align-items-center'><FaStar className='mx-1'/> {rating}</span>
                    <span className='m-0'>1h:30</span>
                </div>  
                </div> 
            </div>
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`

.film-item {
    position: relative;
    display: flex;
    justify-content: center !important;
    align-items: center;
    transition: var(--transition);
    margin: 0;
    border-radius: var(--borderRadius);
}

.film-item-blur {
    /* border: solid 1px var(--color-5); */
}

.top-10 {
    position: absolute;
    top: 0;
    right: 0;
    height: 2rem;
    min-width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-7);
    color: var(--color-4);
    border-left: solid 1px var(--color-5);
    border-bottom: solid 1px var(--color-5);
    font-size: 30px;
    border-bottom-left-radius: var(--borderRadius);
}

.film-img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    /* opacity: 0.6; */
    border-radius: var(--borderRadius);
    
}

.film-img-blur {
    /* filter: blur(20px);
  -webkit-filter: blur(20px); */
}

.films-info {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    height: 10rem;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    background-image: linear-gradient(to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, .9),
    rgba(0, 0, 0, .8),
    rgba(0, 0, 0, .6),
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, 0)
);
}

.films-details-div {
    display: flex;
    flex-direction: column;
    align-self: self-end;
    width: 100%;
    
}

.title {
  /* font-size: 14px; */
  padding-bottom: 6px;
  color: var(--color-6)
}

.films-details  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    width: 100%;
}

.films-details > span {
    color: var(--color-5);
    
} 

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {
.film-item {
    height: 17vw !important;
    width: 10vw !important;
    
}

.film-item:hover {
    height: 17.5vw !important;
    width: 11vw !important;
}

.title {
    font-size: 1vw !important;
}

.films-details  {
    font-size: 11px;
}
}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {
.film-item {
    height: 17vw !important;
    width: 13.5vw !important;
}

.film-item:hover {
    height: 17.5vw !important;
    width: 14vw !important;
}

.title {
    font-size: 1.3vw;
}

.films-details  {
    font-size: 9px;
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.film-item {
    height: 24vw !important;
    width: 16vw !important;
}
.film-item:hover {
    height: 24.5vw !important;
    width: 16.5vw !important;
}

.title {
    font-size: 1.5vw;
}

.films-details  {
    font-size: 9px;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.film-item {
    height: 34vw !important;
    width: 22vw !important;
}

.film-item:hover {
    height: 34.5vw !important;
    width: 22.5vw !important;
}
.title {
    font-size: 1.9vw;
}

.films-details  {
    font-size: 8px;
}
  }

@media (max-width: 576px) {
.film-item {
    height: 48vw !important;
    width: 38vw !important;
}

.film-item:hover {
    height: 48.5vw !important;
    width: 38.5vw !important;
}

.title {
    font-size: 3vw;
}

.films-details  {
    font-size: 8px;
}
}

@media (max-width: 366px) {

.film-item {
    height: 48vw !important;
    width: 33.5vw !important;
}

.film-item:hover {
    height: 48.5vw !important;
    width: 34vw !important;
}
}

`

export default Film
