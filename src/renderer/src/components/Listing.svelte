<script>
	import { onMount } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { External } from '@steeze-ui/css-gg'

	let files = []

	onMount(async () => {
		files = await window.api.getFiles()
	})

	$: console.log(`conlog: files`, files)
</script>

<div
	class="card border border-neutral-content w-full h-full grow flex flex-col py-4 pr-0"
>
	<div class="h-36" />
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
							<p
								class="text-sm text-info-content border border-success rounded-full btn-info m-2 px-2"
							>
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

	/* li {
		@apply m-0;
	}
	.dir {
		@apply font-semibold text-gray-600;
	} */
</style>
