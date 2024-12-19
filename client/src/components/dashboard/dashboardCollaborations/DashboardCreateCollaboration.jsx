import React, { useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, InputNumber, AddedElement, TextAreasVideo,
  CategorySlider,
  DashboardFilterBooks,
} from '../../index'
import {list} from '../../../data/carousel'

const DashboardCreateCollaboration = ({currentUser}) => {
const [newPost, setNewPost] = useState({
    name: undefined,
    spaceName: undefined,
    createdBy: currentUser?.username || 'Rogerio',
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    category: undefined,
    role: undefined,
    interestedAreas: undefined,
    language:undefined,
    targetAudience: undefined,
    lastLogin: undefined,
    visibility: undefined || "show",
    status: undefined || "pending",
    country: undefined,
    desc: undefined,
    creationDate: undefined,
    lastUpdateDate: undefined,
    image: undefined,
})

const getPost = (e, item) => {

  if([e.target.id] in newPost){
    setNewPost((prev) => ({...prev, [e.target.id]: e.target.value} ))
  }
  }
  return (
    <Wrapper>
    <div className='create-book-container' >
     
     <div className='header'>
      {/* <div className='d-flex justify-content-center align-items-center'>
      <span className=''>ID 25363</span>
      <span className='mx-2'>Verified</span>
      </div> */}
      <div className='action-btn'>
        <button type='button' >Save</button>
        <button type='button' className='mx-3'>Cancel</button>
        <button type='button'>Stats</button>
      </div>
      </div>

      <h2 className='m-0 my-2 text-dark'>Collaboration</h2>
      <div className='inputs'>
        <SelectsVideo text={'Status'} inputId={'niche'}
        selectItems={["Active", "Inactive"]} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Creation Date'} inputId={'author'} newPost={newPost} getPost={getPost}/>
      </div>

      <DashboardFilterBooks list={list}/>
      
      <h2 className='m-0 my-2 text-dark'>Publisher</h2>
      <div className='inputs'>
      <div className='inputs'>
      <InputsVideo text={'Name'} inputId={'title'} newPost={newPost} getPost={getPost}/>
      <InputsVideo text={'@name'} inputId={'author'} newPost={newPost} getPost={getPost}/>
        </div>
        <SelectsVideo text={'Role'} inputId={'title'}
        selectItems={["Regular", "Publisher","Collaborator","Partner"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Categories'} inputId={'title'}
        selectItems={["Finance","IT","Management"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Areas you are interested in'} inputId={'niche'}
        selectItems={["Finance","Self-developement","management"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Status'} inputId={'niche'}
        selectItems={["Active", "Inactive"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Verified'} inputId={'niche'}
        selectItems={["Yes", "No"]} newPost={newPost} getPost={getPost}/>
      </div>
      

      <div>
      <TextAreasVideo text={'Description'} inputId={'desc'} newPost={newPost} getPost={getPost}/>
      </div>

      <h2 className='m-0 my-4 text-dark'>Collaborator</h2>
      <div className='inputs'>
      <div className='inputs'>
      <InputsVideo text={'Name'} inputId={'title'} newPost={newPost} getPost={getPost}/>
      <InputsVideo text={'@name'} inputId={'author'} newPost={newPost} getPost={getPost}/>
        </div>
        <SelectsVideo text={'Role'} inputId={'title'}
        selectItems={["Regular", "Publisher","Collaborator","Partner"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Categories'} inputId={'title'}
        selectItems={["Finance","IT","Management"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Areas you are interested in'} inputId={'niche'}
        selectItems={["Finance","Self-developement","management"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Status'} inputId={'niche'}
        selectItems={["Active", "Inactive"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Verified'} inputId={'niche'}
        selectItems={["Yes", "No"]} newPost={newPost} getPost={getPost}/>
      </div>
      
      <div>
      <TextAreasVideo text={'Description'} inputId={'desc'} newPost={newPost} getPost={getPost}/>
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

export default DashboardCreateCollaboration
