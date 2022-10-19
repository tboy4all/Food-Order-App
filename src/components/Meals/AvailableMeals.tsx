import React, { useState, useEffect } from 'react'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ]

type MealsProps = {
  id: string
  name: string
  price: number
  description: string
}
// Fetching meals from the server firebase

const AvailableMeals = () => {
  // const [meals, setMeals] = useState<any>([])
  const [meals, setMeals] = useState([] as any[])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-e1ad2-default-rtdb.firebaseio.com/meals.json'
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const responseData = await response.json()

      const loadedMeals = []
      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealLists = meals.map((meal: MealsProps) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealLists}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
