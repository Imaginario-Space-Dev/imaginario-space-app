import React from 'react'
import styled from 'styled-components'
import {DashboardUsersProfile} from '../../../components/index'
import useFetch from '../../../fetch/useFetch' 

const DashboardUsersProfilePage = () => {
  const {data: FetchedData} = useFetch(`/users`)
  return (
    <Wrapper>
    <div className='dashboard-page p-4'>
      <DashboardUsersProfile setUrl={'/users/'} FetchedUsers={FetchedData}/>
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.dashboard-page{

}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.dashboard-page{
  max-height: calc(100vh - 3rem);
  overflow-y: scroll;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.dashboard-page{
  margin-top: 2rem;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardUsersProfilePage

