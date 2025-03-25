<script>
    import { page } from '$app/stores';
    import Card from '$lib/components/Card.svelte';
    import recipesStore, { getRecipe } from '$lib/stores/recipes'; // Importer le store
    import { onMount } from 'svelte'; // Permet d'effectuer des actions à l'initialisation du composant

    // Charger les recipes à l'initialisation
    onMount(() => {
        getRecipe(); // Charge les données API dans le store
    });
</script>

<nav>
    <ul class="align-content-center">
        <li class:active={$page.url.pathname === '/'}>
            <a href="/">Accueil</a>
        </li>
        <li class:active={$page.url.pathname === '/about'}>
            <a href="/about">À propos</a>
        </li>
        <li class:active={$page.url.pathname === '/contact'}>
            <a href="/contact">Contact</a>
        </li>
    </ul>
</nav>

<h1 class="align-text-center">Nos recettes</h1>

<div class="grid">
    {#if $recipesStore.length > 0}
        {#each $recipesStore as recipe}
            <Card
                    titre={recipe.name}
                    description={recipe.description}
                    image={recipe.image || 'https://cdn-icons-png.flaticon.com/512/4936/4936882.png'}
            >
                <svelte:fragment slot="actions">
                    <a href={`/recipe/${recipe.id}`}>
                        <button>Voir détails</button>
                    </a>
                </svelte:fragment>
            </Card>
        {/each}
    {:else}
        <p>Chargement des recipes...</p>
    {/if}
</div>

<style>
    h1 {
        font-size: xxx-large;
    }

    .align-content-center {
        justify-content: center;
    }

    .align-text-center {
        text-align: center;
    }

    .grid {
        display: flex; /* Utiliser flexbox pour plus de contrôle */
        flex-wrap: wrap; /* Permet le retour à la ligne des éléments si nécessaire */
        justify-content: center; /* Centre horizontalement tout le contenu */
        gap: 1px; /* Gère l'espacement entre les cartes */
    }

    nav {
        background-color: #f5f5f5;
        padding: 1em;
    }

    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        margin-right: 1em;
    }

    .active {
        font-weight: bold;
    }

    main {
        padding: 1em;
    }
</style>