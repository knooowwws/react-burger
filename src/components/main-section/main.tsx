import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/constants';
import main from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';


// @ts-ignore
function MainSection(props) {
    // @ts-ignore
    return (
        <main className={main.main}>
            <BurgerIngredients openIngredientDetails={props.ingredientDetails} onCardClick={props.onCardClick} bun={props.bun} sauce={props.sauce} main={props.main}  />
            <BurgerConstructor openOrderDetails={props.orderDetails}/>
        </main>
    )
}

export default memo(MainSection)

// @ts-ignore
MainSection.propTypes = {
    bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    onCardClick: PropTypes.func.isRequired,
    ingredientDetails: PropTypes.func.isRequired,
    orderDetails: PropTypes.func.isRequired,
};