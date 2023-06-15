import { todoTypes } from "../type/todolistTypes";


const initialValues = {
    isEdit: null,
    filteredTodo: [],
    todoList: [
        {
            id: 1,
            description: 'Compartir material de la sesión con Front 4',
            state: false,
        },
        {
            id: 2,
            description: "Preparar la cena",
            state: false,
        },
        {
            id: 3,
            description: "Ver los videos de la clase",
            status: true
        }
    ]
}
export const todolistReducer = (state = initialValues, action) => {
    switch (action.type) {
        case todoTypes.UPDATE_STATUS:
            const updateTodo = state.todoList.map((item) => {
                if (action.payload === item.id) {
                    return {
                        ...item,
                        status: !item.status
                    }
                } else {
                    return item;
                }
            })
            return {
                ...state,
                todoList: updateTodo,
            };

        case todoTypes.CREATE_TODO:
            const newTask = {
                ...action.payload,
                id: state.todoList.length + 1,
                status: false
            }
            return {
                ...state,
                todoList: [...state.todoList, newTask],
            }

        case todoTypes.DELETE_TODO:
            const deleteTodo = state.todoList.filter((item) => item.id !== action.payload)
            return{
                ...state,
                todoList: [...deleteTodo]
            }
        case todoTypes.HANDLE_ISEDIT:
            return{
                ...state,
                isEdit: action.payload
            }
        case todoTypes.UPDATE_TODO:
            const updatedTodo = state.todoList.map(item => {
                if(action.payload.id === item.id) {
                    return action.payload;
                }else {
                    return item
                }
            })
            return{
                ...state,
                isEdit: null,
                todoList: updatedTodo
            }
        case todoTypes.FILTER_STATUS:
            const filteredTodo = action.payload === 'all' ? [] : state.todoList.filter((item)=> item.status === action.payload);

            return{
                ...state,
                filteredTodo: filteredTodo,
            }
        default:
            return state;
    }
}