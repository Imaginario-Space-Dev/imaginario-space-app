import React from 'react'
import styled from 'styled-components'
import {SignUp} from '../components/index'

const SignUpPage = () => {
  return (
    <Wrapper>
    <div className='signUp'>
      <SignUp />
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.signUp{
  background-color: var(--color-2);
}
`

export default SignUpPage
