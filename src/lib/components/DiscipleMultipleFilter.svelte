<script lang="ts">
	import { Badge, Button, Checkbox, Chevron, Dropdown, Search } from "flowbite-svelte";

  export let items: any[] = []
  export let name = "disciples"
  export let title = "Filter"
  export let value
	let itemSearch = ""
  let itemsSearch: any[] = []
  
	$: result = []
  $: {
    if(itemSearch.length > 0) {
      itemsSearch = items.filter(c => c.name.toUpperCase().includes(itemSearch.toUpperCase()))
		} else {
      itemsSearch = items
		}
	}
  
  $:{
    value = result
  }
</script>
<Button><Chevron>{title}</Chevron></Button>
<Dropdown class="overflow-y-auto px-3 pb-3 text-sm h-44">
  <div slot="header" class="p-3">
    <Search size="md" placeholder="Digite para procurar" bind:value={itemSearch}/>
  </div>
  {#each itemsSearch as item}
    <li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
      <Checkbox name={name} bind:group={result} value={item.name}>{item.name}</Checkbox>
    </li>
  {/each}
</Dropdown>
<div class="my-4 space-x-2">
  {#each result as res}
    <Badge>{res}</Badge> 
  {/each}
</div>