import './App.css';
import TodoList from './component/main';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TodoList />}></Route>
        <Route path='/search-input/:search-value' element={<TodoList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
