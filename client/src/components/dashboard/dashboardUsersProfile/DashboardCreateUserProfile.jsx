import React, { useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, TextAreasVideo,} from '../../index'
import {userCategoryList, userInterestedAreasyList} from '../../../utils/utils'
import {axiosInstance} from '../../../fetch/axiosConfig'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DashboardCreateUserProfile = ({currentUser}) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const navigate = useNavigate()
  const [newPost, setNewPost] = useState({
    username: '',
    spaceName: '',
    email: '',
    password: '',
    category: [],
    role: '',
    interestedAreas: [],
    language: [],
    visibility: 'hidden',
    status: 'pending',
})

const getPost = (e) => {
  const id = e.target.id;
  const value = e.target.value;
  // const type = e.target.type;

  if (e.target.multiple) {
    setNewPost((prev) => {
      if(id === 'interestedAreas') {
        const interestedAreas = [...prev.interestedAreas]; // Copy the existing array
      if (interestedAreas.includes(value)) {
        // If the option is already selected, remove it
        return {
          ...prev,
          [id]: interestedAreas.filter((item) => item !== value),
        };
      } else {
        // Otherwise, add it to the array
        return {
          ...prev,
          [id]: [...interestedAreas, value],
        };
      }
      } else if(id === 'category') {
        const category = [...prev.category]; // Copy the existing array
        if (category.includes(value)) {
          // If the option is already selected, remove it
          return {
            ...prev,
            [id]: category.filter((item) => item !== value),
          };
        } else {
          // Otherwise, add it to the array
          return {
            ...prev,
            [id]: [...category, value],
          };
        }
      }
    });
  } else  {

    setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))

  }
};

// HANDLE SAVE USER 
const handleSave = async () => {
      
  if (loadingSave === true) return; // Prevent multiple clicks 

  setLoadingSave(true);
  
  try {   
    const res = await axiosInstance.post(`/users`, newPost);
    setLoadingSave(false);
    navigate(`/dashboard/users/${res?.data?.data?._id}`)
    toast.success('Upload Successfully!')

  } catch (error) {
    console.error('Error saving:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
};
// CANCEL BUTTON
const handleCancel = () => {
    return setNewPost({
      username: '',
      spaceName: '',
      email: '',
      password: '',
      category: [],
      role: '',
      interestedAreas: [],
      language: [],
      visibility: 'hidden',
      status: 'pending',
  })
}
console.log(newPost)
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      <div className='action-btn'>
        <button type='button' className='mx-3' onClick={handleSave}>Save</button>
        <button type='button' onClick={handleCancel}>Cancel</button>
      </div>
      </div>
      
      <div className='inputs'>

      <InputsVideo text={'Name'} inputId={'username'} newPost={newPost} getPost={getPost} disable={false}/>
      <InputsVideo text={'@name'} inputId={'spaceName'} newPost={newPost} getPost={getPost} />

  
        <InputsVideo text={'Email'} inputId={'email'} newPost={newPost} getPost={getPost} dataType={'email'}/>
        <InputsVideo text={'Password'} inputId={'password'} newPost={newPost} getPost={getPost} dataType={'password'}/>


        <SelectsVideo text={'Role'} inputId={'role'}
        selectItems={currentUser?.role === 'admin' ? ['regular', 'publisher', 'editor', 'partner', 'collaborator', 'admin',
          'bookAgent', 'courseAgent', 'blogAgent', 'agent', 'vip','ceo' ] : ['regular', 'publisher', 'editor', 'partner', 'collaborator',
            'bookAgent', 'courseAgent', 'blogAgent', 'agent']} newPost={newPost} getPost={getPost} disable={currentUser?.role !== 'admin'}/>
        <SelectsVideo text={'Visibility'} inputId={'visibility'}
        selectItems={['hidden', 'show']} newPost={newPost} getPost={getPost}/>


        <SelectsVideo text={'Categories'} inputId={'category'} multipleOption={true} 
        selectItems={userCategoryList} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Areas you are interested in'} inputId={'interestedAreas'} multipleOption={true} 
        selectItems={userInterestedAreasyList} newPost={newPost} getPost={getPost}/> 
        
        
        <SelectsVideo text={'Status'} inputId={'status'} OnOff={false} currentUser={currentUser} disable={currentUser?.role !== 'admin'}
        selectItems={['pending', 'active', 'blocked']} newPost={newPost} getPost={getPost} />
         <SelectsVideo text={'Languages'} inputId={'language'} 
        selectItems={["EN","FR","PT", "ES"]} newPost={newPost} getPost={getPost}/>

        {!["publisher", "regular", "collaborator"].includes(currentUser?.role) && 
        <>
        <InputsVideo text={'Creation Date'} inputId={'creationDate'} newPost={{creationDate: new Date()}} disable={true} dataType={'date'}/>
        <InputsVideo text={'Created By'} inputId={'username'} newPost={{username: currentUser?.username}} disable={true}/>
        </>}
      
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
    justify-content: end;
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

export default DashboardCreateUserProfile
