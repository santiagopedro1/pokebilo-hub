<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { pokemon }: { pokemon: PokemonSpeciesListItem } = $props();
</script>

<Card.Root class="grid place-items-center border-2 px-4 text-center">
	<Card.Header>
		<img
			src="/1.png"
			alt="Imagem foda"
			class="w-60 object-cover transition-transform duration-300 group-hover:scale-[1.2]"
			loading="lazy"
			style="view-transition-name: {pokemon.name}-img;"
		/>
	</Card.Header>

	<div class="flex items-center justify-center gap-2">
		<img
			src={`/${pokemon.type1}.png`}
			alt={`${pokemon.type1} type badge`}
			class="w-32"
		/>
		{#if pokemon.type2}
			<img
				src={`/${pokemon.type2}.png`}
				alt={`${pokemon.type2} type badge`}
				class="w-32"
			/>
		{/if}
	</div>

		<Card.Content>
		<Card.Title
			class="text-xl capitalize"
			style="view-transition-name: {pokemon.name}-title;"
		>
			{pokemon.name}
		</Card.Title>
		<Card.Description
			class="italic"
			style="view-transition-name: {pokemon.name}-number;"
		>
			#{pokemon.id.toString().padStart(4, '0')}
		</Card.Description>
	</Card.Content>
</Card.Root>
