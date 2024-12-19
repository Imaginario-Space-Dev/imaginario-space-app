import React from 'react'
import styled from 'styled-components'
import {listPublishers} from '../../../data/carousel'
import {DashboardFilterBooks} from '../../index'

const PlatformPublisherData = () => {
  return (
    <Wrapper>
  <div className='Platform-books'>

  <div className='header d-flex justify-content-start mt-3'>
    <h3>Background image</h3>
  </div>
  <DashboardFilterBooks data={listPublishers} platform={true} />

  <div className='header d-flex justify-content-start mt-3'>
    <h3>Recommended</h3>
  </div>
  <DashboardFilterBooks data={listPublishers} platform={true} />


  <div className='header d-flex justify-content-start mt-3'>
    <h3>Book of the Week</h3>
  </div>
  <DashboardFilterBooks data={listPublishers} platform={true} />

  <div className='header d-flex justify-content-start mt-3'>
    <h3>Top 10</h3>
  </div>
  <DashboardFilterBooks data={listPublishers} platform={true} />

  <div className='header d-flex justify-content-start mt-3'>
    <h3>Popular</h3>
  </div>
  <DashboardFilterBooks data={listPublishers} platform={true} />

</div>
</Wrapper>)
}

const Wrapper = styled.main`
.Platform-books{
.header{
h3{
  color: var(--color-2);
}
}
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

export default PlatformPublisherData
