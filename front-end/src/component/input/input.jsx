import { useDispatch, useSelector } from "react-redux"
import { setCurrentInput, setInputValue } from "../../store/items/slice-item"

export default function InputBox({ handleAddNew, handleSearch }) {
    const dispatch = useDispatch()
    const { inputValue, currentInput } = useSelector(state => state.items)

    if (currentInput === 'add') return (
        <div className="input-box" >
            <form action="" onSubmit={handleAddNew}>
                <input name="add-input" autoFocus type="text" placeholder="add new" value={inputValue}
                    onChange={(e) => dispatch(setInputValue(e.target.value))} />
                <button>Add</button>
            </form>
        </div>
    )
    else return (
        <div className="input-box" >
            <form action="" onSubmit={handleSearch}>
                <input name="search-input" autoFocus type="text" placeholder="search value" value={inputValue}
                    onChange={(e) => dispatch(setInputValue(e.target.value))} />
                <button >Search</button>
            </form>
        </div>
    )

}