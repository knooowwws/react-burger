import React from 'react';
import Ingredient from '../ingredient/ingredient';
// import { dataPropTypes } from '../../utils/constants';
import style from './ingredient-list.module.css'
import PropTypes from "prop-types";

const IngredientLists = React.forwardRef(({title, ingredient}, ref) => {
    return(
        <section>
            <p className='mt-0 text text_type_main-medium' ref={ref}>{title}</p>
            <ul className={style.ul}>
                {ingredient.map(item => (
                    <Ingredient key={item._id} card={item} />
                ))}
            </ul>
        </section>
    )
})

IngredientLists.propTypes = {
    ingredient: PropTypes.arrayOf.isRequired,
    title: PropTypes.string,
};

export default IngredientLists;