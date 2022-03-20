import React from 'react';
import {useSelector} from "react-redux";

import complete from '../../images/complete.png';
import style from './orders.module.css';

// @ts-ignore
function OrderDetails() {
    const orderId = useSelector((store) => store.order.orderNumber)

    return (
        <>

            {/*<section className={`${style.section} pt-30 pb-25`}>*/}
            {/*    <h3 className={`${style.number} mt-4 text text_type_digits-large `}>*/}
            {/*        Загрузка...*/}
            {/*    </h3>*/}
            {/*</section>*/}
            <section className={`${style.section} pr-15 pb-15 pl-15 `}>
                <h3 className={`${style.number} mt-4 text text_type_digits-large `}>
                    {orderId}
                </h3>
                <p className='mt-8 text text_type_main-medium'>Идентификатор заказа</p>
                <img className='mt-15 mb-15' src={complete} alt='Заказ готовится'/>
                <p className='mb-2 text text_type_main-default'>Ваш заказ начали готовить</p>
                <span className={`${style.spanColor} text text_type_main-default `}>Дождитесь готовности на орбитальной станции</span>
            </section>
        </>
    );
}


export default OrderDetails;
