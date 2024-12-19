import React from 'react'
import styled from 'styled-components'
import {FilmFilter, SuggestContent, Filter1} from '../index'


const Films = ({setUrl}) => {
  // console.log()
  return (
    <Wrapper>
    <div className='filmFilter'>
      <div className='marginLR mb-3'>
      {/* <FilmFilter content={'books'}/> */}
      <Filter1 content={'book'} mainUrl={"/books?"} modelUrl={'/books'} 
      option1={"recommendedBook"} option2={"bookOfTheWeek"} option3={"bookTop10"} option4={"bookPopular"} 
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

export default Films
