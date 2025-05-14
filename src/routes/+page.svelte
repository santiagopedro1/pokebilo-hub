<script lang="ts">
	import PokemonSpeciesCard from '$lib/components/PokemonSpeciesCard.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#await data.pokemonSpeciesList}
	<h1>lole</h1>
{:then pokemonSpeciesList}
	<div class="flex flex-wrap justify-center gap-8">
		{#each pokemonSpeciesList as pokemon}
			<PokemonSpeciesCard {pokemon} />
		{/each}
	</div>
{/await}
