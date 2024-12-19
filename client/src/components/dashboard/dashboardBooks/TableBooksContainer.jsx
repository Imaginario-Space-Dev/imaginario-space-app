import React from 'react'
import styled from 'styled-components'
import {DashboardTable} from '../../index'

const TableBooksContainer = ({list, content, platform, selectedList, setSelectedList, newPost, setNewPost, itemName}) => {

    const headers =  content === 'book' ? 
    ["Item", "Title", "Author", "Created By"] : 
    content === 'course' ? 
    ["Item", "Title", "Author", "Created By"] : 
    content === 'user' ?
    ["Item", "Name", "Role", "Status", "Visibility"] :
    content === 'collaboration' ?
    ["Item", "Title", "author", "Status"] :
    content === 'violation' ?
    ["Item", "Reporter", "Reported", "Display" ,"Created"] :
    content === 'incident' ?
    ["Item", "Short Desc", "Status", "Created"] :
    ["Id", "Content", "rating", "Names", "Season"]

    const rows = content === 'book' ? 
    ["book", 'title', 'author', ['createdBy', 'username']] :  
    content === 'course' ? 
    ["course", 'title', 'author', ['createdBy', 'username']] :  
    content === 'user' ? 
    ["user", 'username', 'role', 'status', 'visibility'] :
    content === 'collaboration' ? 
    ["collab", 'title', 'author', 'status'] :
    content === 'violation' ? 
    ['violation', ['reporterUserId', 'username'] , 'violationContent', 'display', 'createdAt'] :
    content === 'incident' ?
    ["incident", "shorDesc", "status", 'createdAt'] :
    ['id', 'contentType', 'rating', 'title', "season"]

  return (
    <Wrapper>
    <DashboardTable headers={headers} 
    populate={list ? list : []} 
    rows={rows}
    platform={platform}
    selectedList={selectedList}
    setSelectedList={setSelectedList}
    newPost={newPost}
    setNewPost={setNewPost}
    itemName={itemName}
    content={content}
    />
    
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

export default TableBooksContainer
