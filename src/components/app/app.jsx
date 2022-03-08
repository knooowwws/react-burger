import React, {memo} from 'react';
import app from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import fetchIngredients, {postUrl} from '../../utils/fetchIngredients'
import MainSection from '../main-section/main'
import OrderDetails from "../order-datails/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {OrderContext} from "../../services/orderContext";
import {ProductContext} from "../../services/productContext";

function App() {

    // Состояние
    const [ingredients, setIngredients] = React.useState([])
    const [ingredientDetails, setIngredientDetails] = React.useState(false);
    const [orderDetails, setOrderDetails] = React.useState(false);
    const [selectCard, setSelectCard] = React.useState(null)
    const [orderInfo, setOrderInfo] = React.useState({
        orderNum: null,
        creatingOrder: false,
        errorMessage: "",
    })

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


    //Прочие функции

    const makeOrder = async () => {
        const orderList = ingredients
            .filter((i) => i.type !== "bun")
            .map((i) => i._id)
            .concat(
                ingredients.find((i) => (i.type === "bun" ? i : 0))._id,
                ingredients.find((i) => (i.type === "bun" ? i : 0))._id
            )

        const orderOption = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ingredients: orderList,
            }),
        }

        try {
            setOrderInfo({orderNum: null, creatingOrder: true, errorMessage: ''});
            const res = await fetch(`${postUrl}`, orderOption);
            if (res.ok) {
                const serverOrder = await res.json();
                setOrderInfo({
                    ...orderInfo,
                    creatingOrder: false,
                    orderNum: serverOrder,
                });
            } else {
                throw new Error('Ответ сети был не ok.');
            }
        } catch (error) {
            setOrderInfo({orderNum: null, creatingOrder: false, errorMessage: error});
        }
        handleOrderClick()
    }


    return (
        <div className={app.app} tabIndex={0}>
            <AppHeader/>
            <ProductContext.Provider value={ingredients}>
                <MainSection
                    orderDetails={makeOrder} ingredient={handleIngredientClick}
                    onCardClick={handleSelectCard}/>
            </ProductContext.Provider>
            {ingredientDetails && (
                <Modal title={'Детали ингридиента'} onClose={closePopups} isOpen={ingredientDetails}>
                    <IngredientDetails card={selectCard}/>
                </Modal>
            )}
            {orderDetails && (
                <OrderContext.Provider value={orderInfo}>
                    <Modal title={''} onClose={closePopups} isOpen={orderDetails}>
                        <OrderDetails/>
                    </Modal>
                </OrderContext.Provider>
            )}

        </div>
    );
}

export default memo(App);
