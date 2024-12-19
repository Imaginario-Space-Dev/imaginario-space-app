import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import moment from 'moment';
import {selectedAddToListFuntion} from '../../utils/functions'
import { FaStar, FaBook, FaPlay, FaMicroblog, FaUserEdit, FaTasks, FaEdit, FaHandshake, FaUser, FaBug } from 'react-icons/fa'
import { RiGitPullRequestLine } from "react-icons/ri";

const DashboardTableRows = ({populate, content, rows, platform, selectedList, setSelectedList, newPost, setNewPost, itemName}) => {
    
    const AddToSelected = (newItem, e) => {
        // setSelectedList([...selectedAddToListFuntion(selectedList, item)])
        // let updatedArray = selectedList.unshift(newItem)
        if(platform){
            e.preventDefault()
        }
        
       
        // (!selectedList.includes(newItem) && selectedList?.length === 0) && setSelectedList([newItem])
        setSelectedList([{...newItem, itemName: itemName ? itemName : undefined}])
        setNewPost({...newPost, display: false, contentId: newItem?._id,  itemName: itemName ? itemName : undefined, updateItem: false})
    }
    // console.log(selectedAddToListFuntion(selectedList, item))
    // console.log(newPost)
    
  return (
    <tbody>
       {populate.map((item, index) => {
       const {contentType, createdBy, _id, url, reportedUserId, reportedBookId, reportedCourseId, type, createdAt} = item

       return(
        <tr key={index}>
            {rows.map((i, index) => {
            return(
                
            <td key={index}>
               <Link to={platform ? '#' : (content === 'book' || content === 'course') ? `/dashboard/${createdBy?._id}/${contentType}/${_id}` : 
                content === 'user' ? `/dashboard/${content}s/${_id}` : 
                content === 'violation' ? `/dashboard/${content}s/${_id}` : 
                content === 'incident' ? `/dashboard/${content}s/${_id}` : 
                undefined} 
               className='w-100 text-dark'
               onClick={(e) => AddToSelected(item, e)}>
                {
                    i === 'book' ? <FaBook /> :
                    i === 'user' ? <FaUser /> :
                    i === 'collab' ? <FaHandshake /> :
                    i === 'course' ? <FaPlay /> :
                    i === 'violation' ? type === 'book' ? <FaBook /> : type === 'user' ? <FaUser /> : type === 'course' ? <FaPlay /> : undefined :
                    i === 'incident' ? type === 'bug' ? <FaBug  /> : type === 'request' ? <RiGitPullRequestLine  /> : type === 'task' ? <FaTasks /> : undefined :
                    i === 'violationContent' ? reportedUserId ? reportedUserId?.username : reportedBookId ? reportedBookId?.title : reportedCourseId ? reportedCourseId?.title : undefined :
                    contentType === 'video' ? <FaPlay /> :
                    contentType === 'publisher' ? <FaUserEdit  /> :
                    contentType === 'blog' ? <FaMicroblog /> :
                    Array.isArray(i) ? item[`${i[0]}`][`${i[1]}`] : item[`${i}`] == false ? 'False' : item[`${i}`] == true ? 'True' :
                    (Date.parse(item[`${i}`])) ? moment(item[`${i}`]).format("YYYY-MM-DD HH:mm") : 
                    item[`${i}`]
                }
            
                </Link>
            </td>
           
            )
        
        })}
        {/* {(action == 'edit') &&  <td><Wrapper><button className='edit'><FaEdit /></button></Wrapper></td>} */}
        </tr>
       )
        })}

    
    </tbody>)
}

const Wrapper = styled.main`
button{
    background-color: transparent;
    border: none;
    svg{
        color: var(--color-8);
    }
    svg:hover{
        color: var(--color-4);
    }
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

export default DashboardTableRows


{/* <Link to={platform ? '#' : content === 'book' ? `/dashboard/${createdBy?._id}/${contentType}/${_id}` : 
content === 'user' ? `/dashboard/users-profile/${_id}` : undefined}  */}