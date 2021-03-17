import { history } from '../redux/store';

// Use function to navigate to camera screen.
// Pass all state and props that need to be saved into preservedState
// and it will be passed back to the original screen after the Camera workflow finishes
export function navigateToCamera(preservedState: object) {
    const returnLink = history.location.pathname;
    history.push('/camera', { ...preservedState, returnLink });
}