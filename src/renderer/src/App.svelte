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

<div data-theme="lofi" class="card w-96 bg-base-100 shadow-xl">
	<h1>{directory}</h1>

	{#await filesPromise then files}
		{#if !isRoot}
			<div>
				<button class="btn btn-primary" on:click={() => navigateUp()}>..</button
				>
			</div>
		{/if}

		<table class="table">
			{#each files as entry}
				{#if entry.type === 'directory'}
					<tr>
						<td>
							<button class="btn " on:click={() => navigate(entry.name)}>
								{entry.name}
							</button>
						</td>
					</tr>
				{:else}
					<tr>
						<td>
							<p>{entry.name}</p>
						</td>
					</tr>
				{/if}
			{/each}
		</table>
	{/await}
</div>

<style>
	:global(body) {
		background-color: #444;
		color: #ccc;
	}
</style>
