const contactsFormElement = document.querySelector(".contacts");
const contactsForm = contactsFormElement.querySelector(".form");

const selectorsAndFormClasses = {
  inputSelector: ".form__field-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__field-error_active",
  inputError: ".form__field-error",
  phoneInput: ".form__field-input-phone",
};

const config = {
  baseUrl: "http://localhost:9090",
};

const popupOpenElement = ".popup_theme_main";
const openPopupButton = document.querySelector(".popup_button");

export {
  contactsFormElement,
  contactsForm,
  selectorsAndFormClasses,
  config,
  popupOpenElement,
  openPopupButton,
};
