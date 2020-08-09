import React, { useState, useEffect } from "react";
import { useIndexedDB } from "react-indexed-db";
import AddDataBtn from "../AddDataBtnComponent/AddDataBtn";
import {
  AddErrorMsg,
  UpdateErrorMsg,
  DeleteErrorMsg,
} from "../../Constants/Constant";
import DataTableComp from "../DataTableComponent/DataTableComp";
import Form from "../FormComponent/Form";

function DataContainer() {
  const [, setErrorCatch] = useState(null);
  const [isError, setisError] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [tabledata, setTableData] = useState([]);
  const { add, getAll, deleteRecord } = useIndexedDB("cpData");
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);
  const [initialFormData, setInitialFormData] = useState("");

  useEffect(() => {
    getTableData();
  }, []);

  function updateTableData(row) {
    setInitialFormData(row);
    setShowAddUpdateForm(true);
  }

  function getTableData() {
    getAll().then(
      (data) => {
        
        setTableData(data);
        setIsResponse(true);
        setisError(false);
      },
      (error) => {
        setTableData([]);
        setIsResponse(true);
        setisError(true);
        setErrorCatch(() => {
          throw new Error("This is an error");
        });
      }
    );
  }

  function addData(resp) {
    let keys = Object.keys(resp);
    let data = {};
    keys.forEach((item) => {
      data[item] = resp[item]["value"];
    });
    add(data).then(
      (event) => {
        console.log("ID Generated: ", event);
      },
      (error) => {
        window.alert(AddErrorMsg);
      }
    );
    setShowAddUpdateForm(false);
  }

  function deleteTableData(row) {
    if (
      window.confirm(`Are you sure you want to delete:\r ${row.firstName} ${row.lastName}?`)
    ) {
      deleteRecord(row.id).then(
        (event) => {
          getTableData();
        },
        (error) => {
          window.alert(DeleteErrorMsg);
        }
      );
    }
  }

  return (
    <>
      <AddDataBtn showAddUpdateForm={() => setShowAddUpdateForm(true)} />
      <Form
        modal={showAddUpdateForm}
        hideAddUpdateForm={() => setShowAddUpdateForm(false)}
        addData={addData}
      />
      <DataTableComp
        isError={isError}
        isResponse={isResponse}
        tabledata={tabledata}
        delete={deleteTableData}
        update={updateTableData}
        showAddUpdateForm={showAddUpdateForm}
        hideAddUpdateForm={() => setShowAddUpdateForm(false)}
      />
    </>
  );
}

export default DataContainer;
