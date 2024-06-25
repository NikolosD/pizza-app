import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import {Pizza} from "../../models/Pizza.ts";
import {toast} from "react-toastify";
import {Separator} from "@radix-ui/themes"
type EditPizzaFormProps = {
    data: Pizza;
    updatePizza: (data: Pizza) => void;
    handleToggleEdit: () => void
}


export const EditPizzaForm: React.FC<EditPizzaFormProps> = ({data,updatePizza,handleToggleEdit}: EditPizzaFormProps) => {
    const [editPizza, setEditPizza] = useState<Pizza>(data)
    const initialPizzaRef = useRef<Pizza | null>(null);

    useEffect(() => {
        initialPizzaRef.current = { ...data };
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setEditPizza({...editPizza, [name]: value})
    }

    const handleBack = () =>{
        handleToggleEdit()
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const initialPizza = initialPizzaRef.current;

        const {title, price, img} = editPizza
        if (initialPizza && (title !== initialPizza.title || price !== initialPizza.price || img !== initialPizza.img)) {
            updatePizza(editPizza)
            handleToggleEdit()
            toast.success('Pizza changed')
        }else {
            toast.error('Something went wrong.')
        }

    }

    const isDisabled = () => {
        const initialPizza = initialPizzaRef.current;
        return !initialPizza ||
            (editPizza.title === initialPizza.title &&
                editPizza.price === initialPizza.price &&
                editPizza.img === initialPizza.img);
    }

    return (
        <form onSubmit={handleSubmit} className={'edit-form'}>
            <input name={'title'} type="text" placeholder={'Name'} onChange={handleChange} value={editPizza.title}/>
            <input name={'price'} type="text" placeholder={'Price'} onChange={handleChange} value={editPizza.price}/>
            <input name={'img'} type="text" placeholder={'Image'} onChange={handleChange} value={editPizza.img}/>
            <div style={{display:"flex", width:'100%'}}>
            <button onClick={handleBack}>Go Back</button>
            <button type={"submit"} disabled={isDisabled()}>Edit Pizza</button>
            </div>
        </form>
    )
};
