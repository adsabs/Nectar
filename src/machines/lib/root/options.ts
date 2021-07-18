import { assign, MachineOptions } from 'xstate';
import { Context, SET_DOCS, SET_NUM_FOUND, SET_QUERY, SET_SELECTED_DOCS, SET_USER_DATA } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const options: Partial<MachineOptions<Context, any>> = {
  actions: {
    setDocs: assign<Context, SET_DOCS>({
      result: (ctx, evt) => ({ ...ctx.result, docs: evt.payload.docs }),
    }),
    setNumFound: assign<Context, SET_NUM_FOUND>({
      result: (ctx, evt) => ({ ...ctx.result, numFound: evt.payload.numFound }),
    }),
    setSelectedDocs: assign<Context, SET_SELECTED_DOCS>({
      selectedDocs: (ctx, evt) => evt.payload.selectedDocs,
    }),
    setQuery: assign<Context, SET_QUERY>({
      query: (ctx, evt) => evt.payload.query,
    }),
    setUserData: assign<Context, SET_USER_DATA>({
      user: (ctx, evt) => evt.payload.user,
    }),
  },
};
