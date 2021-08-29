<script>
	import { blur } from 'svelte/transition';
	export let open = false;
	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);
	let isFocused = false;
</script>

<aside
	on:mouseleave={() => (open = !open)}
	class="absolute w-4/12 h-5/6  bg-gray-300 border-r-2 shadow-lg"
	class:open
>
	<nav class="p-12 text-xl">
		<a
			class="ml-10 mr-10 p-3 block items-center rounded-md text-base font-light text-gray-500 hover:bg-gray-200"
			href="#about">About</a
		>
		<a
			class="ml-10 mr-10 p-3 block items-center rounded-md text-base font-light text-gray-500 hover:bg-gray-200"
			href="#contact">Contact</a
		>
		<a
			class="ml-10 mr-10 p-3 block items-center rounded-md text-base font-light text-gray-500 hover:bg-gray-200"
			href="#pricing">Pricing</a
		>
	</nav>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out;
	}

	.open {
		left: 0;
	}
</style>
