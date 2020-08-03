// @flow
import * as React from 'react';

export const showComponentOrNull = (
  component: React.Node,
  condition: boolean
) => (condition ? component : null);

const splitNumberByComma = (number: number) => {
  let transformedNumberToString = String(number);
  let intermediateArray = [];

  for (let i = transformedNumberToString.length - 1; i >= 0; i--) {
    if (intermediateArray.length % 3 === 0 && intermediateArray.length !== 0) {
      intermediateArray.push(transformedNumberToString[i] + ',');
    } else {
      intermediateArray.push(transformedNumberToString[i]);
    }
  }

  intermediateArray.reverse();
  intermediateArray.push('.00');
  intermediateArray.unshift('$');
  return intermediateArray.join('');
};

const fitGenres = (array: Array<Object>) => {
  const genresArray = array.map(item => item.name);
  const genre = genresArray.join(', ');
  return genre;
};

const fitCountries = (array: Array<Object>) => {
  const countryArray = array.map(item => item.name);
  const country = countryArray.join(', ');
  return country;
};

const fitRuntime = (runtime: number) => {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime - 60 * hours;
  const fittedRuntime = `${hours}h ${minutes}min`;
  return fittedRuntime;
};

const fitOverview = (overview: string) => {
  if (overview.length > 350) {
    return overview.slice(0, 350) + ' ...';
  } else {
    return overview;
  }
};

export const transformData = (
  data: Object,
  apiBackdrop: string,
  apiPoster: string,
  clapperboard: string,
  background: string
) => {
  const countries = fitCountries(data.production_countries),
    revenue = splitNumberByComma(data.revenue),
    budget = splitNumberByComma(data.budget),
    overview = fitOverview(data.overview),
    runtime = fitRuntime(data.runtime),
    genres = fitGenres(data.genres);

  const transformedData = {
    background: data.backdrop_path
      ? apiBackdrop + data.backdrop_path
      : background,
    image: data.poster_path ? apiPoster + data.poster_path : clapperboard,
    year: data.release_date ? data.release_date.slice(0, 4) : null,
    runtime: data.runtime ? runtime : null,
    revenue: data.revenue ? revenue : null,
    budget: data.budget ? budget : null,
    vote_average: data.vote_average,
    imdbId: data.imdb_id,
    overview: overview,
    country: countries,
    title: data.title,
    genre: genres,
    id: data.id
  };

  return transformedData;
};

const truncationFilmMakerList = (creditsMovie: Object) => {
  const crew = creditsMovie.crew;
  const compressedFilmMakerList = crew.filter(item => {
    return (
      item.job === 'Screenplay' ||
      item.job === 'Producer' ||
      item.job === 'Director' ||
      item.job === 'Writer'
    );
  });
  return compressedFilmMakerList;
};

const clearingArrayRepetitions = (
  array: Array<Object>,
  savedElements: string,
  deletedElements: string
): any[] => {
  let arrayRepeatingElements = [],
    counterDifferentElement = 0,
    arrayStartPart = [],
    arrayEndPart = [],
    arrayFinish = [];

  for (let i = 0; i < array.length; i++) {
    for (let k = 0; k < array.length; k++) {
      if (array[i][savedElements] !== array[k][savedElements]) {
        counterDifferentElement++;
      }
    }

    if (counterDifferentElement === array.length - 1) {
      arrayStartPart.push(array[i]);
    } else {
      arrayEndPart.push(array[i]);
      arrayRepeatingElements.push(array[i][deletedElements]);
      arrayEndPart[0][deletedElements] = arrayRepeatingElements.join(', ');
      arrayEndPart.splice(1, arrayEndPart.length - 1);
    }
    counterDifferentElement = 0;
  }
  arrayFinish = arrayStartPart.concat(arrayEndPart);
  return arrayFinish;
};

export const fitCreditsMovie = (
  creditsMovie: Array<Object>,
  name: string,
  job: string
) => {
  const finishedCreditsMovieArray = clearingArrayRepetitions(
    truncationFilmMakerList(creditsMovie),
    name,
    job
  );
  return finishedCreditsMovieArray;
};

export const searchMatchingInFavouritesMoviesArrayForVisibilityAddMovieBtn = (
  array: Array<Object>,
  id: number
) => {
  const matchesArray = array.filter(item => item.id === id);
  let reiteration = matchesArray.length > 0 ? true : false;
  return reiteration;
};
