import { writable } from 'svelte/store';
import { ApiService } from '../services/api'; // Importez vos services API

// Définir le type pour une recipe
export interface Recipe {
    id: string;
    name: string;
    ingredientsId: string[]; // Liste des ID d'ingrédients
    description: string;
    step: string;
    categoriesId: string[]; // Liste des ID de catégories
    time: number; // Temps en minutes
    origin: string; // Origine de la recipe
}

// Store pour les recipes
const recipeStore = writable<Recipe[]>([]);

// Fonction pour charger toutes les recipes depuis l'API
export const getRecipe = async () => {
    try {
        const response = await fetch('/api/recipe'); // Appel via le proxy
        if (!response.ok) {
            throw new Error('Failed to fetch the recipe');
        }
        const data = await response.json();
        recipeStore.set(data); // Met à jour le store avec les données reçues
    } catch (error) {
        console.error('Erreur:', error);
        recipeStore.set([]); // Met les recipes comme étant "vides" en cas d'erreur
    }

};

// Fonction pour récupérer une recipe par ID
export async function getRecipeById(id: string): Promise<Recipe | null> {
    try {
        // Obtenez les recipes actuelles depuis le store
        let currentRecipes: Recipe[] = [];
        recipeStore.subscribe((recipes) => {
            currentRecipes = recipes;
        })();

        // Cherchez si la recipe existe déjà dans le store
        const recipe = currentRecipes.find((recipe) => recipe.id === id);

        if (recipe) {
            return recipe; // Retournez directement si elle est trouvée dans le store
        }

        // Si la recipe n'est pas chargée, la chercher via une API
        const response = await fetch(`/api/recipe/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the recipe by ID');
        }

        const fetchedRecipe: Recipe = await response.json();

        // Mettez à jour le store avec la nouvelle recipe
        recipeStore.update((recipes) => [...recipes, fetchedRecipe]);

        return fetchedRecipe;
    } catch (error) {
        console.error('Erreur lors de la récupération de la recipe par ID :', error);
        return null; // Retourne null en cas d'erreur
    }
}

// Fonction pour ajouter une nouvelle recipe
export async function addRecipe(recipe: Omit<Recipe, 'id'>) {
    try {
        const newRecipe = await ApiService.createRecipe(recipe); // Appel API
        recipeStore.update((recipes) => [...recipes, newRecipe]); // Ajoute la nouvelle recipe au store
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la recipe :', error);
    }
}

// Fonction pour mettre à jour une recipe
export async function updateRecipe(id: string, updatedData: Partial<Recipe>) {
    try {
        const updatedRecipe = await ApiService.updateRecipe(id, updatedData); // Appel API
        recipeStore.update((recipes) =>
            recipes.map((recipe) =>
                recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
            )
        );
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la recipe :', error);
    }
}

// Fonction pour supprimer une recipe
export async function removeRecipe(id: string) {
    try {
        await ApiService.deleteRecipe(id); // Appel API
        recipeStore.update((recipes) =>
            recipes.filter((recipe) => recipe.id !== id)
        );
    } catch (error) {
        console.error('Erreur lors de la suppression de la recipe :', error);
    }
}

export default {
    subscribe: recipeStore.subscribe,
    getRecipe,
    getRecipeById,
    addRecipe,
    updateRecipe,
    removeRecipe
};