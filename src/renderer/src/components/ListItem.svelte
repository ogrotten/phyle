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
</script>

<li class="py-2 pl-4 hover:bg-emerald-300">
	<p class="font-semibold text-base flex items-center">
		{file?.filename}
		<Icon src={External} class="text-gray-50 h-4 w-4" />
	</p>
	<div class="flex">
		{#each tags as tag}
			<p class="tag">
				{tag.tag}
			</p>
		{/each}
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
