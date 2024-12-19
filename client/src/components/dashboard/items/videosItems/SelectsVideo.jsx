import React from 'react'
import styled from 'styled-components'

const SelectsVideo = ({text, selectItems, inputId, selectValue, list, disable, change, editMode, newPost, OnOff, multipleOption, getPost, currentUser}) => {

  const arr = []
  change == 'moduleList' && list?.map((i) => arr.push(i.moduleTitle))

  return (
    <Wrapper className='col'>
    <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{text}</span>
          </div>
          <select className="form-select" id={inputId} value={newPost ? newPost[inputId] : ''} 
          onChange={(e) =>getPost(e)} multiple={inputId === 'targetAudience' || inputId === 'genre' || inputId === 'platforms' || multipleOption}
          disabled={
            inputId == 'chapterType' ? newPost.chapterBlocked == 'Locked' ? true : false : 
            inputId == 'coverPlatformName' ?  editMode ? true : false : 
            // list.includes((item) => item.chapterNumber == inputId) ?   editMode ? true : false : 
            inputId == 'bookLocked' ? newPost.bookTitle === "Introduction" && newPost.bookLocked === "Unlocked" ? true : false :
            disable ? true :
            false 
          }
          >
            <option  className='d-none'></option>
            {selectItems.map((item) => <option 
            // selected={newPost ? newPost[inputId] : ''} 
            value={(inputId === 'chapterLocked' || inputId === 'allowsAffiliateLink' || (inputId === 'status' && OnOff)  || inputId === 'display') ?  
              (item === 'Locked' || item === "No" || item === "Disactive")  ? false : true : item} 
            disabled={
              change == 'chapter' ? arr.includes(`${item}`) :
              change !== 'promotion' && inputId == 'status' ? currentUser?.role !== 'admin' ? true : false :
             false}
            >{item}</option>)}
         </select>
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.input-group{
   
   .input-group-prepend{
     display: flex;
     flex-direction: column;
     span{
       background-color: transparent !important;
       border: none;
       border-top-right-radius: 0rem;
     }
   }
   select{
     width: 100%;
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     background-color: var(--color-7);
   }
   select:disabled {
    background: var(--color-6);
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

export default SelectsVideo

