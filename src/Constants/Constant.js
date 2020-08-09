export const GetErrorMSG =
  "Oops..Seems like some error occurred while loading the data. Please refresh the page or try after some time.";
export const AddErrorMsg = "Error while adding data, Please try again!";
export const UpdateErrorMsg = "Error while updating data, Please try again!";
export const DeleteErrorMsg = "Error while deleting data, Please try again!";

export const NameErrorMsg = "Only characters allowed from A-Z";
export const SpecialCharErrorMsg =
  "Special Characters are not allowed excluding  [ - and . ]";
export const PinCodeErrorMsg = "Only number allowed";

export const customStyles = {
  table: {
    style: {
      backgroundColor: "#f0f1f3",
    },
  },
  headRow: {
    style: {
      border: "1px solid transparent",
      borderRadius: "40px",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  rows: {
    style: {
      border: "1px solid transparent",
      borderRadius: "40px",
      marginTop: "7px",
      color: "#878c92",
      fontSize: "12px",
      fontWeight: "500",
      boxShadow: "0px 0px 8px 0px #dedede",

      "&:hover": {
        color: "#878c92",
        backgroundColor: "#fff!important",
        outline: "none!important",
      },

      "&:not(:last-of-type)": {
        border: "1px solid transparent",
      },
    },
  },
  pagination: {
    style: {
      justifyContent: "center",
      fontSize: "12px",
      border: "1px solid transparent",
      borderRadius: "40px",
      minHeight: "40px",
      marginTop: "7px",
    },
    pageButtonsStyle: {
      color: "green",
    },
  },
};