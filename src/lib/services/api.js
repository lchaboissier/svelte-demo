export async function request(endpoint, method = 'GET', data = null, options = {}) {
    const API_BASE_URL = 'http://localhost:8000'; // URL backend
    const defaultHeaders = {
        'Content-Type': 'application/json', // Indique qu'on envoie du JSON
        Accept: 'application/json', // On attend une réponse JSON
    };

    // Fusionner les headers
    const headers = Object.assign({}, defaultHeaders, options.headers);

    // Construire les options de la requête
    const fetchOptions = {
        method: method, // Méthode HTTP
        headers: headers, // En-têtes
        mode: 'cors', // Obligatoire pour cross-origin
    };

    // Ajouter le corps de la requête si nécessaire (pour POST, PUT, etc.)
    if (data) {
        fetchOptions.body = JSON.stringify(data);
    }

    const url = `${API_BASE_URL}${endpoint}`;

    try {
        console.log('↓ Requête envoyée :', { url, fetchOptions });

        const response = await fetch(url, fetchOptions);

        // Log de la réponse HTTP
        console.log('→ Statut de la réponse :', response.status, response.statusText);

        if (!response.ok) {
            // Lever une erreur si le statut HTTP n'est pas 2xx
            throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
        }

        // Tenter un parsing JSON de la réponse
        const result = await response.json();
        console.log('→ Données reçues :', result);
        return result;
    } catch (error) {
        // Gestion des erreurs réseau ou serveur
        console.error('Erreur lors de la requête API :', error.message);
        throw error;
    }
}

/**
 * API Service avec des routes simples pour recipe, ingredient et category.
 */
export const ApiService = {
    // Opérations pour /recipe
    getRecipes: () => request('/recipe'),
    getRecipeById: (id) => request(`/recipe/${id}`),
    createRecipe: (data) => request('/recipe', 'POST', data),
    updateRecipe: (id, data) => request(`/recipe/${id}`, 'PUT', data),
    deleteRecipe: (id) => request(`/recipe/${id}`, 'DELETE'),

    // Opérations pour /ingredient
    getIngredients: () => request('/ingredient'),
    getIngredientById: (id) => request(`/ingredient/${id}`),
    createIngredient: (data) => request('/ingredient', 'POST', data),
    updateIngredient: (id, data) => request(`/ingredient/${id}`, 'PUT', data),
    deleteIngredient: (id) => request(`/ingredient/${id}`, 'DELETE'),

    // Opérations pour /category
    getCategories: () => request('/category'),
    getCategoryById: (id) => request(`/category/${id}`),
    createCategory: (data) => request('/category', 'POST', data),
    updateCategory: (id, data) => request(`/category/${id}`, 'PUT', data),
    deleteCategory: (id) => request(`/category/${id}`, 'DELETE'),
};


export default ApiService;