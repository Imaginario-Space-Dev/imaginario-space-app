import React from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {DashboardCardContainer, DashboardCardContainer2, DashboardFilter, DashboardFilterBooks} from '../../index'
import { FaEye, FaPlay, FaBook, FaMicroblog, FaHandshake, FaUserEdit } from "react-icons/fa";
import {getLength, currentMonthProduct, lastMonthProducts, productDifference, getDifferencePercentage} from '../../../utils/dashboardCounts' 

const DashboardUsersProfile = ({setUrl, FetchedUsers}) => {
  

  const Publishers = FetchedUsers?.data?.filter(item => item.role === 'publisher')
  const Collaborator = FetchedUsers?.data?.filter(item => item.role === 'collaborator')
  const Regular = FetchedUsers?.data?.filter(item => item.role === 'regular')
  const Admin = FetchedUsers?.data?.filter(item => item.role === 'admin')
  const Agent = FetchedUsers?.data?.filter(item => item.role === 'agent')
  const BookAgent = FetchedUsers?.data?.filter(item => item.role === 'bookAgent')
  const CourseAgent = FetchedUsers?.data?.filter(item => item.role === 'courseAgent')
  const Actives = FetchedUsers?.data?.filter(item => item.status === 'active')
  const Pending = FetchedUsers?.data?.filter(item => item.status === 'pending')
  const Blocked = FetchedUsers?.data?.filter(item => item.status === 'blocked')
  const VisibilityHidden = FetchedUsers?.data?.filter(item => item.visibility === 'hidden')
  const VisibilityShow = FetchedUsers?.data?.filter(item => item.visibility === 'show')

  const populate = [
    {
      sub1: "CM",
      sub2: "PM",
      sub3: "Dif",
    },
    {
      cardTitle: "Users",
      icon: <FaEye />,
      FetchedData: getLength(FetchedUsers?.data),
      currentMonth: currentMonthProduct(FetchedUsers?.data),
      prevMonth: lastMonthProducts(FetchedUsers?.data),
      dataDifference: productDifference(currentMonthProduct(FetchedUsers?.data), lastMonthProducts(FetchedUsers?.data)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(FetchedUsers?.data), lastMonthProducts(FetchedUsers?.data))
    },
    {
      cardTitle: "Publishers",
      icon: <FaBook />,
      FetchedData: getLength(Publishers),
      currentMonth: currentMonthProduct(Publishers),
      prevMonth: lastMonthProducts(Publishers),
      dataDifference: productDifference(currentMonthProduct(Publishers), lastMonthProducts(Publishers)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Publishers), lastMonthProducts(Publishers))
    },
    {
      cardTitle: "Collaborators",
      icon: <FaPlay />,
      FetchedData: getLength(Collaborator),
      currentMonth: currentMonthProduct(Collaborator),
      prevMonth: lastMonthProducts(Collaborator),
      dataDifference: productDifference(currentMonthProduct(Collaborator), lastMonthProducts(Collaborator)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Collaborator), lastMonthProducts(Collaborator))
    },
    {
      cardTitle: "Regular",
      icon: <FaMicroblog />,
      FetchedData: getLength(Regular),
      currentMonth: currentMonthProduct(Regular),
      prevMonth: lastMonthProducts(Regular),
      dataDifference: productDifference(currentMonthProduct(Regular), lastMonthProducts(Regular)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Regular), lastMonthProducts(Regular))
    },
    {
      cardTitle: "Admins",
      icon: <FaHandshake />,
      FetchedData: getLength(Admin),
      currentMonth: currentMonthProduct(Admin),
      prevMonth: lastMonthProducts(Admin),
      dataDifference: productDifference(currentMonthProduct(Admin), lastMonthProducts(Admin)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Admin), lastMonthProducts(Admin))
    },

    {
      cardTitle: "Agents",
      icon: <FaHandshake />,
      FetchedData: getLength(Agent),
      currentMonth: currentMonthProduct(Agent),
      prevMonth: lastMonthProducts(Agent),
      dataDifference: productDifference(currentMonthProduct(Agent), lastMonthProducts(Agent)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Agent), lastMonthProducts(Agent))
    },

    {
      cardTitle: "Book Agents",
      icon: <FaHandshake />,
      FetchedData: getLength(BookAgent),
      currentMonth: currentMonthProduct(BookAgent),
      prevMonth: lastMonthProducts(BookAgent),
      dataDifference: productDifference(currentMonthProduct(BookAgent), lastMonthProducts(BookAgent)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(BookAgent), lastMonthProducts(BookAgent))
    },
    {
      cardTitle: "Course Agents",
      icon: <FaHandshake />,
      FetchedData: getLength(CourseAgent),
      currentMonth: currentMonthProduct(CourseAgent),
      prevMonth: lastMonthProducts(CourseAgent),
      dataDifference: productDifference(currentMonthProduct(CourseAgent), lastMonthProducts(CourseAgent)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(CourseAgent), lastMonthProducts(CourseAgent))
    },
    {
      cardTitle: "Active Users",
      icon: <FaHandshake />,
      FetchedData: getLength(Actives),
      currentMonth: currentMonthProduct(Actives),
      prevMonth: lastMonthProducts(Actives),
      dataDifference: productDifference(currentMonthProduct(Actives), lastMonthProducts(Actives)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Actives), lastMonthProducts(Actives))
    },
    {
      cardTitle: "Pending Users",
      icon: <FaHandshake />,
      FetchedData: getLength(Pending),
      currentMonth: currentMonthProduct(Pending),
      prevMonth: lastMonthProducts(Pending),
      dataDifference: productDifference(currentMonthProduct(Pending), lastMonthProducts(Pending)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Pending), lastMonthProducts(Pending))
    },
    {
      cardTitle: "Blocked Users",
      icon: <FaHandshake />,
      FetchedData: getLength(Blocked),
      currentMonth: currentMonthProduct(Blocked),
      prevMonth: lastMonthProducts(Blocked),
      dataDifference: productDifference(currentMonthProduct(Blocked), lastMonthProducts(Blocked)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(Blocked), lastMonthProducts(Blocked))
    },
    {
      cardTitle: "Visibility Hidden",
      icon: <FaHandshake />,
      FetchedData: getLength(VisibilityHidden),
      currentMonth: currentMonthProduct(VisibilityHidden),
      prevMonth: lastMonthProducts(VisibilityHidden),
      dataDifference: productDifference(currentMonthProduct(VisibilityHidden), lastMonthProducts(VisibilityHidden)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(VisibilityHidden), lastMonthProducts(VisibilityHidden))
    },
    {
      cardTitle: "Visibility Show",
      icon: <FaHandshake />,
      FetchedData: getLength(VisibilityShow),
      currentMonth: currentMonthProduct(VisibilityShow),
      prevMonth: lastMonthProducts(VisibilityShow),
      dataDifference: productDifference(currentMonthProduct(VisibilityShow), lastMonthProducts(VisibilityShow)),
      dataPercentage: getDifferencePercentage(currentMonthProduct(VisibilityShow), lastMonthProducts(VisibilityShow))
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

      {/* <DashboardFilterBooks createButtonUrl={'new-user-profile'} createButton={'New Book'} list={list}/> */}
      <DashboardFilter content={'user'} mainUrl={"/users?"} modelUrl={'/users'} setUrl={setUrl} collaborator={true} createButtonUrl={'new-user'} createButton={'New User'} list={list} />
      <DashboardCardContainer2 populate={populate} 
      arr={[populate[5], populate[6], populate[7], populate[8]] }
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} 
      arr={[populate[9], populate[10], populate[11], populate[12]]}
      section={true} 
      />

      <DashboardCardContainer2 populate={populate} 
      arr={[populate[13]]}
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

export default DashboardUsersProfile
