import { db, schema } from '$lib/server/db';

import { eq, sql } from 'drizzle-orm';

export async function getSpeciesList() {
	try {
		const speciesList = await db
			.select({
				id: schema.pokemonSpecies.id,
				name: schema.pokemonSpecies.name,
				isLegendary: schema.pokemonSpecies.isLegendary,
				isMythical: schema.pokemonSpecies.isMythical,
				type1: sql<number>`MIN(${schema.pokemonTypes.typeId})`,
				type2: sql<
					number | null
				>`NULLIF(MAX(${schema.pokemonTypes.typeId}), MIN(${schema.pokemonTypes.typeId}))`
			})
			.from(schema.pokemonSpecies)
			.leftJoin(schema.pokemonTypes, eq(schema.pokemonSpecies.id, schema.pokemonTypes.pokemonId))
			.groupBy(
				schema.pokemonSpecies.id,
				schema.pokemonSpecies.name,
				schema.pokemonSpecies.isLegendary,
				schema.pokemonSpecies.isMythical
			)
			.orderBy(schema.pokemonSpecies.id);

		const types = await db
			.select({
				id: schema.types.id,
				name: schema.types.name
			})
			.from(schema.types);

		return speciesList.map((species) => {
			const type1 = types.find((type) => type.id === species.type1)!.name;
			const type2 = species.type2 ? types.find((type) => type.id === species.type2)?.name : null;
			return {
				...species,
				type1,
				type2: type2 ? type2 : null
			};
		});
	} catch (error) {
		console.error('Error fetching Pokémon:', error);
		throw error;
	}
}
