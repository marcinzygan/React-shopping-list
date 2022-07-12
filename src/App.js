import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!name) {
      // alert if no value is submited
      showAlert(true, "please enter item", "danger");
    } else if (name && isEditing) {
      // deal with edit
    } else {
      //show alert
      showAlert(true, "item added to the list", "success");
      //add item to list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  // Show alert function
  const showAlert = function (show = true, msg = "", type = "") {
    setAlert({ show: show, type: type, msg: msg });
  };
  //useEffect to clear alert after 3 seconds
  useEffect(() => {
    const clearAlert = setTimeout(() => {
      setAlert((prevState) => {
        return { ...prevState, show: false, msg: "", type: "" };
      });
    }, 3000);

    return () => clearTimeout(clearAlert);
  }, [alert, list]);

  // Clear list

  const clearList = function () {
    showAlert(true, "items removed from the list ", "danger");
    setList([]);
  };
  // remove item from the list

  const removeItem = function (id) {
    const itemId = id;

    const newList = list.filter((item) => {
      return item.id !== itemId;
    });

    setList(newList);
    showAlert(true, "item removed", "danger");
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>Task Organizer</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g buy eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
