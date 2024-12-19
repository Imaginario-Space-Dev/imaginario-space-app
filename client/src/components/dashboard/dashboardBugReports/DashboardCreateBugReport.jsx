import React, { useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, TextAreasVideo, SelectsVideo} from '../../index'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'


const DashboardCreateBugReport = ({currentUser}) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const navigate = useNavigate()
  const [newPost, setNewPost] = useState({
    desc: '',
    shorDesc: '',
    status: 'created',  
    type: '', 
    display: true,
    priority: 'low',
    // notes: FetchedData?.data?.notes,
    // access: FetchedData?.data?.access,
  })

const getPost = (e) => {
  setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))
}
const handleSave = async () => {
      
  if (loadingSave === true) return; // Prevent multiple clicks 

  setLoadingSave(true);
  
  try {   
    const res = await axiosInstance.post(`/incidents`, newPost);
    setLoadingSave(false);
    navigate(`/dashboard/incidents/${res?.data?.data?._id}`)
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
      desc: '',
      shorDesc: '',
      status: 'created',  
      type: '',
      display: true,
      priority: 'low',
      // notes: FetchedData?.data?.notes,
      // access: FetchedData?.data?.access,
  })
}
console.log(newPost)
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      <div className='d-flex justify-content-center align-items-center'>
      <span className=''>ID 25363</span>
      </div>
      <div className='action-btn'>
        <button type='button' className='mx-3' onClick={handleSave}>Save</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </div>
      </div>

      <h2 className='m-0 my-2 text-dark'>Bug Report</h2>
      <InputsVideo text={'Title'} inputId={'shorDesc'} newPost={newPost} getPost={getPost}/>
      <div className='inputs'>
      <div className='inputs'>
     <SelectsVideo text={'Type'} inputId={'type'}
        selectItems={["bug", "request", "task"]} newPost={newPost} getPost={getPost}/>
      <SelectsVideo text={'Priority'} inputId={'priority'}
        selectItems={["low", "medimun", "high","super-high"]} newPost={newPost} getPost={getPost}/>  
      </div>
    
     <SelectsVideo text={'Status'} inputId={'status'} OnOff={false} currentUser={currentUser} disable={true}
        selectItems={["created"]} newPost={newPost} getPost={getPost} />
      
       <SelectsVideo text={'Display'} inputId={'display'} disable={currentUser?.role !== 'admin'}
        selectItems={["Yes", "No"]} newPost={newPost} getPost={getPost}/>
        <div className='inputs'>
        <InputsVideo text={'Created By'} inputId={'username'} newPost={currentUser} getPost={getPost} disable={true}/>
        <InputsVideo text={'Role'} inputId={'role'} newPost={currentUser} getPost={getPost} disable={true}/>
        </div>
      </div>

      <TextAreasVideo text={'Description'} inputId={'desc'} newPost={newPost} getPost={getPost} editor={false} />

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

export default DashboardCreateBugReport
