const contactsFormElement = document.querySelector(".contacts");
const contactsForm = contactsFormElement.querySelector(".form");

const selectorsAndFormClasses = {
  inputSelector: ".form__field-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__field-error_active",
  inputError: ".form__field-error",
};

const config = {
  // baseUrl: "http://accu-traffic.ca",
  baseUrl: "",
};

export {
  contactsFormElement,
  contactsForm,
  selectorsAndFormClasses,
  config,
};
