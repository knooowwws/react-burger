import React from 'react';
import { dataPropTypes } from '../../utils/constants';
import style from './ingredient-details.module.css';

// @ts-ignore
function IngredientDetails(props) {
    return (
        props.card && (
            <section className={style.section}>
                <img
                    src={props.card.image_large}
                    alt={props.card.name}
                    className={style.img}
                />
                <p className='mt-4 mb-8 text text_type_main-medium'>{props.card.name}</p>
                <ul className={style.ul}>
                    <li>
                        <p className='text text_type_main-default'>
                            Калории,ккал
                        </p>
                        <p className='mt-2 text text_type_digits-default'>
                            {props.card.calories}
                        </p>
                    </li>
                    <li>
                        <p className='text text_type_main-default'>
                            Белки, г
                        </p>
                        <p className='mt-2 text text_type_digits-default'>
                            {props.card.proteins}
                        </p>
                    </li>
                    <li>
                        <p className='text text_type_main-default'>
                            Жиры, г
                        </p>
                        <p className='mt-2 text text_type_digits-default'>{props.card.fat}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default'>
                            Углеводы, г
                        </p>
                        <p className='mt-2 text text_type_digits-default'>
                            {props.card.carbohydrates}
                        </p>
                    </li>
                </ul>
            </section>
        )
    );
}

export default React.memo(IngredientDetails);

IngredientDetails.propTypes = {
    card: dataPropTypes,
};
