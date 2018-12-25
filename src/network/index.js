import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
export const NOW_PLAYING = '/movie/now_playing';
export const POPULAR = '/movie/popular';
export const TOP_RATED = '/movie/top_rated';

const apiGateway = axios.create({
    baseURL: BASE_URL
});

apiGateway.defaults.params = {};
apiGateway.defaults.params['api_key'] = '3128501e3a83506e23ebe96b4ae92f0f';

export {apiGateway};