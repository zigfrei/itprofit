import "../styles/index.scss";
// import Swiper from "swiper/bundle";
import { contactsFormElement } from "../utils/constants";
import { contactsForm } from "../utils/constants";
import { selectorsAndFormClasses } from "../utils/constants";
import { config } from "../utils/constants";
import FormHandler from "./FormHandler";
import FormValidator from "./FormValidator";
import FormApi from "./FormApi";

// // import styles bundle
// import "swiper/css/bundle";

// // init Swiper:
// const swiper = new Swiper(".swiper", {
//   // Optional parameters
//   direction: "horizontal",
//   loop: false,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: true,
//   },

//   // If we need pagination
//   // pagination: {
//   //   el: '.swiper-pagination',
//   // },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
// });

// const nav = document.getElementById("main-nav__list");
// const hamburger = document.getElementById("header__button");

// nav.addEventListener("click", handleNav);
// hamburger.addEventListener("click", handleNav);

// function handleNav() {
//   if (!nav.classList.contains("main-nav__list_active")) {
//     nav.classList.add("main-nav__list_active");
//     hamburger.classList.add("header__button_active");
//   } else {
//     nav.classList.remove("main-nav__list_active");
//     hamburger.classList.remove("header__button_active");
//   }
// }

// //Change email on click to fool spambots
// let noBotEmail = document.getElementById("address-email");
// noBotEmail.addEventListener("click", modifyEmail);

// function modifyEmail() {
//   window.location.href = "mailto:solutions@accu-traffic.ca?subject=&body=";
//   noBotEmail.innerHTML =
//     "<a href='mailto:solutions@accu-traffic.ca' class='address__link'> solutions@accu-traffic.ca</a>";
// }

// //function adding response message
// let spanForMessage = document.getElementById("form-response");
// function responseMessage(response) {
//   if (response === 'ok'){
//     spanForMessage.innerHTML="<span id='form-response' class='form__response form__response_ok'>Your message has been sent</span>";
//   }
//   if (response === 'error'){
//     spanForMessage.innerHTML="<span id='form-response' class='form__response form__response_error'>An error occurred while sending the message. Try again.</span>";
//   }
// }

// // Function that change location.hash & add active link in nav-menu
// const updateHashUrl = () => {
//   const sections = document.querySelectorAll(".content-group");
//   const navLink = document.querySelectorAll(".main-nav__link");

//   document.addEventListener("scroll", (e) => {
//     sections.forEach((section) => {
//       const rect = section.getBoundingClientRect();

//       if (rect.top > 0 && rect.top < 100) {
//         document.location.hash = section.id;
//         navLink.forEach((link) => {
//           link.href.split("#")[1] == section.id
//             ? link.classList.add("main-nav__link_active")
//             : link.classList.remove("main-nav__link_active");
//         });
//       }
//     });
//   });
// };

// window.addEventListener("load", updateHashUrl);

// A set of functions for a smooth transition to paragraphs
// collect all anchors; set the animation time and the number of frames
// const anchors = [].slice.call(document.querySelectorAll(".main-nav__link")),
//   animationTime = 300,
//   framesCount = 20;

// anchors.forEach(function (item) {
//   // assign an event handler to each anchor
//   item.addEventListener("click", function (e) {
//     e.preventDefault();

//     //for each anchor, we take the corresponding element and determine its Y coordinate
//     let coordY =
//       document.querySelector(item.getAttribute("href")).getBoundingClientRect()
//         .top + window.scrollY;

//     // we start the interval in which
//     let scroller = setInterval(function () {
//       // we calculate how much to scroll for 1 clock cycle
//       let scrollBy = coordY / framesCount;

//       //if the number of pixels for scrolling in 1 clock cycle is greater than the distance
//       //to the element and the bottom of the page is not reached
//       if (
//         scrollBy > window.scrollY - coordY &&
//         window.innerHeight + window.scrollY < document.body.offsetHeight
//       ) {
//         // then scroll by the number of pixels that corresponds to one clock cycle
//         window.scrollBy(0, scrollBy);
//       } else {
//         // otherwise, we get to the element and exit the interval
//         window.scrollTo(0, coordY);
//         clearInterval(scroller);
//       }
//       // the interval time is equal to the partial of the animation time and the number of frames
//     }, animationTime / framesCount);
//   });
// });

//////////////////////////////////////////////validation

//Create element of the class API and give it settings
const api = new FormApi(config);

const renderLoading = (isLoading, popupElement) => {
  if (isLoading) {
    popupElement.querySelector(".form__submit-button").textContent =
      "SENDING...";
  } else {
    popupElement.querySelector(".form__submit-button").textContent = "SUBMIT";
  }
};

//The function of saving profile information on the server after pressing the submit button
function handleSubmitFeedbackForm(formData) {
  renderLoading(true, contactsForm);
  grecaptcha.ready(function () {
    // Wait for the recaptcha to be ready
    grecaptcha
      .execute(process.env.APP_reCAPTCHA_SITE_KEY, {
        action: "contact",
      }) // Execute the recaptcha
      .then(function (token) {
        api
          .postFormData(formData, token)
          .then((res) => {
            handlerFeedbackForm.resetForm();
            validFeedbackForm.disableSubmitButton();
            responseMessage('ok');
          })
          .catch((err) => {
            responseMessage('error');
            console.log(err);
          })
          .finally(() => {
            renderLoading(false, contactsForm);
          });
      });
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
