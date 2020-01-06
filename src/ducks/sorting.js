import { Record } from 'immutable';

const moduleName = 'sorting';

export const SORT_ITEM_SELECTED = `${moduleName}/SORT_ITEM_SELECTED`;

export const ReducerState = Record({
  tableSorting: null,
});

export default function reducer(state = new ReducerState(), action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SORT_ITEM_SELECTED:
      return state
        .set('tableSorting', payload);
    default: return state;
  }
}

export const sortingSelect = (payload) => (dispatch) => {
  dispatch({
    type: SORT_ITEM_SELECTED,
    payload,
  });
};
