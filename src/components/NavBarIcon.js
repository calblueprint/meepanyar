import React from 'react'
import { FaBars, FaClose } from 'react-icons/lib/fa'

const NavbarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <FaClose /> : <FaBars/>}
  </span>
}

export default NavbarIcon
