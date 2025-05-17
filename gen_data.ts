import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './src/lib/server/db/schema';

import { PokemonClient } from 'pokenode-ts';

const db = drizzle(process.env.DATABASE_URL!, { schema, mode: 'default' });

const pokemonClient = new PokemonClient();

function get_id_from_url(url: string) {
	return parseInt(url.split('/').slice(-2)[0]);
}

const damage_relation_map = {
	double_damage_from: 2,
	double_damage_to: 2,
	half_damage_from: 0.5,
	half_damage_to: 0.5,
	no_damage_from: 0,
	no_damage_to: 0
};

async function insertTypes() {
	const typesList = (await pokemonClient.listTypes()).results;

	for (const type of typesList) {
		const data = await pokemonClient.getTypeByName(type.name);
		await db.insert(schema.types).values({
			id: data.id,
			name: data.name
		});
	}

	console.log('types done');
}

async function insertTypeRelations() {
	const typesList = (await pokemonClient.listTypes()).results;

	for (const type of typesList) {
		const data = await pokemonClient.getTypeByName(type.name);
		for (const [key, value] of Object.entries(data.damage_relations)) {
			// Skip the "from" relations
			if (key.includes('from')) continue;

			if (value.length > 0) {
				for (const relation of value) {
					const typeId = get_id_from_url(relation.url);
					const effectiveness = damage_relation_map[key as keyof typeof damage_relation_map];
					await db.insert(schema.typeEffectiveness).values({
						attackingTypeId: data.id,
						defendingTypeId: typeId,
						effectiveness
					});
				}
			}
		}
	}

	console.log('type relations done');
}

async function pokemonSpecies(max: number) {
	for (let i = 1; i <= max; i++) {
		const species = await pokemonClient.getPokemonSpeciesById(i);
		await db.insert(schema.pokemonSpecies).values({
			id: species.id,
			name: species.names.find((n) => n.language.name === 'en')!.name.toLowerCase(),
			category: species.genera.find((g) => g.language.name === 'en')!.genus.toLowerCase(),
			isMythical: species.is_mythical,
			isLegendary: species.is_legendary
		});

		for (const variety of species.varieties) {
			await pokemon(variety.pokemon.name, species.id);
		}
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
			for (const t of pokemon.types) {
				await db
					.insert(schema.pokemonTypes)
					.values({ pokemonId: speciesId, typeId: get_id_from_url(t.type.url) });
			}
		} else {
			for (const t of pokemon.types) {
				await db
					.insert(schema.pokemonTypes)
					.values({ pokemonId: pokemon.id, typeId: get_id_from_url(t.type.url) });
			}
		}

		// pokemon stats
		for (const stat of pokemon.stats) {
			await db.insert(schema.pokemonStats).values({
				pokemonId: pokemon.id,
				statId: get_id_from_url(stat.stat.url),
				statName: stat.stat.name,
				baseStat: stat.base_stat,
				effort: stat.effort
			});
		}
	}
}

await insertTypes();
await insertTypeRelations();
await pokemonSpecies(151);

console.log('DOEN');

process.exit(0);
