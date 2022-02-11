import React, {memo} from 'react';
import app from './app.module.css';
import AppHeader from "../appHeader/appHeader";
// import {data} from '../../utils/constants'
import Api from '../../utils/api'
import MainSection from '../main-section/main'
import Modal from '../modal/modal'
import Order from "../order/order";
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

    const handleOrderDetails = React.useCallback(() => {
        setOrderDetails(true)
    }, [])

    const handleIngredientDetails = React.useCallback(() => {
        setIngredientDetails(true)
    }, [])

    const handleSelectCard = React.useCallback((card) => {
        setSelectCard(card)
    }, [])

    //Эффекты
    React.useEffect(() => {
        Api()
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
    function closePopupEsc(evt) {
        if (evt.key === 'Escape') {
            closePopups();
        }
    }

    // @ts-ignore
    function closePopupClickOnOverlay(evt) {
        if (evt.target.matches('.popup')) {
            closePopups();
        }
    }


    return (
        <div className={app.app} onKeyDown={closePopupEsc} onClick={closePopupClickOnOverlay} tabIndex={0} >
            <AppHeader/>
            <MainSection
                bun={bun} main={main} sauce={sauce}
                orderDetails={handleOrderDetails} ingredientDetails={handleIngredientDetails}
                onCardClick={handleSelectCard} />
            <Modal title={''} closePopup={closePopups} isOpen={orderDetails}>
                <Order/>
            </Modal>
            <Modal title={'Добавить ингредиенты'} closePopup={closePopups} isOpen={ingredientDetails}>
                <IngredientDetails card={selectCard}/>
            </Modal>
        </div>
    );
}

export default App;
