import React, { Component } from "react";
import Modal from "../ModalComponent/Modal";
import { formFields } from "../../Utility/formFields";
import {
  NameErrorMsg,
  SpecialCharErrorMsg,
  PinCodeErrorMsg,
} from "../../Constants/Constant";

class Form extends Component {
  constructor(props) {
    super(props);
    const state = {};
    this.timeout = 0;
    for (let i = 0; i < formFields.length; i++) {
      state[formFields[i].fieldId] = {
        value: "",
        errorState: { error: false, message: "" },
      };
    }
    this.state = state;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      firstName,
      lastName,
      address,
      country,
      pinCode,
    } = nextProps.initialData;

    if (
      firstName.value !== "" &&
      lastName.value !== "" &&
      address.value !== "" &&
      country.value !== "" &&
      pinCode.value !== "" &&
      prevState.firstName.value === "" &&
      prevState.lastName.value === "" &&
      prevState.address.value === "" &&
      prevState.country.value === "" &&
      prevState.pinCode.value === ""
    ) {
      return nextProps.initialData;
    }
    return null;
  }

  cancelHandler = (event) => {
    this.props.hideAddUpdateForm();
    event.preventDefault();

    this.props.resetData();
    let state = {};
    this.timeout = 0;
    for (let i = 0; i < formFields.length; i++) {
      state[formFields[i].fieldId] = {
        value: "",
        errorState: { error: false, message: "" },
      };
    }
    this.setState(state)
  };

  submitHandler = (event) => {
    this.props.addUpdateData(this.state);
    event.preventDefault();
  };

  handleChange = (evt) => {
    let field = evt.target.name;
    let value = evt.target.value;
    let validate =
      value.length === 0 || evt.target.name === "country"
        ? true
        : this.detectInputValidation(evt);
    if (validate) {
      if (
        (field === "pinCode" || field === "country") &&
        this.state.country.value.length !== 0 &&
        this.state.pinCode.value.length > 3
      ) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.getPincodeState(
            this.state.pinCode.value,
            this.state.country.value
          );
        }, 1500);
      }
      this.setState((prevState) => ({
        [field]: {
          ...prevState[field],
          value: value,
          errorState: {
            ...prevState[field].errorState,
            error: false,
            message: "",
          },
        },
      }));
    } else {
      var errroMessage;
      switch (evt.target.name) {
        case "firstName":
          errroMessage = NameErrorMsg;
          break;
        case "lastName":
          errroMessage = NameErrorMsg;
          break;
        case "address":
          errroMessage = SpecialCharErrorMsg;
          break;
        case "pinCode":
          errroMessage = PinCodeErrorMsg;
          break;

        default:
          errroMessage = "";
          break;
      }
      this.setErrorState(field, errroMessage);
    }
  };

  setErrorState(field, errorMsg) {
    this.setState((prevState) => ({
      [field]: {
        ...prevState[field],
        errorState: {
          ...prevState[field].errorState,
          error: true,
          message: errorMsg,
        },
      },
    }));
  }

  detectInputValidation(evt) {
    const regex = new RegExp(evt.target.attributes.regex.value);
    if (regex.test(evt.target.value)) {
      return true;
    }
    return false;
  }

  getPincodeState(pin, country) {
    fetch(
      `https://api.worldpostallocations.com/pincode?postalcode=${pin}&countrycode=${country}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.result.length > 0) {
            this.setState((prevState) => ({
              pinCode: {
                ...prevState["pinCode"],
                errorState: {
                  ...prevState["state"].errorState,
                  error: false,
                  message: "",
                },
              },
            }));
            this.setState((prevState) => ({
              state: {
                ...prevState["state"],
                value: data.result[0].state,
                errorState: {
                  ...prevState["state"].errorState,
                  error: false,
                  message: "",
                },
              },
            }));
          } else {
            this.setState((prevState) => ({
              state: {
                ...prevState["state"],
                value: "",
              },
            }));
            this.setErrorState(
              "pinCode",
              "Invalid pin code. Please enter a valid pincode."
            );
          }
        },
        (error) => {
          this.setErrorState(
            "pinCode",
            "Error while retrieving state for this pin code"
          );
        }
      );
  }

  render() {
    return (
      <form>
        {formFields.map((formFields) => {
          const {
            fieldName,
            fieldId,
            fieldType,
            fieldRequired,
            fieldOptions,
            fieldRegEx,
            readOnly,
            maxLength,
          } = formFields;
          const { errorState } = this.state[fieldId];
          switch (fieldType) {
            case "text":
              return (
                <div key={fieldId} className={fieldId}>
                  <label
                    htmlFor={fieldId}
                    required={fieldRequired}
                    className="addUpdateDataLabel"
                  >
                    {fieldName}
                  </label>
                  <input
                    type="text"
                    name={fieldId}
                    autoComplete="off"
                    readOnly={readOnly}
                    value={this.state[fieldId].value}
                    onChange={this.handleChange}
                    className="addUpdateDataInput"
                    regex={fieldRegEx}
                    maxLength={maxLength}
                  ></input>
                  {errorState.error && (
                    <div className="errorMsg">{errorState.message}</div>
                  )}
                </div>
              );

            case "textArea":
              return (
                <div key={fieldId} className={fieldId}>
                  <label
                    htmlFor={fieldId}
                    required={fieldRequired}
                    className="addUpdateDataLabel"
                  >
                    {fieldName}
                  </label>
                  <textarea
                    name={fieldId}
                    autoComplete="off"
                    readOnly={readOnly}
                    value={this.state[fieldId].value}
                    onChange={this.handleChange}
                    className="addUpdateDataInput"
                    regex={fieldRegEx}
                    maxLength="140"
                    cols="73"
                    rows="3"
                  ></textarea>
                  {errorState.error && (
                    <div className="errorMsg">{errorState.message}</div>
                  )}
                </div>
              );
            case "select":
              return (
                <div key={fieldId} className={fieldId}>
                  <label
                    className="addUpdateDataLabel"
                    required={fieldRequired}
                    htmlFor={fieldId}
                  >
                    {fieldName}
                  </label>
                  <select
                    type="text"
                    name={fieldId}
                    value={this.state[fieldId].value}
                    onChange={this.handleChange}
                    className="addUpdateDataInput"
                  >
                    <option value="">Select</option>
                    {fieldOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              );
            default:
              return null;
          }
        })}
        <div className="actionBtn">
          <button
            className="cnclBtn"
            type="button"
            onClick={this.cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" onClick={this.submitHandler}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default Modal(Form);
