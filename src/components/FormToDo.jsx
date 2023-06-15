import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { createTodoAction, updateTodoAction } from '../redux/actions/todolistActions';
const FormToDo = () => {
    const dispatch = useDispatch();

    const { isEdit } = useSelector(store => store.toDo)

    const schema = yup.object({
        description: yup.string().required('No hay tarea para guardar'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // description: isEdit.description ? isEdit.description : ''
        }
    });

    const onSubmit = (data) => {
        if (isEdit) {
            const updateTask = {
                ...isEdit,
                description: data.description,
            }
            dispatch(updateTodoAction(updateTask))
        } else {
            dispatch(createTodoAction(data))
        }
        reset();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder='Agregue una nueva tarea' {...register('description')}
                defaultValue={isEdit?.description || ''}
            />
            <span style={{ color: 'red' }}>{errors.description?.message}</span>
            <button type='submit'>{isEdit ? 'Actualizar' : 'Nueva Tarea'}</button>
        </form>
    )
}

export default FormToDo