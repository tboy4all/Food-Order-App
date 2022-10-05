import React, { Fragment } from 'react'
// import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}
// const portalElement = document.getElementById('overlays')

const Modal = (props: any) => {
  return (
    <Fragment>
      {/* {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )} */}
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>
  )
}

export default Modal
