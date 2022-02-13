import React, {memo, useState} from 'react';
import PropTypes from "prop-types"
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients.module.css";
import {dataPropTypes} from '../../utils/constants';
import IngredientLists from '../ingredientLists/ingredientLists'


function BurgerIngredients(props) {
    const [tab, setTab] = useState('buns');

    return (
        <section className={`mt-10 pl-5 ${styles.foundation}`}>
            <h1 className={`text text_type_main-large mb-5`}>
                Соберите бургер
            </h1>
            <div className={`mb-10 ${styles.tab}`}>
                <Tab
                    value="buns"
                    active={tab === 'buns'}
                    onClick={setTab}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={tab === 'sauce'}
                    onClick={setTab}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={tab === 'main'}
                    onClick={setTab}
                >
                    Начинки
                </Tab>
            </div>
            <div className={` ${styles.ingredients}`}>
                <IngredientLists
                    onCardClick={props.onCardClick}
                    openIngredientDetails={props.openIngredientDetails}
                    title="Булки"
                    ingredient={props.bun}
                />
                <IngredientLists
                    onCardClick={props.onCardClick}
                    openIngredientDetails={props.openIngredientDetails}
                    title="Соусы" ingredient={props.sauce}/>
                <IngredientLists
                    onCardClick={props.onCardClick}
                    openIngredientDetails={props.openIngredientDetails}
                    title="Начинки"
                    ingredient={props.main}
                />
            </div>
        </section>
    );
}

export default memo(BurgerIngredients);

BurgerIngredients.propTypes = {
    bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    onCardClick: PropTypes.func.isRequired,
    openIngredientDetails: PropTypes.func.isRequired,
};

