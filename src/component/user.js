import React, { useEffect, useState } from "react";
import "../css/user.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '@mui/material';
const User = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState('');

  const [user_list, setUser_list] = useState();

  useEffect(() => {
    const old_data = JSON.parse(window.localStorage.getItem("todo_data"));
    if (old_data == null) {
      setUser_list([])
    } else {
      setUser_list(old_data);

    }
  }, [])

  function create_user(data) {
    const old_data = window.localStorage.getItem("todo_data");
    if (old_data == null) {
      const array = [];
      const obj = { Name: data, Group: [] };
      array.push(obj)
      window.localStorage.setItem("todo_data", JSON.stringify(array));
      window.location.reload()
    } else {
      const old_data = JSON.parse(window.localStorage.getItem("todo_data"))
      const obj = { Name: data, Group: [] };
      old_data.push(obj)
      window.localStorage.setItem("todo_data", JSON.stringify(old_data));
      window.location.reload()
    }
  }

  // =========================================================

  function user_delete(data) {
    const old_data = window.localStorage.getItem("todo_data");
    if (old_data != null) {
      const filter = JSON.parse(old_data).filter((item, i) => item.Name != data)
      window.localStorage.setItem("todo_data", JSON.stringify(filter));
      window.location.reload()
    }
  }

  return (
    <>
      <div className="container-fluid  body">

        <div className="text-center mb-4 container_header">
          <h1 className="display-4 header">TODO LIST</h1>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 user1">
          <h6>
            USER LIST - {user_list?.length}
          </h6>
          <button className="btn btn-primary " id="bottone1" onClick={handleOpen}>
            ADD USER
          </button>
        </div>


        <div className="row user2">
          {user_list?.map((data, i) => (
            <div className="col-md-4 col-sm-6 mb-3 " key={i}>
              <div className="card shadow">
                <div className="card-body d-flex justify-content-between align-items-center user2_1">
                  <a
                    href="/group"
                    onClick={() => window.localStorage.setItem("name", data.Name)}
                    className="text-decoration-none text-dark"
                  >
                    <h5 className="m-0">{data.Name}</h5>
                  </a>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-danger"
                    onClick={() => user_delete(data.Name)}
                    role="button"
                  />
                </div>
              </div>
            </div>
          ))}
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
              placeholder="Name only"
              onChange={(e) => setName(e.target.value)}
              
            />

            <button className="btn btn-light" onClick={() => create_user(name)}>
              SUBMIT
            </button>

          </div>
        </Modal>

      </div>



    </>
  );
};

export default User;
