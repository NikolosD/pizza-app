import React from 'react';
import {Pizza} from "../../models/Pizza.ts";
import {usePizzaStore} from "../../store/usePizzaStore.ts";
import {SinglePizza} from "./pizza/SinglePizza.tsx";


const PIZZAS_PER_PAGE = 2;

type DisplayPizzasProps = {};

export const DisplayPizzas: React.FC<DisplayPizzasProps> = ({}: DisplayPizzasProps) => {
    const pizzaList = usePizzaStore(state => state.pizzaList);
    const currentPage = usePizzaStore(state => state.currentPage);
    const totalPages = usePizzaStore(state => state.totalPages);
    const setCurrentPage = usePizzaStore(state => state.setCurrentPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * PIZZAS_PER_PAGE;
    const currentPizzas = pizzaList.slice(startIndex, startIndex + PIZZAS_PER_PAGE);

    return (
        <div className='container'>
            {currentPizzas.map((pizza: Pizza) => (
                <SinglePizza
                    pizza={pizza}
                    key={pizza.id}
                />
            ))}
            {totalPages > 1 && <div className='pagination'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            }
        </div>
    );
};
