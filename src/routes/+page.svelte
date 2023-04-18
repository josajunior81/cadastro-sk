<script lang="ts">
	import D3Graph from "$lib/components/D3Graph.svelte";
	import type { I } from "vitest/dist/types-de0e0997.js";

	export let data;

	const disciples = data.disciples
	// const leafs: any[] = []
	// function mountLeafs(disciple: any) {
	// 	if (disciples.filter(d => disciple.id === d.discipler_id).length == 0) {
	// 		leafs.push(disciple)
	// 	} 
	// }
	// disciples.forEach(d => {
	// 	mountLeafs(d)
	// })

	// function mountArray(disciple: any, arr: any[]) {
	// 	const ld = disciples.filter(i => disciple.id === i.id)[0]
		
	// 	if(ld.expand.discipler_id) {
	// 		const d = [disciple]
	// 		let dp
	// 		if (disciples.filter(d => disciple.id === d.discipler_id).length == 0)
	// 			dp = {name: ld.expand.discipler_id.name, children: d.map(i => ({name: i.name, value: 1})) }
	// 		else 
	// 			dp = {name: ld.expand.discipler_id.name, children: d.map(i => ({name: i.name, children: arr})) }

	// 		arr.push(dp)
	// 		mountArray(ld.expand.discipler_id, arr)
	// 	}

	// 	return arr
	// }

	// leafs.forEach(l => {
	// 	const leafArr = [{name: l.name, value: 1}]
	// 	const arr = [...leafArr, ...mountArray(l, [])]
	// 	console.log(arr)
	// })


</script>

<D3Graph data={disciples} />