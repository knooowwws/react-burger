import React from 'react';
import {dataPropTypes} from '../../utils/constants';
import style from './ingredient-details.module.css';
import PropTypes from "prop-types";
import Modal from "../modal/modal";


function IngredientDetails(props) {
    return (
        props.isOpen && (
            <Modal title={'Детали ингридиента'} onClose={props.onClose} isOpen={props.isOpen}>
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
            </Modal>
        )
    );
}

export default React.memo(IngredientDetails);

IngredientDetails.propTypes = {
    card: dataPropTypes,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};
