import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'
import {SignInUpContainer} from '../index'
import { FaUserCircle, FaLock } from 'react-icons/fa'
import { FiAtSign  } from 'react-icons/fi'
// import { RiLockPasswordFill  } from 'react-icons/Ri'
// import { PiLockKeyFill   } from 'react-icons/Pi' <FaLock />
import { useNavigate  } from 'react-router-dom'
import useWindowResize from '../../hooks/useWindowResize'
import axios from 'axios';
import useFetch from '../../fetch/useFetch' 

const SignIn = () => {
  // const {data: fecthUser, error: fetchError} = useFetch(`/auth/me`)
  const {login, currentUser} = UseUserContext()
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('123456')
  const [forgotPass, setForgotPass] = useState(false)
  const [disableBth, setDisableBth] = useState(true)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginWas, setLoginWas] = useState(false);

  const navigate = useNavigate()

  const loginUser = async  (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send email and password to the backend
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/auth/login', {
        email,
        password,
      }, {
        withCredentials: true, // This ensures that cookies are sent back and forth
      //   headers: {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`
      // }
      });
      setLoginWas(true)
          // login(res?.data?.user)
          // navigate('/')
          getCuuUser()
          
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }

    setLoading(false);
  }
  // const {data: fecthUser, error: fetchError} = useFetch(`/auth/me`)

  const getCuuUser = async  () => {
    setError('');
    setLoading(true);

    try {
      // Send email and password to the backend
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/auth/me', {
        withCredentials: true, // This ensures that cookies are sent back and forth
      //   headers: {
      //     Accept: "application/json",
      //     Authorization: `Bearer ${token}`
      // }
      });
          login(res?.data?.data)
          navigate('/')
          
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }

    setLoading(false);
  }

  // useEffect(() => {
    
  //   getCuuUser()
  // },[loginWas])

  
    

  // const getCurrUser = async  (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     // Send email and password to the backend
  //     const res = await axios.post('import.meta.env.VITE_BACKEND_IMAGE_URL/auth/me', {
  //       withCredentials: true, // This ensures that cookies are sent back and forth
  //     //   headers: {
  //     //     Accept: "application/json",
  //     //     Authorization: `Bearer ${token}`
  //     // }
  //     });

     
     
  //     login(res?.data?.data)
  //     navigate('/')
      
  //   } catch (err) {
  //     // Handle error
  //     setError(err.response?.data?.message || 'Login failed. Please try again.');
  //   }

  //   setLoading(false);
  // }

  

  const {width} = useWindowResize()
  // console.log(width)

  const disableButton = () => {
    const check = email == '' ||  password == ''
    setDisableBth(check)
    return check
  }

  useEffect(() => {
    disableButton()
  }, [email, password])
  return (
    <Wrapper>
    <SignInUpContainer />
      <div className='signIn-form'>
          {forgotPass ? 
          <>
          <h3 className='m-0'>Let's Recover your account</h3>
          <p className='m-0 my-2'>A one time click link will be sent to your email</p>
          </> :
          <>
          <h1 className='m-0'>Welcome</h1>
          <p className='m-0 mb-4'>back to Imaginario Pix</p>
          </>}
          

          <FaUserCircle className={!disableBth || (forgotPass && email ==! '') ? 'user-svg-active mb-4' : 'user-svg mb-4'  }/>

          <form  className='form-signIn' onSubmit={loginUser}>
            <div className={!forgotPass ? 'input-container d-flex  align-items-center mb-4 w-100' :
           'input-container d-flex  align-items-center mb-2 w-100'}>
            <FiAtSign />
            <input type='e-mail' className='' onChange={(e) => setEmail(e.target.value)} 
            placeholder='enter e-mail'/>
            </div>
           
            {!forgotPass &&
           <div className='input-container d-flex  align-items-center mb-2 w-100'>
           {/* <RiLockPasswordFill /> */}
           {/* <PiLockKeyFill /> */}
           <FaLock />
           <input type='password' className='' onChange={(e) => setPassword(e.target.value)}
           placeholder='enter password'/>
           </div>
            }

              <a className={!forgotPass ? 'd-flex justify-content-end align-item-center mb-4' : 
              'd-flex justify-content-start align-item-center text-center mb-4'}
                onClick={forgotPass ? () => setForgotPass(false) : () => setForgotPass(true)}>
                 {!forgotPass ? 'Forgot your password' : 'Back to login'}
                </a>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
            {!forgotPass ?
            <button className='btn-signIn w-100' type='submit'
              disabled={disableBth || loading }
              >
               {loading ? 'Logging in...' : 'Login'}
              </button>
              :
              
              <button className='btn-signIn w-100' type='submit'
              disabled={email == ''}
             >
              SEND
              </button>
              }
            

            
          </form>

          
          
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.signIn-form {
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
/* .signIn-form {
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

export default SignIn
