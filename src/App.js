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
      setAlert({
        show: true,
        msg: "please enter item",
        type: "danger",
      });
    } else if (name && isEditing) {
      // deal with edit
    } else {
      //show alert
      setAlert({
        show: true,
        msg: "item added to the list",
        type: "success",
      });
      //add item to list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  //useEffect to clear alert after 3 seconds
  useEffect(() => {
    const clearAlert = setTimeout(() => {
      setAlert((prevState) => {
        return { ...prevState, show: false, msg: "", type: "" };
      });
    }, 3000);

    return () => clearTimeout(clearAlert);
  }, [alert.show]);
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
          <List items={list} />
          <button className="clear-btn">clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
