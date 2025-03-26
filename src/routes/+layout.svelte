<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Header></Header>
<div class="m-4">
	{@render children()}
</div>
