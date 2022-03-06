import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredient from './ingredient.module.css';
import { dataPropTypes } from '../../utils/constants';


function Ingredient(props) {
    const handle = () => {
        props.onCardClick(props.card)
        props.openIngredientDetails()
    }

    return(
        <li onClick={handle} className={`mb-10 ${ingredient.li}`}>
            <img src={props.card.image} alt={props.card.name}/>
            <Counter count={1} size='default' />
            <div className={ingredient.box}>
                <span className='text text_type_digits-default'>{props.card.price}</span>
                <CurrencyIcon type='primary'/>
            </div>
            <p className={`text text_type_main-default`}>{props.card.name}</p>
        </li>
    )
}

export default memo(Ingredient);


Ingredient.propTypes = {
    card: PropTypes.object
};
