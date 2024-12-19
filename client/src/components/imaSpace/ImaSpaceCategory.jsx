import React, { useState } from 'react'
import styled from 'styled-components'
import {FilmsList, FilteredDataList} from '../index'

const ImaSpaceCategory = ({list, content, setUrl, trackProfile, setCategoryData, imaUserId}) => {
    const [films, setFilms] = useState(list)
    const [active, setActive] = useState(2)

    const click = (category, clickActive) => {
        setActive(clickActive)
        setCategoryData(category)
        // category == 'all' ? setFilms(list) :
        // setFilms(list?.filter((item) => item.publiContent == category))
    }
// console.log(active)
  return (
    <Wrapper>
    <div className='home-films-content'>
    <div className='home-films-categ d-flex justify-content-start align-items-center mb-2'>
    <h3 className='category-1-title my-0 p-0'>
    {content == "single-publi-space" ? "My Materials" :  
    content == "single-space" ? "My Recommendations" : ''} 
    
    </h3>
    <div className='option-buttons'>
        {/* <div>My Recommendatios</div> */}
    {/* <button className={active ===  1 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('all', 1)}>All</button> */}
    <button className={active ===  2 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' } 
    onClick={() => click('course', 2)}>Books</button>
    <button className={active ===  3 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('book', 3)}>Courses</button>
    {/* <button className={active ===  4 ? 'category-1-btn category-1-btn-active' : 'category-1-btn ' }
    onClick={() => click('blog', 4)}>Blogs</button> */}
    </div>
    </div>
    <FilteredDataList films={list}  setUrl={setUrl} imaUserId={imaUserId}/>
    {/* <FilmsList films={list} trackProfile={trackProfile} setUrl={setUrl}/> */}
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
@media (min-width: 992px) {

}

/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

  }

@media (max-width: 576px) {

}
`

export default ImaSpaceCategory
