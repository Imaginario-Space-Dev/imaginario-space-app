import React from 'react'
import styled from 'styled-components'
import {DashboardCard2} from '../index'

const DashboardCardContainer2 = ({title, populate, arr, section}) => {
  return (
    <Wrapper>
    {title && <h3 className='mt-3'>{title}</h3>} 
    <div className="row">
       
        {title == 'Content Request' &&
        <>
        {arr.map((item, index) => {
             const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage  } = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard2 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        </>
        }

        {title == 'Violetion Reports' &&
        <>
        {arr.map((item, index) => {
             const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage  } = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard2 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        </>
        }

        {title == 'Incidents' &&
        <>
        {arr.map((item, index) => {
             const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage  } = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard2 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        </>
        }

        {section  &&
        <>
        {arr.map((item, index) => {
            const {cardTitle, icon, FetchedData, currentMonth,
                prevMonth, dataDifference, dataPercentage  } = item
            return(
                <div key={index} className="col-lg-3 col-md-6">
                <DashboardCard2 cardTitle={cardTitle}  populate={populate} icon={icon} FetchedData={FetchedData}
                currentMonth={currentMonth} prevMonth={prevMonth}
                dataDifference={dataDifference} dataPercentage={dataPercentage}/>
            </div>
            )
        })}
        </>
        }
    </div>
    </Wrapper>
    )
}

const Wrapper = styled.main`
h3{
    color: var(--color-9);
}
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

export default DashboardCardContainer2
