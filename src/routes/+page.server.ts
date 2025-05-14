import type { PageServerLoad } from './$types';

import { getSpeciesList } from '$lib';

export const load = (async () => {
	return {
		pokemonSpeciesList: getSpeciesList()
	};
}) satisfies PageServerLoad;
