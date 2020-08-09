import React, { useState, useEffect } from "react";
import { useIndexedDB } from "react-indexed-db";
import AddDataBtn from "../AddDataBtnComponent/AddDataBtn";
import { formFields } from "../../Utility/formFields";

import {
  AddErrorMsg,
  UpdateErrorMsg,
  DeleteErrorMsg,
} from "../../Constants/Constant";
import DataTableComp from "../DataTableComponent/DataTableComp";
import Form from "../FormComponent/Form";

const initialState = {};
for (let i = 0; i < formFields.length; i++) {
  initialState[formFields[i].fieldId] = {
    value: "",
    errorState: { error: false, message: "" },
  };
}

function DataContainer() {
  const [, setErrorCatch] = useState(null);
  const [isError, setisError] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [tabledata, setTableData] = useState([]);
  const { add, update, getAll, deleteRecord } = useIndexedDB("cpData");
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);
  const [initialFormData, setInitialFormData] = useState(initialState);

  useEffect(() => {
    getTableData();
  }, []);

  function resetData() {
    let initialState = {};
    for (let i = 0; i < formFields.length; i++) {
      initialState[formFields[i].fieldId] = {
        value: "",
        errorState: { error: false, message: "" },
      };
    }
    setInitialFormData(initialState);
  }

  function updateTableData(row) {
    let keys = Object.keys(row);
    let datatoUpdateState = {};
    keys.forEach((item) => {
      datatoUpdateState[item] = {
        value: row[item],
        errorState: { error: false, message: "" },
      };
    });
    setInitialFormData(datatoUpdateState);
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

  function addUpdateData(resp) {
    let keys = Object.keys(resp);
    let data = {};
    keys.forEach((item) => {
      data[item] =
        item === "id"
          ? resp[item]["value"] === "" || resp[item]["value"] === undefined
            ? ""
            : resp[item]["value"]
          : resp[item]["value"];
    });
    if (data.id === "") {
      delete data.id;
    }
    let mode = data.id === undefined ? add : update;
    mode(data).then(
      (event) => {
        console.log("ID Generated: ", event);
      },
      (error) => {
        window.alert(data.id === undefined ? AddErrorMsg : UpdateErrorMsg);
      }
    );
    setShowAddUpdateForm(false);
  }

  function deleteTableData(row) {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${row.firstName} ${row.lastName}?`
      )
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
        addUpdateData={addUpdateData}
        initialData={initialFormData}
        resetData={resetData}
      />
      <DataTableComp
        isError={isError}
        isResponse={isResponse}
        tabledata={tabledata}
        delete={deleteTableData}
        update={updateTableData}
        showAddUpdateForm={() => setShowAddUpdateForm(true)}
        hideAddUpdateForm={() => setShowAddUpdateForm(false)}
      />
    </>
  );
}

export default DataContainer;
