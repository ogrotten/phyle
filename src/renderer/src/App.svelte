<script>
	import { onMount } from 'svelte'
	import Filebrowse from './components/Filebrowse.svelte'
</script>

<div data-theme="winter" class="bg-emerald-200 w-screen h-screen p-4">
	<Filebrowse />
</div>

<style>
	:global(body) {
		background-color: #444;
		color: #ccc;
	}
</style>
