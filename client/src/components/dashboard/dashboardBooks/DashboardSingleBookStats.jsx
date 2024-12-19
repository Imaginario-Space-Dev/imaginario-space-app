import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";

const DashboardSingleBookStats = () => {
  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Views",
      icon: <FaEye />,
    },
    {
      cardTitle: "Click on Book",
      icon: <FaBook />,
    },
    {
      cardTitle: "Click on Buy",
      icon: <FaPlay />,
    },
    {
      cardTitle: "Click On Share",
      icon: <FaMicroblog />,
    },
    {
      cardTitle: "Click On CL",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "In Cart",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "In Saved",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Liked",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Categories",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "Avarage Page",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "Languages",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Reported",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Recommended",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "of the month",
      icon: <FaUserEdit />,
    },
    {
      cardTitle: "Top 10",
      icon: <FaHandshake />,
    },
    {
      cardTitle: "Popular",
      icon: <FaHandshake />,
    },
  ]
  return (
    <Wrapper>
    <div className='dashboard-books'>
      <DashboardCardContainer populate={populate} section={true} 
      cardTitle1={populate[1].cardTitle}  icon1={populate[1].icon} 
      cardTitle2={populate[2].cardTitle}  icon2={populate[2].icon} 
      cardTitle3={populate[3].cardTitle}  icon3={populate[3].icon} 
      cardTitle4={populate[4].cardTitle}  icon4={populate[4].icon} 
      
      />

      <h2 className='text-dark'>Chart</h2>
      
      <DashboardCardContainer2 populate={populate} 
      cardTitle1={populate[5].cardTitle}  icon1={populate[5].icon} 
      cardTitle2={populate[6].cardTitle}  icon2={populate[6].icon} 
      cardTitle3={populate[7].cardTitle}  icon3={populate[7].icon} 
      cardTitle4={populate[8].cardTitle}  icon4={populate[8].icon} 
      />

      <DashboardCardContainer2 populate={populate} 
      cardTitle1={populate[9].cardTitle}  icon1={populate[9].icon} 
      cardTitle2={populate[10].cardTitle}  icon2={populate[10].icon} 
      cardTitle3={populate[11].cardTitle}  icon3={populate[11].icon} 
      cardTitle4={populate[12].cardTitle}  icon4={populate[12].icon}
      />

<DashboardCardContainer2 populate={populate} 
      cardTitle1={populate[13].cardTitle}  icon1={populate[13].icon} 
      cardTitle2={populate[14].cardTitle}  icon2={populate[14].icon} 
      cardTitle3={populate[15].cardTitle}  icon3={populate[15].icon} 
      cardTitle4={populate[16].cardTitle}  icon4={populate[16].icon}
      />


    </div>
    </Wrapper>)
}

const Wrapper = styled.main`

/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {
.dashboard-books{
  padding-bottom: 4rem;
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

export default DashboardSingleBookStats
