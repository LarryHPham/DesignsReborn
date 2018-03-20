/*
Assignement:

HTML: Complete the HTML to have semantic and compliant markups.

JAVASCRIPT: Dynamically add a user to the users list.
- Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
- Use the add_user function to submit the user's data.
- If the ajax request returns an error, display the error message in red.
- Display the newly added user in the users list when the request was successful.
- Do not use any libraries e.g. bootstrap

Nice to have:
- no jQuery or completely rewrite in jQuery
- add some CSS3 properties
- code cleanup/format
- explain or propose improvements in comments
- remove inline code/styles

*/


// START YOUR CODE HERE
// NOTE: https://jsfiddle.net/cwokcegf/138/
// declare variables here
var nameElement = document.getElementById('name');
var emailElement = document.getElementById('email');
var errorMsg = document.getElementById('errors');
var userList = document.getElementById('users');
var userArray = [];

// simple form of email validation, mainly to check if the @ symbol is present
// NOTE: can be found here https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/1373724#1373724
function validateEmail(email) {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  return re.test(email);
}

// function to quickly display error message without re-writing innerHTML alot.
function emailError(msg) {
  errorMsg.innerHTML = msg;
}

// when user submits the form then grab username && email value to add user or create error message
function submitForm() {
  var username = nameElement.value;
  var email = emailElement.value;

  nameElement.style.borderColor = "unset";
  emailElement.style.borderColor = "unset";

  if (validateEmail(email)) {
    addUser(username, email, checkUsers);
    emailError(""); // empties error message if valid email has been sent
  } else {
    emailElement.style.borderColor = "red";
    emailError("please enter a valid email address");
  }
}

// append user to userList element to display
function appendUser(user, email) {
  var node = document.createElement("li");
  node.innerHTML = "<span>" + user + "</span><span>" + email + "</span>";
  userList.appendChild(node);
}

// checks if user entered already has an existing email or username already exists
// NOTE: this is only if we allow none multiple usernames and 1 email per account
checkUsers = function(data) {
  if (!data.success) {
    emailError(data.error);
    return;
  }

  let valid = [true];
  let username = data.user.username;
  let email = data.user.email;

  if (userArray.length > 0) {
    valid = userArray.map(user => {
      if (user.username != username && user.email != email) {
        return true;
      } else {
        return false;
      }
    });
  }
  if (valid.indexOf(false) > -1) {
    nameElement.style.borderColor = "red";
    emailError("User Already Exists");
  } else {
    userArray.push(data.user);
    appendUser(username, email);
  }
}

// END YOUR CODE HERE

// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
  var response,
    success = (!!Math.round(Math.random()));

  if (!success) {
    response = JSON.stringify({
      success: success,
      error: "Oups, something went wrong!"
    });
  } else {
    response = JSON.stringify({
      success: success,
      user: {
        username: username,
        email: email
      }
    });
  }

  $.ajax({
    url: '/echo/json/',
    type: "post",
    data: {
      json: response
    },
    success: callback
  });
};
