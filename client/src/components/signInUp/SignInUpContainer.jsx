import React from 'react'
import styled from 'styled-components'
import signInUp from '../../assets/signInUp.jpg'

const SignInUpContainer = () => {
  return (
    <Wrapper>
    <div className='sign-in-up-container'>
      <img src={signInUp} className='signInUp-img' />
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.sign-in-up-container {
    height: 100vh;
    width: 100%;
}

.signInUp-img {
    height: 100%;
    width: 100%;
    opacity: 0;
}

`
export default SignInUpContainer
