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

            if (data == null) {
                setMeals([])
            } else {
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

    const kcalCalculate = meals.map(kcal => {return parseFloat(kcal.kcal)}).reduce((acc, kcal) => acc + kcal, 0);
    console.log(kcalCalculate);
    const deleteCard = async (id: string) => {
        await axiosApi.delete(`meal/${id}.json`);
        fetchMeals()
    }


    return (
        <>
            <div className="d-flex justify-content-between mt-5">
                <span>Total calories: {kcalCalculate}</span>
                <Link to="/new-meal" className="btn btn-primary">Add new meal</Link>
            </div>
            <div className="mt-3">
                {meals.reverse().map((meal) => (<Card key={meal.id} type={meal.type} description={meal.description} kcal={meal.kcal} delBtn={() => deleteCard(meal.id)} />))}
            </div>
        </>
    );
};

export default Home;