<script>
	import { onMount } from 'svelte'
	import Sidebar from './components/Sidebar.svelte'
	import Listing from './components/Listing.svelte'
</script>

<div class="flex flex-col w-screen h-screen">
	<!-- data-theme="business" -->
	<div
		data-theme="corporate"
		class="p-4 flex flex-row justify-between gap-4 overflow-hidden"
	>
		<div class="shrink">
			<Sidebar />
		</div>
		<div class="grow">
			<Listing />
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-color: #444;
		color: #ccc;
	}
</style>
