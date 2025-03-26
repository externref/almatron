<script lang="ts">
	import type { FoodItem } from '$lib/interfaces';
	import Item from './Item.svelte';
	export let available: FoodItem[] = [];
</script>

<div id="available">
	<p class="text-3xl font-bold text-center">Available Items</p>
	<div class="h-[1.5px] bg-catp-overlay0 mx-12 my-2"></div>
	{#if !available.length}
		<p class="text-center">No items available</p>
	{/if}
	<div class="grid grid-cols-5">
		{#each available as item}
			<Item foodInfo={item}></Item>
		{/each}
	</div>
</div>
