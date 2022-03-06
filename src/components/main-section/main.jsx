import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/constants';
import style from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';



function MainSection({bun, ingredient, main, onCardClick, orderDetails, sauce}) {
    return (
        <main className={style.main}>
            <BurgerIngredients openIngredientDetails={ingredient} onCardClick={onCardClick} bun={bun} sauce={sauce} main={main}  />
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
    ingredient: PropTypes.func.isRequired,
    orderDetails: PropTypes.func.isRequired,
};