import React from 'react';
import complete from '../../images/complete.png';
import style from './orders.module.css';
import Modal from "../modal/modal";
import PropTypes from "prop-types";

// @ts-ignore
function OrderDetails(props) {
    return (
        props.isOpen && (
            <Modal title={''} onclose={props.onclose} isOpen={props.isOpen}>
                <section className={`${style.section} pr-15 pb-15 pl-15 `}>
                    <h3 className={`${style.number} mt-4 text text_type_digits-large `}>
                        777
                    </h3>
                    <p className='mt-8 text text_type_main-medium'>Идентификатор заказа</p>
                    <img className='mt-15 mb-15' src={complete} alt='Заказ готовится'/>
                    <p className='mb-2 text text_type_main-default'>Ваш заказ начали готовить</p>
                    <span className={`${style.spanColor} text text_type_main-default `}>Дождитесь готовности на орбитальной станции</span>
                </section>
            </Modal>)
    );
}

OrderDetails.propTypes = {
    onclose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default OrderDetails;