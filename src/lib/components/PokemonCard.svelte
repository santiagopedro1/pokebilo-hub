<script lang="ts">
	import TypeBadge from './TypeBadge.svelte';
	import * as Card from '$lib/components/ui/card';

	export let pokemon: PokemonSpeciesData;

	const typeBorders: { [key: string]: Array<string> } = {
		normal: ['border-l-types-normal border-t-types-normal', 'border-r-types-normal border-b-types-normal'],
		fire: ['border-l-types-fire border-t-types-fire', 'border-r-types-fire border-b-types-fire'],
		water: ['border-l-types-water border-t-types-water', 'border-r-types-water border-b-types-water'],
		electric: ['border-l-types-electric border-t-types-electric', 'border-r-types-electric border-b-types-electric'],
		grass: ['border-l-types-grass border-t-types-grass', 'border-r-types-grass border-b-types-grass'],
		ice: ['border-l-types-ice border-t-types-ice', 'border-r-types-ice border-b-types-ice'],
		fighting: ['border-l-types-fighting border-t-types-fighting', 'border-r-types-fighting border-b-types-fighting'],
		poison: ['border-l-types-poison border-t-types-poison', 'border-r-types-poison border-b-types-poison'],
		ground: ['border-l-types-ground border-t-types-ground', 'border-r-types-ground border-b-types-ground'],
		flying: ['border-l-types-flying border-t-types-flying', 'border-r-types-flying border-b-types-flying'],
		psychic: ['border-l-types-psychic border-t-types-psychic', 'border-r-types-psychic border-b-types-psychic'],
		bug: ['border-l-types-bug border-t-types-bug', 'border-r-types-bug border-b-types-bug'],
		rock: ['border-l-types-rock border-t-types-rock', 'border-r-types-rock border-b-types-rock'],
		ghost: ['border-l-types-ghost border-t-types-ghost', 'border-r-types-ghost border-b-types-ghost'],
		dragon: ['border-l-types-dragon border-t-types-dragon', 'border-r-types-dragon border-b-types-dragon'],
		dark: ['border-l-types-dark border-t-types-dark', 'border-r-types-dark border-b-types-dark'],
		steel: ['border-l-types-steel border-t-types-steel', 'border-r-types-steel border-b-types-steel'],
		fairy: ['border-l-types-fairy border-t-types-fairy', 'border-r-types-fairy border-b-types-fairy']
	};
</script>

<a href={pokemon.name}>
	<Card.Root
		class="group grid place-items-center border-2 px-4 text-center ring-white ring-offset-4 ring-offset-card hover:ring-1 {pokemon.type2
			? `${typeBorders[pokemon.type1.name][0]} ${typeBorders[pokemon.type2.name][1]}`
			: `${typeBorders[pokemon.type1.name][0]} ${typeBorders[pokemon.type1.name][1]}`}"
	>
		<Card.Header>
			<img
				src={pokemon.defaultImageUrl}
				alt="Imagem foda"
				class="w-60 object-cover transition-transform duration-300 group-hover:scale-[1.2]"
				loading="lazy"
				style="view-transition-name: {pokemon.name}-img;"
			/>
		</Card.Header>
		<div class="mb-4 flex w-full items-center justify-center gap-4">
			<TypeBadge type={pokemon.type1} />
			{#if pokemon.type2}
				<TypeBadge type={pokemon.type2} />
			{/if}
		</div>
		<Card.Content>
			<Card.Title class="text-xl capitalize" style="view-transition-name: {pokemon.name}-title;">{pokemon.name}</Card.Title>
			<Card.Description class="italic" style="view-transition-name: {pokemon.name}-number;">#{pokemon.pokedexNumber.toString().padStart(4, '0')}</Card.Description>
		</Card.Content>
	</Card.Root>
</a>
