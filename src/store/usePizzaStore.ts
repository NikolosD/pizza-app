// usePizzaStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Pizza, PizzaStore } from '../models/Pizza';

const PIZZAS_PER_PAGE = 2;

const initialState: PizzaStore = {
    pizzaList: [],
    currentPage: 1,
    totalPages: 0,
    addPizza: () => {},
    updatePizza: () => {},
    deletePizza: () => {},
    setCurrentPage: () => {},
};

export const usePizzaStore = create<PizzaStore>()(
    persist(
        (set) => ({
            ...initialState,
            addPizza: (pizza: Pizza) => set((state) => {
                const newPizzaList = [...state.pizzaList, pizza];
                const totalPages = Math.ceil(newPizzaList.length / PIZZAS_PER_PAGE);
                return { pizzaList: newPizzaList, totalPages };
            }),

            updatePizza: (updatedPizza: Pizza) => set((state) => {
                const newPizzaList = state.pizzaList.map(pizza =>
                    pizza.id === updatedPizza.id ? updatedPizza : pizza
                );
                return { pizzaList: newPizzaList };
            }),

            deletePizza: (pizzaToDelete: Pizza) => set((state) => {
                const newPizzaList = state.pizzaList.filter(pizza => pizza.id !== pizzaToDelete.id);
                const totalPages = Math.ceil(newPizzaList.length / PIZZAS_PER_PAGE);
                const currentPage = state.currentPage > totalPages ? totalPages : state.currentPage;
                return { pizzaList: newPizzaList, totalPages, currentPage };
            }),

            setCurrentPage: (page: number) => set({ currentPage: page }),
        }),
        {
            name: 'pizza-store',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
