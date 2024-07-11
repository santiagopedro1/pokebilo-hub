<script lang="ts">
	export let type: { name: string; iconUrl: string } | undefined = undefined;
	export let variant: 'minimal' | 'default' | 'lg' = 'default';

	const typeBgColor: { [key: string]: string } = {
		normal: 'bg-types-normal',
		fighting: 'bg-types-fighting',
		flying: 'bg-types-flying',
		poison: 'bg-types-poison',
		ground: 'bg-types-ground',
		rock: 'bg-types-rock',
		bug: 'bg-types-bug',
		ghost: 'bg-types-ghost',
		steel: 'bg-types-steel',
		fire: 'bg-types-fire',
		water: 'bg-types-water',
		grass: 'bg-types-grass',
		electric: 'bg-types-electric',
		psychic: 'bg-types-psychic',
		ice: 'bg-types-ice',
		dragon: 'bg-types-dragon',
		dark: 'bg-types-dark',
		fairy: 'bg-types-fairy'
	};
</script>

{#if variant === 'minimal'}
	{#if !type}
		<div class="flex h-9 w-[calc(36px+10ch)] items-center justify-center rounded-lg bg-popover">
			<div class="font-bold uppercase">none</div>
		</div>
	{:else}
		<div class="grid grid-cols-[36px_10ch] place-items-center rounded-lg bg-popover uppercase">
			<div class="rounded-s-lg {typeBgColor[type.name]}">
				<img
					src={type.iconUrl}
					alt=""
					class="w-full p-1"
				/>
			</div>
			<div class="rounded-e-lg text-center font-bold">{type.name}</div>
		</div>
	{/if}
{:else if type}
	<div
		class="grid place-items-center rounded-lg uppercase {typeBgColor[type.name]} {variant === 'lg'
			? 'grid-cols-[44px_12ch] text-xl'
			: 'grid-cols-[36px_10ch]'}"
	>
		<div>
			<img
				src={type.iconUrl}
				alt=""
				class="w-full p-1"
			/>
		</div>
		<div class="text-center font-bold">{type.name}</div>
	</div>
{/if}
