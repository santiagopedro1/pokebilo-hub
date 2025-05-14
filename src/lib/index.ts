import { db, schema } from '$lib/server/db';

import { eq, sql } from 'drizzle-orm';

export async function getAllPokemon({ limit = 0, offset = 0 }) {
	try {
		// Get basic Pokémon data with join to species
		let query = db
			.select({
				id: schema.pokemon.id,
				name: schema.pokemon.name,
				height: schema.pokemon.height,
				weight: schema.pokemon.weight,
				baseExperience: schema.pokemon.baseExperience,
				species: {
					id: schema.pokemonSpecies.id,
					name: schema.pokemonSpecies.name,
					isLegendary: schema.pokemonSpecies.isLegendary,
					isMythical: schema.pokemonSpecies.isMythical
				}
			})
			.from(schema.pokemon)
			.innerJoin(schema.pokemonSpecies, eq(schema.pokemon.speciesId, schema.pokemonSpecies.id))
			.orderBy(schema.pokemon.id)
			.limit(limit)
			.offset(offset);

		return query;

		const pokemonList = await query;

		// Enhance each Pokémon with additional data
		const enhancedPokemonList = await Promise.all(
			pokemonList.map(async (pokemon) => {
				// Get stats
				const stats = await db.select().from(schema.formStats).where(eq(schema.formStats.formId, pokemon.id)).get();

				// Get types
				const types = await db
					.select({
						id: schema.types.id,
						name: schema.types.name
					})
					.from(schema.speciesTypes)
					.innerJoin(schema.types, eq(schema.speciesTypes.typeId, schema.types.id))
					.where(eq(schema.speciesTypes.speciesId, pokemon.species.id));

				// Return enhanced Pokémon object
				return {
					...pokemon,
					stats: stats || {},
					types
				};
			})
		);

		return enhancedPokemonList;
	} catch (error) {
		console.error('Error fetching Pokémon:', error);
		throw error;
	}
}

export async function getSpeciesList() {
	try {
		const speciesList = await db
			.select({
				id: schema.pokemonSpecies.id,
				name: schema.pokemonSpecies.name,
				isLegendary: schema.pokemonSpecies.isLegendary,
				isMythical: schema.pokemonSpecies.isMythical,
				type1: sql<number>`MIN(${schema.speciesTypes.typeId})`,
				type2: sql<number | null>`NULLIF(MAX(${schema.speciesTypes.typeId}), MIN(${schema.speciesTypes.typeId}))`
			})
			.from(schema.pokemonSpecies)
			.leftJoin(schema.speciesTypes, eq(schema.pokemonSpecies.id, schema.speciesTypes.speciesId))
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
