'use strict';

exports.seed = async function (knex) {
	// using TMDB API
	const API_KEY = process.env.TMDB_API_KEY;
	const IMAGE_URL = 'https://image.tmdb.org/t/p/original';
	const TOP_URL = 'https://api.themoviedb.org/3/movie/top_rated?page=';
	const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';
	const CREDITS_URL = '/credits';

	let movies = [];
	let topUrl = '';
	let movieUrl = '';
	let creditsUrl = '';
	let options = {};
	let page = 1;

	while (page <= 25) {
		topUrl = TOP_URL + page.toString();
		options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${API_KEY}`,
			},
		};

		await fetch(topUrl, options)
			.then((response) => {
				return response.json();
			})
			.then(async (topData) => {
				if (topData.success === false) {
					throw new Error('TMDB API request failed');
				}

				for (const topMovie in topData.results) {
					movieUrl =
						MOVIE_URL + topData.results[topMovie].id.toString();
					await fetch(movieUrl, options)
						.then((response) => {
							return response.json();
						})
						.then(async (movieData) => {
							creditsUrl =
								MOVIE_URL +
								movieData.id.toString() +
								CREDITS_URL;
							await fetch(creditsUrl, options)
								.then((response) => {
									return response.json();
								})
								.then((creditsData) => {
									const director =
										creditsData.crew.find(
											(person) =>
												person.job === 'Director'
										).name ?? 'Unknown';
									movies.push({
										title: movieData.title ?? 'Unknown',
										release:
											new Date(movieData.release_date) ??
											new Date(0),
										duration: movieData.runtime,
										director,
										about: movieData.overview ?? 'Unknown',
										poster:
											IMAGE_URL + movieData.poster_path,
									});
								});
						});
				}
			})
			.catch(() => {
				console.error(
					'Error fetching data from the TMDB API, inserting dummy data instead.'
				);
				movies = [
					{
						title: 'The Lord of the Rings:' +
							'The Fellowship of the Ring',
						release: new Date('2001-12-19'),
						duration: 178,
						director: 'Peter Jackson',
						about: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
						poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNrPYBWNct4YCZCs-Ktj1UjKK2MWWZuP3NG7YJ1otFdhQv3gZ2',
					},
					{
						title: 'Star Wars: Episode III – Revenge of the Sith',
						release: new Date('2005-05-19'),
						duration: 180,
						director: 'George Lucas',
						about: 'Orbiting above Coruscant, Obi-Wan Kenobi and Anakin Skywalker lead a mission to rescue Supreme Chancellor Palpatine from the cyborg Separatist commander General Grievous. After infiltrating Grievous\' flagship, Obi-Wan and Anakin battle the Sith Lord Count Dooku, whom Anakin decapitates',
						poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoQA6EG3fI6VBpYBZYQ_a2ZN0VAN8B2gnFA_5iVkESE-E4WdmP',
					},
					{
						title: 'Inception',
						release: new Date('2010-07-21'),
						duration: 148,
						director: 'Christopher Nolan',
						about: 'Dominic Cobb (played by Leonardo DiCaprio) is a skilled thief who specializes in the art of extraction, stealing valuable secrets from deep within the subconscious during dreams. However, Cobb is haunted by his past, and his ability to navigate dreamscapes comes at a personal cost.\n' +
							'\n' +
							'Cobb is offered a chance at redemption when he is tasked with a seemingly impossible mission—instead of stealing information, he must plant an idea into the mind of a wealthy businessman named Robert Fischer (played by Cillian Murphy). To accomplish this, Cobb assembles a team of specialists, including Ariadne (played by Ellen Page), Arthur (played by Joseph Gordon-Levitt), Eames (played by Tom Hardy), and others.\n' +
							'\n' +
							'The heist involves delving into multiple layers of dreams within dreams, creating a complex and visually stunning narrative. As the team faces various challenges, including the presence of subconscious projections and the risk of being trapped in the dream world, the boundaries between reality and dream become increasingly blurred.',
						poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRhJNaN0nQi5oaoWPNzCEDgc-bXdofmz6LT7GbxjoukjWSgC-p',
					},
					{
						title: 'Shutter Island',
						release: new Date('2010-02-24'),
						duration: 138,
						director: 'Martin Scorses',
						about: 'In 1954, U.S. Marshal Edward "Teddy" Daniels and his new partner Chuck Aule travel to Ashecliffe Hospital for the criminally insane on Shutter Island, Boston Harbor, to investigate the disappearance of Rachel Solando, a patient of the hospital who had previously drowned her three children.',
						poster: 'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
					},
				];
				page = 20;
			});
		page++;
	}

	return knex('movie')
		.del()
		.then(() => {
			return knex('movie').insert(movies);
		});
};
