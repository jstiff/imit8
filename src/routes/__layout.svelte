<script context="module">
	export async function load({ page, session }) {
		if (/^\/admin\/(.*)/.test(page.path) && session.user === null) {
			return {
				redirect: '/',
				status: 302
			};
		}
		return { props: {} };
	}
</script>

<slot />

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
