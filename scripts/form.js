"use strict";
import "https://code.jquery.com/jquery-3.6.1.min.js";
import "./bootstrap.bundle.min.js";
import "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

let firstForm = document.querySelector(".firstForm");
let secondForm = document.querySelector(".secondForm");
let firstFormElements = Array.from(firstForm.elements);
let secondFormElements = Array.from(secondForm.elements);
let firstFormValues;
let secondFormValues;

const buttons = {
  next: $(".nextBtn"),
  submit: $(".sumbitBtn"),
  back: $(".backBtn"),
};

(() => {
  $(secondForm).hide();
  $(firstForm).on("submit", (e) => {
    e.preventDefault();
  });
  $(secondForm).on("submit", (e) => {
    e.preventDefault();
  });
  buttons.next.on("click", (e) => {
    console.log("Next Tapped");
    validateFirstForm();
  });
  buttons.back.on("click", (e) => {
    console.log("Back Tapped");
    backtapped();
  });
  buttons.submit.on("click", (e) => {
    validateSecondForm();
  });
})();

function validateFirstForm() {
  if (firstForm.checkValidity()) {
    $(firstForm).hide();
    $(secondForm).show();
    let date = getDMY(firstForm.date.value);
    firstFormValues = {
      fullname: firstForm.fullname.value,
      day: date[0],
      month: date[1],
      year: date[2],
      email: firstForm.email.value,
      mobile: firstForm.mobile.value,
      gender: firstForm.gender.value,
      university: firstForm.university.value,
      faculty: firstForm.faculty.value,
      department: firstForm.department.value,
      committee: firstForm.committee.value,
      governorate: firstForm.governorate.value,
      town: firstForm.town.value,
      address: firstForm.address.value,
    };
    console.log(firstFormValues);
  }
}

function validateSecondForm() {
  if (secondForm.checkValidity()) {
    //submit
    secondFormValues = {
      aboutCancer: secondForm.aboutCancer.value,
      joinWhy: secondForm.joinWhy.value,
      hearAboutUs: secondForm.hearAboutUs.value,
      selectDevice: secondForm.selectDevice.value,
    };
    console.log(secondFormValues);
    submitToGoogleForm();
  }
}

function backtapped() {
  $(secondForm).hide();
  $(firstForm).show();
}

function getDMY(date) {
  let d = new Date(date);
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()];
}

async function submitToGoogleForm() {
  let url = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSeWfWfy4UaqdW-nWoc9EIntZTBndlxLJeODTE08YEf5RfQiFQ/formResponse?entry.127491737=${firstFormValues.mobile}&entry.638586207=${firstFormValues.email}&entry.1117808068=${firstFormValues.gender}&entry.1418669495=${firstFormValues.fullname}&entry.1571889210_year=${firstFormValues.year}&entry.1571889210_month=${firstFormValues.month}&entry.1571889210_day=${firstFormValues.day}&entry.1506369443=${firstFormValues.university}&entry.1347247189=${firstFormValues.faculty}&entry.3367459=${firstFormValues.department}&entry.646673259=${firstFormValues.governorate}&entry.1550317493=${firstFormValues.town}&entry.1643528773=${firstFormValues.address}&entry.1370290528=${secondFormValues.aboutCancer}&entry.1475714249=${secondFormValues.joinWhy}&entry.1062972090=${secondFormValues.hearAboutUs}&entry.864345454=${firstFormValues.committee}&entry.792561070=${secondFormValues.selectDevice}`;

  fetch(url, {
    mode: "no-cors",
  })
    .then((res) => {
      console.log(res, "--response--");
    })
    .then((value) => {
      console.log(value, "--value--");
    })
    .catch((err) => {
      console.log(err, "--error--");
    });
}
