import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals}) => {
	const response = await locals.pb.collection("churchs").getFullList()
	return { data: response.map(r => ({id: r.id, nickname: r.nickname})) }
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const { email, password, name, birthdate, isLeader, isPastor } = data as { email:string, password:string, name:string, birthdate:string, isLeader:string, isPastor:string }
		let userId = ""
		try {
			const newUser = await locals.pb.collection('users').create({
				email: email,
				password: password,
				passwordConfirm: password
			});
			userId = newUser.id

			await locals.pb.collection('users').authWithPassword(email, password)

			await locals.pb.collection("disciples").create({
				name: name,
				birthdate: birthdate,
				user_id: userId,
				is_leader: isLeader !== undefined ? true : false,
				is_pastor: isPastor !== undefined ? true : false
			})

		} catch(err: any) {
			await locals.pb.collection('users').delete(userId)
			return { error: err.data, data: data}
		} finally {
			locals.pb.authStore.clear()
			locals.user = null
		}

		throw redirect(303, '/login')
	}
} satisfies Actions
