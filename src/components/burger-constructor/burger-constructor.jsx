import React from 'react';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient'
import style from './burger-constructor.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {
    ADD_INGREDIENT_CONSTRUCTOR,
    DRAG_CONSTRUCTOR_INGREDIENT,
    INCREASE_INGREDIENTS,
    ORDER_DETAILS_OPEN
} from "../../services/actions";
import {getOrder} from "../../services/actions/order";
import { useNavigate} from "react-router-dom";


function BurgerConstructor(props) {
    const {bun, ingredient} = useSelector((store) => store.ingredients.ingredientsConstructor)

    const dispatch = useDispatch()
    const price = bun && bun.price * 2 + ingredient.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)
    const refreshToken = localStorage.refreshToken;
    const navigate = useNavigate()

    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: 'ingredient-menu',
        drop: (item) => {
            const itemWithId = {...item, uniqueId: Math.random()};
            dispatch({
                type: ADD_INGREDIENT_CONSTRUCTOR,
                item: itemWithId,
            });
            dispatch({
                type: INCREASE_INGREDIENTS,
                id: itemWithId._id,
                typeForCounter: itemWithId.type,
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const isActive = canDrop && isOver;

    const backgroundColor = (isActive && 'rgba(45, 45, 55, 1)') || (canDrop && 'rgba(30, 30, 55, 1)');

    const handleClose = React.useCallback(
        (dragIndex, hoverIndex) => {
            dispatch({
                type: DRAG_CONSTRUCTOR_INGREDIENT,
                dragIndex: dragIndex,
                hoverIndex: hoverIndex,
            });
        },
        [dispatch]
    );

    function handleClick() {
        const id = ingredient
            .map((item) => {
                return item._id;
            })
            .concat(bun._id);
        if (refreshToken) {
            dispatch({type: ORDER_DETAILS_OPEN});
            dispatch(getOrder(id));
        } else {
            navigate('/login')
        }
    }

    return (
        <section className={`pt-25 ${style.construct}`}>

            <div style={{backgroundColor}} ref={drop} className={`pb-40 ${style.el}`}>
                {bun && (
                    <ConstructorElement type='top' isLocked={true} text={`${bun.name} (верх)`} price={bun.price}
                                        thumbnail={bun.image}/>)
                }
                <ul className={`${style.ul} pr-2`}>
                    {ingredient.map((i, index) => (
                        <ConstructorIngredient
                            draggable={true}
                            handleClose={handleClose}
                            id={i._id}
                            data={i}
                            key={i.uniqueId}
                            index={index}
                        />
                    ))}
                </ul>
                {bun && (
                    <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (низ)`} price={bun.price}
                                        thumbnail={bun.image}/>)
                }
            </div>

            {bun && (
                <div className={`mt-10 ${style.foot}`}>
                    <div className='mr-10'>
                        <span className='mr-2 text text_type_digits-medium'>{price}</span>
                        <CurrencyIcon type='primary'/>
                    </div>
                    <Button onClick={handleClick} type='primary' size='large'>
                        Оформить заказ
                    </Button>
                </div>
            )
            }
        </section>
    )
}

export default BurgerConstructor;