import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import {indexModal} from "../../utils/constants";
import React from "react";


function Modal(props) {

    React.useEffect(() => {

        const closePopupWithEsc = (e) => {
            if (e.key === "Escape") {
                props.onClose()
            }
        }
        document.addEventListener('keydown', closePopupWithEsc)

        return () => document.removeEventListener('keydown', closePopupWithEsc)
    }, [props.onClose])
    
    return ReactDOM.createPortal(
        <ModalOverlay {...props}>
            <div className={`${style.modal} pt-10 pl-10 pb-15 pr-10`}>
                <h2 className={`text text_type_main-large ${style.title}`}>
                    {props.title}
                </h2>

                <div onClick={props.onClose} className={style.close}>
                    <CloseIcon type={"primary"}/>
                </div>
                {props.children}
            </div>
        </ModalOverlay>,
        indexModal
    )
}

export default Modal

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};