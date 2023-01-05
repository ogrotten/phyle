<script>
	import { onMount } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { External } from '@steeze-ui/css-gg'
	import { fade } from 'svelte/transition'

	export let file, allTags

	const tagIdsToText = (list) => {
		if (!allTags) return
		// console.log(`conlog: list`, list)
		let frank = allTags.filter((e) => list.includes(e.id))
		return frank
	}

	onMount(async () => {
		allTags = await window.api.dbTags.allTags
	})

	$: tags = tagIdsToText(file?.tags_auto) //
		.sort((a, b) => a?.tag?.localeCompare(b.tag))
	// $: console.log(`conlog: tags`, tags)

	$: simple = tags.map((e) => e.tag).join(', ')
</script>

<li class="px-6 pb-1 even:bg-gray-100 flex flex-col justify-between space-y-1">
	<div class="text-item flex items-center pt-1">
		<p class="item">{file?.filename}</p>
		<Icon src={External} class="text-gray-50 h-4 w-4" />
	</div>
	<div class="flex gap-x-2">
		<!-- <div class="italic font-bold pl-4">
			{#if simple}
				<p class="text-tag text-secondary">{simple}</p>
			{:else}
				<p class="text-tag text-base-300">None</p>
			{/if}
		</div> -->

		{#each tags as tag}
			<p class="tag {tag.type}">
				{tag.tag}
			</p>
		{/each}
	</div>
</li>

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
