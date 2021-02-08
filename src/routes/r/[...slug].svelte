
<script context="module">
	export async function preload(page, recipe_id) {
		const { slug } = page.params;
		recipe_id = slug;
		return { recipe_id };
	}
</script>
<script>
import { onMount } from 'svelte';

    export let recipe_id;
	import RenderSingle from '../../components/RenderSingle.svelte';
	const localAPIURL = 'http://localhost:8080';

	let promise = [];

	onMount(async () => {
		const getObjects = async () => {
			const recipeId = (recipe_id[0]).toString()
			const resp = await fetch(`${localAPIURL}/api/recipe/get`,{
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					_id: recipeId
				})
			})
				const jsonobj = await resp.json();
			return [...promise, jsonobj]
		}
		promise = await getObjects();
	})
</script>

<svelte:head>
	<title>milkbox</title>
</svelte:head>

<RenderSingle promise={promise}></RenderSingle>