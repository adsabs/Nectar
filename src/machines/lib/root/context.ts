import { Context } from './types';

export const initialContext: Context = {
  user: {
    username: 'anonymous',
    anonymous: true,
    access_token: '',
    expire_in: '',
  },
  query: {
    q: '',
  },
  result: {
    docs: [],
    numFound: 0,
  },
  selectedDocs: [],
};
