import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { inputCreate, inputLoad } from "../../redux/actions";
// import { commentsReducer } from "./redux/commentsReducer";
import SingleComment from "../SingleComment/SingleComment";



function Comments(props) {
    const [textComment, setTextComment] = useState('');
    const comments = useSelector(state => {
        // console.log(state, 'state <<<<')
        const { itemsReducer } = state;
        return itemsReducer.comments;
    })

    // console.log('comments > ', comments)

    const dispatch = useDispatch();

    const handleInput = (e) => {
        // console.log('input >>>', e.target.value)
        setTextComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('submit texteCommit > ', textComment)
        const id = "dwqee21d23df"
        dispatch(inputCreate(textComment, id))
    }

    useEffect(() => {
      dispatch(inputLoad())  
    }, []);

    // console.log("comments >> ", comments)
    return (
        <div className="card-comments">
            <form className="comments-item-create"
                onSubmit={handleSubmit}
            >
                <input type="text" value={textComment} 
                onChange={handleInput}
                />
                <input type="submit" hidden />
            </form>
            {!!comments.length && comments.map(res => {
                console.log(comments, ' <<<COMMENTS')
                return <SingleComment 
                    key={res._id} 
                    data={res}
                    // done={res.done}
                />
            })}
           
        </div>
    )
}



export default Comments;