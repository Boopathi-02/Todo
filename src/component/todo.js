import React, { useEffect, useState } from "react";
import "../css/todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '@mui/material';
function Todo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const name = window.localStorage.getItem("name");
  const grp_name = window.localStorage.getItem("grp_name");
  const old_data = JSON.parse(window.localStorage.getItem("todo_data"));


  const [todo_list, setTodo_list] = useState([]);

  useEffect(() => {
    if (old_data && name) {
      const filter = old_data.filter((item) => item.Name === name);
      if (filter.length > 0) {
        if (filter[0].Group.length > 0) {
          const filter1 = filter[0].Group.filter((item) => item.Name === grp_name)
          if (filter1[0].todo.length > 0) {
            setTodo_list(filter1[0].todo)
          } else {
            setTodo_list([])
          }


        } else {
          setTodo_list([])
        }


      } else {
        setTodo_list([]);
      }
    }
  }, []);


  // ---------------------------------------------------
  const [todo_name, setTodo_name] = useState(null)

  function add_todo(data) {
    if (old_data && name) {
      const oldDataArray = [...old_data];
      const filterIndex = oldDataArray.findIndex((item) => item.Name === name);

      if (filterIndex !== -1) {
        const filterIndex1 = oldDataArray[filterIndex].Group.findIndex((item) => item.Name === grp_name);

        const todo = { Name: data, status: 0 }
        oldDataArray[filterIndex].Group[filterIndex1].todo.push(todo)

        window.localStorage.setItem("todo_data", JSON.stringify(oldDataArray));

        window.location.reload()

      }
    }
  }


  // ----------------------------------------------------------------------


  function del_todo(data, status) {
    if (old_data && name) {
      const oldDataArray = [...old_data];
      const filterIndex = oldDataArray.findIndex((item) => item.Name === name);

      if (filterIndex !== -1) {
        const filterIndex1 = oldDataArray[filterIndex].Group.findIndex((item) => item.Name === grp_name);

        const filterIndex2 = oldDataArray[filterIndex].Group[filterIndex1].todo.findIndex((item) => item.Name == data)

        oldDataArray[filterIndex].Group[filterIndex1].todo[filterIndex2].status = status;

        window.localStorage.setItem("todo_data", JSON.stringify(oldDataArray));

        window.location.reload()

      }
    }
  }

  return (
    <>
      <div className="todo_body">
        <div className="todo_container_header">
          <h1 className="todo_header">
            TODO LIST - <span>{grp_name}</span>
          </h1>
        </div>
        <div className="todo1">
          <a href="/group">
            <h6>
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} /> BACK
            </h6>
          </a>
          <button id="bottone1" onClick={handleOpen}>ADD TODO</button>
        </div>
        <div className="todo2">
          {
            todo_list?.map((data, i) => (
              <div className="todo2_1" key={i}>

                <h5 style={{ textDecoration: data.status === 1 ? 'line-through' : 'none' }}>
                  {data.Name}
                </h5>

                <input
                  checked={data.status === 1}
                  id="checkbox1"
                  type="checkbox"
                  onChange={() => del_todo(data.Name, data.status === 0 ? 1 : 0)}
                />

              </div>
            ))
          }

        </div>
      </div>



      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className=" p-4 rounded shadow-lg modal1" style={{ maxWidth: "400px", width: "100%" }}>

          <input
            type="text"
            name="text"
            className=" input"
            pattern="[A-Za-z]+"
            placeholder="List Name only or shake" onChange={(e) => setTodo_name(e.target.value)}
          />

          <button className="btn btn-light" onClick={() => add_todo(todo_name)}>
            SUBMIT
          </button>

        </div>
      </Modal>


    </>
  );
}

export default Todo;
