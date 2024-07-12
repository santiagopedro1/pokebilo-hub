<script lang="ts">
	import AdvancedFilter from '$lib/components/AdvancedFilter.svelte';
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import PokemonSearch from '$lib/components/PokemonSearch.svelte';
	import PokemonSort from '$lib/components/PokemonSort.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemonTypeList } = data;

	let pokemonList: Array<PokemonSpeciesData>;
	let allPokemonSpeciesList: Array<PokemonSpeciesData>;

	$: ({ pokemonSpeciesListPromise } = data);
	$: pokemonSpeciesListPromise.then((value) => {
		allPokemonSpeciesList = value;
		pokemonList = value;
		updatePokemonList();
	});

	let searchQuery = '';
	let selectedTypes: Array<string> = [];
	let radioValue = 'and';
	let sortOrder = 'numAsc';

	function updatePokemonList() {
		pokemonList = allPokemonSpeciesList.filter((pokemon) => {
			const matchesSearch =
				searchQuery === '' ||
				pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pokemon.pokedexNumber.toString().includes(searchQuery);

			const matchesFilter =
				selectedTypes.length === 0 ||
				(radioValue === 'and'
					? selectedTypes.every((type) => pokemon.type1.name === type || (pokemon.type2 && pokemon.type2.name === type))
					: selectedTypes.some((type) => pokemon.type1.name === type || (pokemon.type2 && pokemon.type2.name === type)));
			return matchesSearch && matchesFilter;
		});
		switch (sortOrder) {
			case 'numAsc':
				allPokemonSpeciesList = allPokemonSpeciesList.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
				return;
			case 'numDesc':
				allPokemonSpeciesList = allPokemonSpeciesList.sort((a, b) => b.pokedexNumber - a.pokedexNumber);
				return;
			case 'nameAsc':
				allPokemonSpeciesList = allPokemonSpeciesList.sort((a, b) => a.name.localeCompare(b.name));
				return;
			case 'nameDesc':
				allPokemonSpeciesList = allPokemonSpeciesList.sort((a, b) => b.name.localeCompare(a.name));
				return;
		}
	}
</script>

<svelte:head>
	<title>Pokébilo Hub</title>
</svelte:head>

{#await pokemonSpeciesListPromise}
	<div class="grid place-items-center">
		<img
			src="/loading.gif"
			alt=""
		/>
	</div>
{:then}
	<div class="flex w-full justify-between">
		<PokemonSearch
			bind:searchQuery
			on:search={updatePokemonList}
		/>
		<PokemonSort
			bind:sortOrder
			on:sort={updatePokemonList}
		/>
	</div>

	<AdvancedFilter
		bind:radioValue
		bind:selectedTypes
		on:filter={updatePokemonList}
		{pokemonTypeList}
	/>

	{#if pokemonList.length > 0}
		<div class="flex flex-wrap justify-center gap-8">
			{#each allPokemonSpeciesList as pokemon}
				<div class={pokemonList.includes(pokemon) ? '' : 'hidden'}>
					<PokemonCard {pokemon} />
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-3xl">No Pokémon found</p>
		<img
			src="/sad-pikachu.webp"
			alt="Sad pikachu"
		/>
	{/if}
{/await}
