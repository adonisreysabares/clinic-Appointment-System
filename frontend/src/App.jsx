import React, { useContext } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import { AuthContext, AuthProvider } from './authentication/AuthContext'
import Home from './Home'
import Admin from './administrator/Admin'
import Login from './authentication/Login'
import About from './frontPage/About'
import Book from './frontPage/Book'
import Contact from './frontPage/Contact'
import Service from './frontPage/Service'
import Error from './Error/404'
import Loading from './components/Loading'
import Unauthorize from './Error/Unauthorize'
import './App.css'

const PrivateRoute = ({ children }) =>{
  const {isAuthenticated, loading} = useContext(AuthContext)

  if(loading) return <Loading />

  return isAuthenticated ? children: <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/book' element={<Book />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/service' element={<Service />}/>
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorize />} />
          <Route path='*' element={<Error />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
