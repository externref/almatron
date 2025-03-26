<script lang="ts">
	import Available from '$lib/components/Available.svelte';
	import type { FoodItem } from '$lib/interfaces';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	const foodItems: FoodItem[] = data.foodItems;
</script>

{#if form?.message}
	<div class="fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 {form.success ? 'bg-green-500' : 'bg-red-500'} text-white">
		{form.message}
	</div>
{/if}

<div class="grid grid-flow-col gap-3 mx-32 my-12">
	<a href="/donate">
		<div
			class="rounded-md text-center grid h-64 relative overflow-hidden transition-all duration-500 ease-in-out hover:border-4 hover:border-violet-300 hover:shadow-lg cursor-pointer"
		>
			<div
				class="absolute inset-0"
				style="background-image: url(/donation.png); background-size: cover; background-position: center; filter: blur(3px);"
			></div>
			<div class="z-10 relative text-4xl pt-24 text-black">Donate Food</div>
		</div>
		<div
			class="rounded-md bg-purple-400 text-center transition-all duration-500 ease-in-out hover:border-4 hover:border-violet-300 hover:shadow-lg cursor-pointer"
		>
			Add to Stock
		</div>
	</a>

	<a href="#available">
		<div
			class="rounded-md text-center grid h-64 relative overflow-hidden transition-all duration-500 ease-in-out hover:border-4 hover:border-violet-300 hover:shadow-lg cursor-pointer"
		>
			<div
				class="absolute inset-0"
				style="background-image: url(/banner.png); background-size: cover; background-position: center; filter: blur(3px);"
			></div>
			<div class="z-10 relative text-4xl pt-24 text-black">Check Available Items</div>
		</div>
		<div
			class="rounded-md bg-purple-400 text-center transition-all duration-500 ease-in-out hover:border-4 hover:border-violet-300 hover:shadow-lg cursor-pointer"
		>
			Check Available Stock
		</div>
	</a>
</div>

<p class="mx-20 mb-12 text-xl">
    MealBridge is a platform that connects people who want to donate food with those in need. Whether you're an individual, a restaurant, or an organization, you can use MealBridge to donate food or contribute financially to support food distribution efforts.
    
    Our mission is to reduce food waste and fight hunger by making it easy for donors to connect with food banks, shelters, and communities in need. Whether you're donating surplus food, sponsoring a meal, or sharing food on a special occasion like a birthday, MealBridge makes it easy to give.</p>
<Available available={foodItems} />
