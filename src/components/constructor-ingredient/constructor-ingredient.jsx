import React, {useRef} from 'react';
import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './constructor-ingredient.module.css';
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {DEL_INGREDIENT_CONSTRUCTOR, REDUCE_INGREDIENTS} from "../../services/actions";

function ConstructorIngredient({data, handleClose, id, index}) {
    const dispatch = useDispatch()

    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: 'ingredient-constructor',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            handleClose(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient-constructor',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1;


    return(
        <li ref={ref} style={{ opacity }} className={style.li}>
            <div className={style.drag}>
                <DragIcon type='primary' />
            </div>
            <ConstructorElement isLocked={false} text={`${data.name}`} price={data.price}
                                thumbnail={data.image} handleClose={() => {
                dispatch({
                    type: DEL_INGREDIENT_CONSTRUCTOR,
                    id: data.uniqueId,
                });
                dispatch({
                    type: REDUCE_INGREDIENTS,
                    id: data._id,
                    typeForCounter: data.type,
                });
            }}/>
        </li>
    )
}

ConstructorIngredient.propTypes = {
    data: PropTypes.object
};

export default ConstructorIngredient