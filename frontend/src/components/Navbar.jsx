import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div>
        <img src={assets.logo} alt="" />
        <ul>
            <NavLink>
                <li>HOME</li>
                    <hr />
            </NavLink>
        </ul>
        <ul>
            <NavLink>
                <li>ALL DOCTORS</li>
                    <hr />
            </NavLink>
        </ul>
        <ul>
            <NavLink>
                <li>ABOUT</li>
                    <hr />
            </NavLink>
        </ul>
        <ul>
            <NavLink>
                <li>CONTACT </li>
                    <hr />
            </NavLink>
        </ul>

        <div>
            <button>Create account</button>
        </div>
    </div>
  )
}
