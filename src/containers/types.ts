export interface ApiMeal {
    type: string;
    description: string;
    kcal: string;
}

export interface Meal extends ApiMeal{
    id: string;
}

export interface ApiGetMeal {
    [id: string]: ApiMeal
}