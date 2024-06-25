import React, {useState} from 'react';
import {Pizza} from "../../../models/Pizza.ts";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {EditPizzaForm} from "../EditPizzaForm.tsx";
import {usePizzaStore} from "../../../store/usePizzaStore.ts";
import {toast} from "react-toastify";

type SinglePizzaProps = {
    pizza: Pizza;
}


export const SinglePizza: React.FC<SinglePizzaProps> = ({pizza}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const updatePizza = usePizzaStore(state => state.updatePizza);
    const deletePizza = usePizzaStore(state => state.deletePizza);


    const handleToggleEdit = () => {
        setEdit(!edit);
    }

    const handleDelete = () => {
        deletePizza(pizza)
        toast.success('Pizza deleted')
    }


    return (
        <div className='pizza'>
            <img src={`/assets/images/${pizza.img}`} alt={pizza.title}/>
            <h2>{pizza.title}</h2>
            <span>{pizza.price}$</span>
            <div className='pizza-controls'>
                <button  onClick={handleToggleEdit}>
                <AiFillEdit />
                </button>
                <button onClick={handleDelete}>
                <AiFillDelete/>
                </button>
            </div>
            {edit && <EditPizzaForm data={pizza} updatePizza={updatePizza} handleToggleEdit={handleToggleEdit}/>}
        </div>
    );
};
