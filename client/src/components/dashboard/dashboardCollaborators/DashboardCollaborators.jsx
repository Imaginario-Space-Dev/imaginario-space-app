import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilterBooks} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";

const DashboardCollaborators = () => {
  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Books",
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
      arr={[populate[1], populate[2], populate[3], populate[4]]}
      
      />

      <DashboardFilterBooks createButtonUrl={'new-collaborator'} createButton={'new Collaborator'} list={list}/>
      
      <DashboardCardContainer2 populate={populate} 
      arr={[populate[5], populate[6], populate[7], populate[8]] }
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} 
      arr={[populate[9], populate[10], populate[11], populate[12]]}
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} 
      arr={[populate[13], populate[14], populate[15], populate[16]]}
      section={true} 
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

export default DashboardCollaborators
