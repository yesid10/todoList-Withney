import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodoAction, handleIsEditAction, updateStatusAction } from '../redux/actions/todolistActions';

const TodoList = () => {
    const [taskList, setTaskList] = useState([])

    const dispatch = useDispatch();
    const { todoList, filteredTodo } = useSelector(state => state.toDo);
    console.log(todoList);

    useEffect(() => {
        if(filteredTodo.length) {
            setTaskList(filteredTodo);
        }else{
            setTaskList(todoList);
        }
    }, [todoList, filteredTodo])

    const handleDelete = (id) => {
        dispatch(deleteTodoAction(id));   
    }

    const handleEdit = (id) => {
        dispatch(handleIsEditAction(id))
    }
    return (
        <form >

            {
                taskList.map(item => (
                    <div key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.status}
                            onChange={() => { dispatch(updateStatusAction(item.id)) }} />
                        <span htmlFor="">{item.description}</span>
                        <div>
                            <span className="material-symbols-outlined" onClick={() => handleDelete(item.id)}>close</span>
                            <span className="material-symbols-outlined" onClick={() => handleEdit(item)}>edit</span>
                        </div>
                    </div>
                ))
            }
        </form>
    )
}

export default TodoList;