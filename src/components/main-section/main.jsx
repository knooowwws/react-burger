import React, {memo} from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import style from './main.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function MainSection() {
    return (
        <main className={style.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor />
            </DndProvider>
        </main>
    )
}

export default memo(MainSection)
