import "../styles/index.scss";
import {contactsFormElement, contactsForm, selectorsAndFormClasses, config, popupOpenElement, openPopupButton } from "../utils/constants";
import FormHandler from "./FormHandler";
import FormValidator from "./FormValidator";
import FormApi from "./FormApi";
import Popup from "./Popup";

//Creating a modal window class element
const popup = new Popup(popupOpenElement);
popup.setEventListeners();

//Listener of clicking on the pop-up opening button
openPopupButton.addEventListener("click", () => {
  popup.openPopup();
});

const api = new FormApi(config);

const renderLoading = (isLoading, popupElement) => {
  if (isLoading) {
    popupElement.querySelector(".form__submit-button").textContent =
      "Отправляется...";
  } else {
    popupElement.querySelector(".form__submit-button").textContent =
      "Отправить";
  }
};

//The function of saving profile information on the server after pressing the submit button
function handleSubmitFeedbackForm(formData) {
  console.log(formData);
  api
    .postFormData(formData)
    .then((res) => {
      handlerFeedbackForm.resetForm();
      validFeedbackForm.disableSubmitButton();
      alert(res.message);
      console.log(`Статус: ${res.status}. Сообщение: ${res.message}`);
    })
    .catch((err) => {
      alert(err.statusText);
      console.log(err);
      console.log(`Статус ошибки: ${err.status}. Сообщение: ${err.statusText}`);
    })
    .finally(() => {
      renderLoading(false, contactsForm);
    });
}

//Creating an element of the form's submit handler class
const handlerFeedbackForm = new FormHandler(
  contactsFormElement,
  handleSubmitFeedbackForm
);
handlerFeedbackForm.setEventListeners();

//Creating a Form validation class element
const validFeedbackForm = new FormValidator(
  selectorsAndFormClasses,
  contactsForm
);
validFeedbackForm.enableValidation();
