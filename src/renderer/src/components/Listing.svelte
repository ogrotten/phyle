<script>
	import ListItem from './ListItem.svelte'

	import { onMount } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { External } from '@steeze-ui/css-gg'
	import { fade } from 'svelte/transition'

	let files = [],
		tags = [],
		filterTags = [],
		filterFiles = [],
		allTags

	const tagfilter = (incoming) => {
		console.log(`conlog: incoming`, incoming)
	}

	$: tags?.sort((a, b) => a?.name?.localeCompare(b.name))
	$: filterTags = tags.filter((t) => t?.in)

	const tagIdsToText = (list) => {
		if (!allTags) return
		return list[0].map((e) => allTags.row === e)
	}

	// $: console.log(`conlog: filterFiles`, filterFiles)
	$: filterFiles = tags?.filter((element) =>
		files?.tags_auto?.includes(element.id)
	)

	$: if (files?.length) filterFiles = filesVsTags(filterTags)

	const filesVsTags = () => {
		// console.log(`conlog: tags`, filterTags)
		// console.log(`conlog: files`, files)

		// const intersection = array1.filter(element => array2.includes(element));

		// const intersection = t.filter((tag) =>
		// 	files.map((file) => file.tags_auto.includes(tag.name))
		// )

		let tempTags = [],
			tempFileTags = []
		tempTags = filterTags.map((e) => e.name)
		tempFileTags = filterFiles.map((e) => e.tags_auto)

		console.log(`conlog: tags`, tempTags)
		// console.log(`conlog: files`, tempFileTags)

		const intersection = tempTags.filter((tag) => {
			// console.log(`conlog: tag`, tag)

			return tempFileTags.map((file, idx) => {
				if (file.includes(tag)) return idx
			})
		})

		console.log(`conlog: intersection`, intersection)

		return filterTags.length > 0 ? intersection : files
	}

	$: console.log(`LOG..Listing: allTags`, allTags)

	onMount(async () => {
		files = await window.api.getFiles()
		tags = await window.api.getTags()
		allTags = await window.api.dbTags.allTags
		filterFiles = files
	})
</script>

<div class="card w-full h-full grow flex flex-col  pr-0">
	<div class="border-b-4 border-neutral-content h-48 mb-4">
		<div class="flex">
			{#each tags.filter((t) => !t.in) as tag, idx (idx)}
				<p
					transition:fade
					class="tag cursor-pointer"
					on:click={() => (tag.in = true)}
				>
					{tag.tag}
				</p>
			{/each}
		</div>
		<div class="flex border-t-2 border-neutral-content">
			{#each tags.filter((t) => t?.in) as tag, idx (tag.name)}
				<p
					transition:fade
					class="tag cursor-pointer"
					on:click={() => (tag.in = false)}
				>
					{tag.name}
				</p>
			{/each}
		</div>
	</div>
	<ul class="overflow-auto">
		{#if allTags}
			{#each filterFiles as file}
				<ListItem dataObj={{ file, allTags }} />
			{/each}
		{/if}
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
