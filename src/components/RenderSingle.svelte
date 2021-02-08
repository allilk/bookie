<script>
    export let promise;
</script>

<div class="grid grid-cols-5 h-full">
	{#await promise}
    	<p>awaiting...</p>
	{:then promise}
		{#each promise as item}
			<div class="p-3 place-self-center invisible md:visible md:col-span-1">
				<img src="{item.cover_picture}" alt="No resource found." >
			</div>
			<div class="col-span-5 md:col-span-4">
				<div class="text-xl py-6">
					{item.title}
				</div>
				<div class="text-md">
					Created by <i>{item.created_by}</i> on {item.created}
				</div>
	
				<div>
					<b>Ingredients:</b>
					<div class="ml-4 mt-0">
						{item.ingredients}
					</div>
				</div>
				<div>
					<b>Steps:</b>
					<div class="ml-4 mt-0">
						{item.steps}
					</div>
				</div>
			</div>
		{/each}
	{:catch error}
		<p>error</p>
	{/await}
</div>