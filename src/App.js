import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { FaHandHolding } from 'react-icons/fa'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const removeItem = (deleteId) => {
    setList(list.filter((item) => deleteId != item.id))
    showAlert(true, 'item deleted', 'danger')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // alert
      showAlert(true, 'Please enter value', 'danger')
    } else if (name && isEditing) {
      //
    } else {
      // show alert
      showAlert(true, 'item added', 'success')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'empty list', 'danger')
    setList([])
  }

  useEffect(() => {
    let display = setTimeout(() => {
      showAlert()
    }, 3000)

    return () => {
      clearTimeout(display)
    }
  }, [alert])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg. eggs"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem}></List>
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
