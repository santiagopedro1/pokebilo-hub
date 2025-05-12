<script lang="ts">
	import '../app.css';

	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="space-y-4 px-8 py-4">
	<header class="grid place-items-center">
		<a href="/">
			<img
				src="/pokebiloHub.png"
				alt="Logo for pokebiloHub"
				class="w-44"
			/>
		</a>
	</header>
	<hr class="w-full" />
</div>
<main class="container space-y-12">
	{@render children()}
</main>
