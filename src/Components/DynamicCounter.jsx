import React, { useState, useEffect} from "react";

function DynamicCounter(props){
    const [count, setCount] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');

    const toggleTimer = () => {
        setIsTimerOn(!isTimerOn);
    };

    const getQuote = () => {
    fetch("https://api.quotable.io/quotes/random")
            .then((res) => res.json())
            .then((json) =>setCurrentQuote(json[0]["content"]))
    };

    useEffect(() => {
        let interval = null;
        if (isTimerOn  && count<100)
            interval = setInterval(() => {            
                setCount((count) =>count + 1);            
            }, 1000);
        return () => clearInterval(interval);
    }, [count, isTimerOn])

    return(
        <div className="Dynamic-timer">
            <h1 className="main-block-header">Динамический счетчик {isTimerOn}</h1>            
            <h2 className="main-block-text">Счетчик: {count}</h2>
            <p className="main-block-text">{currentQuote}</p>
            <div className="main-buttons">
                <div>
                    <button className="main-button" onClick={function(){if (count<100) {setCount(count + 1)}}}>Увеличить</button>
                    <button className="main-button" onClick={function(){if (count>0) {setCount(count - 1)}}}>Уменьшить</button>
                </div>
                <button className="main-button" onClick = {toggleTimer}> {isTimerOn ? "Выключить" : "Включить"} таймер</button>
                <button className="main-button" onClick = {getQuote}>Получить случайную цитату</button>
            </div>
        </div>
    );
}

export default DynamicCounter;