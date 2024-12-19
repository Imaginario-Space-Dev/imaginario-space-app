import React from 'react'
import styled from 'styled-components'

import {DashboardSingleUserProfile, DashboardSinglePublisher
} from '../index'

const EditSingleProfile = ({path, FetchedData, currentUser}) => {


    // useEffect(() => {
    //     path === 'dashboard' ?  openDashboard() : closeDashboard()
    // }, [path])
  
  return (
    <Wrapper>
    {/* {path == 'publishers' && <DashboardSinglePublisher />}
    {path == 'imaginario-spaces' && <DashboardSingleUserProfile/>} */}
    {path == 'my-space' && <DashboardSingleUserProfile FetchedData={FetchedData} currentUser={currentUser}/>}
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

export default EditSingleProfile
