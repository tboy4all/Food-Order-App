import React, { useReducer } from 'react'
import CartContext from './cart-context'

type Props = {
  children: React.ReactNode
}

// type defaultCartStateProps = {
//   items: never[]
//   totalAmount: number
// }

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

// type Actions = defaultCartStateProps

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD': {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount

      const existingCartItemIndex = state.items.findIndex(
        (item: any) => item.id === action.item.id
      )
      const existingCartItem = state.items[existingCartItemIndex]
      let updatedItems

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        updatedItems = state.items.concat(action.item)
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    case 'REMOVE': {
      const existingCartItemIndex = state.items.findIndex(
        (item: any) => item.id === action.id
      )
      const existingItem = state.items[existingCartItemIndex]
      const updatedTotalAmount = state.totalAmount - existingItem.price
      let updatedItems
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item: any) => item.id !== action.id)
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    case 'CLEAR': {
      return defaultCartState
    }
  }
  return defaultCartState
}

const CartProvider = ({ children }: Props) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultCartState
  )
  const addItemToCartHandler = (item: string | number) => {
    dispatchCartActions({ type: 'ADD', item: item })
  }

  const removeItemFromCartHandler = (id: any) => {
    dispatchCartActions({ type: 'REMOVE', id: id })
  }

  const clearCartHandler = () => {
    dispatchCartActions({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

export default CartProvider
