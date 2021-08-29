import { writable } from 'svelte/store';
export const oAuth_user = writable([]);

const fetchUser = async () => {
	console.log('STORE SOTRE');
	const url = `http://127.0.0.1:5000/authenticate/login`;
	const res = await fetch(url);
	const data = await res.json();
	console.log('DATA', data);
	// 	const loadedPokemon = data.results.map((data, index) => ({
	// 		name: data.name,
	// 		id: index + 1,
	// 		image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
	// 			index + 1
	// 		}.png`
	// 	}));
	// 	pokemon.set(loadedPokemon);
};
//fetchUser();
