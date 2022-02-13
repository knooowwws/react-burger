import React from 'react';
import PropTypes from 'prop-types';
import style from './modalOverlay.module.css';


function ModalOverlay(props) {
    
    function closePopupClickOnOverlay(e) {
        if (e.target.matches('.popup')) {
            props.onClose();
        }
    }

    return(
        <div className={`popup ${style.overlay} ${props.isOpen ? style.popup_opened : ''}`} onClick={closePopupClickOnOverlay}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};