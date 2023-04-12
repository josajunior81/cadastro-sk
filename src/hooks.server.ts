import { pb } from '$lib/pb';
import type { Handle } from '@sveltejs/kit';
 
export const handle = (async ({ event, resolve }) => {
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && await pb.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
    }

    event.locals.pb = pb
    event.locals.user = pb.authStore.model
    
    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', pb.authStore.exportToCookie({ secure: false, httpOnly: false }));

    return response;

}) satisfies Handle;