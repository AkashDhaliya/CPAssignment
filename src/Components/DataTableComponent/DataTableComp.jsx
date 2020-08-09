import React from "react";
import NoData from "../NoDataComponent/NoData";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import formatStringByPattern from "format-string-by-pattern";
import ErrorMessage from "../ErrrorMessageComponent/ErrorMessage";
import { customStyles, GetErrorMSG } from "../../Constants/Constant";
import LoadingSpinner from "../LoadingSpinnerComponent/LoadingSpinner";

function DataTableComp(props) {
  const columns = [
    {
      name: "First Name",
      selector: "firstName",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      sortable: true,
    },
    {
      name: "State",
      selector: "state",
      sortable: true,
    },
    {
      name: "Pin Code",
      selector: "pinCode",
      sortable: true,
    },
    {
      name: "Country",
      selector: "country",
      sortable: true,
    },
    {
      cell: (row) => (
        <div>
          <FaPencilAlt
            className="editIcon"
            onClick={props.update.bind(null, row)}
          />
          <FaTrashAlt
            className="deleteLocation"
            onClick={props.delete.bind(null, row)}
          />
        </div>
      ),
      button: true,
    },
  ];

  const paginationOptions = { rowsPerPageText: "Items per page" };

  const { tabledata, isResponse, isError } = props;
  if (isResponse && !isError) {
    return tabledata.length !== 0 ? (
      <section className="locationSection content">
        <DataTable
          columns={columns}
          noHeader={true}
          highlightOnHover
          pagination
          paginationComponentOptions={paginationOptions}
          dense={true}
          size={10}
          customStyles={customStyles}
          theme="solarized"
          defaultSortField={"serial"}
          data={tabledata}
        />
      </section>
    ) : (
      <NoData />
    );
  } else if (isResponse && isError) {
    return <ErrorMessage ErrorMessage={GetErrorMSG} />;
  } else {
    return <LoadingSpinner />;
  }
}

export default DataTableComp;