import React from 'react'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom';
import {DashboardSingleBlogStats, DashboardSingleBookStats, DashboardSingleCourseStats
} from '../index'

const StatsSingleElement = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[3]

    // useEffect(() => {
    //     path === 'dashboard' ?  openDashboard() : closeDashboard()
    // }, [path])

  return (
    <Wrapper>
    {path == 'book' && <DashboardSingleBookStats />}
    {path == 'blog' && <DashboardSingleBlogStats />}
    {path == 'course' && <DashboardSingleCourseStats />}
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

export default StatsSingleElement
