export default class FormHandler {
  constructor(formElement, callbackSubmitForm) {
    this.formElement = formElement;
    this.callbackSubmitForm = callbackSubmitForm;
    this._form = this.formElement.querySelector(".form");
    this._handelSubmitForm = this._handelSubmitForm.bind(this);
  }

  //Get all input values from the form
  _getInputValues() {
    this._inputList = this.formElement.querySelectorAll(".form__field-input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  //Form submission handler function
  _handelSubmitForm(e) {
    e.preventDefault();
    this.callbackSubmitForm(this._getInputValues());
  }

  setEventListeners() {
    // super.setEventListeners();
    this._form.addEventListener("submit", this._handelSubmitForm);
  }

  resetForm() {
    this._form.reset();
  }
}
