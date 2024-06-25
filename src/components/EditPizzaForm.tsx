import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Pizza} from "../models/Pizza.ts";

type EditPizzaFormProps = {
    data: Pizza;
    updatePizza: (data: Pizza) => void;
    handleToggleEdit: () => void
}


export const EditPizzaForm: React.FC<EditPizzaFormProps> = ({data,updatePizza,handleToggleEdit}: EditPizzaFormProps) => {
    const [editPizza, setEditPizza] = useState<Pizza>(data)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setEditPizza({...editPizza, [name]: value})
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {title, price, img} = editPizza
        if(title && price && img){
            updatePizza(editPizza)
            handleToggleEdit()
        }
    }

    return (
        <form onSubmit={handleSubmit} className={'edit-form'}>
            <input name={'title'} type="text" placeholder={'Name'} onChange={handleChange} value={editPizza.title}/>
            <input name={'price'} type="text" placeholder={'Price'} onChange={handleChange} value={editPizza.price}/>
            <input name={'img'} type="text" placeholder={'Image'} onChange={handleChange} value={editPizza.img}/>

            <button type={"submit"}>Edit Pizza</button>
        </form>
    )
};
