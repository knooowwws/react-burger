import React from 'react';
import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './constructor-ingredient.module.css';

// @ts-ignore
function ConstructorIngredient(props) {
    return(
        <li className={style.li}>
            <div className={style.drag}>
                <DragIcon type='primary' />
            </div>
            <ConstructorElement isLocked={true} text={`${props.data.name}`} price={props.data.price}
                                thumbnail={props.data.image}/>
        </li>
    )
}

export default ConstructorIngredient