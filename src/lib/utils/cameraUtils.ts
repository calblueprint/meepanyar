import { history } from '../redux/store';

export function navigateToCamera(preservedState: object) {
    const returnLink = history.location.pathname;
    history.push('/camera', { ...preservedState, returnLink });
}