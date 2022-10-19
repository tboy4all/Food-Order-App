import React from 'react'
// import { MealItemProps } from '../components/Meals/MealItem/MealItem'

const CartContext = React.createContext({
  items: [] as any[],
  totalAmount: 0,
  addItem: (item: any) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
})

export default CartContext
