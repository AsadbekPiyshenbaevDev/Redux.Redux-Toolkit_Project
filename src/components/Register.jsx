import React, { useEffect, useState } from 'react'
import { icon } from './constants'
import { Input } from './ui'
import { useDispatch, useSelector } from 'react-redux'
import { signUserStart, signUserSuccess, signUserFailure } from './slice/auth'
import AuthService from './service/auth'
import { ValidationError } from './'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isLoading, loggedIn } = useSelector(state => state.auth)
  const navigate = useNavigate()



  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart())
    const user = { username: name, email, password }
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user))
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])
  return (
    <div className='text-center'>
      <main className="form-signin w-25 m-auto">
        <form>
          <img src={icon} alt="" />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <ValidationError />

          <Input label={"Username"} state={name} setState={setName} />
          <Input label={"Email address"} state={email} setState={setEmail} />
          <Input label={"Password"} state={password} setState={setPassword} type={'password'} />

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit" onClick={registerHandler}>Rigister</button>
        </form>
      </main>
    </div>
  )
}

export default Register