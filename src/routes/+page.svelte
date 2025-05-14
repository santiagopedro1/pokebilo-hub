<script lang="ts">
	import PokemonSpeciesCard from '$lib/components/PokemonSpeciesCard.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

{#await data.pokemonSpeciesList}
	<h1>lole</h1>
{:then pokemonSpeciesList}
	<div class="flex flex-wrap justify-center gap-8">
		{#each pokemonSpeciesList as pokemon}
			<PokemonSpeciesCard {pokemon} />
		{/each}
	</div>
{/await}
