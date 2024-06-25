import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import "/src/App.css";
import style from './Sidenav.module.css'

const Sidenav = () => {
  return (
    <nav className={style["sidenav"]}>
      <Link to="/" className={style["nav-item"]}>
      <h1><i className="fa-solid fa-list-check"></i> Todo list</h1>
      </Link>
        <ul>
          <CustomLink to="/completed" className={style["nav-item"]}><i className="fa-solid fa-circle-check"></i> Completed Tasks
          </CustomLink>
          <CustomLink to="/about" className={style["nav-item"]}><i className="fa-solid fa-circle-info"></i> About
          </CustomLink>
        </ul>
    </nav>
  )
}

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link to={to} {...props}>
      <li className={isActive ? style["active"] : ""}>
        {children}
      </li>
    </Link>
  )
}

export default Sidenav;
