import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { serializeNonPOJOs } from "$lib/helpers"

export const load: PageServerLoad = (async ({ params, locals}) => {
//   if(!locals.pb.authStore.isValid) {
//   throw redirect(303, '/login')
// }
  const disciples = await locals.pb.collection("disciples").getFullList( {expand: "discipler_id,companionship"})
  return { disciples: serializeNonPOJOs(disciples) }
}) satisfies PageServerLoad
