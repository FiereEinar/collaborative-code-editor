import { NavigateFunction } from 'react-router-dom';

export let navigate: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
	navigate = nav;
};
