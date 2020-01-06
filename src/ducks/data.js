import { Record } from 'immutable';

const moduleName = 'houses';

export const FETCH_DATA_START = `${moduleName}/FETCH_DATA_START`;
export const FETCH_DATA_SUCCEEDED = `${moduleName}/FETCH_DATA_SUCCEEDED`;
export const FETCH_DATA_FAILED = `${moduleName}/FETCH_DATA_FAILED`;

export const ReducerState = Record({
  vendorHouses: null,
  loading: true,
});

export default function reducer(state = new ReducerState(), action = {}) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DATA_START:
      return state
        .set('loading', true);
    case FETCH_DATA_SUCCEEDED:
      return state
        .set('vendorHouses', payload)
        .set('loading', false);
    case FETCH_DATA_FAILED:
      console.log(payload);

      return state
        .set('loading', false);
    default: return state;
  }
}

// Action Creators
export function fetchDataStartAction() {
  return ({
    type: FETCH_DATA_START,
  })
};

export function fetchDataSucceededAction(payload) {
  return ({
    type: FETCH_DATA_SUCCEEDED,
    payload,
  })
};

export function fetchDataFailedAction(error) {
  return ({
    type: FETCH_DATA_FAILED,
    payload: { error },
  })
};

export const fetchData = () => (dispatch) => {
  const url = 'http://localhost:1337/houses';

  dispatch(fetchDataStartAction());

  fetch(url)
    .then(res => res.json())
    .then(({ results }) => {
      const data = results.reduce((obj, { vendor_verbose, ...rest }) => {
        const { display_name: name } = vendor_verbose;
        const restHouses = obj[name] ? obj[name].houses : [];

        return ({
          ...obj,
          [name]: {
            vendor_verbose,
            houses: [ { ...rest }, ...restHouses ],
          },
        })
      }, {});

      dispatch(fetchDataSucceededAction(data))
    })
    .catch(error => dispatch(fetchDataFailedAction(error)));
};
