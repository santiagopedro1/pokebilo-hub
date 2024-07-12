<script lang="ts">
	import { Hero, SectionCard, Stats, TypeEff } from '$lib/components/PokemonInfo';

	import { Label } from '$lib/components/ui/label/';
	import * as Select from '$lib/components/ui/select';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { completeSpeciesData, typeList } = data;
	const { speciesData, pokemonData } = completeSpeciesData;

	const forms = completeSpeciesData.pokemonData.map((p) => {
		return {
			value: p.formName,
			label: p.displayName
		};
	});

	let currentForm = pokemonData[0];
	const defaultForm = pokemonData[0];
</script>

<svelte:head>
	<title>{defaultForm.displayName} - Pokébilo Hub</title>
</svelte:head>

<section class="grid place-items-center">
	<div class="flex items-center gap-5">
		<p class="text-7xl italic text-foreground/20" style="view-transition-name: {defaultForm.displayName}-number;">#{speciesData.pokedexNumber.toString().padStart(4, '0')}</p>
		<h1 class="text-8xl font-bold capitalize" style="view-transition-name: {defaultForm.displayName}-title;">{defaultForm.displayName}</h1>
	</div>
	<p class="text-2xl capitalize">The {speciesData.category}</p>
</section>

<div>
	{#if pokemonData.length > 1}
		<div class="flex items-center justify-center gap-4">
			<Select.Root
				items={forms}
				selected={forms[0]}
				onSelectedChange={(v) => {
					if (v) {
						const form = pokemonData.find((p) => p.formName === v.value);
						if (form) currentForm = form;
					}
				}}
			>
				<Select.Trigger class="w-96 text-lg capitalize">
					<Select.Value placeholder="Theme" />
				</Select.Trigger>
				<Select.Content>
					{#each forms as form}
						<Select.Item
							value={form.value}
							class="text-lg capitalize"
						>
							{form.label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	{/if}

	<Hero bind:currentForm />
</div>

<div class="grid grid-cols-2 gap-4">
	<SectionCard
		title="Stats"
		description="Base stats of this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
	>
		<Stats stats={currentForm.stats} />
	</SectionCard>

	<SectionCard
		title="Alguma coisa"
		description="Alguma coisa of this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
	>
		<p>sei la</p>
	</SectionCard>

	<SectionCard
		title="Type effectiveness"
		description="How effective are different types of moves against this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
		size="lg"
	>
		<TypeEff
			pokemonType={[currentForm.type1, currentForm.type2]}
			{typeList}
		/>
	</SectionCard>
</div>
