import axios from 'axios'; 
// action type
const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'; 
const DELETE_CAMPUS = 'DELETE_CAMPUS'; 
const UPDATE_DELETED_CAMPUSES = 'UPDATE_DELETED_CAMPUSES'; 

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

export function deleteCampus(campus) {
    return {type: DELETE_CAMPUS, campus}
}

export function updateDeletedCampuses(id) {
    return {type: UPDATE_DELETED_CAMPUSES, id}
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

export function updateCampusData(id, modifiedCampus) {
    return function thunk(dispatch) {
        return axios.put(`/api/campuses/update/${id}`, modifiedCampus)
            .then(res => res.data)
            .then(campus => {
                const action = updateCampus(campus); 
                dispatch(action); 
            })
            .catch(err => console.error(err)); 
    }
}

export function deleteSelectedCampus(id) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${id}`)
            .then(dispatch(updateDeletedCampuses(id))); 
    }
}

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;

        case ADD_CAMPUS: 
            return [...state, action.campus]; 

        case UPDATE_CAMPUS: 
            return [...state, action.campus]; 

        case DELETE_CAMPUS: 
            return [...state]

        case UPDATE_DELETED_CAMPUSES: 
            return state.filter(campus => campus.id !== action.id)

        default:
            return state;
    }
}