import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputDelete, inputUpdate, inputCompleted } from "../../redux/actions";

import './taskItem.css';

import {
    // addTask,
    // getTasks,
    updateTask,
    // updateTasks,
    deleteTask,
    // deleteAll
} from "../../services/taskServices";


function TaskItem(props){
    const [input, setInput] = useState('')
    const {task, id} = props
    const dispatch = useDispatch();


    const tasks = useSelector(state => {
        const { itemsReducer } = state;
        return itemsReducer.tasks;
    })

    const handleUpdateInput = async (e) => {
        e.preventDefault();
        if(!input) {
            setInput({ 
                task: input     
            })
        } 
        else{
            try {
                await updateTask(id, {task: input.trim() });
                setInput({task: task.trim()});
            } catch (error) {
                console.log(error);
            }
            dispatch(inputUpdate(task, id))
        } 
    };

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

    const handleCheck = (e) => {
        dispatch(inputCompleted(id))
    }

    useEffect(() => {
        if (task) {
            setInput(task)
        }
    },[task])

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    // console.log('input >', input)

    

    const onFocus = (e) => {e.currentTarget.classList.add("to-do__text-active")}
    const onBlur = (e) => {e.currentTarget.classList.remove("to-do__text-active")}

    // const handleKeyDown = (e) => {
    //     if(e.keyCode === 13){
    //         this.handleUpdateInput(e)
    //         e.currentTarget.setAttribute("readonly", "true")
    //         e.currentTarget.classList.remove("to-do__text-active");
    //         // console.log(!this.state.currentTask.length)
    //     }    
    // }
      
    const removeAttribute = (e) => {
        e.currentTarget.classList.add("to-do__text-active");
        e.currentTarget.removeAttribute("readonly", "true")
    }

    let classDone, classCheck, classActive;
        
        // const {handleUpdate, handleDelete, task, id } = this.props;
        // const {currentTask} = this.state
        // const bla = complited.filter(item => item.done);
        console.log(tasks.filter(item => item.done).length)
        const tasksComplited = tasks.filter(item => item.done).length;

        if(tasksComplited){
          classDone = "to-do__text to-do__done";
          classCheck = "to-do__checkbox to-do__checkbox-actve";
          classActive = "to-do__checkbox-check to-do__checkbox-check-active";
        } else {
            classDone = "to-do__text";
            classCheck = "to-do__checkbox";
            classActive = "to-do__checkbox-check";
        }  
        
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
                            // onKeyDown={this.handleKeyDown}
                            onFocus={onFocus}
                            onBlur={onBlur}      
                            onClick={removeAttribute} 
                            onDoubleClick={handleUpdateInput}                 
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