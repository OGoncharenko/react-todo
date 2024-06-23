import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Sidenav = () => {
  return (
    <nav className="sidenav">
      <Link to="/">
      <h1>Todo list</h1>
      </Link>
      <ul>
          <CustomLink to="/completed">Completed Todos</CustomLink>
          <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  )
}

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Sidenav;