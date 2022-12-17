<script>
	import { onMount } from 'svelte'

	let directory = 'Music',
		volumes = [],
		drive = 'G:/',
		cwd

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
		let jeff = await window.api.getTree(cwd)
		window.api.storeFiles(jeff)
	}

	const newDrive = (idx) => {
		drive = volumes[idx]
		directory = '/'
	}

	$: isRoot = directory === '/'
	$: directory = directory.replaceAll('\\', '/')
	$: cwd = drive + directory
	$: filesPromise = window.api.directoryContents(cwd)

	onMount(async () => {
		volumes = await window.api.getVolumes()
		if (!drive) drive = volumes[0]
	})

	$: console.log(`conlog: drive, directory`, drive, directory)
</script>

<div class="bg-base-100 card m-4 p-4 h-96">
	<div class="flex gap-4 h-full">
		<div class="space-y-2 flex flex-col">
			{#each volumes as drive, idx}
				<button
					class="btn btn-sm btn-circle btn-info"
					on:click={() => newDrive(idx)}
				>
					{drive}
				</button>
			{/each}
		</div>
		<div class="">
			<div class="w-full border-b border-grey-200 pb-2 mb-2">
				<p class="">{cwd}</p>
			</div>
			{#await filesPromise then files}
				<div
					on:click={() => (cwd = '/')}
					class="font-semibold text-primary-focus cursor-pointer hover:text primary hover:bg-neutral-content p-1 w-full"
				>
					[root]
				</div>
				{#if !isRoot}
					<div
						on:click={() => navigateUp()}
						class="font-semibold text-primary-focus cursor-pointer hover:text primary hover:bg-neutral-content p-1 w-full"
					>
						[up]
					</div>
				{/if}
				<div class=" h-full overflow-auto">
					<ul class="ml-2">
						{#each files.sort((a, b) => a.type.localeCompare(b.type)) as entry}
							{#if entry.type === 'directory'}
								<li
									class="cursor-pointer hover:bg-neutral-content p-1 w-full hover:text-primary"
									on:click={() => navigate(entry.name)}
								>
									<span
										href={''}
										class="font-semibold text-primary-focus p-1 w-full"
									>
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
				</div>
			{/await}
		</div>
	</div>
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
