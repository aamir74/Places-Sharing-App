import React from 'react'
import './SideDrawer.css'
import {CSSTransition}  from 'react-transition-group'
import ReactDom from 'react-dom'

const SideDrawer = props =>{
    const content=(
     <CSSTransition
     in={props.show}
     timeout={200} 
     classNames='slide-in-left' 
     mountOnEnter 
     unmountOnExit
     >
     <aside className='side-drawer'onClick={props.onClick}>{props.children}</aside>
     </CSSTransition>
)

    return ReactDom.createPortal(content,document.getElementById('drawer-hook'))

}

export default SideDrawer