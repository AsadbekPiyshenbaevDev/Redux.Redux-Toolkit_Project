import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Main, Login, Register, Navbar, Article, CreateArticle } from './components/index'
import { useDispatch } from 'react-redux'
import AuthService from './components/service/auth'
import { signUserSuccess } from './components/slice/auth'
import { getItem } from './helpers/persistance-storage'
import EditArticle from './components/EditArticle'

const App = () => {
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    const token = getItem('token')
    if (token) {
      getUsers()
    }

    
  }, [])


  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/article/:slug' element={<Article />} />
          <Route path='/create-article' element={<CreateArticle />} />
          <Route path='/edit-article/:slug' element={<EditArticle />} />
        </Routes>
      </div>
    </div>
  )
}

export default App