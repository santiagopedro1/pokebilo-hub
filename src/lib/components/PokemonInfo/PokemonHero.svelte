<script lang="ts">
	import TypeBadge from '$lib/components/TypeBadge.svelte';

	export let currentForm: CompletePokemonData;

	const heightFormatter = (height: number) => {
		const heightInMeters = height / 10;
		const heightInFeet = heightInMeters * 3.28084;
		const feet = Math.floor(heightInFeet);
		const inches = Math.round((heightInFeet - feet) * 12);
		return `${heightInMeters} m (${feet}'${inches}") ${currentForm.formName.includes('gmax') ? '+' : ''}`;
	};

	const weightFormatter = (weight: number) => {
		if (weight === 10000) return '???';
		const weightInKg = weight / 10;
		const weightInPounds = (weightInKg * 2.20462).toFixed(1);
		return `${weightInKg} kg (${weightInPounds} lbs)`;
	};
</script>

<div class="grid w-full grid-cols-2 items-center gap-4">
	<img
		src={currentForm.defaultImageUrl}
		alt={'An image of the pokemon ' + currentForm.displayName}
		class="size-[475px] justify-self-end"
		style="view-transition-name: {currentForm.displayName}-img;"
	/>
	<div class="grid w-full grid-cols-2 gap-8 justify-self-start">
		<div class="grid gap-2">
			<p class="text-3xl font-bold">Heigth:</p>
			<p class="text-lg">{heightFormatter(currentForm.height)}</p>
		</div>
		<div class="grid gap-2">
			<p class="text-3xl font-bold">Weigth:</p>
			<p class="text-lg">{weightFormatter(currentForm.weight)}</p>
		</div>
		<div class="col-span-2 grid place-items-center gap-2 justify-self-center">
			<p class="text-3xl font-bold">Type</p>
			<div class="flex items-center justify-center gap-8">
				<TypeBadge
					type={currentForm.type1}
					variant="lg"
				/>
				{#if currentForm.type2}
					<TypeBadge
						type={currentForm.type2}
						variant="lg"
					/>
				{/if}
			</div>
		</div>
	</div>
</div>
