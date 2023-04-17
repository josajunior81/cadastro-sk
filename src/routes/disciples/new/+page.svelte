<script  lang="ts">
	import DateInput from '$lib/components/DateInput.svelte';
	import { Alert, Input, Label, Button, Toggle, Helper, Select } from 'flowbite-svelte';    
	import type { ActionData, PageData } from "./$types"
	
	export let data: PageData
	export let form: ActionData

	let church = ""
	let messages: any = {}
	let type:any = {}
	let error = form?.error
	let formData = form?.data
	if(error?.code == 400) {
		let index: string = Object.keys(error.data)[0]
		messages[index] = `${index} : ${error.data[index].message}`
		type[index] = "red"
	} 
</script>
{#if error?.code == 400}
<Alert color="red">
  <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  </span>
  <span class="font-medium">Erro! </span>Erros foram encontrados no cadastro
</Alert>
{/if}
<div class="p-10">
	<form method="POST">
		<div class="mb-6">
			<Label for="name" class="mb-2">Nome</Label>
			<Input name="name" type="name" id="name" placeholder="Digite seu nome" required value={formData?.name} />
		</div>		
		<div class="mb-6">
			<Label for="bithdate" class="mb-2">Data de nascimento</Label>
			<DateInput fieldName="birthdate" dateValue={formData?.birthdate}/>
		</div>						
		<div class="mb-6">
			<Label for="email" color={type["email"] ?? "base"} class="mb-2">E-mail</Label>
			<Input name="email" color={type["email"] ?? "base"} type="email" id="email" placeholder="Digite seu e-email" required value={formData?.email}>
				<svg slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
			</Input>
			<Helper class='mt-2' color='red'><span class="font-medium">{messages["email"] ?? ""}</Helper>
		</div>		
		<div class="mb-6">
			<Label for="password" color={type["password"] ?? "base"} class="mb-2">Senha</Label>
			<Input name="password" color={type["password"] ?? "base"} type="password" id="password" placeholder="Digite sua senha" required />
			<Helper class='mt-2' color='red'><span class="font-medium">{messages["password"] ?? ""}</Helper>
		</div>
		<div class="mb-6">
		<Label>Igreja na casa
			<Select name="churchId" class="mt-2" items={data.churchs} placeholder="Selecione uma igreja na casa"/>
		</Label>
		</div>
		<div class="mb-6">
			<Toggle name="isPastor">Pastor</Toggle>
		</div>		
		<div class="mb-6">
			<Toggle name="isLeader" color="green">Líder</Toggle>
		</div>				
		<div class="flex justify-evenly">
			<Button type="submit" color="dark">Confirmar</Button>
		</div>
	</form>
</div>