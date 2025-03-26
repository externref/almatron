<script lang="ts">
	import type { FoodItem } from '$lib/interfaces';

	export let foodInfo: FoodItem;
</script>

<div class="rounded-xl p-4 mx-2 my-2 bg-orange-500/30 hover:bg-orange-500/40 hover:p-3 transition-all duration-300 ease-in-out hover:shadow-md">
	<img src={foodInfo.image} alt={foodInfo.name} class="w-full h-48 object-cover rounded-xl" />
	<div class="m-1">
		<p class="text-md font-bold">
			<span class="text-black">{foodInfo.name}</span>
			<span class="text-sm text-capt-subtext0"> (x{foodInfo.quantity})</span>
		</p>
		<p class="text-sm text-capt-subtext0">{foodInfo.description.substring(0, 100)}</p>
        <div class="h-[0.5px] bg-catp-overlay0 my-2 mx-1"></div>
		<p class="text-xs">{foodInfo.donator} ({foodInfo.location})</p>
	</div>
</div>
