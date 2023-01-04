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
	// $: filterTags = allTags.filter((t) => t?.in)

	// $: console.log(`conlog: filterFiles`, filterFiles)
	// $: filterFiles = allTags?.filter((element) =>
	// 	files?.tags_auto?.includes(element.id)
	// )

	// $: if (files?.length) filterFiles = filesVsTags(filterTags)

	// const filesVsTags = () => {
	// 	// console.log(`conlog: tags`, filterTags)
	// 	// console.log(`conlog: files`, files)

	// 	// const intersection = array1.filter(element => array2.includes(element));

	// 	// const intersection = t.filter((tag) =>
	// 	// 	files.map((file) => file.tags_auto.includes(tag.name))
	// 	// )

	// 	let tempTags = [],
	// 		tempFileTags = []
	// 	tempTags = filterTags.map((e) => e.name)
	// 	tempFileTags = filterFiles.map((e) => e.tags_auto)

	// 	console.log(`conlog: tags`, tempTags)
	// 	// console.log(`conlog: files`, tempFileTags)

	// 	const intersection = tempTags.filter((tag) => {
	// 		// console.log(`conlog: tag`, tag)

	// 		return tempFileTags.map((file, idx) => {
	// 			if (file.includes(tag)) return idx
	// 		})
	// 	})

	// 	console.log(`conlog: intersection`, intersection)

	// 	return filterTags.length > 0 ? intersection : files
	// }
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
	<div class="border-b-4 border-neutral-content h-48 mb-4">
		<div class="flex">
			{#each headerTags as tag (tag.id)}
				<p
					transition:fade={{ duration: 100 }}
					class="tag cursor-pointer"
					on:click={() => moreFilter(tag)}
				>
					{tag.tag}
				</p>
			{/each}
		</div>
		<div class="flex border-t-2 border-neutral-content">
			{#each selectedTags as tag (tag.id)}
				<p
					transition:fade={{ duration: 100 }}
					class="tag cursor-pointer"
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
	<ul class="overflow-auto">
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

	.tag {
		@apply btn-info m-2 rounded-full border border-success px-2 text-sm text-info-content;
	}

	/* li {
		@apply m-0;
	}
	.dir {
		@apply font-semibold text-gray-600;
	} */
</style>
