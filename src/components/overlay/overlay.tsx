import React from 'react';
import PropTypes from 'prop-types';
import style from './overlay.module.css';

// @ts-ignore
function Overlay({children, isOpen}) {
    return(
        <div className={`popup ${style.overlay} ${isOpen ? style.popup_opened : ''}`}>
            {children}
        </div>
    )
}

export default Overlay;

Overlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};