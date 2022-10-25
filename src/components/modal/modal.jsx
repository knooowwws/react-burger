import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import {indexModal} from "../../utils/constants";
import React from "react";


function Modal({title, isOpen, onClose, children}) {

    React.useEffect(() => {

        const closePopupWithEsc = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener('keydown', closePopupWithEsc)

        return () => document.removeEventListener('keydown', closePopupWithEsc)
    }, [onClose])

    return ReactDOM.createPortal(
        isOpen && (
            <>
                <ModalOverlay {...{title, isOpen, onClose, children}}/>
                <div className={`${style.modal} pt-10 pl-10 pb-15 pr-10`}>
                    <h2 className={`text text_type_main-large ${style.title}`}>
                        {title}
                    </h2>

                    <div onClick={onClose} className={style.close}>
                        <CloseIcon type={"primary"}/>
                    </div>
                    {children}
                </div>
            </>),
        indexModal
    )
}

export default React.memo(Modal)

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};