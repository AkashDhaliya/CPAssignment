import React, { useState, useEffect } from "react";
import { useIndexedDB } from "react-indexed-db";
import AddDataBtn from "../AddDataBtnComponent/AddDataBtn";
import { DeleteErrorMsg } from "../../Constants/Constant";
import DataTableComp from "../DataTableComponent/DataTableComp";
import AddUpdateDataForm from "../AddUpdateDataFormComponet/AddUpdateDataForm";

function DataContainer() {
  const [, setErrorCatch] = useState(null);
  const [isError, setisError] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const { getAll, deleteRecord } = useIndexedDB("locations");
  const [showAddUpdateForm, setShowAddUpdateForm] = useState(false);
  const [initialFormData, setInitialFormData] = useState("");

  useEffect(() => {
    getLocationData();
  }, []);

  function updateFacilityFormData(formData, facilityData) {
    formData.facilityTimes = facilityData;
    setInitialFormData(formData);
  }

  function updateLocationData(row) {
    setInitialFormData(row);
    setShowAddUpdateForm(true);
  }

  function getLocationData() {
    getAll().then(
      (locationData) => {
        locationData.forEach((locationData, index) => {
          locationData.serial = index + 1;
        });
        setLocationData(locationData);
        setIsResponse(true);
        setisError(false);
      },
      (error) => {
        setLocationData([]);
        setIsResponse(true);
        setisError(true);
        setErrorCatch(() => {
          throw new Error("This is an error");
        });
      }
    );
  }

  function deleteLocationData(row) {
    if (
      window.confirm(`Are you sure you want to delete:\r ${row.locationName}?`)
    ) {
      deleteRecord(row.id).then(
        (event) => {
          getLocationData();
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
      <AddUpdateDataForm
        formData={initialFormData}
        showAddUpdateForm={showAddUpdateForm}
        updateFacilityFormData={updateFacilityFormData}
        initialData={() => setInitialFormData("")}
        hideAddUpdateForm={() => setShowAddUpdateForm(false)}
      />
      <DataTableComp
        isError={isError}
        isResponse={isResponse}
        locationData={locationData}
        delete={deleteLocationData}
        update={updateLocationData}
        showAddUpdateForm={showAddUpdateForm}
        hideAddUpdateForm={() => setShowAddUpdateForm(false)}
      />
    </>
  );
}

export default DataContainer;
