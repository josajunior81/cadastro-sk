import { error, redirect } from '@sveltejs/kit';
import type {Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({locals}) => {
	if(locals.pb.authStore.isValid) {
		throw redirect(303, '/')
	}
}

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const { email, password } = data as { email: string; password: string }
		let id = ""
		try {
			const authData = await locals.pb.collection('users').authWithPassword(email, password)
            id = authData.record.id
		} catch(err: any) {		
			return {error: err.response}
		}        
		throw redirect(302, `/disciples/${id}`)
	}
} satisfies Actions
