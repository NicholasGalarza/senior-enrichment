import axios from 'axios'; 
// action type
const GET_CAMPUSES = 'GET_CAMPUSES';

//  action creator
export function getCampuses(campuses) {
    return { type: GET_CAMPUSES, campuses };
}

// thunk creator
export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            })
    }
}


export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;

        default:
            return state;
    }
}