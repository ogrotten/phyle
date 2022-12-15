<script>
	import { onMount } from 'svelte'
	import Filebrowse from './components/Filebrowse.svelte'

	// import { fs } from 'fs'

	// onMount(async () => {
	// 	try {
	// 		const files = await fs.readdir(path)
	// 		for (const file of files) console.log(file)
	// 	} catch (err) {
	// 		console.error(err)
	// 	}
	// })
</script>

<div data-theme="lofi" class=" bg-emerald-200">
	<Filebrowse />
</div>

<style>
	:global(body) {
		background-color: #444;
		color: #ccc;
	}
</style>
