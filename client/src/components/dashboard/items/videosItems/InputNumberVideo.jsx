import React from 'react'
import styled from 'styled-components'

const InputNumberVideo = ({text, inputId, inputIdTotal, pageCounter, change, editMode, newPost, getPost}) => {
  return (
    <Wrapper>
    <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">{text}</span>
          </div>
          <input className="form-control" type="number" id={inputId} min="1" value={newPost ? newPost[inputId] : undefined} onChange={(e) =>getPost(e)}/>
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

export default InputNumberVideo

