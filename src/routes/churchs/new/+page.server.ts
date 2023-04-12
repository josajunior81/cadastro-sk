import pb from '$lib/pb';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const response = await pb.collection("churchs").getFullList()
	return { data: response.map(r => ({id: r.id, nickname: r.nickname})) }
}) satisfies PageServerLoad

export const actions: Actions = {
	defautl: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		try {
			const newChurch = await pb.collection('church').create({
				nickname: data.email as string,
				meeting_time: data.password as string,
				meeting_day: data.password as string
			});
		} catch(err: any) {
			console.log(err.data)			
			return { data: err.data}
		}
	}
} satisfies Actions
