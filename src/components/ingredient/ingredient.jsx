import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
// import PropTypes from 'prop-types';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredient from './ingredient.module.css';
import {useDrag} from "react-dnd";
import {getViewedIngredient} from "../../services/actions/ingredients";
import {INGREDIENT_DETAILS_OPEN} from "../../services/actions";
import {dataPropTypes} from "../../utils/constants";


function Ingredient({card}) {
    const dispatch = useDispatch();
    const {counter, bun} = useSelector(store => store.ingredients.ingredientsConstructor)

    const [{isDrag}, drag] = useDrag({
        type: 'ingredient-menu',
        item: () => card,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const countIngredient = bun && bun._id === card._id ? 2 : counter[card._id];

    const opacity = isDrag ? .5 : 1

    function handleCardClick() {
        dispatch(getViewedIngredient(card));
        dispatch({ type: INGREDIENT_DETAILS_OPEN });
    }

    return (
        <div draggable={true} onClick={handleCardClick} ref={drag} style={{opacity}} className={`mb-10 ${ingredient.li}`}>
            <img src={card.image} alt={card.name}/>
            {countIngredient ? <Counter count={countIngredient} size='default'/> : null}
            <div className={ingredient.box}>
                <span className={`text text_type_digits-default ${ingredient.span}`}>{card.price}</span>
                <CurrencyIcon type='primary'/>
            </div>
            <p className={`text text_type_main-default ${ingredient.text}`}>{card.name}</p>
        </div>
    )
}

export default memo(Ingredient);


Ingredient.propTypes = {
    card: dataPropTypes
};
