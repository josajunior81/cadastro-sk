import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { serializeNonPOJOs } from '$lib/helpers';

export const load: PageServerLoad = (async ({ params, locals}) => {
    if(!locals.pb.authStore.isValid) {
		throw redirect(303, '/login')
	}
	const disciple = await locals.pb.collection("disciples").getFirstListItem(`user_id="${params.id}"`, {expand: 'user_id, discipler_id, companionship'})
	const disciples = await  locals.pb.collection("disciples").getFullList()
	return { profile: serializeNonPOJOs(disciple), disciples: serializeNonPOJOs(disciples) }
}) satisfies PageServerLoad


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const {id, discipler, companions } = data as {id:string, discipler:string, companions:string}
		console.log(id, discipler, companions)
		const comps = companions.split(",")

		try {
			await locals.pb.collection('disciples').update(id, {discipler_id: discipler, companionship: comps });
		} catch(err: any) {
			console.log(err.data)
			return { error: err.data, data: data}
		} 
	}
} satisfies Actions