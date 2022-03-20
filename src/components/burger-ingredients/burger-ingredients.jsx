import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients.module.css";
import IngredientLists from '../ingredientLists/ingredientLists'


function BurgerIngredients(props) {

    const ingredientsData = useSelector((store) => store.ingredients.allIngredients)

    const buns = React.useMemo(
        () => ingredientsData.filter((i) => i["type"] === 'bun'),
        [ingredientsData]
    );


    const main = React.useMemo(
        () => ingredientsData.filter((i) => i["type"] === 'main'),
        [ingredientsData]
    );


    const sauce = React.useMemo(
        () => ingredientsData.filter((i) => i["type"] === 'sauce'),
        [ingredientsData]
    );

    //scroll
    const [tab, setTab] = useState('buns');

    const bunRef = React.createRef(null);
    const sauceRef = React.createRef(null);
    const mainRef = React.createRef(null);

    const handleTabClick = React.useCallback(({tab, ref}) => () => {
            setTab(tab);
            ref.current.scrollIntoView({behavior: "smooth"});
        },
        [setTab]
    );

    const ingredientListScroll = (evt) => {
        const scrollContainer = evt.target;
        const scrollPosition = scrollContainer.scrollTop;
        const sauceTabPosition = sauceRef.current.offsetTop;
        const mainTabPosition = mainRef.current.offsetTop;
        const scrollSetup = 400;
        if (scrollPosition + scrollSetup <= sauceTabPosition) {
            setTab("buns");
        } else if (scrollPosition + scrollSetup <= mainTabPosition) {
            setTab("sauce");
        } else {
            setTab("main");
        }
    };


    return (
        <section className={`mt-10 pl-5 ${styles.foundation}`}>
            <h1 className={`text text_type_main-large mb-5`}>
                Соберите бургер
            </h1>
            <div className={`mb-10 ${styles.tab}`}>
                <Tab
                    value="buns"
                    active={tab === 'buns'}
                    onClick={() => handleTabClick({
                        tab: tab,
                        ref: bunRef,
                    })}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={tab === 'sauce'}
                    onClick={() => handleTabClick({
                        tab: tab,
                        ref: sauceRef,
                    })}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={tab === 'main'}
                    onClick={() => handleTabClick({
                        tab: tab,
                        ref: mainRef,
                    })}
                >
                    Начинки
                </Tab>
            </div>
            <div className={` ${styles.ingredients}`} onScroll={ingredientListScroll}>
                <IngredientLists
                    title="Булки"
                    ingredient={buns}
                    ref={bunRef}
                />
                <IngredientLists
                    title="Соусы"
                    ingredient={sauce}
                    ref={sauceRef}/>
                <IngredientLists
                    title="Начинки"
                    ingredient={main}
                    ref={mainRef}
                />
            </div>
        </section>
    );
}

export default memo(BurgerIngredients);

// BurgerIngredients.propTypes = {
//     onCardClick: PropTypes.func.isRequired,
//     openIngredientDetails: PropTypes.func.isRequired,
// };

