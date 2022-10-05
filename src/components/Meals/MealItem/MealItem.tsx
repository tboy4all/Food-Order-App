import React, { useContext } from 'react'
import CartContext from '../../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

export interface MealItemProps {
  id: string
  name: string
  description: string
  price: number
}

const MealItem = ({ name, description, price, id }: MealItemProps) => {
  const cartCtx = useContext(CartContext)

  const prices = `$${price.toFixed(2)}`

  const addToCarthandler = (amount: number) => {
    cartCtx.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    })
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{prices}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCarthandler} />
      </div>
    </li>
  )
}

export default MealItem
