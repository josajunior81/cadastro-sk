import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals}) => {
	const response = await locals.pb.collection("churchs").getFullList()
	return { churchs: response.map(r => ({value: r.id, name: r.nickname})) }
}) satisfies PageServerLoad

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const { email, password, name, birthdate, isLeader, isPastor, churchId } = data as { email:string, password:string, name:string, birthdate:string, isLeader:string, isPastor:string, churchId:string }
		console.log(data)
		let userId = ""
		try {
			const newUser = await locals.pb.collection('users').create({
				email: email,
				password: password,
				passwordConfirm: password
			});
			userId = newUser.id

			await locals.pb.collection('users').authWithPassword(email, password)

			const disciple = await locals.pb.collection("disciples").create({
				name: name,
				birthdate: birthdate,
				user_id: userId,
				is_leader: isLeader !== undefined ? true : false,
				is_pastor: isPastor !== undefined ? true : false,
				church_id: churchId
			})

			await locals.pb.collection("users").update(newUser.id, {disciple_id: disciple.id})

		} catch(err: any) {
			console.log(err)
			await locals.pb.collection('users').delete(userId)
			return { error: err.data, data: data}
		} finally {
			locals.pb.authStore.clear()
			locals.user = null
		}

		throw redirect(303, '/login')
	}
} satisfies Actions
