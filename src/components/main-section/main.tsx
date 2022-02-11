import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/constants';
import style from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';


// @ts-ignore
function MainSection({bun, ingredientDetails, main, onCardClick, orderDetails, sauce}) {
    return (
        <main className={style.main}>
            <BurgerIngredients openIngredientDetails={ingredientDetails} onCardClick={onCardClick} bun={bun} sauce={sauce} main={main}  />
            <BurgerConstructor openOrderDetails={orderDetails}/>
        </main>
    )
}

export default memo(MainSection)

MainSection.propTypes = {
    bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    onCardClick: PropTypes.func.isRequired,
    ingredientDetails: PropTypes.func.isRequired,
    orderDetails: PropTypes.func.isRequired,
};