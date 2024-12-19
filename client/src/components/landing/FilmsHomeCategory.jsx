import React, { useState } from 'react'
import styled from 'styled-components'
import {FilmsHomeContainer} from '../index'

const FilmsHomeCategory = ({list, content}) => {
    const [films, setFilms] = useState(list)
    const [active, setActive] = useState(1)

    const click = (category, clickActive) => {
        setActive(clickActive)
        category == 'all' ? setFilms(list) :
        setFilms(list?.filter((item) => item.category_1 == category))
    }

  return (
    <Wrapper>
    <div className='home-films-content'>
    <div className='home-films-categ d-flex justify-content-start align-items-center mb-2'>
    <h3 className='category-1-title my-0 p-0'>
    {content == 'books' ? 'Books' :
    content == 'publishers' ? 'Publishers' :
    content == 'courses' ? 'Courses' : ''
    }
    </h3>
    <div className='option-buttons'>
    <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('all', 1)}>Recommeded</button>
    <button className={active ===  2 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' } 
    onClick={() => click('bookOfTheWeek', 2)}>Book of the Week</button>
    <button className={active ===  3 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('top10', 3)}>Top 10</button>
    <button className={active ===  4 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('popular', 4)}>Popular</button>
    </div>
    </div>

    <FilmsHomeContainer films={films}  />

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

export default FilmsHomeCategory
