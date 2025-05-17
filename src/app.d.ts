// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface PokemonSpeciesListItem {
		id: number;
		name: string;
		isLegendary: boolean | null;
		isMythical: boolean | null;
		type1: string;
		type2: string | null;
	}
}

export {};
