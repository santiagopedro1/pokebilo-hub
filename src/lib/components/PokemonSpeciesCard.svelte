<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { pokemon } = $props();
</script>

<Card.Root class="grid place-items-center border-2 px-4 text-center">
	<Card.Header>
		<img
			src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
			alt="Imagem foda"
			class="w-60 object-cover transition-transform duration-300 group-hover:scale-[1.2]"
			loading="lazy"
			style="view-transition-name: {pokemon.name}-img;"
		/>
	</Card.Header>

	<Card.Content>
		<Card.Title
			class="text-xl capitalize"
			style="view-transition-name: {pokemon.name}-title;">{pokemon.name}</Card.Title
		>
		<Card.Description
			class="italic"
			style="view-transition-name: {pokemon.name}-number;">#{pokemon.id.toString().padStart(4, '0')}</Card.Description
		>
	</Card.Content>
</Card.Root>
