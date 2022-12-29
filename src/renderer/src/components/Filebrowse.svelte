<script>
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'

	import { Icon } from '@steeze-ui/svelte-icon'
	import { Close } from '@steeze-ui/css-gg'

	const dev = false
	// let directory = '/Music',
	let directory = '/Program Files/Google/Chrome/Application/SetupMetrics',
		volumes = [],
		// drive = 'G:',
		drive = 'C:',
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
		// window.api.storeFiles(jeff)
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

	let showPanel = true

	$: console.log(`conlog: drive, directory`, drive, directory)
</script>

<div class="h-full w-full">
	<!-- <div class="w-full h-12">
		<button
			class="btn btn-primary btn-sm w-96"
			on:click={() => (showPanel = !showPanel)}
			transition:slide={{ axis: 'x', duration: 800 }}
		>
			{#if showPanel}
				Close
			{:else}
				Choose Directory
			{/if}
		</button>
	</div> -->
	<div class=" flex flex-row h-full gap-4">
		{#if showPanel}
			<div
				class="bg-neutral-content card p-4 h-full w-72 flex flex-col gap-4 relative"
			>
				<!-- transition:slide={{ axis: 'x', duration: 800 }} -->
				<!-- <button
					class="h-6 w-6 bg-yellow-300 rounded absolute inset-y-auto right-1"
					on:click={() => (showPanel = !showPanel)}
				>
					<Icon src={Close} theme="solid" class="text-gray-50" />
				</button> -->
				<div
					class:bg-blue-400={dev}
					id="Container"
					class="flex h-full justify-between bg-white rounded"
				>
					<div
						class:bg-green-400={dev}
						id="Drives"
						class="h-full flex flex-col gap-4 p-4 "
					>
						{#each volumes as drive, idx}
							<button
								class="btn btn-sm btn-circle btn-info"
								on:click={() => newDrive(idx)}
							>
								{drive}
							</button>
						{/each}
					</div>
					<div
						class:bg-violet-400={dev}
						class="h-full w-1/6 grow  p-4 flex flex-col"
					>
						<div class:bg-green-200={dev} class="">
							<div class="w-full border-b border-grey-200 pb-2 mb-2 px-1">
								<p class="">{cwd}</p>
							</div>
						</div>
						<div class="flex justify-start gap-2">
							<div
								on:click={() => (directory = '/')}
								class="rounded font-semibold text-primary-focus cursor-pointer hover:text primary hover:bg-neutral-content p-1 bg-red-400"
								class:bg-red-400={dev}
							>
								[root]
							</div>
							{#if !isRoot}
								<div
									on:click={() => navigateUp()}
									class="rounded font-semibold text-primary-focus cursor-pointer hover:text primary hover:bg-neutral-content p-1 bg-indigo-400"
									class:bg-indigo-400={dev}
								>
									[up]
								</div>
							{/if}
						</div>
						<div
							class="overflow-y-auto overflow-x-hidden mt-4 rounded bg-blue-50 h-full"
							class:bg-yellow-200={dev}
						>
							{#await filesPromise then files}
								<div class=" h-full overflow-auto">
									<ul class="cursor-default">
										{#each files.sort( (a, b) => a.type.localeCompare(b.type) ) as entry}
											{#if entry.type === 'directory'}
												<li
													class="cursor-pointer w-full"
													on:click={() => navigate(entry.name)}
												>
													<div
														href={''}
														class="hover:bg-blue-100 font-semibold text-primary-focus pl-2 py-1 w-full hover:text-blue-700"
													>
														/{entry.name}
													</div>
												</li>
											{:else}
												<li>
													<p class="pl-6 p-1 text-blue-300">{entry.name}</p>
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
			</div>
		{/if}
	</div>
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
