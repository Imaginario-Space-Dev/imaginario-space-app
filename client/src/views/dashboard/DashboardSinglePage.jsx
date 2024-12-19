import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom';
import {DashboardSingleElement} from '../../components/index'
import useFetch from '../../fetch/useFetch' 
import {useLocation} from 'react-router-dom';

const DashboardSinglePage = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2]
  const { userId } = useParams();
  const {data: FetchedData} = useFetch(`/${path}/${userId}`)
  
  return (
    <Wrapper>
    <div className='dashboard-page p-4'>
      <DashboardSingleElement FetchedData={FetchedData} path={path}/>
      
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

export default DashboardSinglePage

