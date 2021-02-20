<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  import { api_url } from "../../config";

  let title = "";
  let ingredients = "";
  let steps = "";
  let yieldAmount = 0;
  let yieldType = "";

  let error;

  const handleAdd = async () => {
    const response = await fetch(`${api_url}/recipe/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${$session.token}`,
      },
      body: JSON.stringify({
        title,
        ingredients,
        steps,
        yieldAmount,
        yieldType,
      }),
    });

    const parsed = await response.json();

    if (parsed.error) {
      error = parsed.error;
    } else {
      goto(`/r/${parsed.id}`);
    }
  };
</script>

{#if error}
  <p>{error}</p>
{/if}

<form on:submit|preventDefault={handleAdd} method="post">
  <div class="grid grid-cols-2 mx-2">
    <div class="contents">
      <label class="contents">
        <div class="col-span-2">Title:</div>
        <input class="col-span-2" type="text" bind:value={title} />
      </label>
    </div>
    <div class="contents">
      <label class="contents">
        <div class="col-span-2">Ingredients:</div>
        <textarea class="col-span-2" bind:value={ingredients} />
      </label>
    </div>
    <div class="contents">
      <label class="contents">
        <div class="col-span-2">Steps:</div>
        <textarea class="col-span-2" bind:value={steps} />
      </label>
    </div>
    <div class="col-span-2 grid grid-cols-3">
      <div class="contents">
        <label class="col-span-1">
          <div>Yield Amount:</div>
          <input type="number" bind:value={yieldAmount} />
        </label>
      </div>
      <div class="contents">
        <label class="col-span-1">
          <div>Yield Type:</div>
          <input type="text" bind:value={yieldType} />
        </label>
      </div>
    </div>
    <div class="col-span-2">
      <center>
        <button class="px-4 py-2" type="submit">Create</button>
      </center>
    </div>
  </div>
</form>

<style>
  textarea {
    resize: none;
  }
  textarea,
  input {
    border-color: black;
    border-width: 1px;
  }
</style>
