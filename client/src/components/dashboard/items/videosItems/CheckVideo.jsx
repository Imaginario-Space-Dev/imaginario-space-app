import React from 'react'
import styled from 'styled-components'

const CheckVideo = ({text, inputId, newPost, getPost, list, change}) => {
  return (
    <Wrapper> {text}
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text h-100">
        <input type="checkbox" id={inputId} value={newPost[inputId]} onChange={(e) =>getPost(e)} />
        </span>
      </div>

      <input type="text" class="form-control" value='I confirm' aria-label="Text input with checkbox" disabled/>
  </div>
  
    </Wrapper>)
}

const Wrapper = styled.main`
.input-group{
    background-color: var(--color-6) !important;
    border-radius: 0.375rem !important;
   .input-group-prepend{

     span{
       background-color: transparent !important;
       border: none;
       border-top-right-radius: 0rem;
     }
   }
   input{
     margin-top: 2px;
     border-radius: 0.375rem !important;
     outline: none;
     border: none;
     background-color: var(--color-6);
   }
   /* input[type=text]:disabled {
    background: var(--color-9); */
/* } */
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

export default CheckVideo

