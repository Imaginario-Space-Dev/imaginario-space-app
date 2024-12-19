import React from 'react'
import styled from 'styled-components'
import {DashboardTableHeader, DashboardTableRows} from '../index'

const DashboardTable = ({headers, populate, content, rows, action, platform, selectedList, setSelectedList, newPost, setNewPost, itemName}) => {
  return (
    <Wrapper>
    <table className="table table-striped border">
        <DashboardTableHeader headers={headers}/>
        <DashboardTableRows populate={populate} rows={rows} action={action} platform={platform}
        selectedList={selectedList}
        setSelectedList={setSelectedList} content={content}
        newPost={newPost}
        setNewPost={setNewPost}
        itemName={itemName}
        />
    </table>
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

export default DashboardTable
