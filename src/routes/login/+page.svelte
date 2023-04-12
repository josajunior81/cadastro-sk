<script lang="ts">
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<form method="POST"  use:enhance>
	{#if form?.error }
		<Alert color="red">
			<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
			</span>
			<span class="font-medium">Falha ao logar! </span> Verifique seu usuário e senha
		</Alert>
	{/if}
	<div class="mb-6">
		<Label for="email" class="mb-2">E-mail</Label>
		<Input name="email" type="email" id="email" placeholder="Digite seu email" required />
	</div>
	<div class="mb-6">
		<Label for="password" class="mb-2">Senha</Label>
		<Input name="password" type="password" id="password" placeholder="Digite sua senha" required />
	</div>
	<div class="flex justify-evenly">
		<Button type="submit">Entrar</Button>
		<Button href="/disciples/new" color="dark">Registrar</Button>
	</div>
</form>
