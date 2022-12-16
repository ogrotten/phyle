<script>
	import { onMount } from 'svelte'

	let directory = '/',
		volumes = [],
		drive = '',
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
		console.log(`conlog: clicked`)
		let jeff = await window.api.getTree(cwd)
		console.log('jeff', jeff)
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
		drive = volumes[0]
	})

	$: console.log(`conlog: drive, directory`, drive, directory)
</script>

<div class="bg-base-100 card m-4 p-4 h-96">
	<div class="flex gap-4">
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
		<span class="">
			<div class="w-full border-b border-grey-200 pb-2 mb-2">
				<p class="">{cwd}</p>
			</div>
			{#await filesPromise then files}
				<span
					on:click={() => (cwd = '/')}
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
		</span>
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
