import React from 'react'
import styled from 'styled-components'


const DashboardCard1 = ({content, populate, cardTitle, icon, FetchedData, currentMonth,
  prevMonth, dataDifference, dataPercentage}) => {
  return (
    <Wrapper className="card my-2">
				{/* <div className="card my-2"> */}
					<div className="card-body">
						<div className="row">
							<div className="col mt-0">
								<h3 className="card-title">{cardTitle}</h3>
							</div>
						</div>
						<h1 className="mt-1 mb-3">{FetchedData}</h1>
            <div className='d-flex justify-content-between '>
            <span className=''>
            <span className=' text-muted'>Curr</span>
            <span className='last-month mx-2'>{currentMonth}</span>
            </span>
            <span className=''>
            <span className='text-muted'>Prev</span>
            <span className='last-month mx-2'>{prevMonth}</span>
            </span>
            </div>
						<div className="mb-0 d-flex justify-content-between">
              <span>
							<span className={dataDifference === 0 ? "text-muted" : 
                dataDifference > 0 ? "text-success" : 
                dataDifference < 0 ? "text-danger" : "here"}>
                  {dataDifference = 0 ? dataDifference : dataDifference > 0 ? `+${dataDifference}` : dataDifference < 0 ? `${dataDifference}` : undefined} {" "}
                  {dataPercentage = 0 ? dataPercentage : dataPercentage > 0 ?`+${dataPercentage}` : dataPercentage < 0 ? `${dataPercentage}` : undefined}% </span>
							<span className="text-muted">This month</span>
            </span>
              <i className="">
                {icon}
                </i>
						</div>
					</div>
				{/* </div> */}
    </Wrapper>)
}

const Wrapper = styled.main`
.card{
  border: 1px solid var(--color-5);
}

h3, h1, .last-month {
  color: var(--color-9);
}

i{
    color: var(--color-12);
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

export default DashboardCard1
