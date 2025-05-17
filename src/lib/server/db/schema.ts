import { mysqlTable, int, double, text, boolean, primaryKey } from 'drizzle-orm/mysql-core';

// Types Table
export const types = mysqlTable('types', {
	id: int('id').primaryKey(),
	name: text('name').notNull()
});

// Type Effectiveness Table (for type relations)
export const typeEffectiveness = mysqlTable(
	'type_effectiveness',
	{
		attackingTypeId: int('attacking_type_id').references(() => types.id),
		defendingTypeId: int('defending_type_id').references(() => types.id),
		effectiveness: double('effectiveness').notNull()
	},
	(table) => [primaryKey({ columns: [table.attackingTypeId, table.defendingTypeId] })]
);

// Species Table
export const pokemonSpecies = mysqlTable('pokemon_species', {
	id: int('id').primaryKey(),
	name: text('name').notNull(),
	category: text('category').notNull(),
	isLegendary: boolean('is_legendary').notNull(),
	isMythical: boolean('is_mythical').notNull()
});

// Pokémon Table (for different variants)
export const pokemon = mysqlTable('pokemon', {
	id: int('id').primaryKey(),
	speciesId: int('species_id').references(() => pokemonSpecies.id),
	name: text('name').notNull(),
	formName: text('form_name').notNull(),
	isDefault: boolean('is_default').notNull(),
	height: double('height').notNull(),
	weight: double('weight').notNull(),
	baseExperience: int('base_experience').notNull()
});

// Pokémon Types Table
export const pokemonTypes = mysqlTable(
	'pokemon_types',
	{
		pokemonId: int('pokemon_id').references(() => pokemon.id),
		typeId: int('type_id').references(() => types.id)
	},
	(table) => [primaryKey({ columns: [table.pokemonId, table.typeId] })]
);

// Stats Table
export const pokemonStats = mysqlTable(
	'pokemon_stats',
	{
		pokemonId: int('pokemon_id').references(() => pokemon.id),
		statId: int('stat_id').notNull(),
		statName: text('stat_name').notNull(),
		baseStat: int('base_stat').notNull(),
		effort: int('effort').notNull()
	},
	(table) => [primaryKey({ columns: [table.pokemonId, table.statId] })]
);
