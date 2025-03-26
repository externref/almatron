<script lang="ts">
	export let loggedIn: boolean = true;
</script>

<header class="sticky top-0 z-50 flex bg-catp-mantle shadow-md shadow-black/5 py-2 px-8">
	<img src="/logo.png" width="40px" />
	<p class="ml-2 text-2xl font-bold"><a href="/">MealBridge</a></p>
	<div class="flex-grow"></div>

	{#if loggedIn}
		<a href="/profile" class="text-lg flex items-center"
			><i class="bi bi-person-circle text-2xl h-8"></i></a
		>
	{/if}
</header>
