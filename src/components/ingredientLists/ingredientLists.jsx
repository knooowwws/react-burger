import React from 'react';
import Ingredient from '../ingredient/ingredient';
import style from './ingredient-list.module.css'
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

const IngredientLists = React.forwardRef(({title, ingredient}, ref) => {
    const location = useLocation()
    return (
        <section>
            <p className='mt-0 text text_type_main-medium' ref={ref}>{title}</p>
            <ul className={style.ul}>
                {ingredient.map(item => (
                    <li key={item._id}>
                        <Link className={style.link} to={`/ingredients/${item._id}`} state={{background: location}}>
                            <Ingredient card={item}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
})

IngredientLists.propTypes = {
    ingredient: PropTypes.array,
    title: PropTypes.string,
};

export default IngredientLists;