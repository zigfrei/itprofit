export default class FormValidator {
  constructor(selectors, elementForm) {
    (this.selectors = selectors), (this.elementForm = elementForm);
    this.submitButton = elementForm.querySelector(
      this.selectors.submitButtonSelector
    );
    this.inputs = Array.from(
      this.elementForm.querySelectorAll(this.selectors.inputSelector)
    );
  }

  _showInputError(input) {
    const errorElement = this.elementForm.querySelector(`.${input.id}-error`);
    input.classList.add(this.selectors.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this.selectors.errorClass);
  }
  _hideInputError(input) {
    const errorElement = this.elementForm.querySelector(`.${input.id}-error`);
    input.classList.remove(this.selectors.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.elementForm.errorClass);
  }

  disableSubmitButton() {
    this.submitButton.classList.add(this.selectors.inactiveButtonClass);
    this.submitButton.setAttribute("disabled", "disabled");
  }

  _enableSubmitButton() {
    this.submitButton.classList.remove(this.selectors.inactiveButtonClass);
    this.submitButton.removeAttribute("disabled", "disabled");
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this.inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    const inputList = this.inputs;
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.elementForm.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
