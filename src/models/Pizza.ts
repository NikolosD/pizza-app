
export type Pizza = {
    id:number,
    title:string
    price: number
    img: string
}

export type PizzaStore = {
    pizzaList: Pizza[];
    currentPage: number;
    totalPages: number;
    addPizza: (pizza: Pizza) => void;
    updatePizza: (pizza: Pizza) => void;
    deletePizza: (pizza: Pizza) => void;
    setCurrentPage: (page: number) => void;
};