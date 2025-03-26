<script lang="ts">
	import Item from './Item.svelte';
	import { fakeFoodItems } from '$lib';
</script>

<div>
	<p class="text-3xl font-bold text-center">Available Items</p>
	<div class="h-[1.5px] bg-catp-overlay0 mx-12 my-2"></div>
	<div class="grid grid-cols-5">
		{#each fakeFoodItems as item}
			<Item foodInfo={item}></Item>
		{/each}
	</div>
</div>
