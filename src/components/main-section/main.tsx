import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/constants';
import main from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';


// @ts-ignore
function MainSection(props) {
    return (
        <main className={main.main}>
            <BurgerIngredients bun={props.bun} sauce={props.sauce} main={props.main}  />
            <BurgerConstructor />
        </main>
    )
}

export default memo(MainSection)

// @ts-ignore
BurgerIngredients.propTypes = {
    bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};