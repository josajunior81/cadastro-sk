<script lang="ts">
	import { Badge, Button, Chevron, Dropdown, Radio, Search } from "flowbite-svelte";

  export let items: any[] = []
  export let name = "disciples"
  export let title = "Filter"
  export let value
	let itemSearch = ""
  let itemsSearch: any[] = []

  $:{
    value = resultSingle
  }

  $: resultSingle = ""
	$: {
		if(itemSearch.length > 0) {
			itemsSearch = items.filter(c => c.name.toUpperCase().includes(itemSearch.toUpperCase()))
		} else {
			itemsSearch = items
		}
	}
</script>
<Button><Chevron>{title}</Chevron></Button>
<Dropdown class="overflow-y-auto px-3 pb-3 text-sm h-44">
  <div slot="header" class="p-3">
    <Search size="md" placeholder="Digite para procurar" bind:value={itemSearch}/>
  </div>
  {#each itemsSearch as item}
    <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
      <Radio name={name} bind:group={resultSingle} value={item.name}>{item.name}</Radio>
    </li>
  {/each}
</Dropdown>
<div class="my-4 space-x-2">
  {#if resultSingle.length > 0}
    <Badge>{resultSingle}</Badge> 
  {/if}
</div>