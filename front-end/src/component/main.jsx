import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import Item from "./itemtile/item"
import InputBox from "./input/input"
import { setFilter, setInputValue, setIsEdit, setItems, setCurrentInput , setCpItems} from "../store/items/slice-item"

export default function TodoList() {
    const [loading, setloading] = useState(false)
    const [editItemStore, setEditItemStore] = useState([])
    const { items, inputValue, isEdit, filter, cpitems } = useSelector(state => state.items)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isEdit) {
            dispatch(setInputValue(editItemStore.text))
        }
        // eslint-disable-next-line
    }, [isEdit])

    useEffect(() => {
        getItem()
        // eslint-disable-next-line
    }, [])
    // function handleSearch(value){}
    async function getItem() {
        try {
            setloading(true)
            const response = await axios.get(`http://localhost:5000/api/todo`)
            const result = await response.data

            if (result) {
                dispatch(setItems(result))
                dispatch(setCpItems(result))
            }
            setloading(false)
        }
        catch (e) { console.log(e); setloading(false) }
    }
    async function handleAddNew(e) {
        e.preventDefault()
        let id = editItemStore ? editItemStore._id : null
        try {
            isEdit
                ? await axios.put(`http://localhost:5000/api/todo/update-todo/${id}`, { text: inputValue })
                : await axios.post('http://localhost:5000/api/todo/add-todo', { text: inputValue })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setInputValue(''))
            getItem()
            setEditItemStore([])
            dispatch(setIsEdit(false))

        }
    }

    async function deleteItem(e, item) {
        e.preventDefault()
        try {
            const id = item._id
            await axios.delete(`http://localhost:5000/api/todo/delete-todo/${id}`)
            await getItem()
        }
        catch (e) {
            console.log(e)
        }
    }

    function updateItem(item) {
        dispatch(setIsEdit(true))
        setEditItemStore(item)
    }
    function handleSearch(e) {
        e.preventDefault();
        const searchValue = inputValue.trim().toLowerCase();
        if (searchValue === '') {
            dispatch(setItems(cpitems))
            return;
        }
        const testItem = cpitems.filter(item =>
            item.text.trim().toLowerCase().includes(searchValue)
        );
        dispatch(setItems(testItem));
    }

    const filterItems = (items, filter) => {
        switch (filter) {
            case 'active':
                return items.filter(item => !item.completed);
            case 'completed':
                return items.filter(item => item.completed);
            case 'all':
            default:
                return items;
        }
    }
    const filterItemsList = filterItems(items, filter);

    return (
        <div className="container">
            <div className="header">
                <h1>Todos</h1>
                <div className="button-mode">
                    <button onClick={() => dispatch(setCurrentInput('add'))}>+</button>
                    <button onClick={() => dispatch(setCurrentInput('search'))}>/</button>
                </div>
            </div>
            <div className="input-container">
                <InputBox handleAddNew={handleAddNew} handleSearch={handleSearch} />
            </div>

            <div className="content">
                {loading ? "Loading..."
                    : filterItemsList && filterItemsList.length ? filterItemsList.map((item, index) =>
                        <Item key={index} item={item} deleteItem={deleteItem} updateItem={updateItem} />
                    )
                        : 'there is no item'
                }
            </div>

            <div className="filter">
                <div className="options">
                    <button className={filter === 'all' ? 'active' : null}
                        onClick={() => dispatch(setFilter('all'))}>
                        {`All:  ${items.length}`}
                    </button>
                    <button className={filter === 'active' ? 'active' : null}
                        onClick={() => dispatch(setFilter('active'))}>
                        {`Active:  ${items.filter(item => item.completed === false).length}`}
                    </button>
                    <button className={filter === 'completed' ? 'active' : null}
                        onClick={() => dispatch(setFilter('completed'))}>
                        {`Completed: ${items.filter(item => item.completed === true).length}`}
                    </button>
                </div>
            </div>
        </div>
    )
}