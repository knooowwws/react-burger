import React, {memo} from 'react';
import app from './app.module.css';
import AppHeader from "../appHeader/appHeader";
// import {data} from '../../utils/constants'
import fetchIngredients from '../../utils/fetchIngredients'
import MainSection from '../main-section/main'
import OrderDetails from "../order-datails/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {

    // Состояние
    const [ingredients, setIngredients] = React.useState([])
    const [ingredientDetails, setIngredientDetails] = React.useState(false);
    const [orderDetails, setOrderDetails] = React.useState(false);
    const [selectCard, setSelectCard] = React.useState(null)

    //Коллбэки
    const closePopups = React.useCallback(() => {
        setIngredientDetails(false)
        setOrderDetails(false)
    }, [])

    const handleOrderClick = React.useCallback(() => {
        setOrderDetails(true)
    }, [])

    const handleIngredientClick = React.useCallback(() => {
        setIngredientDetails(true)
    }, [])

    const handleSelectCard = React.useCallback((card) => {
        setSelectCard(card)
    }, [])

    //Эффекты
    React.useEffect(() => {
        fetchIngredients()
            .then(r => {
                return setIngredients(r.data)
            })
            .catch(er => {
                console.log(er)
            })
    }, [])

    // @ts-ignore
    const bun = React.useMemo(
        () => ingredients.filter((i) => i["type"] === 'bun'),
        [ingredients]
    );

    // @ts-ignore
    const main = React.useMemo(
        () => ingredients.filter((i) => i["type"] === 'main'),
        [ingredients]
    );

    // @ts-ignore
    const sauce = React.useMemo(
        () => ingredients.filter((i) => i["type"] === 'sauce'),
        [ingredients]
    );

    //Прочие функции
    // @ts-ignore

    // @ts-ignore



    return (
        <div className={app.app} tabIndex={0} >
            <AppHeader/>
            <MainSection
                bun={bun} main={main} sauce={sauce}
                orderDetails={handleOrderClick} ingredient={handleIngredientClick}
                onCardClick={handleSelectCard} />

            <IngredientDetails card={selectCard} onclose={closePopups} isOpen={ingredientDetails} />
            <OrderDetails isOpen={orderDetails} onclose={closePopups} />

        </div>
    );
}

export default memo(App);
