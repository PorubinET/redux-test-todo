import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputDelete, inputUpdate, inputCompleted } from "../../redux/actions";

import './taskItem.css';

import {
    updateTask,
    deleteTask,
    // addTask,
    // getTasks,
    // updateTasks,
    // deleteAll
} from "../../services/taskServices";


function TaskItem(props){
    const [input, setInput] = useState('')
    // const [check, setCheck] = useState(true)
    const {task, id} = props
    const dispatch = useDispatch();


    const tasks = useSelector(state => {
        const { itemsReducer } = state;
        return itemsReducer.tasks;
    })

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteTask(id);
        } catch (error) {
            setInput(task)
            console.log(error);
        }
        dispatch(inputDelete(id))
    };
    

    const onFocus = (e) => {e.currentTarget.classList.add("to-do__text-active")}
    const onBlur = (e) => {e.currentTarget.classList.remove("to-do__text-active")} 

    
    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            handleUpdateInput(e)
            e.currentTarget.setAttribute("readonly", "true")
            e.currentTarget.classList.remove("to-do__text-active");
        }    
    }
    
    const handleInput = (e) => {
        setInput(e.target.value = e.target.value.replace(/ +/g, ' '))
    }

    const handleUpdateInput = async (e) => {
        e.preventDefault();
        if(!input) {
            setInput(e.target.value = props.task);
            console.log(input, "input<<<<<<<<")
        } 
        else{
            try {
                await updateTask(id, {task: input.trim() });
                setInput({task: task.trim()});
                // dispatch(inputUpdate(task, id))
            } catch (error) {
                console.log(error);
            }  
            dispatch(inputUpdate(task.trim(), id))
        } 
    };

    const handleCheck = (e) => {
        e.preventDefault();
        dispatch(inputCompleted(id));
    }
      
    const removeAttribute = (e) => {
        e.currentTarget.classList.add("to-do__text-active");
        e.currentTarget.removeAttribute("readonly", "true")
    }

    let classDone, classCheck, classActive;
        
        const tasksComplited = tasks.filter(item => item.done).length;
        console.log(tasksComplited)

        if(tasksComplited){
          classDone = "to-do__text to-do__done";
          classCheck = "to-do__checkbox to-do__checkbox-actve";
          classActive = "to-do__checkbox-check to-do__checkbox-check-active";
        } else {
            classDone = "to-do__text";
            classCheck = "to-do__checkbox";
            classActive = "to-do__checkbox-check";
        }  
    
    useEffect(() => {
        if (task) {
            setInput(task)
        }
    },[task])

    return(
        <li className="to-do__list-li">
                <label 
                    className={classCheck} 
                    htmlFor="checkItem">        
                </label>
                    <input 
                        id="checkItem"
                        className="to-do__checkbox-input" 
                        onClick={handleCheck}
                        type="checkbox"
                    />                  
                    <img 
                        className={classActive} 
                        src="/img/check.svg" 
                        alt="check"
                    />                              
                        <input            
                            type="text" 
                            className={classDone}
                            onKeyDown={handleKeyDown}
                            // onDoubleClick={handleUpdateInput}
                            onFocus={onFocus}
                            onBlur={onBlur}      
                            onClick={removeAttribute}              
                            onChange={handleInput}
                            defaultValue={task}
                            id={id} 
                        />
                <button className="to-do__checkbox-btn" 
                    onClick={handleDelete}
                >
                    <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete"/>
                </button>
        </li> 
    )   
}



export default TaskItem;







// import React from "react";
// import Tasks from "../Tasks";


// import './taskItem.css';



// function TaskItem(props){
//     const {task, key, id} = props
//     // onFocus = (e) => {e.currentTarget.classList.add("to-do__text-active")}
//     // onBlur = (e) => {e.currentTarget.classList.remove("to-do__text-active")}

//     // handleKeyDown = (e) => {
//     //     if(e.keyCode === 13){
//     //         this.handleUpdateInput(e)
//     //         e.currentTarget.setAttribute("readonly", "true")
//     //         e.currentTarget.classList.remove("to-do__text-active");
//     //         // console.log(!this.state.currentTask.length)
//     //     }    
//     // }
      
//     // removeAttribute = (e) => {
//     //     e.currentTarget.classList.add("to-do__text-active");
//     //     e.currentTarget.removeAttribute("readonly", "true")
//     // }

//     // let classDone, classCheck, classActive;
        
//         // const {handleUpdate, handleDelete, task, id } = this.props;
//         // const {currentTask} = this.state

//         // if(task.done){
//         //   classDone = "to-do__text to-do__done";
//         //   classCheck = "to-do__checkbox to-do__checkbox-actve";
//         //   classActive = "to-do__checkbox-check to-do__checkbox-check-active";
//         // } else {
//         //     classDone = "to-do__text";
//         //     classCheck = "to-do__checkbox";
//         //     classActive = "to-do__checkbox-check";
//         // }     
//     return(
//         <li className="to-do__list-li">
//                 <label 
//                     // className={classCheck} 
//                     htmlFor="checkItem">        
//                 </label>
//                     <input 
//                         id="checkItem"
//                         className="to-do__checkbox-input" 
//                         // onClick={handleUpdate}
//                         type="checkbox"
//                     />                  
//                     <img 
//                         // className={classActive} 
//                         // src="/img/check.svg" 
//                         alt="check"
//                     />                              
//                         <input            
//                             type="text" 
//                             // className={classDone}
//                             // onKeyDown={this.handleKeyDown}
//                             // onFocus={this.onFocus}
//                             // onBlur={this.onBlur}      
//                             // onClick={this.removeAttribute}                  
//                             // onChange={this.handleChange}
//                             defaultValue={task}
//                             id={id} 
//                         />
//                 <button className="to-do__checkbox-btn" 
//                     // onClick={handleDelete}
//                 >
//                     <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete"/>
//                 </button>
//         </li> 
//     )   
// }