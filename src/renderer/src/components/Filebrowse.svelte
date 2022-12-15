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

<div class="card w-96 bg-base-100 shadow-xl p-4">
	<div class="w-full  border-b border-grey-200 ">
		<p class="">{directory}</p>
	</div>

	{#await filesPromise then files}
		{@const filelist = files.sort((a, b) => a.type.localeCompare(b.type))}
		<!-- {@debug filelist} -->
		{#if !isRoot}
			<div>
				<a href={''} class="dir" on:click={() => navigateUp()}>..</a>
			</div>
		{/if}

		<ul class="">
			{#each filelist as entry}
				{#if entry.type === 'directory'}
					<li class=" hover:bg-gray-100 p-1 w-full">
						<a href={''} class="font-semibold text-gray-600" on:click={() => navigate(entry.name)}>
							./{entry.name}
						</a>
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
	li{
		@apply m-0;
	}
	.dir {
		@apply font-semibold text-gray-600;
	}
</style>
