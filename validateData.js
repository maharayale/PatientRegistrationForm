/* 
 Purpose:Javascript:  
  - to guide the user to eneter a valid data daynamically while the user insert data
by: Ma Ya
Date Updated: 11/10/2023
 */

// Intiate the Submit button at Enabled
var submitButton = document.getElementById("submitButton");
submitButton.disabled = false;

function showError(inputName, errorMessage) {
  const errorContainer = document.getElementById(inputName + "-error");
  errorContainer.textContent = errorMessage;
  submitButton.disabled = true;
}

function clearError(inputName) {
  const errorContainer = document.getElementById(inputName + "-error");
  errorContainer.textContent = "";
  submitButton.disabled = false;
}

function validateInput(inputName) {
  clearError(inputName);

  const value = document.getElementById(inputName).value;

  if (value.trim() === "") {
    return;
  }

  // First Names
  if (
    inputName === "firstname" ||
    inputName === "emefirstname" ||
    inputName === "docfirstname" ||
    inputName === "lastname" ||
    inputName === "emelastname" ||
    inputName === "doclastname"
  ) {
    const regex = /^[A-Za-z' -]{1,30}$/;

    if (!regex.test(value)) {
      showError(
        inputName,
        "Invalid First Name: Please use letters, apostrophes, and dashes only."
      );
    }
  }

  // Middle name
  if (inputName === "middleinit") {
    const regex = /^[A-Za-z]$/;
    if (!regex.test(value)) {
      showError(inputName, "Invalid Name:Please use a letter.");
    }
  }

  // Date of birth
  if (inputName === "dateofbirth") {
    var dateofbirth = new Date(value);
    var today = new Date();
    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    if (dateofbirth > today) {
      showError(inputName, "ERROR: Birth date cannot be in the future");
    } else if (dateofbirth < minDate) {
      showError(inputName, "ERROR: Birth date cannot exceeds 120 years");
    }
  }

  // Address Line-1, Line-2 and City
  if (inputName === "addr1" || inputName === "addr2" || inputName === "city") {
    const regex = /^[0-9a-zA-Z\s, -.]{2,30}.$/;
    if (!regex.test(value)) {
      showError(
        inputName,
        "Invalid Address: use 2-30: letters, numbers and spaces"
      );
    }
  }

  // Zipcode
  if (inputName === "zipcode") {
    let cleanedZipCode = value.replace(/[-\s]/g, "").slice(0, 5);
    if (cleanedZipCode.length < 5) {
      showError(inputName, "Zip code requires 5 digits.");
    } else {
      if (/^[0-9]*$/.test(cleanedZipCode)) {
        document.getElementById(inputName).value = cleanedZipCode;
      } else {
        showError(
          inputName,
          "Invalid zip code. Please use numbers, dashes, or spaces and limit to 5 characters."
        );
      }
    }
  }

  // Email
  if (inputName === "email") {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
      showError(
        inputName,
        "Invalid email: enter a valid email in the format name@domain.ltd"
      );
    }
  }

  // Phone numbers
  if (
    inputName === "phone" ||
    inputName === "emephone" ||
    inputName === "docphone"
  ) {
    const sanitizedValue = value.replace(/\D/g, "");
    const regex = /^(?:(?:\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4})$/;

    if (!regex.test(sanitizedValue)) {
      showError(
        inputName,
        "Invalid phone number. Please enter a 10-digit number."
      );
    } else {
      const formattedNumber = sanitizedValue.replace(
        /^(\d{3})(\d{3})(\d{4})$/,
        "($1) $2-$3"
      );
      document.getElementById(inputName).value = formattedNumber;
    }
  }

  //Insurance name
  if (inputName === "insurance_name") {
    const regex = /^[A-Za-z\s'-]+$/;
    if (!regex.test(value)) {
      showError(
        inputName,
        "Please provide valid insurance name sing leteers, dashes, appostrops and space"
      );
    }
  }

  //Insurance id
  if (inputName === "policyid") {
    const regex = /^[A-Za-z0-9_-]{5,20}$/;
    if (!regex.test(value)) {
      showError(
        inputName,
        "Please provide valid ID using leteers, numbers, dashes and underscores"
      );
    }
  }

  // Reason to visit
  if (inputName === "reason") {
    const regex = /^[A-Za-z\s.\-]+$/;
    if (!regex.test(value)) {
      showError(inputName, "Please use  letters, dashes and space");
    }
  }

  // username
  if (inputName === "username") {
    if (/^[0-9]/.test(value)) {
      showError(inputName, "Invalid: Username can't start with a number.");
    } else {
      const regex = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;
      if (!regex.test(value)) {
        showError(
          inputName,
          "Please use 5-20 characters: letters, numbers, dash, or underscore."
        );
      }
    }
  }

  // Password
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,30}$/;
  const passwordValue = document.getElementById("password").value;
  const confirmPasswordValue = document.getElementById("confirmpassword").value;
  const usernameValue = document.getElementById("username").value;

  if (inputName === "password") {
    if (passwordValue === usernameValue) {
      showError(inputName, "Password cannot be the same as your username.");
    } else if (!regex.test(passwordValue)) {
      showError(
        inputName,
        "Invalid password: at least 8 characters long with at least 1 uppercase, 1 lowercase letter, 1 special character and 1 digit."
      );
    }
  }
  // Confirmpassword
  if (inputName === "confirmpassword") {
    if (passwordValue !== confirmPasswordValue) {
      showError(inputName, "Passwords do not match.");
    } else if (!regex.test(confirmPasswordValue)) {
      showError(
        inputName,
        "Invalid password: at least 8 characters long with at least 1 uppercase, 1 lowercase letter, 1 special character and 1 digit."
      );
    }
  }
}

var formInputs = document.querySelectorAll('input[type="text"]');
formInputs.forEach(function (input) {
  input.addEventListener("blur", function () {
    validateInput(input.id);
  });
});

// Function to clear error messages
function clearErrorMessages() {
  var errorMessages = document.getElementsByClassName("error-message");

  for (var i = 0; i < errorMessages.length; i++) {
    errorMessages[i].innerText = "";
  }
}
function resetPage() {
  clearErrorMessages();
}
window.addEventListener("load", clearErrorMessages);
