<script>
	import { onMount } from 'svelte'

	let directory = '/',
		volumes

	function navigate(path) {
		if (directory === '/') {
			directory = '/' + path
		} else {
			directory += '/' + path
		}
	}

	function navigateUp() {
		directory = directory.split('/').slice(0, -1).join('/') || '/'
	}

	const search = async () => {
		let jeff = await window.api.getTree(directory)
		console.log('jeff', jeff)
	}

	$: directory = directory.replaceAll('\\', '/')
	$: filesPromise = window.api.directoryContents(directory)
	$: isRoot = directory === '/'

	onMount(async () => {
		volumes = await window.api.getVolumes()
	})

	$: console.log('volumes', volumes)
</script>

<div class="bg-base-100 card m-4 p-4 h-96">
	<div class="w-full border-b border-grey-200 pb-2 mb-2">
		<p class="">{directory}</p>
	</div>

	{#await filesPromise then files}
		<span
			on:click={() => (directory = '/')}
			class="font-semibold text-primary-focus cursor-pointer hover:text primary hover:bg-neutral-content p-1 w-full"
		>
			[root]
		</span>
		{#if !isRoot}
			<span
				on:click={() => navigateUp()}
				class="font-semibold text-primary-focus cursor-pointer hover:text primary hover:bg-neutral-content p-1 w-full"
			>
				[up]
			</span>
		{/if}

		<ul class="ml-2 overflow-auto">
			{#each files.sort((a, b) => a.type.localeCompare(b.type)) as entry}
				{#if entry.type === 'directory'}
					<li
						class="cursor-pointer hover:bg-neutral-content p-1 w-full hover:text-primary"
						on:click={() => navigate(entry.name)}
					>
						<span href={''} class="font-semibold text-primary-focus p-1 w-full">
							/{entry.name}
						</span>
					</li>
				{:else}
					<li>
						<p class=" p-1 text-neutral-focus">{entry.name}</p>
					</li>
				{/if}
			{/each}
		</ul>
	{/await}
</div>
<div class="flex justify-end">
	<button class="btn btn-primary btn-sm" on:click={search}>
		Choose Directory
	</button>
</div>

<style lang="postcss">
	/* li {
		@apply m-0;
	}
	.dir {
		@apply font-semibold text-gray-600;
	} */
</style>
