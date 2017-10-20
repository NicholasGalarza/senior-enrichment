import axios from 'axios'; 
// action type
const GET_STUDENTS = 'GET_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT'; 
const UPDATE_STUDENT = 'UPDATE_STUDENT'; 
const DELETE_STUDENT = 'DELETE_STUDENT'; 

//  action creator
export function getStudents(students) {
    return { type: GET_STUDENTS, students };
}

export function addStudent(student) {
    return {type: ADD_STUDENT, student}; 
}

export function updateStudent(student) {
    return {type: UPDATE_STUDENT, student}; 
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
            .catch((err) => console.error(err)); 
    }
}

export function addNewStudent(studentData) {
    return function thunk(dispatch) {
        return axios.post('/api/students', studentData)
            .then(res => res.data)
            .then(student => {
                const action = addStudent(student); 
                dispatch(action)
            })
            .catch(err => console.error(err)); 
    }
}

export function updateStudentData(id, modifiedStudent) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/update/${id}`, modifiedStudent)
            .then(res => res.data)
            .then(student => {
                const action = updateStudent(student); 
                dispatch(action)
            })
            .catch(err => console.error(err)); 
    }
}

// reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
        
        case ADD_STUDENT: 
            console.log('MY ACTION', action)
            return [...state, action.student]; 

        case UPDATE_STUDENT: 
            return [...state, action.student];

        default:
            return state;
    }
}