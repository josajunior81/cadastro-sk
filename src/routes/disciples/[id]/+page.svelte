<script lang="ts">
	import { Button, Card, Heading, Li, List } from "flowbite-svelte";
	import type { PageData } from "./$types";
	import DiscipleSingleFilter from "$lib/components/DiscipleSingleFilter.svelte";
	import DiscipleMultipleFilter from "$lib/components/DiscipleMultipleFilter.svelte";

	export let data: PageData

	let disciples = (data.disciples as any[]).filter(d => d.name != data.profile.name).map(d => ({value: d.id, name: d.name}))
	let companions = disciples
	let singleValue: string = ""
	let multipleValue: any[] = []
	$: {
		companions = disciples
		if(singleValue.length > 0) {
			companions = companions.filter(c => c.name != singleValue)
		}
	}

	$: disciplerId = disciples.filter(d => d.name === singleValue)[0]?.value
	let companionship:any[]
	$:{
		let comps = disciples.filter(e => multipleValue.includes(e.name)).map(e => e.value)
		companionship = comps
	} 

</script>
<div class="mb-6">
	<Card>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Perfil</h5>
		<List tag="ul" class="space-y-1" list="none">
			<Li>Nome: {data.profile.name}</Li>
			<Li>E-mail: {data.profile.expand.user_id.email}</Li>
			<Li>Discipulador(a): {data.profile.expand.discipler_id.name}</Li>
			<Li>Companheirismo: {data.profile.expand.companionship.map(c => c.name)}</Li>
		</List>
		
	</Card>
</div>
<div class="mb-6">
	<Card>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Atualizar Perfil</h5>
		<form method="POST">
			<input name="id" value={data.profile.id} type="hidden" />
			<input name="discipler" value={disciplerId} type="hidden" />
			<input name="companions" value={companionship} type="hidden" />
			<div class="mb-6">
				<DiscipleSingleFilter title="Discipulador(a)" name="disciples" items={disciples} bind:value={singleValue} />
			</div>
			<div class="mb-6">
				<DiscipleMultipleFilter title="Companheirismo" name="companionship" items={companions} bind:value={multipleValue} />
			</div>
			<div class="mb-6 flex justify-end">
				<Button type="submit" color="green">Atualizar</Button> 
			</div>
		</form>
	</Card>
</div>