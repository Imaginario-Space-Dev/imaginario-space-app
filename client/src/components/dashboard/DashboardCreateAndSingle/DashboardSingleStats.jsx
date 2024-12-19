import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import {DashboardSingleBookStats, DashboardSingleCourseStats, DashboardSingleBlogStats } from '../../index'


const DashboardSingleStats = () => {
  
  const location = useLocation();
  const path = location.pathname.split("/")[2]
  return (
    <Wrapper>
    {path == 'books' && <DashboardSingleBookStats />}
    {path == 'courses' && <DashboardSingleCourseStats />}
    {path == 'blogs' && <DashboardSingleBlogStats />}
    </Wrapper>)
}

const Wrapper = styled.main`

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

@media (max-width: 366px) {
}
`

export default DashboardSingleStats

