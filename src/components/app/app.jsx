import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";

import app from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import MainSection from '../main-section/main'
import OrderDetails from "../order-datails/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import {getItems} from "../../services/actions/ingredients";
import {CLEAR_ORDER_NUMBER, DEL_VIEWED_INGREDIENT} from "../../services/actions";
import {Login} from "../pages/login/login";
import {Register} from "../pages/register/register";
import {ForgotPassword} from "../pages/forgot-password/forgot-password";
import {ResetPassword} from "../pages/reset-password/reset-password";
import {Profile} from "../pages/profile/profile";
import {ProtectedRoute} from "../protected-route/protected-route";


function App() {

    // Состояние
    const dispatch = useDispatch()

    const orderDetails = useSelector(store => store.order.orderModalOpen)
    const ingredientDetails = useSelector(store => store.ingredients.ingredientModalOpen)

    //Коллбэки


    //Эффекты

    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    //Прочие функции

    const closeAllPopups = React.useCallback(() => {
        dispatch({type: DEL_VIEWED_INGREDIENT});
        dispatch({type: CLEAR_ORDER_NUMBER});
    }, [dispatch]);


    return (
        <div className={app.app} tabIndex={0}>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<MainSection/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="profile" element={<ProtectedRoute path={'login'}>
                    <Profile/>
                </ProtectedRoute>}/>
            </Routes>
            {ingredientDetails && (
                <Modal title={'Детали ингридиента'} onClose={closeAllPopups} isOpen={ingredientDetails}>
                    <IngredientDetails card={''}/>
                </Modal>
            )}
            {orderDetails && (
                <Modal title={''} onClose={closeAllPopups} isOpen={orderDetails}>
                    <OrderDetails/>
                </Modal>
            )}

        </div>
    );
}

export default memo(App);
