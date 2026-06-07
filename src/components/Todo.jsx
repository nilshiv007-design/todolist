import React, { use, useEffect, useState } from 'react'
import Chart from './Chart'

const Todo = () => {
    const [date, seDate] = useState('');
    const [input, SetInput] = useState('');
    const [todos, setTodo] = useState([]);
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')
    const [chatrData, setChartData] = useState([])
    const getDate = () => {
        const dt = new Date();
        const date = dt.getDate();
        const month = dt.toLocaleDateString('en-IN', () => {
            month: 'long'
        })
        const weekday = dt.toLocaleDateString('en-IN', () => {
            weekday: 'long'
        })
        const todayDate = { date: date, month: month, weekday: weekday }
        seDate(todayDate);
    }
    useEffect(() => {
        getDate()
    }, [])
    const handleInput = (e) => {
        SetInput(e.target.value)
    }
    const handelAddToDo = () => {
        if (input === '') return
        const id = crypto.randomUUID()
        const list = {
            id: id,
            text: input,
            completed: false
        }
        setTodo((perv) => [...perv, list])
        SetInput('')
        console.log(todos)
        let total = todos.length;
        let completeTaks = todos.filter((curTodo) => curTodo.completed).length + 1;
        setChartData([total, completeTaks])
    }
    const handleEdit = (id) => {

        setEditId(id)


    }
    const handleDelTodo = (id) => {
        const filterData = todos.filter((item, index) => {
            return item.id !== id
        })
        setTodo(filterData)
    }
    const handelUpdated = (e, id) => {
        let updated = todos.map((curItem, i) => {
            return curItem.id === id ? { ...curItem, text: e.target.value } : curItem
        });
        setTodo(updated)
    }
    const checkTodo = (id) => {
        let checked = todos.map((curItem, i) => {
            return curItem.id === id ? { ...curItem, completed: !curItem.completed } : curItem
        });
        setTodo(checked);
        let total = todos.length;
        let completeTaks = todos.filter((curTodo) => curTodo.completed).length + 1 ;
        setChartData([total, completeTaks])
    }
    return (
        <div className='container'>
            <div className="header">
                <div className="date-time">
                    {date.date},{date.month}
                    <div>{date.weekday}</div>
                </div>20
                <div className="todo-status">
                    <Chart chatrData={chatrData} />
                </div>
            </div>
            <div className="todo-wraper">
                <div className="search-bar">
                    <input type="text" value={input} className="serchbar-input" onChange={(e) => handleInput(e)} />
                    <button onClick={handelAddToDo}>Add</button>
                </div>

                <div className="todo-list">
                    {todos.length > 0 ?
                        todos.map((curItem) => {
                            return (
                                <div className='todoItem'>
                                    <input type='checkbox' onClick={() => { checkTodo(curItem.id) }} />
                                    <div>{editId === curItem.id ? <input type='text' value={curItem.text} onChange={(e) => handelUpdated(e, curItem.id)} /> : curItem.text}</div>
                                    <div>
                                        {editId === curItem.id ?
                                            <button onClick={() => setEditId(null)}>Save</button> :
                                            <button onClick={() => handleEdit(curItem.id)}>Edit</button>

                                        }
                                        <button onClick={() => handleDelTodo(curItem.id)}>Del</button>
                                    </div>
                                </div>
                            )
                        })
                        : ""
                    }

                </div>
            </div>
        </div>
    )
}

export default Todo