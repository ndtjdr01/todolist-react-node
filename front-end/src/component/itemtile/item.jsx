import { useDispatch } from "react-redux"
import { toggleItem } from "../../store/items/slice-item"
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

export default function Item({ item ,deleteItem, updateItem}) {
    const dispatch = useDispatch()

    function handleCheckitem(id) {
        dispatch(toggleItem(id))
        axios.put(`http://localhost:5000/api/todo/update-todo/${id}`, { completed: !item.completed })
        .then(response => {
            console.log('Update successful:', response.data);
        })
        .catch(error => {
            console.log('Error updating item:', error);
        });
    }
    return (
        <div className={item.completed ? 'item-container checked' : 'item-container'}>
            <input type="checkbox" checked={item.completed ? true : false}
                onChange={() => handleCheckitem(item._id)} />

            <p className="item-id">{item.id}</p>
            <p>{item.text}</p>
            <div className="icons">
                <FaEdit onClick={()=>updateItem(item)} className="icon" />
                <FaTrash onClick={(e)=>deleteItem(e,item)} className="icon" />
            </div>
        </div>
    )
}