import { history } from '../redux/store';

// Use function to navigate to camera screen.
// Pass all state and props that need to be saved into preservedState
// and it will be passed back to the original screen after the Camera workflow finishes
// goBack tracks the number of layers in the history stack needed to go back
export function navigateToCamera(preservedState: object, goBack?: number) {
  const returnLink = history.location.pathname;
  history.replace('/camera', { ...preservedState, returnLink, goBack });
}
