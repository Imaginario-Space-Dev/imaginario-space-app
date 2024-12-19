import React from 'react'
import styled from 'styled-components'

const InputNumber = ({text, inputId, inputIdTotal, pageCounter, change, editMode, newPost, getPost}) => {
  return (
    <Wrapper>
    <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{text}</span>
          </div>
          {!pageCounter ? 
          <input className="form-control" type="number" id={inputId} min="1" value={newPost[inputId]} onChange={(e) =>getPost(e, change)}
          disabled={
            inputId == 'startingPage' ? newPost.chapterBlocked == 'Locked' ? true : 
             newPost.chapterType !== 'PDF' ? true : false : false
          }
          />:
          <div className='d-flex'>
          <input className="form-control" type="number" value={newPost[inputId]} id={inputId} min="1" onChange={(e) =>getPost(e, change)}/>
          <input className="form-control" type="number" value={newPost[inputIdTotal]} id={inputIdTotal} min="1" onChange={(e) =>getPost(e, change)}/>
          </div>}
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.input-group{
    display: flex;
    flex-direction: column;
   .input-group-prepend{
     display: flex;
     flex-direction: column;
     span{
       background-color: transparent !important;
       border: none;
       border-top-right-radius: 0rem;
     }
   }
   input{
     width: 100%;
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     background-color: var(--color-6);
   }
   input[type=number]:disabled {
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

export default InputNumber

