import { 
    INPUT_CREATE, 
    INPUT_DELETE, 
    INPUT_UPDATE,
    INPUT_LOAD,
    INPUT_COMPLETED
    } from "./types";

const initialState = {
    tasks: []
}

export const itemsReducer = (state = initialState, action) => {

    switch (action.type) {
        case INPUT_CREATE:
            return {
                ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                tasks: [...state.tasks, action.data]
            }

        case INPUT_LOAD:
            const commentsNew = action.data.map(res => {
                return {
                    text: res.task,
                    id: res._id,
                    done: false
                }
            })
            return {
                ...state, // через оператор ... разворачиваем, копируем и возвращаем новый state
                tasks: commentsNew
            }
            
        case INPUT_COMPLETED:
            return (() => {
                const { data } = action;
                const { id } = action;
                const { tasks } = state;
                const itemIndex = tasks.findIndex(res => res.id === data.id)
                const nextTasks = [
                    console.log(...tasks, itemIndex)
                    // ...tasks.find(itemIndex),
                    // data,
                    // ...tasks.done = true
                ];
                    // console.log(itemIndex)
                // const nextComments = [
                //     ...tasks.slice(0, itemIndex),
                //     ...tasks.slice(itemIndex + 1)
                // ];
                return {
                    ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                    // tasks: nextTasks
                }
            })();

        case INPUT_UPDATE:
            const { data } = action;
            const { tasks } = state;
            const itemIndex = tasks.findIndex(res => res.id === data.id)

            const nextTasks = [
                ...tasks.slice(0, itemIndex),
                data,
                ...tasks.slice(itemIndex + 1)
            ];

            return {
                ...state, // через оператор ... разворачиваем, копируем и возвращаем новый state
                tasks: nextTasks
            }

        case INPUT_DELETE:
            return (() => {
                const { id } = action;
                const { tasks } = state;
                const itemIndex = tasks.findIndex(res => res.id === id)
                const nextComments = [
                    ...tasks.slice(0, itemIndex),
                    ...tasks.slice(itemIndex + 1)
                ];
                return {
                    ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                    tasks: nextComments
                }
            })();

        
        default:
            return state;
    }
}