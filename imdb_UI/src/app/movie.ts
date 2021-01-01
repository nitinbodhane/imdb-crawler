export default interface Movie {
  userRating: userRating,
  name: string,
  year: string,
  duration: string,
  genre: string,
  imdbRating: string,
  metaScore: string
}

interface userRating {
  ratingValue: string,
  bestRating: string
}
