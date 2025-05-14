import { integer, real, text, sqliteTable, primaryKey } from 'drizzle-orm/sqlite-core';

// Types Table
export const types = sqliteTable('types', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique()
});

// Type Effectiveness Table (for type relations)
export const typeEffectiveness = sqliteTable(
	'type_effectiveness',
	{
		attackingTypeId: integer('attacking_type_id').references(() => types.id),
		defendingTypeId: integer('defending_type_id').references(() => types.id),
		effectiveness: real('effectiveness').notNull()
	},
	(table) => [primaryKey({ columns: [table.attackingTypeId, table.defendingTypeId] })]
);

// Species Table
export const pokemonSpecies = sqliteTable('pokemon_species', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	category: text('category'),
	isLegendary: integer('is_legendary', { mode: 'boolean' }),
	isMythical: integer('is_mythical', { mode: 'boolean' })
});

// Pokémon Table (for different variants)
export const pokemon = sqliteTable('pokemon', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	speciesId: integer('species_id').references(() => pokemonSpecies.id),
	name: text('name').notNull(),
	formName: text('form_name'),
	isDefault: integer('is_default', { mode: 'boolean' }),
	height: real('height'), // in meters
	weight: real('weight'), // in kilograms
	baseExperience: integer('base_experience')
});

// Form Types Relation Table (form can have different types than base)
export const formTypes_relation = sqliteTable(
	'form_types_relation',
	{
		formId: integer('form_id').references(() => pokemon.id),
		typeId: integer('type_id').references(() => types.id)
	},
	(table) => [primaryKey({ columns: [table.formId, table.typeId] })]
);

// Species Type Relation Table (base types for the species)
export const speciesTypes = sqliteTable(
	'species_types',
	{
		speciesId: integer('species_id').references(() => pokemonSpecies.id),
		typeId: integer('type_id').references(() => types.id)
	},
	(table) => [primaryKey({ columns: [table.speciesId, table.typeId] })]
);

// Stats Table
export const formStats = sqliteTable('form_stats', {
	formId: integer('form_id')
		.primaryKey()
		.references(() => pokemon.id),
	hp: integer('hp'),
	attack: integer('attack'),
	defense: integer('defense'),
	specialAttack: integer('special_attack'),
	specialDefense: integer('special_defense'),
	speed: integer('speed')
});
