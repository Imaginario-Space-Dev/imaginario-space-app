import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {FilmsTest} from '../index'
import useWindowResize from '../../hooks/useWindowResize'

const CourseList = ({films}) => {
    const {width} = useWindowResize()
    // console.log(width)
 return (
    <Wrapper>
    <div className='films-container'>
        {films.map((item) => {
          const { id, url } = item;
          return (
            <Link to={url + id}  key={id} className='film'>
            <FilmsTest film={{...item}}/>
         </Link>
          );
        })}
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.films-container {
    margin: 0;
    display: grid;
    width: 100%;

}

.film {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {
.films-container{
    grid-template-columns: repeat(8,1fr);
}
.film {
    height: 18.5vw !important;
    width: 100% !important;  
}
}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {
.films-container{
    grid-template-columns: repeat(6,1fr);
}
.film {
    height: 18.5vw !important;
    width: 100% !important;  
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.films-container{
    grid-template-columns: repeat(5,1fr);
}
.film {
    height: 25.5vw !important;
    width: 100% !important;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.films-container{
  grid-template-columns: repeat(4,1fr);
}
.film {
    height: 35.5vw !important;
    width: 100% !important;
} 
  }


@media (max-width: 575px) {
.films-container{
  grid-template-columns: repeat(2,1fr);
}
.film {
    height: 50.5vw !important;
    width: 100% !important;
} 
}

@media (max-width: 366px) {
.films-container{
    grid-template-columns: repeat(2,1fr);
}
.film {
    height: 50.5vw !important;
    width: 100% !important;
    
} 
}
`

export default CourseList
