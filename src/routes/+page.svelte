<script>
	import { onMount } from 'svelte';
	import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from 'd3-force';

	import * as d3 from 'd3';

	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { select, selectAll } from 'd3-selection';

	// let d3 = { scaleLinear, scaleOrdinal, select, selectAll, forceSimulation, forceLink, forceManyBody, forceX, forceY }

	let width = 800;
	let height = 600;
	const nodeRadius = 5;
	const padding = { top: 20, right: 40, bottom: 40, left: 25 };

	export let data;
	let vis;
	const types = ['discipleship', 'companionship'];

	let color = scaleOrdinal(types, d3.schemeCategory10);

	const links = [];
	const nodes = [];

	data.disciples.forEach((d) => {
		nodes.push({ id: d.name });
		if (d.expand.discipler_id)
			links.push({ source: d.name, target: d.expand.discipler_id.name, type: 'discipleship' });
    if (d.expand.companionship) {
      const companions = d.expand.companionship
      companions.forEach(c => {
        links.push({ source: d.name, target: c.name, type: 'companionship' });
      })
    }
	});

  let simulation
	onMount(() => {
		simulation = forceSimulation(nodes)
			.force(
				'link',
				forceLink(links).id((d) => d.id)
			)
			.force('charge', forceManyBody().strength(-2500))
			.force('x', forceX())
			.force('y', forceY());

		const svg = select(".chart").append('svg').attr("viewBox", [-(width / 2) + 100, -(height / 2), width, height]).append('g');

		svg
			.append('defs')
			.selectAll('marker')
			.data(types)
			.join('marker')
			.attr('id', (d) => `arrow-${d}`)
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 15)
			.attr('refY', -0.5)
			.attr('markerWidth', 6)
			.attr('markerHeight', 6)
			.attr('orient', 'auto')
			.append('path')
			.attr('fill', color)
			.attr('d', 'M0,-5L10,0L0,5');

		const link = svg
			.append('g')
			.attr('fill', 'none')
			.attr('stroke-width', 1.5)
			.selectAll('path')
			.data(links)
			.join('path')
			.attr('stroke', (d) => color(d.type))
			.attr('marker-end', (d) => `url(${new URL(`#arrow-${d.type}`, location)})`);

		const node = svg
			.append('g')
			.attr('fill', 'currentColor')
			.attr('stroke-linecap', 'round')
			.attr('stroke-linejoin', 'round')
			.selectAll('g')
			.data(nodes)
			.join('g')
      .call(drag(simulation));

		node.append('circle').attr('stroke', 'white').attr('stroke-width', 1.5).attr('r', 4);

		node
			.append('text')
			.attr('x', 8)
			.attr('y', '0.31em')
			.text((d) => d.id)
			.clone(true)
			.lower()
			.attr('fill', 'none')
			.attr('stroke', 'white')
			.attr('stroke-width', 3);

		simulation.on('tick', () => {
			link.attr('d', linkArc);
			node.attr('transform', (d) => `translate(${d.x},${d.y})`);
		});
	});

  const drag = simulation => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

	function linkArc(d) {
		const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
		return `
      M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
	}
</script>

<div class="chart" bind:this={vis}>
  
</div>

<style>
	.chart {
		width: 100%;
		max-width: 800px;
		height: 600px;
		min-height: 800px;
		max-height: 600px;
		margin: 0 auto;
	}
</style>