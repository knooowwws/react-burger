import React, {memo, useState} from 'react';
import PropTypes from "prop-types";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients.module.css";
import {dataPropTypes} from '../../utils/constants';
import IngredientLists from '../ingredientLists/ingredientLists'
import { ProductContext } from "../../services/productContext";


function BurgerIngredients(props) {
    const [tab, setTab] = useState('buns');

    const contextData = React.useContext(ProductContext);

    const bun = React.useMemo(
        () => contextData.filter((i) => i["type"] === 'bun'),
        [contextData]
    );


    const main = React.useMemo(
        () => contextData.filter((i) => i["type"] === 'main'),
        [contextData]
    );


    const sauce = React.useMemo(
        () => contextData.filter((i) => i["type"] === 'sauce'),
        [contextData]
    );



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
                    ingredient={bun}
                />
                <IngredientLists
                    onCardClick={props.onCardClick}
                    openIngredientDetails={props.openIngredientDetails}
                    title="Соусы" ingredient={sauce}/>
                <IngredientLists
                    onCardClick={props.onCardClick}
                    openIngredientDetails={props.openIngredientDetails}
                    title="Начинки"
                    ingredient={main}
                />
            </div>
        </section>
    );
}

export default memo(BurgerIngredients);

BurgerIngredients.propTypes = {
    onCardClick: PropTypes.func.isRequired,
    openIngredientDetails: PropTypes.func.isRequired,
};

