import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {FilmsHomeContainer} from '../index'

const CategorySlider = ({list, content, option1, option2, option3, option4, setUrl}) => {


        
    const [data, setFilms] = useState()
    const [active, setActive] = useState(1)     

            // console.log(list)
    const click = (option, clickActive) => {   
        setActive(clickActive)
        setFilms(list?.filter(item => item[`${option}`]?.display === true 
            // && (new Date > new Date(item[`${option}`]?.displayPeriodStart) && 
            // new Date < new Date(item[`${option}`]?.displayPeriodEnd))
        )
            .sort((a, b) => a[`${option}`]?.position - b[`${option}`]?.position)
        )
    }

    useEffect(() => {
        setActive(1)
        setFilms(list?.filter(item => item[`${option1}`]?.display === true 
            // && (new Date > new Date(item[`${option1}`]?.displayPeriodStart) &&
            //  new Date < new Date(item[`${option1}`]?.displayPeriodEnd))
            ).sort((a, b) => a[`${option1}`]?.position > b[`${option1}`]?.position))
    }, [, list])
  return (
    <Wrapper>
    <div className='home-data-content'>
    <div className='home-data-categ d-flex justify-content-start align-items-center mb-2'>
    <h3 className='category-1-title my-0 p-0'>
    {content == 'books' ? 'Books' :
    content == 'publishers' ? 'Publishers' :
    content == 'blogs' ? 'Blogs' :
    content == 'user' ? 'Spaces' :
    content == 'courses' ? 'Courses' : content
    }
    </h3>
    <div className='option-buttons'>
    <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click(option1, 1)}>Recommeded</button>
    <button className={active ===  2 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' } 
    onClick={() => click(option2, 2)}>Best of the Week</button>
    <button className={active ===  3 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click(option3, 3)}>Top 10</button>
    <button className={active ===  4 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click(option4, 4)}>Popular</button>
    </div>
    </div>

    <FilmsHomeContainer films={data} setUrl={setUrl} />

    </div>
    </Wrapper>
    )
}

const Wrapper = styled.div`
.home-films-content {
}

.home-films-categ {
    height: 4rem;
}

.category-1-title {
    margin-right: 30px;
    color: var(--color-1);
}

.category-1-btn {
    margin-right: 30px;
    background-color: transparent;
    color: var(--text-color-1);
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 5px;
    border: solid 1.5px var(--color-10);
    border-radius: var(--borderRadius);
    background-color: var(--color-2);
    transform: var(--transition);
}

.category-1-btn-active {
    border: solid 1.5px var(--color-4);

}

/* FOR TABLETS AND MOBILE */
@media only screen and (max-width: 991px) {
.home-films-content {

}

.category-1-title {
    margin-right: 20px;
}

.category-1-btn {
    margin-right: 5px;
}
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
.option-buttons{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    width: 100%;
}

.film-item {
    height: 34vw !important;
    width: 22vw !important;
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
    width: 42vw !important;
}

.title {
    font-size: 3vw;
}

.films-details  {
    font-size: 8px;
}
}
`

export default CategorySlider
