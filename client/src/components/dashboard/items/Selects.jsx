import React from 'react'
import styled from 'styled-components'

const Selects = ({text, selectItems, inputId, selectValue, list, change, editMode, newPost, getPost}) => {

  const arr = []
  change == 'chapter' && list?.map((i) => arr.push(i.chapterNumber))

  return (
    <Wrapper>
    <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{text}</span>
          </div>
          <select className="form-select" id={inputId} value={newPost[inputId]} onChange={(e) =>getPost(e, change)}
          disabled={
            inputId == 'chapterType' ? newPost.chapterBlocked == 'Locked' ? true : false : 
            inputId == 'coverPlatformName' ?  editMode ? true : false : 
            // list.includes((item) => item.chapterNumber == inputId) ?   editMode ? true : false : 
            false 
          }
          >
            <option  className='d-non'></option>
            {selectItems.map((item) => <option value={item} 
            disabled={change == 'chapter' ? arr.includes(`${item}`) : false}
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
     background-color: var(--color-6);
   }
   select:disabled {
    background: var(--color-9);
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

export default Selects

