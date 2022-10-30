import React from 'react';
// import {dataPropTypes} from '../../utils/constants';
import style from './ingredient-details.module.css';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
// import PropTypes from "prop-types";


function IngredientDetails() {
    const {id} = useParams()
    const card = useSelector(store => store.ingredients.viewedIngredient) ||
        JSON.parse(localStorage.getItem('ingredients')).find((i) => i._id === id);
    return (
        card && (
                <section className={style.section}>
                    <img
                        src={card.image_large}
                        alt={card.name}
                        className={style.img}
                    />
                    <p className='mt-4 mb-8 text text_type_main-medium'>{card.name}</p>
                    <ul className={style.ul}>
                        <li>
                            <p className='text text_type_main-default'>
                                Калории,ккал
                            </p>
                            <p className='mt-2 text text_type_digits-default'>
                                {card.calories}
                            </p>
                        </li>
                        <li>
                            <p className='text text_type_main-default'>
                                Белки, г
                            </p>
                            <p className='mt-2 text text_type_digits-default'>
                                {card.proteins}
                            </p>
                        </li>
                        <li>
                            <p className='text text_type_main-default'>
                                Жиры, г
                            </p>
                            <p className='mt-2 text text_type_digits-default'>{card.fat}</p>
                        </li>
                        <li>
                            <p className='text text_type_main-default'>
                                Углеводы, г
                            </p>
                            <p className='mt-2 text text_type_digits-default'>
                                {card.carbohydrates}
                            </p>
                        </li>
                    </ul>
                </section>
        )
    );
}

export default React.memo(IngredientDetails);

// IngredientDetails.propTypes = {
//     card: PropTypes.string
// };
