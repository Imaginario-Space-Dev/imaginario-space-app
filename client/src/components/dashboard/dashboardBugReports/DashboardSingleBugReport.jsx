import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, InputNumber, AddedElement, TextAreasVideo, InputDateTimeVideo} from '../../index'
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'

const DashboardSingleBugReport = ({currentUser, FetchedData}) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [newPost, setNewPost] = useState({})
const getPost = (e) => {
  setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))
}

const handleSave = async (id) => {
      
  if (loadingSave === true) return; // Prevent multiple clicks 

  setLoadingSave(true);
  
  try {   
    const res = await axiosInstance.put(`/incidents/${id}`, newPost);
    setNewPost(res?.data?.data)
    setLoadingSave(false);
    toast.success('Upload Successfully!')

  } catch (error) {
    console.error('Error saving:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
};


// CANCEL BUTTON
const handleCancel = (action) => {

    return setNewPost({
      desc: FetchedData?.data?.desc,
      shorDesc: FetchedData?.data?.shorDesc,
      // StartDate: FetchedData?.data?.StartDate,
      status: FetchedData?.data?.status,  
      pendingReason: FetchedData?.data?.pendingReason, 
      resolution: FetchedData?.data?.resolution,
      type: FetchedData?.data?.type,
      display: FetchedData?.data?.display,
      priority: FetchedData?.data?.priority,
      // notes: FetchedData?.data?.notes,
      // access: FetchedData?.data?.access,
  })
}
useEffect(() => {
  setNewPost({
  desc: FetchedData?.data?.desc,
  shorDesc: FetchedData?.data?.shorDesc,
  // startDate: FetchedData?.data?.startDate,
  status: FetchedData?.data?.status,  
  pendingReason: FetchedData?.data?.pendingReason, 
  resolution: FetchedData?.data?.resolution,
  type: FetchedData?.data?.type, 
  display: FetchedData?.data?.display,
  priority: FetchedData?.data?.priority,
  // notes: FetchedData?.data?.notes,
  // access: FetchedData?.data?.access,
  })
}, [ , FetchedData])


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

      <h2 className='m-0 my-2 text-dark'>Incidents</h2>
      <InputsVideo text={'Title'} inputId={'shorDesc'} newPost={newPost} getPost={getPost} disable={true}/>
      <div className='inputs'>
      <div className='inputs'>
     <SelectsVideo text={'Type'} inputId={'type'}
        selectItems={["bug", "request", "task"]} newPost={newPost} getPost={getPost} disable={FetchedData?.data?.status === 'resolved'}/>
    <SelectsVideo text={'Priority'} inputId={'priority'} disable={FetchedData?.data?.status === 'resolved'}
        selectItems={["low", "medimun", "high","super-high"]} newPost={newPost} getPost={getPost}/>    
    </div>
      {newPost?.status === 'pending' ? 
        <div className='inputs'>
         <SelectsVideo text={'Status'} inputId={'status'} OnOff={false} currentUser={currentUser} disable={FetchedData?.data?.status === 'resolved'}
        selectItems={["created", "pending", "resolved", "progress"]} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Pending Reason'} inputId={'pendingReason'} newPost={newPost} getPost={getPost} disable={FetchedData?.data?.status === 'resolved'}/>
        </div> :
        <SelectsVideo text={'Status'} inputId={'status'} OnOff={false} currentUser={currentUser} disable={FetchedData?.data?.status === 'resolved'}
        selectItems={["created", "pending", "resolved", "progress"]} newPost={newPost} getPost={getPost} />
      }
       <SelectsVideo text={'Display'} inputId={'display'} disable={currentUser?.role !== 'admin' || FetchedData?.data?.status === 'resolved' }
        selectItems={["Yes", "No"]} newPost={newPost} getPost={getPost}/>
        <div className='inputs'>
        <InputsVideo text={'Created By'} inputId={'username'} newPost={FetchedData?.data?.createdBy} getPost={getPost} disable={true }/>
        <InputsVideo text={'Role'} inputId={'role'} newPost={FetchedData?.data?.createdBy} getPost={getPost} disable={true}/>
        </div>
      </div>

      <TextAreasVideo text={'Description'} inputId={'desc'} newPost={newPost} getPost={getPost} editor={false} disable={FetchedData?.data?.status === 'resolved'}/>
      {newPost?.status === 'resolved' &&  <TextAreasVideo text={'Resolution'} inputId={'resolution'} newPost={newPost} getPost={getPost} editor={false} disable={FetchedData?.data?.status === 'resolved'}/>}

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

export default DashboardSingleBugReport
