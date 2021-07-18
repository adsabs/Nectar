import { TransitionType } from './types';

export const transitions = {
  [TransitionType.SET_DOCS]: { actions: 'setDocs' },
  [TransitionType.SET_NUM_FOUND]: { actions: 'setNumFound' },
  [TransitionType.SET_SELECTED_DOCS]: { actions: 'setSelectedDocs' },
  [TransitionType.SET_USER_DATA]: { actions: 'setUserData' },
  [TransitionType.SET_QUERY]: { actions: 'setQuery' },
};
