import '../styles.css'
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Pizza} from "../../models/Pizza.ts";

const initState = {
    title: '',
    price: undefined,
    img: '',
}

type Props = {
    addPizza: (newPizza: Pizza) => void
}
export const AddPizzaForm: FC<Props> = ({addPizza}) => {

    const [newPizza, setNewPizza] = useState<{ title: string, price: number | undefined, img: string }>(initState)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.currentTarget
        setNewPizza({
            ...newPizza,
            [name]: value
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {title,price, img} = newPizza
        if(title && price && img ){
            addPizza({id: Date.now(), title, price, img})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name={'title'} type="text" placeholder={'Name'} onChange={handleChange} value={newPizza.title}/>
            <input name={'price'} type="text" placeholder={'Price'} onChange={handleChange} value={newPizza.price}/>
            <input name={'img'} type="text" placeholder={'Image'} onChange={handleChange} value={newPizza.img}/>

            <button type={"submit"}>+Add to Menu</button>
        </form>
    )
}