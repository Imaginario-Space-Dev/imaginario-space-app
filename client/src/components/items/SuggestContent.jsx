import React from 'react'
import styled from 'styled-components'

const SuggestContent = () => {
  return (
    <Wrapper>
    <section className='SuggestContent d-flex flex-column justify-content-center align-items-center'>
        <h3>You didn't find the book/course you want?</h3>
        <form className='row suggest-Cont d-flex justify-content-around'>
          <select defaultValue='Select' className='col-md-3'>
            <option>Book</option>
            <option>Course</option>
          </select>
          <input placeholder='Author' className='col-md-3'/>
          <select defaultValue='Select' className='col-md-3'>
            <option>Non-Fiction</option>
            <option>Fiction</option>
            <option>Self-help</option>
            <option>Technilogy</option>
            <option>History</option>
          </select>
          <button type='button' className='col-md-3'>REQUEST</button>
        </form>
        
    </section>
    </Wrapper>)
}

const Wrapper = styled.div`

.SuggestContent{
  padding: 15px;
  .suggest-Cont {
    

    select {
      border: none;
      outline: none;
    }
   
    input{
      border: none;
      outline: var(--color-2);
    }

    button{
    color: var(--color-1);
    border: none;
    outline: none;
    padding: 5px 20px;
    /* border-radius: var(--borderRadius); */
    background: var(--color-4);
    font-weight: bold ;
}
  
/* button:hover {
    color: var(--color-1);
    background: var(--color-4);
  } */
  }

  
}

@media (min-width: 991px) {
.SuggestContent{
  h3 {
    font-size: 30px;
  }

  .suggest-Cont {
    width: 50%;

    select {
      font-size: 15px;
    }
   
    input{
      font-size: 15px;
    }
  }
  button{
    font-size: 15px;

}
}
}

@media (max-width: 991px) {
.SuggestContent{
  
  .suggest-Cont {
    width: 80%;

    select {
      font-size: 12px;
    }
   
    input{
      font-size: 12px;
    }
  }
  button{
    font-size: 15px;
}
 
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.SuggestContent{
  
  .suggest-Cont {

    select {
      font-size: 12px;
      margin-bottom: 6px;
      padding: 5px;
    }
   
    input{
      font-size: 12px;
      margin-bottom: 6px;
      padding: 5px;
    }

    button{
    font-size: 12px;
}
  }
  
 
}
}  

`

export default SuggestContent
