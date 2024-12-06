import React, { useState, useEffect} from "react";

function DynamicCounter(props){
    const [count, setCount] = useState(0);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('asdasd');

    const toggleTimer = () => {
        setIsTimerOn(!isTimerOn);
    };

    const getQuote = () => {
    fetch("https://api.quotable.io/quotes/random")
            .then((res) => res.json())
            .then((json) =>setCurrentQuote(JSON.stringify(json)))
    };

    useEffect(() => {
        let interval = null;
        if (isTimerOn)
            interval = setInterval(() => {            
                setCount((count) =>count + 1);            
            }, 1000);
        return () => clearInterval(interval);
    }, [count, isTimerOn])

    return(
        <div className="Dynamic-timer">
            <h4 className="main-block-header">Динамический счетчик {isTimerOn}</h4>            
            <p className="main-block-text">Счетчик: {count}</p>
            <p className="main-block-text">{currentQuote}</p>
            <button className="main-button" onClick={function(){if (count<100) {setCount(count + 1)}}}>Увеличить</button>
            <button className="main-button" onClick={function(){if (count>0) {setCount(count - 1)}}}>Уменьшить</button>
            <button className="main-turn-on" onClick = {toggleTimer}>Включить таймер</button>
            <button className="main-citate" onClick = {getQuote}>Получить случайную цитату</button>
        </div>
    );
}

export default DynamicCounter;