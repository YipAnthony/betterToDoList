function signup(){

const createElement = (name, inputClass, type = 'div', classOrID = 'id') => {
    let variable = document.createElement(type);
    variable.setAttribute(classOrID, name);
    if (inputClass) {
        variable.setAttribute('class', inputClass)
    }
    return variable;;
}

//change tempDiv to body once out of VSCode initialized template
let signInContainer = createElement('signInContainer');
const tempDiv = document.querySelector('body');
tempDiv.appendChild(signInContainer);

let companyNameContainer = createElement('companyNameContainer');
let companyName = createElement('companyName');
companyName.innerHTML = "To-Do"
companyNameContainer.appendChild(companyName)

let welcomeContainer = createElement('welcomeContainer');
let welcomeText = createElement('welcomeText');
welcomeText.innerHTML = "Welcome"
welcomeContainer.appendChild(welcomeText)

let signInButton = createElement('signInButton', "button");
let signInButtonText = createElement('signInButtonText');
signInButtonText.innerHTML = "Sign In"
signInButton.appendChild(signInButtonText)
let emailPasswordContainer = createElement('emailPasswordContainer');
let emailInputArea = createElement('emailInputArea', "", 'textarea');
emailInputArea.setAttribute('name', 'email')
emailInputArea.setAttribute('placeholder', 'Email Address')
emailPasswordContainer.appendChild(emailInputArea)
let passwordInputArea = createElement('passwordInputArea', "", 'textarea');
passwordInputArea.setAttribute('name', 'password')
passwordInputArea.setAttribute('placeholder', "Password")
emailPasswordContainer.appendChild(passwordInputArea)


let signInWithGoogleButton = createElement('signInWithGoogleButton', "button");
let signInWithGoogleText = createElement('signInWithGoogleText');
signInWithGoogleText.innerHTML = "Sign in with Google"
signInWithGoogleButton.appendChild(signInWithGoogleText)

let signInWithDemoButton = createElement('signInWithDemoButton', "button");
let signInWithDemoText = createElement('signInWithDemoText');
signInWithDemoText.innerHTML = "Demo Mode"
signInWithDemoButton.appendChild(signInWithDemoText)

let signUpButton = createElement('signUpButton', "button")
let signUpButtonText = createElement('signUpButtonText')
signUpButtonText.innerHTML = "Sign Up"
signUpButton.appendChild(signUpButtonText)
signUpButton.addEventListener('click', openSignUpPanel)

let signUpEmailPass = createElement('signUpEmailPass', "button")
let signUpEmailPassText = createElement('signUpEmailPassText')
signUpEmailPass.appendChild(signUpEmailPassText)
signUpEmailPassText.innerHTML = "Email + Password"
signUpEmailPass.addEventListener('click', promptEmailPass)

let signUpEmailOnly = createElement('signUpEmailOnly', "button")
let signUpEmailOnlyText = createElement('signUpEmailOnlyText')
signUpEmailOnly.appendChild(signUpEmailOnlyText)
signUpEmailOnlyText.innerHTML = "Email Only"
signUpEmailOnly.addEventListener('click', promptEmail)

let submit = createElement('submit', "button")
let submitText = createElement('submitText')
submit.appendChild(submitText)
submitText.innerHTML = "Submit Email"

function clearContainer () {
    while (signInContainer.firstElementChild) {
        signInContainer.removeChild(signInContainer.firstElementChild);
    }
}

function emailSent () {
    clearContainer();
    signInContainer.append(companyNameContainer, welcomeContainer);
        welcomeText.innerHTML = "Email sent, please check your inbox";
}

function reconfirmEmail () {
    clearContainer();
    signInContainer.append(companyNameContainer, welcomeContainer, 
        emailInputArea, submit);
        welcomeText.innerHTML = "Please re-confirm your email";
}
function promptEmail () {
    clearContainer();
    signInContainer.append(companyNameContainer, welcomeContainer,
        emailInputArea, submit);
        welcomeText.innerHTML = "Email Only Sign up";
}
function promptEmailPass () {
    clearContainer();
    signInContainer.append(companyNameContainer, welcomeContainer,
        emailInputArea, passwordInputArea, submit);
        welcomeText.innerHTML = "Enter your desired email and password";
}
function openSignUpPanel () {
    clearContainer();
    signInContainer.append(companyNameContainer, welcomeContainer,
        signUpEmailPass, signUpEmailOnly, signInWithGoogleButton);
    welcomeText.innerHTML = "Sign Up";
}

function createSignInContainer () {
    signInContainer.append(companyNameContainer, welcomeContainer, 
        emailPasswordContainer, signInButton, signInWithGoogleButton, signUpButton,
        signInWithDemoButton)
}
return {
    createSignInContainer,
    emailSent,
    reconfirmEmail,
    clearContainer,
    signInWithGoogleButton
}
}

export {signup}