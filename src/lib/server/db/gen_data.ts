import { db, schema } from '.';

import { PokemonClient } from 'pokenode-ts';

const pokemonClient = new PokemonClient();

export async function allTypes() {
	// TODO: Add type effectiveness data
	const typesList = (await pokemonClient.listTypes()).results;

	typesList.map(async (type) => {
		const data = await pokemonClient.getTypeByName(type.name);
		await db.insert(schema.types).values({
			id: data.id,
			name: data.name
		});
	});

	console.log('types done');
}

export async function pokemonSpecies(max: number = 10) {
	for (let i = 1; i <= max; i++) {
		const species = await pokemonClient.getPokemonSpeciesById(i);
		await db.insert(schema.pokemonSpecies).values({
			id: species.id,
			name: species.names.find((n) => n.language.name === 'en')!.name.toLowerCase(),
			category: species.genera.find((g) => g.language.name === 'en')!.genus.toLowerCase(),
			isMythical: species.is_mythical,
			isLegendary: species.is_legendary
		});

		species.varieties.forEach((variety) => {
			pokemon(variety.pokemon.name, species.id);
		});
	}
}

async function pokemon(name: string, speciesId: number) {
	const pokemon = await pokemonClient.getPokemonByName(name);
	if (pokemon.is_default || pokemon.name.match(/(galarian|alolan|-mega|paldean)/)) {
		const form = await pokemonClient.getPokemonFormByName(pokemon.name);
		await db.insert(schema.pokemon).values({
			id: pokemon.id,
			speciesId: speciesId,
			name: pokemon.is_default ? pokemon.name : form.names.find((n) => n.language.name === 'en')!.name,
			formName: pokemon.name,
			height: pokemon.height,
			weight: pokemon.weight,
			baseExperience: pokemon.base_experience,
			isDefault: pokemon.is_default
		});

		if (pokemon.is_default) {
			pokemon.types.forEach(
				async (t) =>
					await db
						.insert(schema.speciesTypes)
						.values({ speciesId, typeId: parseInt(t.type.url.split('/').slice(-2)[0]) })
			);
		} else {
			pokemon.types.forEach(
				async (t) =>
					await db
						.insert(schema.formTypes_relation)
						.values({ formId: pokemon.id, typeId: parseInt(t.type.url.split('/').slice(-2)[0]) })
			);
		}
	}
}
