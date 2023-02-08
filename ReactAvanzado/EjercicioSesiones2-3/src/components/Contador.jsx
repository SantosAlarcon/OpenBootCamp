import { useEffect } from "react";
import useCounter from "../hooks/useCounter";

export const Contador = () => {
    const counter = useCounter(5, 5, 100, 10);

    return (
        <div>
            <h1>{counter.valor}</h1>
            <button onClick={counter.increment}>Aumentar</button>
            <button onClick={counter.decrement}>Reducir</button>
            <button onClick={counter.reset}>Reset</button>
        </div>
    )
}

export default Contador;