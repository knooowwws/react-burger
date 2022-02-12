import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import {indexModal} from "../../utils/constants";

// @ts-ignore
function Modal(props) {
    // @ts-ignore
    return ReactDOM.createPortal(
        <ModalOverlay {...props}>
            <div className={`${style.modal} pt-10 pl-10 pb-15 pr-10`}>
                <h2 className={`text text_type_main-large ${style.title}`}>
                    {props.title}
                </h2>

                <div onClick={props.onclose} className={style.close}>
                    <CloseIcon type={"primary"}/>
                </div>
                {props.children}
            </div>
        </ModalOverlay>,
        // @ts-ignore
        indexModal
    )
}

export default Modal

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    onclose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};