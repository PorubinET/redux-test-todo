import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../taskItem/taskItem"

import { inputCreate, inputLoad } from "../../redux/actions";

import {
    addTask,
    getTasks,
    // updateTask,
    // updateTasks,
    // deleteTask,
    // deleteAll
} from "../../services/taskServices";

import './taskinput.css'

function TaskInput() {
    const [textComment, setTextComment] = useState('');
    // const [done, setDone] = useState(false)
    
    const tasks = useSelector(state => {
        const { itemsReducer } = state;
        return itemsReducer.tasks;
    })
    
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTextComment(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = textComment;
        if(textComment === ' '){
            alert('Заполните поле')
        }
        else{
            try {
                const { data } = await addTask({ task: textComment.trim() });
                const tasks = originalTasks;
                tasks.push(data);    
            } catch (error) {
                console.log(error);
            }
            const datadb = await getTasks()
            const lastTask = datadb.data[datadb.data.length - 1]
            dispatch(inputCreate(lastTask.task, lastTask._id, false))
        }        
    };

    useEffect(() => {
      dispatch(inputLoad())  
    }, []);
    
    // if(tasks.length){
    //     classArrow = "to-do__list-btn-arrow to-do__list-btn-arrow-active";
    //     classCheck = "to-do__list-btn to-do__list-btn-active";
    // } else{
    //     classArrow = "to-do__list-btn-arrow";
    //     classCheck = "to-do__list-btn";
    // }  

    // if(tasks.every(item => item.done)) {classArrow += " to-do__fading"}

    return (
        <div className="App flex">
            <form 
                className="add" 
                onSubmit={handleSubmit}
            > 
            <input 
                // className={classCheck}
                // onClick={allCompleated} 
                type="checkbox">    
            </input>
                {/* <img 
                className={classArrow}
                src="/img/arrow.svg"                 
                alt="arrow"
            />              */}
            <input 
                className="to-do__task"
                type="text" 
                // id={id}
                // required={true}
                value={textComment} 
                onChange={handleChange} 
                placeholder="What needs to be done?">                   
            </input>        
            </form>
                <ul >
                    {tasks.map((task) => (
                        <TaskItem 
                            task={task.text}
                            done={task.done}
                            key={task.id}
                            id={task.id}
                            // taskInput={task.task}
                            // handleUpdate={() => handleUpdate(task._id)}                           
                            // handleDelete={() => handleDelete(task._id)}
                        />
                    ))}
                    {/* {!!tasks.length && tasks.map(res => {
                    console.log(tasks, ' <<<COMMENTS')
                    return <SingleComment 
                        key={res._id} 
                        data={res}
                        // done={res.done}
                    />
                    })}     */}
                </ul>              
        </div> 
    );
}



export default TaskInput;










// import React, { Component } from "react";
// import TaskItem from "../taskItem/taskItem"


// import './taskinput.css'

// class TaskInput extends Component {
//     render() {
//         const {
//             id, 
//             tasks,
//             handleChange, 
//             handleSubmit, 
//             allCompleated, 
//             handleUpdate, 
//             handleDelete,
//             currentTask,
//         } = this.props;
             
//         let classArrow, classCheck;

//         if(tasks.length){
//             classArrow = "to-do__list-btn-arrow to-do__list-btn-arrow-active";
//             classCheck = "to-do__list-btn to-do__list-btn-active";
//         } else{
//             classArrow = "to-do__list-btn-arrow";
//             classCheck = "to-do__list-btn";
//         }  

//         if(tasks.every(item => item.done)) {classArrow += " to-do__fading"}

//         return (
//             <div className="App flex">
//                 <form 
//                     className="add" 
//                     onSubmit={handleSubmit}> 
//                 <input 
//                     className={classCheck}
//                     onClick={allCompleated} 
//                     type="checkbox">    
//                 </input>
//                     <img 
//                     className={classArrow}
//                     src="/img/arrow.svg"                 
//                     alt="arrow"
//                 />             
//                 <input 
//                     className="to-do__task"
//                     type="text" 
//                     id={id}
//                     required={true}
//                     value={currentTask} 
//                     onChange={handleChange} 
//                     placeholder="What needs to be done?">                   
//                 </input>        
//                 </form>
//                     <ul >
//                         {tasks.map((task) => (
//                             <TaskItem 
//                                 task={task}
//                                 key={task._id}
//                                 id={task._id}
//                                 taskInput={task.task}
//                                 handleUpdate={() => handleUpdate(task._id)}                           
//                                 handleDelete={() => handleDelete(task._id)}
//                             />
//                         ))}
//                     </ul>              
//             </div> 
//         );
//     }
// }




// export default TaskInput;

