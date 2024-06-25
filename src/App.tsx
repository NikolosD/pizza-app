import React from 'react';
import './App.css';
import {usePizzaStore} from "./store/usePizzaStore.ts";
import {AddPizzaForm} from "./components/pizzas/AddPizzaForm.tsx";
import {DisplayPizzas} from "./components/pizzas/DisplayPizzas.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App: React.FC = () => {
    const addPizza = usePizzaStore(state => state.addPizza);
    return (
        <div className='App'>
            <div className='wrap'>
                <span className='heading'>Our Pizza</span>
                <AddPizzaForm addPizza={addPizza}/>
                <DisplayPizzas/>

                <ToastContainer />
            </div>
        </div>
    );
};
