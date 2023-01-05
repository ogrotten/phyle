<script>
	import ListItem from './ListItem.svelte'

	import { onMount } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { External } from '@steeze-ui/css-gg'
	import { fade } from 'svelte/transition'

	let files = [],
		filterTags = [],
		filterFiles = [],
		allTags = []

	$: allTags?.sort((a, b) => a?.tag?.localeCompare(b.tag))
	$: console.log(`conlog: filterFiles`, filterFiles)

	const moreFilter = async (tag) => {
		const idx = allTags.findIndex((e) => e.id === tag.id)

		allTags[idx].in = true
		filterTags.push(allTags[idx].data)
		filterFiles = await window.api.dbFiles.filterFiles(filterTags)
	}

	const lessFilter = async (tag) => {
		const idx = allTags.findIndex((e) => e.id === tag.id)

		allTags[idx].in = false
		filterTags = filterTags.filter((e) => e != allTags[idx].data)
		if (filterTags?.length < 1) filterFiles = await window.api.getFiles()
		else filterFiles = await window.api.dbFiles.filterFiles(filterTags)
	}

	onMount(async () => {
		files = await window.api.getFiles()
		// tags = await window.api.getTags()
		allTags = await window.api.dbTags.allTags
		filterFiles = files
	})

	$: headerTags = allTags.filter((t) => !t.in)
	$: selectedTags = allTags.filter((t) => t.in)
</script>

<div class="card w-full h-full grow flex flex-col  pr-0">
	<div class="border-b-4 border-neutral-content min-h-fit">
		<div class="flex flex-wrap gap-2 py-4">
			{#each headerTags as tag (tag.id)}
				<p
					transition:fade={{ duration: 100 }}
					class="tag cursor-pointer mx-0"
					on:click={() => moreFilter(tag)}
				>
					{tag.tag}
				</p>
			{/each}
		</div>
		<div class="border-t-2 border-neutral-content flex flex-wrap gap-2 py-4">
			{#each selectedTags as tag (tag.id)}
				<p
					transition:fade={{ duration: 100 }}
					class="tag cursor-pointer mx-0"
					on:click={() => lessFilter(tag)}
				>
					<!-- on:click={async () => {
						tag.in = false
						filterFiles = await window.api.dbFiles.filterFiles()
					}} -->
					{tag.tag}
				</p>
			{/each}
		</div>
	</div>
	<ul class="overflow-auto divide-y ">
		<!-- {#if allTags} -->
		{#each filterFiles as file}
			<ListItem {file} {allTags} />
		{/each}
		<!-- {/if} -->
	</ul>
</div>

<style lang="postcss">
	.dev * {
		@apply border border-red-500;
	}

	/* li {
		@apply m-0;
	}
	.dir {
		@apply font-semibold text-gray-600;
	} */
</style>
