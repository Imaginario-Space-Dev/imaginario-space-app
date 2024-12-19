import React from 'react'
import styled from 'styled-components'
import {FilmFilter, SuggestContent, Filter1} from '../index'


const Courses = ({setUrl}) => {
  // console.log()
  return (
    <Wrapper>
    <div className='filmFilter'>
      <div className='marginLR mb-3'>
      {/* <FilmFilter content={'books'}/> */}
      <Filter1 content={'course'} mainUrl={"/courses?"} modelUrl={'/courses'} 
      option1={"recommendedCourse"} option2={"courseOfTheWeek"} option3={"courseTop10"} option4={"coursePopular"} 
      setUrl={setUrl}/>

      </div>

      <div className='suggestContent'>
      <SuggestContent />
      </div>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.suggestContent {
  background: var(--grey-800);
}
.filmFilter {
  margin-top: 6rem;
}

@media (min-width: 991px) {
.marginLR{
  margin-left: 60px;
  margin-right: 60px;
}
}

@media (max-width: 991px) {
.marginLR{
  margin-left: 20px;
  margin-right: 20px;
}
}

@media (max-width: 767px) {
.filmFilter{
  margin-top: 7rem;
}
}
`

export default Courses
