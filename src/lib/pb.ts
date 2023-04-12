import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('https://pb-cadastro.fly.dev');

export const currentUser = writable(pb.authStore.model)