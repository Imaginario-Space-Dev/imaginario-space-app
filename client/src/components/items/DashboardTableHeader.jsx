import React from 'react'
import styled from 'styled-components'

const DashboardTableHeader = ({headers}) => {
  return (
    <thead>
        <tr>
            {headers.map((item, index) => 
            <th scope="col" key={index}>{item}</th>
            )}
        </tr>
  </thead>
    )
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

export default DashboardTableHeader
