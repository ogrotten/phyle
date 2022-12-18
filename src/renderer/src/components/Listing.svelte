<script>
	import { onMount } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { External } from '@steeze-ui/css-gg'

	let files = [],
		tags = [],
		filterTags = []

	$: tags?.sort((a, b) => a?.name?.localeCompare(b.name))

	onMount(async () => {
		files = await window.api.getFiles()
		tags = await window.api.getTags()
	})

	const tagfilter = (incoming) => {
		console.log(`conlog: incoming`, incoming)
	}
</script>

<div class="card w-full h-full grow flex flex-col  pr-0">
	<div class="border-b-4 border-neutral-content h-48 mb-4">
		<div class="flex">
			{#each tags.filter((t) => !t.in) as tag, idx (idx)}
				<p class="tag cursor-pointer" on:click={() => (tag.in = true)}>
					{tag.name}
				</p>
			{/each}
		</div>
		<div class="flex border-t-2 border-neutral-content">
			{#each tags.filter((t) => t?.in) as tag, idx (tag.name)}
				<p class="tag cursor-pointer" on:click={() => (tag.in = false)}>
					{tag.name}
				</p>
			{/each}
		</div>
	</div>
	<ul class="overflow-auto">
		{#each files as file}
			<li class="py-2 pl-4 hover:bg-emerald-300">
				<p class="font-semibold text-base flex items-center">
					{file.filename}
					<Icon src={External} class="text-gray-50 h-4 w-4" />
				</p>
				<div class="flex">
					{#if file.tags_auto[0] != ' '}
						{#each file.tags_auto.sort((a, b) => a.localeCompare(b)) as tag}
							<p class="tag">
								{tag}
							</p>
						{/each}
					{/if}
				</div>
			</li>
		{/each}
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
