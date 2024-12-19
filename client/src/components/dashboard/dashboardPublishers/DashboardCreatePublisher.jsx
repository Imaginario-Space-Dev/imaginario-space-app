import React, { useState } from 'react'
import styled from 'styled-components'
import {InputsVideo, SelectsVideo, InputNumberVideo, AddedElementVideo, TextAreasVideo,
  CategorySlider,
} from '../../index'
import {list} from '../../../data/carousel'

const DashboardCreatePublisher = ({currentUser}) => {
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
  const li = [
    {name: "rg", title: 'ELUIK', id: "rg", title2: 'ELUIK'},
    {name: "rg", title: 'ELUIK', id: "rg", title2: 'ELUIK'},
    {name: "rg", title: 'ELUIK', id: "rg", title2: 'ELUIK'},
    {name: "rg", title: 'ELUIK', id: "rg", title2: 'ELUIK'},

  ] 
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
      
      <div className='inputs'>
      <div className='inputs'>
      <InputsVideo text={'Name'} inputId={'name'} newPost={newPost} getPost={getPost}/>
      <InputsVideo text={'@name'} inputId={'spaceName'} newPost={newPost} getPost={getPost}/>
        </div>
        <InputsVideo text={'Email'} inputId={'email'} newPost={newPost} getPost={getPost}/>
        <div className='inputs'>
      <InputsVideo text={'Password'} inputId={'password'} newPost={newPost} getPost={getPost}/>
      <InputsVideo text={'Confirm-password'} inputId={'confirmPassword'} newPost={newPost} getPost={getPost}/>
        </div>
        
        <SelectsVideo text={'Role'} inputId={'role'}
        selectItems={["Regular", "Publisher","Collaborator","Partner"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Categories'} inputId={'category'}
        selectItems={["Finance","IT","Management"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Areas you are interested in'} inputId={'interestedAreas'}
        selectItems={["Finance","Self-developement","management"]} newPost={newPost} getPost={getPost}/> 
         <SelectsVideo text={'Status'} inputId={'status'}
        selectItems={["Active", "Inactive"]} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Visibility'} inputId={'visibility'}
        selectItems={["Show", "Hide"]} newPost={newPost} getPost={getPost}/>
         <SelectsVideo text={'Language'} inputId={'language'}
        selectItems={["English","French","Portuguese", "Spanish"]} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Last Login'} inputId={'tags'} newPost={newPost} getPost={getPost}/>
        <SelectsVideo text={'Country'} inputId={'country'}
        selectItems={["Poland","Angola","Cameron", "German"]} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Join Date'} inputId={'creationDate'} newPost={newPost} getPost={getPost}/>
        <InputsVideo text={'Last Update'} inputId={'lastUpdateDate'} newPost={newPost} getPost={getPost}/>
      </div>
    
      <div>
      <TextAreasVideo text={'Description'} inputId={'desc'} newPost={newPost} getPost={getPost}/>
      </div>

      <h2 className='m-0 my-2 text-dark'>Interactions</h2>

      {/* <CategorySlider list={list} content={'books'}/> */}


          {/* COVER LINK */}
    {/* <div className='sections-container  '>

      <div className='sections  '>
        <div className='inputs'>
          <InputsVideo text={'Cover Link'} inputId={'coverLink'}/>
          <div className='add-link-div'>
          <button type='button' className='add-link'>Add Link</button>
          </div>
          </div>
          <AddedElementVideo  list={li}/>
      </div>
      </div> */}
       
    
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

export default DashboardCreatePublisher
