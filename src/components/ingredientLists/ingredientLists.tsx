import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import { dataPropTypes } from '../../utils/constants';
import style from './ingredient-list.module.css'
// @ts-ignore
function IngredientLists (props) {
    // @ts-ignore
    return(
        <section>
            <p className='mt-0 text text_type_main-medium'>{props.title}</p>
            <ul className={style.ul}>
                {props.ingredient.map((item: { _id: React.Key | null | undefined; }) => (
                    <Ingredient key={item._id} card={item} />
                ))}
            </ul>
        </section>
    )
}

IngredientLists.propTypes = {
    title: PropTypes.string,
    ingredient: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default IngredientLists;