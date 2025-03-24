<script>
    import { page } from '$app/stores';
    import Card from '$lib/components/Card.svelte';

    const produits = [
        {
            id: 1,
            titre: "Produit 1",
            description: "Description du produit 1",
            image: "https://picsum.photos/300/200?random=1"
        },
        {
            id: 2,
            titre: "Produit 2",
            description: "Description du produit 2",
            image: "https://picsum.photos/300/200?random=2"
        },
        {
            id: 3,
            titre: "Produit 3",
            description: "Description du produit 3",
            image: "https://picsum.photos/300/200?random=3"
        }
    ];
</script>

<nav>
    <ul>
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

<h1>Nos produits</h1>

<div class="grid">
    {#each produits as produit}
        <Card
                titre={produit.titre}
                description={produit.description}
                image={produit.image}
        >
            <svelte:fragment slot="actions">
                <a href={`/produit/${produit.id}`}>
                    <button>Voir détails</button>
                </a>
            </svelte:fragment>
        </Card>
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1em;
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