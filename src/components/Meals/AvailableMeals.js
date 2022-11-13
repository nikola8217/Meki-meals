import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import { useState, useEffect } from 'react'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch('https://meki-meals-default-rtdb.firebaseio.com/meals.json')

        if(!response.ok) {
          throw new Error('Something went wrong!')
        }
        
        const data = await response.json()

        const loadedMeals = []

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price 
          })
        }

        setMeals(loadedMeals)
        setIsLoading(false)
      }

      fetchMeals().catch((error) => {
        setHttpError(error.message)
        setIsLoading(false)
      })
    }, [])

    if(isLoading) {
      return <section className={classes.loading}>
        <h4>Loading...</h4>
      </section>
    }

    if(httpError) {
      return <section className={classes.error}>
        <h4>{httpError}</h4>
      </section>
    }


    const mealsList = meals.map((meal) => (
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
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals