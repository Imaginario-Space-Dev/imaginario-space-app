import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'
import {SignInUpContainer} from '../index'
import { FaUserCircle, FaLock, FaUser } from 'react-icons/fa'
import { FiAtSign  } from 'react-icons/fi'
import { useNavigate  } from 'react-router-dom'

const AccountRequest = () => {
  const {login, currentUser} = UseUserContext()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [disableBth, setDisableBth] = useState(true)

  const navigate = useNavigate()

  const loginUser = () => {
    // login(true)
    // navigate('/')
  }

  const disableButton = () => {
    const check = email == '' ||  password == '' || confirmPass == '' || userName == ''
    setDisableBth(check)
    return check
  }

  useEffect(() => {
    disableButton()
  }, [email, password, confirmPass, userName])
  return (
    <Wrapper>
      <SignInUpContainer />

      <div className='signUp-form'>
        
          <h1 className='m-0'>Welcome</h1>
          <p className='m-0 mb-4'>to Imaginario Space</p>

          <FaUserCircle className={!disableBth ? 'user-svg-active mb-4' : 'user-svg mb-4'  }/>

          <form  className='form-signUp'>

          <div className='input-container d-flex  align-items-center mb-2 w-100'>
            <FaUser />
            <input type='text' className='' onChange={(e) => setUserName(e.target.value)} 
            placeholder='enter username'/>
            </div>

            <div className='input-container d-flex  align-items-center mb-2 w-100'>
            <FiAtSign />
            <input type='e-mail' className='' onChange={(e) => setEmail(e.target.value)} 
            placeholder='enter e-mail'/>
            </div>
           
            
           <div className='input-container d-flex  align-items-center mb-2 w-100'>
           <FaLock />
           <input type='password' className='' onChange={(e) => setPassword(e.target.value)}
           placeholder='enter password'/>
           </div>

           <div className='input-container d-flex  align-items-center mb-2 w-100'>
           <FaLock />
           <input type='password' className='' onChange={(e) => setConfirmPass(e.target.value)}
           placeholder='Confirm password'/>
           </div>            
           
            <button  type='submit'
              disabled={disableBth}
              onClick={loginUser}>
                REQUEST AN ACCOUNT
              </button>                      
            
          </form>
          
      </div>


    </Wrapper>
    
  )
}

const Wrapper = styled.div`
.signUp-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20rem;
  padding: 10px;
  color: var(--color-1);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 1;
  
}

.user-svg {
  font-size: 40px;
  color: var(--color-3);
}

.user-svg-active{
  font-size: 40px;
  color: var(--color-4);
}

form {
  width: 100%;

  div{
    background-color: var(--color-1);
    border-radius: var(--borderRadius);
    svg{
      color: var(--color-2);
      font-size: 15px;
      margin: 0px 5px;
    }
  }

  input {
    height: 2rem;
    width: 100%;
    outline: none;
    border: none;
    font-size: 14px;
    padding: 5px 10px 5px 10px;
    border-top-right-radius: var(--borderRadius);
    border-bottom-right-radius: var(--borderRadius);
  }

  a {
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }

  button {
    width: 100%;
    height: 2rem;
    border: none;
    background-color: var(--color-4);
    color: var(--color-1);
    border-radius: var(--borderRadius);
  }

  button:disabled,
  button[disabled]{
    background-color: var(--color-3);
}
}

 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {
}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {

}

/* Large devices (desktops) */
@media (max-width: 991px) {
/* .signUp-form {
  width: 60vw;
} */
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}


@media (max-width: 575px) {

}

@media (max-width: 366px) {
}

`

export default AccountRequest
