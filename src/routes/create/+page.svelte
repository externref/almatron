<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let login: boolean = true;

	function _a(form: ActionData) {
		if (form?.success) {
			goto('/');
		}
	}
	$: x = _a(form);
</script>

{x}
<div class="flex justify-center items-center mt-24 w-full">
	<div class="p-8 shadow-md rounded-lg max-w-md w-full">
		<div class="bg-amber-50 grid grid-flow-col rounded-md mb-6">
			<button
				on:click={() => {
					!login ? (login = true) : true;
				}}
				class=" py-1 rounded-l-md {login ? `bg-green-300` : `bg-gray-400`} text-center"
				>Login</button
			>
			<button
				on:click={() => {
					login ? (login = false) : true;
				}}
				class="py-1 rounded-r-md {!login ? `bg-green-300` : `bg-gray-400`} text-center"
				>Sign Up</button
			>
		</div>

		{#if login}
			<!-- Login Form -->
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					return async ({ result, update }) => {
						if (result.status === 200) {
							goto('/');
						}
						update();
					};
				}}
			>
				<div class="mb-4">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						value={form?.data?.email || ''}
					/>
					{#if form?.errors?.email}
						<p class="text-red-500 text-xs mt-1">{form.errors.email}</p>
					{/if}
				</div>

				<div class="mb-6">
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{#if form?.errors?.password}
						<p class="text-red-500 text-xs mt-1">{form.errors.password}</p>
					{/if}
				</div>

				<button
					type="submit"
					class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Login
				</button>
			</form>
		{:else}
			<!-- Sign Up Form -->
			<form method="POST" action="?/signup">
				<div class="mb-4">
					<label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
					<input
						type="text"
						id="name"
						name="name"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						value={form?.data?.name || ''}
					/>
					{#if form?.errors?.name}
						<p class="text-red-500 text-xs mt-1">{form.errors.name}</p>
					{/if}
				</div>

				<div class="mb-4">
					<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
					<input
						type="text"
						id="username"
						name="username"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						value={form?.data?.username || ''}
					/>
					{#if form?.errors?.username}
						<p class="text-red-500 text-xs mt-1">{form.errors.username}</p>
					{/if}
				</div>

				<div class="mb-4">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						value={form?.data?.email || ''}
					/>
					{#if form?.errors?.email}
						<p class="text-red-500 text-xs mt-1">{form.errors.email}</p>
					{/if}
				</div>

				<div class="mb-4">
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{#if form?.errors?.password}
						<p class="text-red-500 text-xs mt-1">{form.errors.password}</p>
					{/if}
				</div>

				<div class="mb-4">
					<label for="location" class="block text-sm font-medium text-gray-700"
						>Location (Optional)</label
					>
					<input
						type="text"
						id="location"
						name="location"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						value={form?.data?.location || ''}
					/>
				</div>

				<div class="mb-6">
					<label for="phone" class="block text-sm font-medium text-gray-700">Phone (Optional)</label
					>
					<input
						type="tel"
						id="phone"
						name="phone"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						value={form?.data?.phone || ''}
					/>
				</div>

				<button
					type="submit"
					class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Sign Up
				</button>
			</form>
		{/if}

		{#if form?.success}
			<div class="mt-4 p-2 bg-green-100 text-green-800 rounded">
				{form.message}
			</div>
		{/if}

		{#if form?.success === false && form?.message}
			<div class="mt-4 p-2 bg-red-100 text-red-800 rounded">
				{form.message}
			</div>
		{/if}
	</div>
</div>
