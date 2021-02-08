<script context="module">
  export async function preload(page, recipe_id) {
    const { slug } = page.params;
    recipe_id = slug;
    return { recipe_id };
  }
</script>

<script>
  import { onMount } from "svelte";

  export let recipe_id;
  import RenderSingle from "../../components/RenderSingle.svelte";
  import { api_url } from "../../../config";

  let promise = [];
  let fullName = "";
  onMount(async () => {
    const getObjects = async () => {
      const recipeId = recipe_id[0].toString();
      const resp = await fetch(`${api_url}/recipe/get`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          id: recipeId,
        }),
      });
      const jsonobj = await resp.json();
      return [...promise, jsonobj];
    };
    promise = await getObjects();
    const getUser = async () => {
      const userId = promise[0].created_by;
      const resp = await fetch(`${localAPIURL}/api/profile/get`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJmdWxsTmFtZSI6InRlc3QiLCJfaWQiOiI2MDIwOGU3MzZjY2NmZTRkZGNmZjc4ZTIiLCJpYXQiOjE2MTI3NDY3Mjh9.dY2iCJju6_vzDKo5ULJ-W4XJNxg6W6CCWllOALSPbTE",
        },
        body: new URLSearchParams({
          userid: userId,
        }),
      });
      const returnObj = await resp.json();
      return returnObj;
    };
    const resp = await getUser();
    fullName = resp.fullName;
  });
</script>

<svelte:head>
  <title>milkbox</title>
</svelte:head>

<RenderSingle {promise} {fullName} />
