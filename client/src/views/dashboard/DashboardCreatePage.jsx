import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {DashboardCreateElement} from '../../components/index'
import {UseGeneralContext} from '../../mainIndex'
import useFetch from '../../fetch/useFetch' 
import {useLocation, useParams} from 'react-router-dom';

const DashboardCreatePage = () => {
  const { isDashboardCreateElement } = UseGeneralContext()
  const location = useLocation();
  const path = location.pathname.split("/")[2]
  // const { id } = useParams();
  // const {data: FetchedData} = useFetch(`/${path}/${id}`)

  return (
    <Wrapper>
    <div className='dashboard-page p-4'>
      <DashboardCreateElement path={path} createElement={isDashboardCreateElement}/>
      
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

export default DashboardCreatePage

