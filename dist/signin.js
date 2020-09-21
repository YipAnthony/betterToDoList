let signup = (() => {

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
    let companyName = document.createElement('img')
    companyName.setAttribute('id', 'companyName')
    companyName.src = "images/logo_transparent.png"
    companyNameContainer.appendChild(companyName)

    let welcomeContainer = createElement('welcomeContainer');
    let welcomeText = createElement('welcomeText');
    welcomeText.innerHTML = "Welcome Back!"
    welcomeContainer.appendChild(welcomeText)

    let signInButton = createElement('signInButton', "button");
    let signInButtonText = createElement('signInButtonText');
    signInButtonText.innerHTML = "Sign In"
    signInButton.appendChild(signInButtonText)

    let emailPasswordContainer = createElement('emailPasswordContainer');
    let emailContainer = createElement('emailContainer')
    let emailInputArea = createElement('emailInputArea', "", 'textarea');
    emailInputArea.setAttribute('name', 'email')
    emailInputArea.setAttribute('scroll', 'none')
    emailInputArea.setAttribute('placeholder', 'Email Address')
    let emailIcon = createElement('emailIcon', "icon", "img")
    emailIcon.src = "images/envelope.svg"
    emailContainer.appendChild(emailIcon)
    emailContainer.appendChild(emailInputArea)
    emailPasswordContainer.appendChild(emailContainer)

    let passwordInputArea = createElement('passwordInputArea', "", 'input');
    let passwordContainer = createElement('passwordContainer')
    passwordInputArea.setAttribute('name', 'password')
    passwordInputArea.setAttribute('placeholder', "Password")
    passwordInputArea.setAttribute('type', "password")
    let passwordIcon = createElement('passwordIcon', "icon", "img")
    passwordIcon.src = "images/padlock.svg"
    passwordContainer.appendChild(passwordIcon)
    passwordContainer.appendChild(passwordInputArea)
    emailPasswordContainer.appendChild(passwordContainer)

    let selectionDivider = createElement('selectionDivider')
    selectionDivider.innerHTML = "- OR -"
    
    let signInWithGoogleButton = createElement('signInWithGoogleButton', "button");
    let signInWithGoogleText = createElement('signInWithGoogleText');
    let googleIcon = createElement('googleIcon', "icon", "img")
    googleIcon.src = "images/google-plus.svg"
    signInWithGoogleText.innerHTML = "Sign in with Google"
    signInWithGoogleButton.appendChild(googleIcon)
    signInWithGoogleButton.appendChild(signInWithGoogleText)

    let signInWithDemoButton = createElement('signInWithDemoButton', "button");
    let signInWithDemoText = createElement('signInWithDemoText');
    let signInWithDemoText2 = createElement('signInWithDemoText2');
    signInWithDemoText.innerHTML = "Demo"
    signInWithDemoText2.innerHTML = "Version"
    signInWithDemoButton.appendChild(signInWithDemoText)
    signInWithDemoButton.appendChild(signInWithDemoText2)

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

    let backButton = createElement('backButton', "button");
    let backButtonText = createElement('backButtonText');
    backButtonText.innerHTML = "Back"
    backButton.appendChild(backButtonText)
    backButton.addEventListener('click', returnHome)

    function returnHome() {
        clearContainer();
        createSignInContainer();
    }

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
        promptEmailPass();
        emailPasswordContainer.removeChild(passwordContainer)
        signInContainer.removeChild(submit)
        emailPasswordContainer.appendChild(submit)
        welcomeText.innerHTML = "Please re-confirm your email";
    }
    function promptEmail () {
        promptEmailPass();
        emailPasswordContainer.removeChild(passwordContainer)
        signInContainer.removeChild(submit)
        emailPasswordContainer.appendChild(submit)
    }
    function promptEmailPass () {
        clearContainer();
        signInContainer.append(companyNameContainer, welcomeContainer,
            emailPasswordContainer, submit, backButton);
            welcomeText.innerHTML = "Enter your desired email and password";
    }
    function openSignUpPanel () {
        clearContainer();
        signInContainer.append(companyNameContainer, welcomeContainer,
            signUpEmailPass, signUpEmailOnly, backButton);
        welcomeText.innerHTML = "Sign Up";
        emailInputArea.value = ""
        passwordInputArea.value = ""
    }

    function createSignInContainer () {
        signInContainer.append(companyNameContainer, welcomeContainer, 
            emailPasswordContainer, signInButton, selectionDivider, signInWithGoogleButton, signUpButton,
            signInWithDemoButton)
        emailPasswordContainer.append(emailContainer, passwordContainer)
        if (emailPasswordContainer.firstElementChild == submit) {
            emailPasswordContainer.removeChild(submit)
        }
        welcomeText.innerHTML = "Welcome Back!"
        emailInputArea.setAttribute('placeholder', 'Email Address')
    }
    return {
        createSignInContainer,
        emailSent,
        reconfirmEmail,
        // clearContainer,
        signInContainer,
        signInButton,
        signInWithGoogleButton,
        signUpButton,
        submit,
        signUpEmailOnly,
        signUpEmailPass,
        emailInputArea,
        passwordInputArea,
        signInWithDemoButton,
        backButton
    }
})();

export {
    signup
}