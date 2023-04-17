import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

const pb = new PocketBase('https://pb-cadastro.fly.dev');

export default pb
export const currentUser = writable(pb.authStore.model)