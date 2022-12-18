<script>
	import { onMount } from 'svelte'
	import Filebrowse from './components/Filebrowse.svelte'
	import Listing from './components/Listing.svelte'
</script>

<div class="flex flex-col w-screen h-screen">
	<div class="h-16 bg-yellow-300" />
	<div
		data-theme="winter"
		class="bg-emerald-200 p-4 flex flex-row justify-between h-full gap-4"
	>
		<div class="shrink">
			<Filebrowse />
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
