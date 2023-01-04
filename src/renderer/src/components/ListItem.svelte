<script>
	import { onMount } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { External } from '@steeze-ui/css-gg'
	import { fade } from 'svelte/transition'

	export let dataObj
	let { file, allTags } = dataObj

	let tags = []

	const tagfilter = (incoming) => {
		console.log(`conlog: incoming`, incoming)
	}

	$: tags?.sort((a, b) => a?.name?.localeCompare(b.name))
	$: filterTags = tags?.filter((t) => t?.in)

	const tagIdsToText = (list) => {
		if (!allTags || !tags) return
		let frank = allTags.filter((e) => list.includes(e.id))
		return frank
	}

	const filesVsTags = () => {
		let tempTags = [],
			tempFileTags = []
		tempTags = filterTags.map((e) => e.name)
		tempFileTags = filterFiles.map((e) => e.tags_auto)

		const intersection = tempTags.filter((tag) => {
			return tempFileTags.map((file, idx) => {
				if (file.includes(tag)) return idx
			})
		})

		console.log(`conlog: intersection`, intersection)

		return filterTags.length > 0 ? intersection : files
	}

	onMount(async () => {
		files = await window.api.getFiles()
		tags = await window.api.getTags()
		allTags = await window.api.dbTags.allTags
		filterFiles = files
	})
	$: tags = tagIdsToText(file?.tags_auto)
	$: console.log(`conlog: tags`, tags)
</script>

<li class="py-2 pl-4 hover:bg-emerald-300">
	<p class="font-semibold text-base flex items-center">
		{file?.filename}
		<Icon src={External} class="text-gray-50 h-4 w-4" />
	</p>
	<div class="flex">
		{#if file?.tags_auto != '0' && tags}
			{#each tags as tag}
				<p class="tag">
					{tag.tag}
				</p>
			{/each}
		{/if}
	</div>
</li>

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
