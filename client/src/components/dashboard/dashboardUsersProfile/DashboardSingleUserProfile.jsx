import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, TextAreasVideo} from '../../index'
import {userCategoryList, userInterestedAreasyList} from '../../../utils/utils'
import {axiosInstance} from '../../../fetch/axiosConfig'
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

const DashboardSingleUserProfile = ({FetchedData, currentUser}) => {
  const [newPost, setNewPost] = useState({})
  const [profileImage, setProfileImage] = useState()
  const [editorData, setEditorData] = useState('');
  const [loadingSave, setLoadingSave] = useState(false);
  const { userId } = useParams();
  const [newPassReset, setNewPassReset] = useState({
    currentPassword: "",
    newPassword: "",
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

const getPasswordPost = (e) => {
  setNewPassReset((prev) => ({...prev, [e.target.id]: e.target.value} ))
}

const getProfileImage = (e) => {
  setProfileImage(e.target.files[0]);
}

// HANDLE USER UPDATE
const handleSave = async () => {
      
  if (loadingSave === true) return; // Prevent multiple clicks 

  setLoadingSave(true);
  
  try {   
    const res = await axiosInstance.put(`/users/${userId}`, newPost);
    setNewPost(res?.data?.data)
    setLoadingSave(false);
    toast.success('Upload Successfully!')

  } catch (error) {
    console.error('Error saving:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
};

// HANDLE USER PASSWORD RESET
const handleSavePassword = async () => {
      
  if (loadingSave === true) return; // Prevent multiple clicks 

  setLoadingSave(true);
  
  try {   
    await axiosInstance.put(`/auth/updatepassword`, newPassReset);
    setLoadingSave(false);
    toast.success('Password Updated!')

  } catch (error) {
    console.error('Error saving:', error?.response?.data?.error || error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
};


// CANCEL BUTTON
const handleCancel = () => {
  setEditorData(FetchedData?.data?.desc || '')
    return setNewPost({
      username: FetchedData?.data?.username,
      spaceName: FetchedData?.data?.spaceName,
      email: FetchedData?.data?.email,
      category: FetchedData?.data?.category,
      role: FetchedData?.data?.role,
      interestedAreas: FetchedData?.data?.interestedAreas,
      language:FetchedData?.data?.language,
      visibility: FetchedData?.data?.visibility,
      status: FetchedData?.data?.status,
      desc: FetchedData?.data?.desc,
      profileImage: FetchedData?.data?.profileImage,
  })
}

// CANCEL RESET
const handleCancelReset = () => {
    return setNewPassReset({
      currentPassword: "",
      newPassword: "",
    })
}
useEffect(() => {
  setEditorData(FetchedData?.data?.desc || '')
  setNewPost({
    username: FetchedData?.data?.username,
    spaceName: FetchedData?.data?.spaceName,
    email: FetchedData?.data?.email,
    category: FetchedData?.data?.category,
    role: FetchedData?.data?.role,
    interestedAreas: FetchedData?.data?.interestedAreas,
    language:FetchedData?.data?.language,
    visibility: FetchedData?.data?.visibility,
    status: FetchedData?.data?.status,
    desc: FetchedData?.data?.desc || '',
    profileImage: FetchedData?.data?.profileImage,
  })
}, [ , FetchedData])

useEffect(() => {
  setNewPost({...newPost, desc: editorData})
}, [editorData]) 
console.log(userId) 
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      {/* <div className='d-flex justify-content-center align-items-center'>
      <span className=''>ID 25363</span>
      <span className='mx-2'>Verified</span>
      </div> */}
     
      <div className='action-btn'>
        <button type='button' className='mx-3' onClick={handleSave} >Save</button>
        <button type='button'  onClick={handleCancel}>Cancel</button>
      </div>
      </div>
      
      <div className='inputs'>
      {/* <div className='inputs'> */}
      <InputsVideo text={'Name'} inputId={'username'} newPost={newPost} getPost={getPost} disable={currentUser?._id !== userId}/>
      <InputsVideo text={'@name'} inputId={'spaceName'} newPost={newPost} getPost={getPost} disable={currentUser?._id !== userId}/>
        {/* </div> */}
        <InputsVideo text={'Email'} inputId={'email'} newPost={newPost} getPost={getPost}  disable={true} dataType={'email'}/>
        <SelectsVideo text={'Role'} inputId={'role'}
        selectItems={currentUser?.role === 'admin' ? ['regular', 'publisher', 'editor', 'partner', 'collaborator', 'admin',
          'bookAgent', 'courseAgent', 'blogAgent', 'agent', 'vip','ceo' ] : ['regular', 'publisher', 'editor', 'partner', 'collaborator',
            'bookAgent', 'courseAgent', 'blogAgent', 'agent']} newPost={newPost} getPost={getPost} disable={currentUser?.role !== 'admin'}/>

        <SelectsVideo text={'My Categories'} inputId={'category'} multipleOption={true} disable={currentUser?._id !== userId}
        selectItems={userCategoryList} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Areas you are interested in'} inputId={'interestedAreas'} multipleOption={true} disable={currentUser?._id !== userId}
        selectItems={userInterestedAreasyList} newPost={newPost} getPost={getPost}/> 
        
        <SelectsVideo text={'Visibility'} inputId={'visibility'}
        selectItems={['hidden', 'show']} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Status'} inputId={'status'} OnOff={false} currentUser={currentUser} disable={currentUser?.role !== 'admin'}
        selectItems={['pending', 'active', 'blocked']} newPost={newPost} getPost={getPost} />
         <SelectsVideo text={'Languages'} inputId={'language'} disable={currentUser?._id !== userId}
        selectItems={["EN","FR","PT", "ES"]} newPost={newPost} getPost={getPost}/>

        <InputsVideo text={'Last Login'} inputId={'lastLogin'} newPost={FetchedData?.data} getPost={getPost} disable={true} dataType={"date"}/>
        {!["publisher", "regular", "collaborator"].includes(currentUser?.role) && 
        <>
        <InputsVideo text={'Last Updated By'} inputId={'username'} newPost={FetchedData?.data?.lastUpdatedBy} getPost={getPost}/>
        <InputsVideo text={'Created By'} inputId={'username'} newPost={FetchedData?.data?.createdBy} getPost={getPost}/>
        </>}
        

        <InputsVideo text={'Join Date'} inputId={'createdAt'} newPost={FetchedData?.data} getPost={getPost} dataType={"date"}/>
        <InputsVideo text={'Last Update'} inputId={'updatedAt'} newPost={FetchedData?.data} getPost={getPost} dataType={"date"}/>
      
      </div>
    
      <div>
      <TextAreasVideo text={'Description'} inputId={'desc'}  editorData={editorData} setEditorData={setEditorData} newPost={newPost} getPost={getPost} disable={currentUser?._id !== userId}/>
      </div>

      {currentUser?._id === userId && <>
      <div className='header d-flex justify-content-between'>
      <h4 className='m-0 my-2  text-dark' >Password Reset</h4>
      <div className='action-btn '>
        <button type='button' className='mx-3' onClick={handleSavePassword}>Reset</button>
        <button type='button' onClick={handleCancelReset}>Cancel</button>
      </div>
      </div>
     
      <div className='inputs'>
      <InputsVideo text={'Current Password'} inputId={'currentPassword'} newPost={newPassReset} getPost={getPasswordPost} dataType={'password'}/>
      <InputsVideo text={'New Password'} inputId={'newPassword'} newPost={newPassReset} getPost={getPasswordPost} dataType={'password'}/>
        </div>
        </>}
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

export default DashboardSingleUserProfile
