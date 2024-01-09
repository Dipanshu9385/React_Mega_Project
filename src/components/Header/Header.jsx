import React from 'react'
import { Container, Logo, LogoutBtn } from '../../components'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All-Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add-Posts",
      slug: "/add-posts",
      active: authStatus
    },
  ]

  return (
    <header>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width='80px' />
            </Link>
          </div>
          <ul className='flex ml-4'>
            {
              navItems.map((item)=> (
               item.active ? (
                <li key={item.name}>
                  <button
                  onClick={()=> navigate(item.slug)}
                  className='inline-block px-4 py-2 duration-200 hover:bg-slate-500 rounded-full'
                  >{item.name}</button>
                </li>
               ):null
              ))
            }
            {
              authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
