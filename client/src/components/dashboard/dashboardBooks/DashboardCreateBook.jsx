import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, InputNumber, CheckVideo, TextAreas, TextAreasVideo, UploadCoverImg} from '../../index'
import { Link } from 'react-router-dom'
import {genreList, targetAdienceList} from '../../../utils/utils'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'

const DashboardCreateBook = ({currentUser}) => {
  const navigate = useNavigate();
  const [lng, setLng] = useState('EN')
  const [loadingSave, setLoadingSave] = useState(false);
  const [editorData, setEditorData] = useState('');
  const [searchParams] = useSearchParams();
  const lngTrackId = searchParams.get('languageTrackId')
  
  const [newPost, setNewPost] = useState({
    language: [lng],
    title: '',
    author: '',
    category: '',
    genre: [],
    targetAudience: [],
    visibility: '',
    status: "pending",
    desc: '',
    sellingPlatAllowsAffiLink: false,
    termsOfUse: false,
    languageTrackId: lngTrackId || ''
})


const getPost = (e) => {
  const id = e.target.id;
  const value = e.target.value;
  const checked = e.target.checked;
  const type = e.target.type;

  if (e.target.multiple) {
    setNewPost((prev) => {
      if(id === 'targetAudience') {
        const targetAudience = prev.targetAudience ? [...prev.targetAudience] : []; // Copy the existing array
      const genre = [...prev.genre]; // Copy the existing array
      if (targetAudience.includes(value)) {
        // If the option is already selected, remove it
        return {
          ...prev,
          [id]: targetAudience.filter((item) => item !== value),
        };
      } else {
        // Otherwise, add it to the array
        return {
          ...prev,
          [id]: [...targetAudience, value],
        };
      }
      } else if(id === 'genre') {
        const genre = prev.genre ? [...prev.genre] : []; // Copy the existing array
        if (genre.includes(value)) {
          // If the option is already selected, remove it
          return {
            ...prev,
            [id]: genre.filter((item) => item !== value),
          };
        } else {
          // Otherwise, add it to the array
          return {
            ...prev,
            [id]: [...genre, value],
          };
        }
      }
    });
  } else  {
    // const evt = e.target.value ? { [id]: e.target.value } : { [id]: e.target.checked };
    // setNewPost((prev) => ({ ...prev, ...evt }));
    let evt;

  if (type === "checkbox") {
    evt = { [id]: checked };  // For checkboxes, use the checked property
  } else {
    evt = { [id]: value };  // For text inputs, use the value property
  }

  setNewPost((prev) => ({
    ...prev,
    ...evt,
  }));
  }
};


const handleSaveBook = async () => {
        
  if (loadingSave === true) return; // Prevent multiple clicks

  setLoadingSave(true);
  
  try {
    const res = await axiosInstance.post('/books', newPost);
    setLoadingSave(false);
    navigate(`/imaginario-spaces/${res?.data?.data?.createdBy}/book/${res?.data?.data?._id}`)
    toast.success('Book Created Successfully!')

  } catch (error) {
    console.error('Error saving book:', error);
    setLoadingSave(false);
    toast.error(error?.response?.data?.error || error?.message)
  }
};

  // CANCEL BUTTON
  const handleCancel = () => {
  setNewPost({
    language: [lng],
    title: '',
    author: '',
    category: '',
    genre: [],
    targetAudience: [],
    visibility: '',
    status: "pending",
    desc: '',
    sellingPlatAllowsAffiLink: false,
    termsOfUse: false
  })
}

useEffect(() => {
  setNewPost({...newPost, desc: editorData})
}, [editorData])

  // console.log(affiliatePlatforms)
  console.log(newPost)
  if(loadingSave) return <div className="loading"></div>
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      <div className='d-flex justify-content-start align-items-center'>
   
      <select className='' name="" id="" value={lng} onChange={(e) => setLng(e.target.value)}>
        <option value='' className='d-none'></option>
        <option value='EN'>EN</option>
        <option value='PT'>PT</option>
      </select>
      </div>
     
      <div className='add-link-div'>
        <button type='button' className='add-link mx-1' onClick={handleSaveBook}>Save</button>
        <button type='button' className='add-link' onClick={handleCancel}>Cancel</button>
      </div>
      </div>

    
      
      <div className='inputs'>
        <InputsVideo text={'Title'} inputId={'title'} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Author'} inputId={'author'} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Category'} inputId={'category'}
        selectItems={["Fiction","Non-Fiction"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Visibility'} inputId={'visibility'}
        selectItems={['hidden', 'show']} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Genre'} inputId={'genre'}
        selectItems={genreList} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Target Audiences'} inputId={'targetAudience'}
        selectItems={targetAdienceList} newPost={newPost} getPost={getPost}/>
         <SelectsVideo text={'Status'} inputId={'status'} currentUser={currentUser}
        selectItems={['pending', 'active', 'denied']} newPost={newPost} getPost={getPost}/>
         <InputsVideo text={'Created By'} inputId={'createdBy'} newPost={ {createdBy: currentUser?.username}} getPost={getPost}/>
      </div>
      

      <div >
      <TextAreasVideo text={'Book Description'} inputId={'desc'} newPost={newPost} getPost={getPost} editorData={editorData} setEditorData={setEditorData}/>
      </div>
      
    <div className='sections-container'></div>

      <div className='sections '>
      <h4 className='m-0 my-3 text-dark'>Statement</h4>
      <div className='inputs'>
      <CheckVideo text={'Platform where I have this book allows affiliate link for this book'} inputId={'sellingPlatAllowsAffiLink'} newPost={newPost} getPost={getPost}/>
      <CheckVideo text={'I agree with the terms of use if this platform'} inputId={'termsOfUse'} newPost={newPost} getPost={getPost}/>
      </div>
      <textarea className="form-control my-2" rows="10" value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>
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
    
    /*  */
    
  .sections{
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    /* div{
      position: relative !important;
    z-index: -1 !important;
    } */
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
    a{
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
  .inputs, .inputs3, .inputs4, .inputs5 {
    display: grid;
    /* position: relative !important; */
    /* z-index: -1 !important; */
    /* position: relative !important; */
    
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
  .inputs3{
    grid-template-columns: repeat(3,1fr);
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

  .add-link-div{
    width: 200px;
    margin-left: auto;
  .add-link{
    width: 100%;
  }
 
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
  .inputs3{
    grid-template-columns: repeat(3,1fr);
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
  .add-link-div{
    width: 100px;
    margin-left: auto;
.add-link{
  width: 100%;
}

}
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.create-book-container{
  .inputs, .inputs3, .inputs4, .inputs5 {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }

  .add-link-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  .add-link{
    padding: 5px 10px;
    width: 100%;
  }
}
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default DashboardCreateBook
