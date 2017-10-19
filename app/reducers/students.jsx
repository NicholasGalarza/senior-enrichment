import axios from 'axios'; 
// action type
const GET_STUDENTS = 'GET_STUDENT';
const GET_SINGLE_STUDENT = 'GET_SINGLE_STUDENT'; 

//  action creator
export function getStudents(students) {
    return { type: GET_STUDENTS, students };
}

export function getSingleStudent(student) {
    return {type: GET_SINGLE_STUDENT, student}
}
// thunk creator

export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            })
            .catch((err) => console.log(err))
    }
}

export function fetchSingleStudent(studentId) {
    return function thunk(dispatch) {
        return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                const action = getSingleStudent(student); 
                dispatch(action)
            })
            .catch(err => console.log(err))
    }
}

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;

        case GET_SINGLE_STUDENT: 
            return action.student; 
        default:
            return state;
    }
}