// src/lib/stores/contacts.ts
import { writable } from 'svelte/store';

// Définir le type pour un contact
export interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
}

// Store pour les contacts
const contactStore = writable<Contact[]>([]);

// Fonction pour ajouter un contact
export const addContact = (contact: Contact) => {
    contactStore.update((contacts) => [...contacts, contact]);
};

export default {
    subscribe: contactStore.subscribe,
    addContact,
};