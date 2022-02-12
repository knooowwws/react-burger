import React from 'react';
import PropTypes from 'prop-types';
import style from './modalOverlay.module.css';

// @ts-ignore
function ModalOverlay(props) {


    React.useEffect(() => {
        // @ts-ignore
        const closePopupWithEsc = (e) => {
            if (e.key === "Escape") {
                props.onclose()
            }
        }
        document.addEventListener('keydown', closePopupWithEsc)

        return () => document.removeEventListener('keydown', closePopupWithEsc)
    }, [])

    // @ts-ignore
    function closePopupClickOnOverlay(e) {
        if (e.target.matches('.popup')) {
            props.onclose();
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
    onclose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};