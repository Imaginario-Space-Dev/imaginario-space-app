import React from 'react'
import styled from 'styled-components'
import {AccountRequest} from '../components/index'

const AccountRequestPage = () => {
  return (
    <Wrapper>
    <div className='signUp'>
      <AccountRequest />
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.signUp{
  background-color: var(--color-2);
}
`

export default AccountRequestPage
