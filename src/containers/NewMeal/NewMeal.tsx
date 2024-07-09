import {useState} from "react";
import {ApiMeal} from "../types";
import axiosApi from "../../axiosApi";

const NewMeal = () => {

    const  [mealType, setMealType] = useState(['Breakfast', 'Snack', 'Lunch', 'Dinner']);
    const [meal, setMeal] = useState<ApiMeal>({
        type: '',
        description: '',
        kcal: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setMeal(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            axiosApi.post<ApiMeal>('/meal.json', meal)
            setMeal({
                type: '',
                description: '',
                kcal: ''
            })
        } catch (e) {
            console.log('Error in form', e);
        }
    }

    return (
        <div className="mt-5">
            <h3 className="text-center">Add / Edit meal</h3>
            <form className="d-flex flex-column justify-content-center align-items-center gap-1" onSubmit={handleSubmit}>
                <select className="custom-select mt-5" name="type" required onChange={handleChange} value={meal.type}>
                    <option value="">Select type</option>
                    {mealType.map(meal => (<option key={meal} value={meal}>{meal}</option>))}
                </select>
                <label htmlFor="desc">Description</label>
                    <textarea name="description" id="desc" cols="30" rows="10" required onChange={handleChange} value={meal.description}></textarea>
                <label htmlFor="kcal">Kcal</label>
                    <input type="number" name="kcal" id="kcal" required onChange={handleChange} value={meal.kcal}/>
                <button type="submit" className="btn btn-primary mt-1">Enter</button>
            </form>
        </div>
    );
};

export default NewMeal;