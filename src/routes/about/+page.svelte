<script>
    import { page } from '$app/stores';

    let id = $page.params.id; // ID de la recette depuis l'URL
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

<h1 class="align-text-center">À propos</h1>
<p class="align-text-center">Cette page présente des informations sur notre application.</p>

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