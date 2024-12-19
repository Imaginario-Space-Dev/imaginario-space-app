import React from 'react'
import styled from 'styled-components'
import {SignIn} from '../components/index'

const SignInPage = () => {
  return (
    <Wrapper>
    <div className='signIn'>
      <SignIn />
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.signIn{
  background-color: var(--color-2);
}
`
export default SignInPage
