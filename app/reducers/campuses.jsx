import axios from 'axios'; 
// action type
const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'; 

//  action creator
export function getCampuses(campuses) {
    return { type: GET_CAMPUSES, campuses };
}

export function addCampus(campus) {
    return {type: ADD_CAMPUS, campus}; 
}

export function updateCampus(campus) {
    return {type: UPDATE_CAMPUS, campus}
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
            .catch(err => console.error(err)); 
    }
}

export function addNewCampus(campusData) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campusData)
            .then(res => res.data)
            .then(campus => {
                const action = addCampus(campus); 
                dispatch(action); 
            })
            .catch(err => console.error(err)); 
    }
}

export function updateCampusData(modifiedCampus) {
    return function thunk(dispatch) {
        return axios.put('/api/campuses/:campusId', modifiedCampus)
            .then(res => res.data)
            .then(campus => {
                const action = updateCampus(campus); 
                dispatch(action); 
            })
            .catch(err => console.error(err)); 
    }
}


export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;

        case ADD_CAMPUS: 
            return [...state, action.campus]; 

        case UPDATE_CAMPUS: 
            console.log("This must be updated", action); 
            return [...state, action.campus]; 

        default:
            return state;
    }
}