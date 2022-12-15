<script>
	let directory = window.api.currentDirectory()
	$: filesPromise = window.api.directoryContents(directory)
	$: isRoot = directory === '/'

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
</script>

<div class="bg-base-100 card m-4 p-4 h-[50%]">
	<div class="w-full border-b border-grey-200 pb-2 mb-2">
		<p class="">{directory}</p>
	</div>

	{#await filesPromise then files}
		<!-- {@const filelist = files.sort((a, b) => a.type.localeCompare(b.type))} -->
		<!-- {@debug filelist} -->
		{#if !isRoot}
			<span
				on:click={() => navigateUp()}
				class="cursor-pointer hover:bg-gray-100 p-1 w-full"
			>
				🔼
			</span>
		{/if}

		<ul class="h-full overflow-auto">
			{#each files.sort((a, b) => a.type.localeCompare(b.type)) as entry}
				{#if entry.type === 'directory'}
					<li
						class="cursor-pointer hover:bg-gray-100 p-1 w-full"
						on:click={() => navigate(entry.name)}
					>
						<span href={''} class="font-semibold text-gray-600">
							./{entry.name}
						</span>
					</li>
				{:else}
					<li>
						<p class=" p-1 text-blue-300">{entry.name}</p>
					</li>
				{/if}
			{/each}
		</ul>
	{/await}
</div>

<style lang="postcss">
	li {
		@apply m-0;
	}
	.dir {
		@apply font-semibold text-gray-600;
	}
</style>
