<script context="module">
  export function preload(page, session) {
    console.log(session);
  }
</script>

<script>
  import axios from "axios";

  import { api_url } from "../../config";

  let promise = [];
  async function getObjects() {
    axios
      .get(`${api_url}/recipe`, {
        method: "get",
        credentials: "same-origin",
      })
      .then((resp) => {
        for (let i = 0; i < resp.data.length; i++) {
          promise = [...promise, resp.data[i]];
        }
      });
  }
  getObjects();
</script>

<svelte:head>
  <title>milkbox</title>
</svelte:head>

<ul>
  {#await promise}
    <p>awaiting...</p>
  {:then promise}
    {#each promise as item}
      <a href="/r/{item.id}">
        {item.title}
      </a>
      <br />
    {/each}
  {:catch error}
    <p>error</p>
  {/await}
</ul>
