import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'
import {SelectsVideo, TextAreasVideo,InputsVideo} from '../../index'
import {useParams, useLocation, useSearchParams} from 'react-router-dom';

import {list} from '../../../data/carousel'

const DashboardSingleViolationReport = ({currentUser, FetchedData}) => {
  const [loadingSave, setLoadingSave] = useState(false);

  const [newPost, setNewPost] = useState({
    desc: '',
    reason: '',
    type: '',
    status: '',
    display: ''
})

const getPost = (e) => {
    setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))
  }

  const handleSave = async (id) => {
        
    if (loadingSave === true) return; // Prevent multiple clicks
  
    setLoadingSave(true);
    
    try {
      const res = await axiosInstance.put(`/violations/${id}`, newPost);
      setNewPost(res?.data?.data)
      setLoadingSave(false);
      toast.success('Upload Successfully!')
  
    } catch (error) {
      console.error('Error saving book:', error?.response?.data?.error || error);
      setLoadingSave(false);
      toast.error(error?.response?.data?.error || error?.message)
    }
  };
  

  // CANCEL BUTTON
  const handleCancel = (action) => {

      return setNewPost({
        desc: FetchedData?.data?.desc,
        reason: FetchedData?.data?.reason,
        type: FetchedData?.data?.type,  
        status: FetchedData?.data?.status, 
        display: FetchedData?.data?.display
    })
}
  useEffect(() => {
    setNewPost({
    desc: FetchedData?.data?.desc,
    reason: FetchedData?.data?.reason,
    type: FetchedData?.data?.type,  
    status: FetchedData?.data?.status, 
    display: FetchedData?.data?.display
    })
  }, [ , FetchedData])

  console.log(FetchedData?.data)
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      <div className='d-flex justify-content-center align-items-center'>
      <span className=''>ID 25363</span>
      </div>
      <div className='action-btn'>
        <button type='button' onClick={() => handleSave(FetchedData?.data?._id)}>Save</button>
        <button type='button' className='mx-3' onClick={handleCancel}>Cancel</button>
      </div>
      </div>

      <h2 className='m-0 my-2 text-dark'>Violation Report</h2>
      <div className='inputs'>
        <SelectsVideo text={'Status'} inputId={'status'} OnOff={false} currentUser={currentUser} 
        selectItems={["pending", "resolved", "progress"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Type'} inputId={'type'}
        selectItems={["book", "course", "user", "blog"]} newPost={newPost} getPost={getPost}/>

        <SelectsVideo text={'Display'} inputId={'display'}
        selectItems={["Yes", "No"]} newPost={newPost} getPost={getPost}/>  

        <InputsVideo text={'Reason'} inputId={'reason'} newPost={newPost} getPost={getPost}/>
      </div>

      <TextAreasVideo text={'Description'} inputId={'desc'} newPost={newPost} getPost={getPost} editor={false}/>

      <h4 className='mt-3 text-black'>Reporter</h4>
      <div className='inputs'>
        <InputsVideo text={'Name'} inputId={'username'} newPost={FetchedData?.data?.reporterUserId} getPost={getPost} disable={true}/>
        <div className='inputs'>
        <InputsVideo text={'Role'} inputId={'role'} newPost={FetchedData?.data?.reporterUserId} getPost={getPost} disable={true}/>
        <InputsVideo text={'ID'} inputId={'_id'} newPost={FetchedData?.data?.reporterUserId} getPost={getPost} disable={true}/>
      </div>
      </div>

      <h4 className='mt-3 text-black'>Reportered</h4>
      <div className='inputs'>
        <InputsVideo text={FetchedData?.data?.reportedUserId ? 'Name' : 'Title'} inputId={FetchedData?.data?.reportedUserId ? 'username' : 'title'} 
        newPost={FetchedData?.data?.reportedBookId ? FetchedData?.data?.reportedBookId :
          FetchedData?.data?.reportedCourseId ? FetchedData?.data?.reportedCourseId :  
          FetchedData?.data?.reportedBlogId ? FetchedData?.data?.reportedBlogId : 
          FetchedData?.data?.reportedUserId ? FetchedData?.data?.reportedUserId : 
          ""
        } 
        getPost={getPost} disable={true}/>
        <div className='inputs'>
        <InputsVideo text={FetchedData?.data?.reportedUserId ? 'Role' : 'Author'} inputId={FetchedData?.data?.reportedUserId ? 'role' : 'author'} 
        newPost={FetchedData?.data?.reportedBookId ? FetchedData?.data?.reportedBookId :
          FetchedData?.data?.reportedCourseId ? FetchedData?.data?.reportedCourseId :  
          FetchedData?.data?.reportedBlogId ? FetchedData?.data?.reportedBlogId : 
          FetchedData?.data?.reportedUserId ? FetchedData?.data?.reportedUserId : 
          ""
        }
        getPost={getPost} disable={true}/>
        <InputsVideo text={'ID'} inputId={FetchedData?.data?.reportedUserId ? '_id' : 'createdBy'} 
          newPost={FetchedData?.data?.reportedBookId ? FetchedData?.data?.reportedBookId :
            FetchedData?.data?.reportedCourseId ? FetchedData?.data?.reportedCourseId :  
            FetchedData?.data?.reportedBlogId ? FetchedData?.data?.reportedBlogId : 
            FetchedData?.data?.reportedUserId ? FetchedData?.data?.reportedUserId : 
            ""
          }
        getPost={getPost} disable={true}/>
      </div>
      </div>


      <div className='inputs'>
        <InputsVideo text={'Creation Date'} inputId={'createdAt'} newPost={FetchedData?.data} getPost={getPost} disable={true} dataType={"date"}/>
        <InputsVideo text={'Update Date'} inputId={'updatedAt'} newPost={FetchedData?.data} getPost={getPost} disable={true} dataType={"date"}/>
      </div>

    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.create-book-container{
  .sections-containers{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
  .sections{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  }
  
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    span, select{
      border-radius: var(--borderRadius);
      background-color: var(--color-12);
      color: var(--color-1);
      padding: 2px 10px;
      font-size: 10px;
    }
  .action-btn{
    margin: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      border: none;
      border-radius: var(--borderRadius);
      padding: 2px 10px;
      background-color: var(--color-12);
      color: var(--color-1);
    }
    button:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}
  .inputs, .inputs4, .inputs5 {
    display: grid;
    
  }



  .add-link-div{
    display: flex;
    justify-content: end;
    align-items: end;
  .add-link{
    border: none;
    background-color: var(--color-12);
    color: var(--color-1);
    border-radius: var(--borderRadius);
    padding: 5px 10px;
    width: 100%;
  }
  .add-link:hover{
      background-color: var(--color-4);
      color: var(--color-1);
    }
  }
}

.language-select-div {

  select{
    width: 5rem;
    background-color: var(--color-6);
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.create-book-container{
  .inputs{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }

  .inputs4{
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
  }
  .inputs5{
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
  }
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.create-book-container{
  margin-bottom: 3rem;
  .inputs{
    grid-template-columns: repeat(2,1fr);
    gap: 20px;
  }
  .inputs4{
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
  }
  .inputs5{
    grid-template-columns: repeat(5,1fr);
    gap: 20px;
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.create-book-container{
  .inputs, .inputs4, .inputs5 {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }

  .add-link-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  .add-link{
    padding: 5px 10px;
    width: 80%;
  }
}
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardSingleViolationReport
