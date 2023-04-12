<script lang="ts">
	import { Button, NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
	import '../app.postcss';
	import type { LayoutData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pb';

	export let data: LayoutData

</script>


	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
		  <img
			src="/favicon.png"
			class="mr-3 h-6 sm:h-9"
			alt="Logo"
		  />
		  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Cadastro Beira-Mar
		  </span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
		  <NavLi href="/disciples/new"></NavLi>
		  {#if ! data.user }
		  <NavLi href="/login">Entrar</NavLi>
		  {:else}
			<NavLi href='/disciples/{data.user.id}'>Meu perfil</NavLi>
			{/if}	
		</NavUl>
		{#if data.user }
		<form
		method="POST"
		action="/logout"
		use:enhance={() => {
			return async ({ result }) => {
			pb.authStore.clear()
			await applyAction(result)
			}
		}}
		>
		  <Button type="submit" color="red">Sair</Button>
	  </form>
	  {/if}			
	  </Navbar>
<div class="md:container md:mx-auto">
	<slot />
</div>
