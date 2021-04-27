import React,{useState} from 'react'
import './MainNavigation.css'
import MainHeader from './MainHeader'
import {Link} from 'react-router-dom'
import NavLinks from './NavLinks'
import SideDrawer from "./SideDrawer";
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = props =>{
    const[drawerIsOpen,setDrawerIsOpen] = useState(false)
    const openDrawerHandler= ()=>{
        setDrawerIsOpen(true)
    }
    const closeDrawerhandler= ()=>{
        setDrawerIsOpen(false)
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerhandler}/>}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerhandler}>
            <nav className='main-navigation__drawer-nav'>
                <NavLinks />
            </nav>
        </SideDrawer>
        
    <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
            <span />
            <span />
            <span />
        </button>
        <h1 className='main-navigation__title'>
            <Link to='/'>Share Places</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
            <NavLinks />
        </nav>
        </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation