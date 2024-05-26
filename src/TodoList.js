import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@iconify/react";
import bxEdit from "@iconify-icons/bx/bx-edit";

function TODO() {
  const [task, setTask] = useState("");
  const [listdata, setListData] = useState([]);

  function addActivity() {
    if (!task) {
      alert("Please enter a task list is empty...thank you");
      return;
    }

    const newItem = { id: generateUniqueId(), task };
    setListData((listdata) => [...listdata, newItem]);
    setTask("");
  }

  function generateUniqueId() {
    return uuidv4();
  }

  function removeActivity(id) {
    setListData((listdata) => {
      const newListData = [...listdata];
      const index = newListData.findIndex((item) => item.id === id);
      if (index !== -1) {
        newListData.splice(index, 1);
      }
      return newListData;
    });
  }

  function updateActivity(id) {
    const selectedTask = listdata.find((item) => item.id === id);
    if (selectedTask) {
      const updatedTask = prompt("Update the task:", selectedTask.task);

      if (updatedTask !== null) {
        setListData((list) =>
          list.map((item) => {
            if (item.id === id) {
              return { ...item, task: updatedTask };
            } else {
              return item;
            }
          })
        );
      }
    }
  }

  useEffect(() => {
    console.log("Todo Component mounted");
  }, []);

  return (
    <div className="todo">
      <input
        type="text"
        placeholder="Add activity"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addActivity}>Add Task</button>

      <ul>
        {listdata.map((item) => (
          <li className="Listdata" key={item.id}>
            {item.task}
            <FontAwesomeIcon
              className="icon"
              icon={faTrashAlt}
              onClick={() => removeActivity(item.id)}
            />
            <Icon
              className="icon"
              icon={bxEdit}
              onClick={() => updateActivity(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TODO;
