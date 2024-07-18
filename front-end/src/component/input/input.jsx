import { useDispatch, useSelector } from "react-redux"
import { setInputValue } from "../../store/items/slice-item"

export default function InputBox({inputRef, handleAddNew, handleSearch }) {
    const dispatch = useDispatch()
    const { inputValue, currentInput } = useSelector(state => state.items)
    function handleChange(e){
        const input = e.target.value
        dispatch(setInputValue(input))
        handleSearch(e,input)
    }

    if (currentInput === 'add') return (
        <div className="input-box" >
            <form action="" onSubmit={handleAddNew}>
                <input ref={inputRef} name="add-input" autoFocus type="text" placeholder="add new" value={inputValue}
                    onChange={(e) => dispatch(setInputValue(e.target.value))} />
                <button>Add</button>
            </form>
        </div>
    )
    else return (
        <div className="input-box" >
            <form action="" onSubmit={handleSearch}>
                <input ref={inputRef} name="search-input" autoFocus type="text" placeholder="search value" value={inputValue}
                    onChange={(e) => handleChange(e)} />
                <button >Search</button>
            </form>
        </div>
    )

}