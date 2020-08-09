export const formFields = [
  {
    fieldName: "First Name",
    fieldId: "firstName",
    fieldType: "text",
    fieldRequired: true,
    fieldRegEx: "^[a-zA-Z]+$",
    readOnly:false,
    maxLength:20
  },
  {
    fieldName: "Last Name",
    fieldId: "lastName",
    fieldType: "text",
    fieldRequired: true,
    fieldRegEx: "^[a-zA-Z]+$",
    readOnly:false,
    maxLength:20
  },
  {
    fieldName: "Address",
    fieldId: "address",
    fieldType: "textArea",
    fieldRequired: true,
    fieldRegEx: "^[a-zA-Z0-9, .]+$",
    readOnly:false,
    maxLength:140
  },
  {
    fieldName: "Country",
    fieldId: "country",
    fieldType: "select",
    fieldRequired: true,
    fieldOptions: ["US", "UK", "CA", "NZ", "AU" , "IN"],
    fieldRegEx: "",
    readOnly:false
  },
  {
    fieldName: "Pincode",
    fieldId: "pinCode",
    fieldType: "text",
    fieldRequired: true,
    fieldRegEx: "^[0-9]+$",
    readOnly:false,
    maxLength:6
  },
  {
    fieldName: "State",
    fieldId: "state",
    fieldType: "text",
    fieldRequired: true,
    fieldRegEx: "",
    readOnly:true
  },
];
