<script lang="ts">
	import { onMount } from 'svelte';

	import { Network } from 'vis-network';

	let mynetwork;
	let width = 800;
	let height = 600;
	const nodeRadius = 5;
	const padding = { top: 20, right: 40, bottom: 40, left: 25 };

	export let data;

	const links: any[] = [];
	const nodes: any[] = [];

	data.forEach((d) => {
		nodes.push({ id: d.id, level: -d.position, label: d.name });
		if (d.expand.discipler_id)
			links.push({ from: d.id, to: d.expand.discipler_id.id, arrows: 'to' });
		if (d.expand.companionship) {
			const companions = d.expand.companionship;
			companions.forEach((c) => {
				links.push({ from: d.id, to: c.id, arrows: 'to', color: { color: 'orange' } });
			});
		}
	});

	let simulation;
	onMount(() => {
		const networkData = {
			nodes: nodes,
			edges: links
		};
		const options = {
			layout: {
			  hierarchical: {
          direction: "UD",
			    sortMethod: "hubsize",
			    shakeTowards: "leaves",
			  },
			},
			edges: {
			  smooth: true,
			  arrows: { to: true },
			},
		};
		const network = new Network(mynetwork, networkData, options);

	});
</script>

<div bind:this={mynetwork} id="mynetwork" />

<style>
	html,
	body,
	#mynetwork {
		margin: 0px;
		padding: 0px;
	}

	#mynetwork {
		position: fixed;
		left: 20%;
		top: 15%;
		bottom: 5%;
		right: 10%;
		border: 1px solid lightgray;
		background: white;
    z-index: -1;
	}

	#text {
		position: absolute;
		left: 10%;
		padding: 1em;
	}

	#title {
		margin-bottom: 5em;
	}
</style>
