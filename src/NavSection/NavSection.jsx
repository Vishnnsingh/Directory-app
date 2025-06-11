import React, { useContext } from 'react'
import styles from './NavSection.module.css'
import { UserContext } from '../App'

const NavSection = () => {
    const ctx = useContext(UserContext)
  return (
    <div className={styles.buttons}>
        <button onClick={() => ctx.setNavigator(false)}>Add Person</button>
        <button onClick={() => ctx.setNavigator(true)}>Retrieve Information</button>
    </div>
  )
}

export default NavSection;