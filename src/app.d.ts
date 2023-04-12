// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from 'pocketbase'
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase
			user: import('pocketbase').default['authStore']['model']
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
