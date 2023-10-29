export default class Popup {
  constructor(selector) {
    this.popupElement = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleCloseButtonAndOverlayClick =
      this._handleCloseButtonAndOverlayClick.bind(this);
  }

  openPopup() {
    this.popupElement.classList.add("popup_opened");
    //Listener closing the modal window by pressing the Escape key
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this.popupElement.classList.remove("popup_opened");
    //Remove the modal window closing listener by pressing the Escape key
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  _handleCloseButtonAndOverlayClick(event) {
    if (
      event.target.classList.contains("popup__close-button") ||
      event.target.classList.contains("popup")
    ) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener(
      "click",
      this._handleCloseButtonAndOverlayClick
    );
  }
}
