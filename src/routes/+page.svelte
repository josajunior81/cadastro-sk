<script lang="ts">
	import VisNetwork from "$lib/components/VisNetwork.svelte";

	export let data;

	const disciples = data.disciples
	const leafs: any[] = []
	function mountLeafs(disciple: any) {
		if (disciples.filter(d => disciple.id === d.discipler_id).length == 0) {
			disciple["position"] = 0
			leafs.push(disciple)
		} 
	}
	disciples.forEach(d => {
		mountLeafs(d)
	})

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

	function orderDisciples(disciple: any, position: number){
		const ld = disciples.filter(i => disciple.id === i.id)[0]
		if(ld.expand.discipler_id) {
			const discipler = disciples.filter(i => ld.expand.discipler_id.id === i.id)[0]
			const nd = disciples.findIndex(d => d.id === discipler.id)
			if(!Object.hasOwn(discipler, "position")) {
				discipler["position"] = position
				disciples[nd] = discipler
			} else if(discipler.position < position) {
				discipler["position"] = position
				disciples[nd] = discipler
			}
			position++
			orderDisciples(discipler, position)
		}
	}

	// orderDisciples(leafs[0], 1)
	leafs.forEach(l => {
		orderDisciples(l, 1)
		// const leafArr = [{name: l.name, value: 1}]
		// const arr = [...leafArr, ...mountArray(l, [])]
		// console.log(arr)
	})

	disciples.sort( (a,b) => a.position - b.position);
	// console.log(disciples)

</script>

<VisNetwork data={disciples} />