import React, {useState} from 'react'
import styled from 'styled-components'
import {BlogSliderElement} from '../index'

const BlogSliderContainer = ({list, content}) => {
  const [films, setFilms] = useState(list)
  const [active, setActive] = useState(1)

  const click = (category, clickActive) => {
      setActive(clickActive)
      category == 'all' ? setFilms(list) :
      setFilms(list?.filter((item) => item.category_1 == category))
  }

  return (
    <Wrapper>
    <div className='home-films-categ d-flex flex-column justify-content-center align-items-center mb-4 '>
        <h3 className='category-1-title my-3 p-0'>
        {content == 'popular-blogs' ? 'Popular' :
        content == 'mindset-blogs' ? 'Mindset' :
        content == 'Business-blogs' ? 'Business' : ''
        }
        </h3>
        <div className='option-buttons d-flex justify-content-center align-items-center'>
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

    <BlogSliderElement list={films}/>
    </Wrapper>)
}

const Wrapper = styled.main`
.home-films-categ {
    height: 5rem;

}

.option-buttons {
  width: 100%;
}

.category-1-title {
    margin-right: 10px;
    color: var(--color-2);
}

.category-1-btn {
    background-color: transparent;
    color: var(--text-color-1);
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 10px;
    padding: 5px;
    border: solid 1.5px var(--color-10);
    border-radius: var(--borderRadius);
    background-color: var(--color-12);
    transform: var(--transition);
}

.category-1-btn-active {
    border: solid 1.5px var(--color-4);

}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {

.category-1-title {
    
}

.category-1-btn {
    margin-right: 30px;
}


}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default BlogSliderContainer
