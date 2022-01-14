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
                const { id } = action;
                const { tasks } = state;
                const currentTask = tasks.find(res => res.id === id)
                    console.log(currentTask, "currentTask<<<<<")
                    console.log(tasks, "tasks<<<<")
                    console.log(id, "id<<<<<")
                const nextTasks = [
                    currentTask.done = !currentTask.done
                ];
                    console.log(nextTasks, "nextTasks<<<<<")
                return {
                    ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                    tasks: [...state.tasks]
                }
            })();


            case INPUT_DELETE:
                return (() => {
                    const { id } = action;
                    console.log(id, "id<<<")
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



































        case INPUT_UPDATE:
            const { data } = action;
            // const { id } = action;
            const { tasks } = state;
            const itemIndex = tasks.findIndex(res => res.id === data.id)
            console.log(data, "data<<<<")
            console.log(tasks, "tasks<<<<")
            console.log(itemIndex, "itemIndex<<<<")
            // console.log(nextTasks, "nextTasks <<<<")

            // console.log(data, "data<<<<")
            // console.log(tasks, 'tasks<<<<')
            // console.log(data.text)

            // let text = "1q1" + data.text.trim();
            // let id = data.id;
            // const newData = { text, id }
            const nextTasks = [
                ...tasks.slice(0, itemIndex),
                data,
                ...tasks.slice(itemIndex + 1)
            ]; 
            return {
                ...state, // через оператор ... разворачиваем, копируем и возвращаем новый state
                tasks: nextTasks
            }

          
        default:
            return state;
    }
}