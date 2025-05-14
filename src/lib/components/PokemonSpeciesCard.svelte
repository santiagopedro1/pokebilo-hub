<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let { pokemon } = $props();
</script>

<Card.Root class="grid place-items-center border-2 px-4 text-center">
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
