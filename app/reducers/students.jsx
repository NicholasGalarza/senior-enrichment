import axios from 'axios';
// action type
const GET_STUDENTS = 'GET_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const REMOVE_STUDENTS_FROM_CAMPUS = 'REMOVE_STUDENTS_FROM_CAMPUS';
const UPDATE_STUDENT_LIST = 'UPDATE_STUDENT_LIST';


//  action creator
export function getStudents(students) {
    return { type: GET_STUDENTS, students };
}

export function addStudent(student) {
    return { type: ADD_STUDENT, student };
}

export function updateStudent(student) {
    return { type: UPDATE_STUDENT, student };
}

export function deleteStudent(id) {
    return { type: DELETE_STUDENT, id }
}

export function removeStudentsFromCampus(id) {
    return { type: REMOVE_STUDENTS_FROM_CAMPUS, id }
}

export function updateStudentList(modifiedStudent) {
    return { type: UPDATE_STUDENT_LIST, modifiedStudent }
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
                return dispatch(action);
            })
            .then(modifiedStudent => dispatch(updateStudentList(modifiedStudent.student)))
            .catch(err => console.error(err));
    }
}

export function deleteSelectedStudent(id) {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${id}`)
            .then(dispatch(deleteStudent(id)));
    }
}

// reducer
export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;

        case ADD_STUDENT:
            return [...state, action.student];

        case UPDATE_STUDENT:
            return state.map(student => student.id === action.student.id ? action.student : student) 

        case DELETE_STUDENT:
            return state.filter(student => student.id !== action.id)

        case REMOVE_STUDENTS_FROM_CAMPUS:
            return state.filter(student => student.campusId !== action.id)

        case UPDATE_STUDENT_LIST:
            return state.map(student => (student.id === action.modifiedStudent.id) ? action.modifiedStudent : student)

        default:
            return state;
    }
}