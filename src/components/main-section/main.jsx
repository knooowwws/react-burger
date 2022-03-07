import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import style from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';



function MainSection({ingredient, onCardClick, orderDetails}) {
    return (
        <main className={style.main}>
            <BurgerIngredients openIngredientDetails={ingredient} onCardClick={onCardClick}  />
            <BurgerConstructor openOrderDetails={orderDetails}/>
        </main>
    )
}

export default memo(MainSection)

MainSection.propTypes = {
    onCardClick: PropTypes.func.isRequired,
    ingredient: PropTypes.func.isRequired,
    orderDetails: PropTypes.func.isRequired,
};