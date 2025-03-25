<script lang="ts">
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';
    import { addContact } from '$lib/stores/contacts';

    // Déclaration des champs du formulaire et des erreurs
    const name = writable('');
    const email = writable('');
    const message = writable('');
    const errors = writable({ name: '', email: '', message: '' });
    const successMessage = writable('');
    const errorMessage = writable('');

    // Fonction pour gérer la soumission du formulaire
    async function handleSubmit(event: Event) {
        event.preventDefault();

        // Réinitialiser les erreurs et les messages
        let hasError = false;
        const currentErrors = { name: '', email: '', message: '' };
        successMessage.set('');
        errorMessage.set('');

        // Validation des champs
        $name.trim() === ''
            ? (currentErrors.name = 'Le nom est requis.', (hasError = true))
            : (currentErrors.name = '');

        $email.trim() === '' || !$email.includes('@')
            ? (currentErrors.email = "L'email doit être valide.", (hasError = true))
            : (currentErrors.email = '');

        $message.trim() === ''
            ? (currentErrors.message = 'Le message est requis.', (hasError = true))
            : (currentErrors.message = '');

        // Mise à jour des erreurs
        errors.set(currentErrors);

        // S'il n'y a pas d'erreur, soumettre les données
        if (!hasError) {
            try {
                const contact = {
                    id: Date.now().toString(), // Générer un ID unique
                    name: $name,
                    email: $email,
                    message: $message
                };

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                });

                if (!response.ok) {
                    throw new Error('Failed to send contact');
                }

                // Ajouter le contact au store
                addContact(contact);

                // Réinitialiser les champs du formulaire
                name.set('');
                email.set('');
                message.set('');
                errors.set({ name: '', email: '', message: '' });
                successMessage.set('Votre message a bien été envoyé !');
            } catch (error) {
                console.error('Erreur lors de l\'envoi du contact :', error);
                errorMessage.set('Erreur lors de la soumission du formulaire. Réessayez plus tard.');
            }
        }
    }
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

<h1 class="align-text-center">Contact</h1>
<p class="align-text-center">Vous pouvez nous contacter à contact@exemple.fr</p>

<form on:submit={handleSubmit} class="contact-form">
    <div>
        <label for="name">Nom</label>
        <input
                type="text"
                id="name"
                bind:value={$name}
                placeholder="Votre nom"
                class:invalid={$errors.name}
        />
        {#if $errors.name}
            <p class="error">{$errors.name}</p>
        {/if}
    </div>

    <div>
        <label for="email">Email</label>
        <input
                type="email"
                id="email"
                bind:value={$email}
                placeholder="Votre email"
                class:invalid={$errors.email}
        />
        {#if $errors.email}
            <p class="error">{$errors.email}</p>
        {/if}
    </div>

    <div>
        <label for="message">Message</label>
        <textarea
                id="message"
                bind:value={$message}
                placeholder="Votre message"
                class:invalid={$errors.message}
        ></textarea>
        {#if $errors.message}
            <p class="error">{$errors.message}</p>
        {/if}
    </div>

    <button type="submit">Envoyer</button>
    {#if $successMessage}
        <p class="success">{$successMessage}</p>
    {/if}
    {#if $errorMessage}
        <p class="error">{$errorMessage}</p>
    {/if}
</form>

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

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 500px;
        margin: auto;
    }

    label {
        font-weight: bold;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    input.invalid,
    textarea.invalid {
        border-color: red;
    }

    .error {
        color: red;
        font-size: 0.875rem;
    }

    button {
        padding: 0.75rem;
        font-size: 1rem;
        color: white;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>