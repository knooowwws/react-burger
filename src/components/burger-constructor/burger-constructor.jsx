import React from 'react';
import PropTypes from 'prop-types';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {data} from '../../utils/constants'
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient'
import style from './burger-constructor.module.css'

// @ts-ignore
function BurgerConstructor(props) {
    const _list = data.slice()
    _list.splice(0, 1)
    const list = _list.slice()
    list.splice(-1, 1)

    return (
        <section className={`pt-25 ${style.construct}`}>

            <div className={`pb-40 ${style.el}`}>

                <ConstructorElement type='top' isLocked={true} text={`${data[0].name} (верх)`} price={data[0].price}
                                    thumbnail={data[0].image}/>
                <ul className={`${style.ul} pr-2`}>
                    {list.map(i => (
                        <ConstructorIngredient key={i._id} data={i}/>
                    ))}
                </ul>
                <ConstructorElement type='bottom' isLocked={true} text={`${data[0].name} (низ)`} price={data[0].price}
                                    thumbnail={data[0].image}/>
            </div>

            <div className={`mt-10 ${style.foot}`}>
                <div className='mr-10'>
                    <span className='mr-2 text text_type_digits-medium'>610</span>
                    <CurrencyIcon type='primary' />
                </div>
                <Button onClick={props.openOrderDetails} type='primary' size='large'>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    openOrderDetails: PropTypes.func.isRequired,
};