import {useCallback, useEffect, useState} from "react";
import {ApiMeal} from "../types";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const NewMeal = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const  mealType = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];
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

    const patch = useCallback(async () => {
        if (id) {
            try {
                const response = await axiosApi.get(`/meal/${id}.json`);
                const data = response.data;
                setMeal(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [id]);

    useEffect(() => {
        patch();
    }, [patch]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setSpinner(true);
            if (id) {
                axiosApi.put<ApiMeal>(`/meal/${id}.json`, meal)
                navigate('/')
            } else {
                axiosApi.post<ApiMeal>('/meal.json', meal)
                setMeal({
                    type: '',
                    description: '',
                    kcal: ''
                })
            }
        } catch (e) {
            console.log('Error in form', e);
        }
        setSpinner(false)
    }

    if (spinner) {
        return <Spinner />
    }

    return (
        <div className="mt-5">
            <h3 className="text-center">Add / Edit meal</h3>
            <form className="d-flex flex-column align-items-center gap-1 border px-1 pb-4" style={{width: '310px', margin: '0 auto', background: '#ccc'}} onSubmit={handleSubmit}>
                <select className="custom-select mt-5" style={{width: '300px'}} name="type" required onChange={handleChange} value={meal.type}>
                    <option value="">Select type</option>
                    {mealType.map(meal => (<option key={meal} value={meal}>{meal}</option>))}
                </select>
                <label htmlFor="desc">Description</label>
                    <textarea name="description" id="desc" style={{width: '300px'}} required onChange={handleChange} value={meal.description}></textarea>
                <label htmlFor="kcal">Kcal</label>
                    <input type="number" name="kcal" id="kcal" style={{width: '300px'}} required onChange={handleChange} value={meal.kcal}/>
                <button type="submit" className="btn btn-primary mt-1" style={{width: '300px'}}>Enter</button>
            </form>
        </div>
    );
};

export default NewMeal;