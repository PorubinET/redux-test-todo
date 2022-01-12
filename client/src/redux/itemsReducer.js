import { 
    INPUT_CREATE, 
    INPUT_DELETE, 
    INPUT_UPDATE,
    INPUT_LOAD
    } from "./types";

const initialState = {
    comments: []
}

export const itemsReducer = (state = initialState, action) => {


    switch (action.type) {
        case INPUT_CREATE:
            return {
                ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                comments: [...state.comments, action.data]
            }

        case INPUT_LOAD:
            const commentsNew = action.data.map(res => {
                return {
                    text: res.name,
                    id: res.id
                }
            })
            return {
                ...state, // через оператор ... разворачиваем, копируем и возвращаем новый state
                comments: commentsNew
            }

        case INPUT_UPDATE:
            const { data } = action;
            const { comments } = state;
            const itemIndex = comments.findIndex(res => res.id === data.id)

            const nextComments = [
                ...comments.slice(0, itemIndex),
                data,
                ...comments.slice(itemIndex + 1)
            ];

            return {
                ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                comments: nextComments
            }

        case INPUT_CREATE:
            return {
                ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                comments: [...state.comments, action.data]
            }

        case INPUT_DELETE:
            return (() => {
                const { id } = action;
                const { comments } = state;
                const itemIndex = comments.findIndex(res => res.id === id)

                const nextComments = [
                    ...comments.slice(0, itemIndex),
                    ...comments.slice(itemIndex + 1)
                ];

                return {
                    ...state, // через оператор ... разворачиваем копируем и возвращаем новый state
                    comments: nextComments
                }
            })();
        default:
            return state;
    }
}