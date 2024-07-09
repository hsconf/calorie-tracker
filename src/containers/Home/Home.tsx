import {Link} from "react-router-dom";
import Card from "../../components/Card/Card";
import {useCallback, useEffect, useState} from "react";
import {ApiGetMeal, Meal} from "../types";
import axiosApi from "../../axiosApi";

const Home = () => {

    const [meals, setMeals] = useState<Meal[]>([]);

    const fetchMeals = useCallback(async () => {
        try {
            const {data} = await axiosApi.get<ApiGetMeal | null>('meal.json');

            if (data) {
                const meal = Object.keys(data).map(id => ({
                    ...data[id],
                    id
                }))
                setMeals(meal)
            }
        } catch (e) {
            console.log('Error fetch data', e);
        }
    }, []);

    useEffect(() => {
        fetchMeals()
    }, [fetchMeals]);

    console.log(meals);


    return (
        <>
            <div className="d-flex justify-content-between mt-5">
                <span>Total calories:</span>
                <Link to="/new-meal" className="btn btn-primary">Add new meal</Link>
            </div>
            <div className="mt-3">
                {meals.reverse().map((meal) => (<Card key={meal.id} type={meal.type} description={meal.description} kcal={meal.kcal} />))}
            </div>
        </>
    );
};

export default Home;