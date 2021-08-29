// purge will exclude any css that is not found is the given PATH
// 'jit' is a just in time compiler for tailwind

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte']
};
