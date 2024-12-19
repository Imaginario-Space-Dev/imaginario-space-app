import React from 'react'
import styled from 'styled-components'
import {listProfiles} from '../../data/carousel'
import {Filter1,  SuggestContent} from '../index'


const Profiles = () => {
  return (
    <Wrapper>
    <div className='filmFilter'>
      <div className='marginLR mb-3'>
      <Filter1 content={'user'} mainUrl={"/users?role=regular&role=collaborator&role=publisher&"}
      modelUrl={"/users?role=regular&role=collaborator&role=publisher&"} option1={"recommendedUser"} option2={"userOfTheWeek"} option3={"userTop10"} option4={"userPopular"}
      setUrl={'/imaginario-spaces/'}/>
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

export default Profiles
