import React, { useEffect, useState } from "react";
import "../css/group.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Modal } from '@mui/material';
function Group() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const name = window.localStorage.getItem("name");
  const old_data = JSON.parse(window.localStorage.getItem("todo_data"));

  const [group_list, setGroup_list] = useState([]);

  useEffect(() => {
    if (old_data && name) {
      const filter = old_data.filter((item) => item.Name === name);

      if (filter.length > 0) {
        setGroup_list(filter[0].Group);
      } else {
        setGroup_list([]);
      }
    }
  }, []);


  // -----------------------------------------

  const [grp_name, setGrp_name] = useState(null)

  function add_grp(data) {
    if (old_data && name) {
      const oldDataArray = [...old_data];
      const filterIndex = oldDataArray.findIndex((item) => item.Name === name);

      if (filterIndex !== -1) {
        const grp_name = { Name: data, todo: [] };

        oldDataArray[filterIndex].Group.push(grp_name);

        window.localStorage.setItem("todo_data", JSON.stringify(oldDataArray));

        window.location.reload()
      }
    }
  }

  // =========================================================

  function grp_delete(data) {
    if (old_data && name) {
      const oldDataArray = [...old_data];
      const filterIndex = oldDataArray.findIndex((item) => item.Name === name);

      if (filterIndex !== -1) {

        const filter = oldDataArray[filterIndex].Group.filter((item, i) => item.Name != data)

        oldDataArray[filterIndex].Group = filter;

        window.localStorage.setItem("todo_data", JSON.stringify(oldDataArray));

        window.location.reload()
      }
    }
  }


  return (

    <>
      <div className="grp_body">
        <div className="grp_container_header">
          <h1 className="grp_header">TODO LIST -<span>{name}</span></h1>
        </div>
        <div className="grp1">
          <a href='/' ><h6> <FontAwesomeIcon icon={faArrowLeft} /> GROUP LIST - {group_list?.length}</h6></a>
          <button id="bottone1" onClick={handleOpen}>ADD GROUP</button>
        </div>
        <div className="grp2">
          {
            group_list?.map((data, i) => (
              <div className="grp2_1" key={i}>
                <a
                  href="/todo"
                  onClick={() => window.localStorage.setItem("grp_name", data.Name)}
                >
                  <h5>{data.Name}</h5>
                </a>

                <FontAwesomeIcon icon={faTrashAlt} onClick={() => grp_delete(data.Name)} />
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
            placeholder="Group Name only or shake" onChange={(e) => setGrp_name(e.target.value)}
          />

          <button className="btn btn-light" onClick={() => add_grp(grp_name)}>
            SUBMIT
          </button>

        </div>
      </Modal>
    </>
  );
}

export default Group;
