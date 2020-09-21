import {
  isToday,
  toDate,
  isThisWeek,
  isBefore,
  endOfToday,
  add,
  format,
} from "date-fns";
import {signup} from "../dist/signin"

let body = document.querySelector('body')

const auth = firebase.auth();

const whenSignedIn = document.querySelector('#whenSignedIn')

const signOutButton = document.querySelector('#signOutButton')

const userDetails = document.querySelector('#userDetails')

const hiddenContainer = document.querySelector('#hiddenContainer')
hiddenContainer.style.display = "none"

const loginBackground = document.createElement('img')
loginBackground.src = "images/background2.jpg"
loginBackground.setAttribute('id', 'loginBackground')
body.appendChild(loginBackground)

auth.onAuthStateChanged( (user) => {
  if (user) {
    if (user.displayName) userDetails.innerHTML = `Hello, ${user.displayName}`
    else userDetails.innerHTML = `Hello, ${user.email}`
    if (body.querySelector('#signInContainer')) {
      let remove = body.querySelector('#signInContainer')
      body.removeChild(remove)
    }
    toDoList();
    whenSignedIn.hidden = false;
    hiddenContainer.style.display = ""
    hiddenContainer.style.display = "auto"
    hiddenContainer.hidden = false;
    signOutButton.onclick = () => {
      auth.signOut();
      location.reload();
    }
  }
  else {
    whenSignedIn.hidden = true;
    userDetails.innerHTML = `Hello`;
    signInProcess();
  }
})

const database = firebase.firestore();


let signInProcess = () => {
  signup.createSignInContainer();

  let demoButton = signup.signInWithDemoButton;
  demoButton.onclick = () => {
    let email = "demo@gmail.com"
    let password = "demodemo123"
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  //signin with email+ password
  let signInButton = signup.signInButton
  signInButton.onclick = () => {
    let emailInput = signup.emailInputArea
    let email = emailInput.value
    let passInput = signup.passwordInputArea
    let password = passInput.value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      emailInput.value = ""
      passInput.value = ""
      if (errorCode == 'auth/user-not-found') {
        emailInput.setAttribute('placeholder', "email not registered")
      }
      else if (errorCode == 'auth/invalid-email') {
        emailInput.setAttribute('placeholder', "Invalid email/password")
      }
      else if (errorCode == 'auth/wrong-password') {
        passInput.setAttribute('placeholder', 'Invalid email/password')
      }
    });
  }
  
  const provider =  new firebase.auth.GoogleAuthProvider();
  let signInWithGoogleButton = signup.signInWithGoogleButton
  signInWithGoogleButton.onclick = () => {
    auth.signInWithPopup(provider);
  }

  
  var actionCodeSettings = {
    url: 'https://themddropout.github.io/betterToDoList/',
    handleCodeInApp: true
  };
  
  let signUpButton = signup.signUpButton
  signUpButton.onclick = () => {
      let signUpEmailOnly = signup.signUpEmailOnly
      signUpEmailOnly.onclick = () => {
        let submit = signup.submit
        submit.onclick = () => {
          let email = signup.emailInputArea
          let inputEmail = email.value
          firebase.auth().sendSignInLinkToEmail(inputEmail, actionCodeSettings)
          .then(function() {
            signup.emailSent();
            window.localStorage.setItem('emailForSignIn', inputEmail);
            })
            .catch(function(error) {
              email.value = ""
              email.setAttribute('placeholder', error.message)
            });
        }
      }
      let emailPass = signup.signUpEmailPass
      emailPass.onclick = () => {
        let submit = signup.submit
        submit.onclick = () => {
          let emailInput = signup.emailInputArea
          let email = emailInput.value
          
          let passwordInputArea = signup.passwordInputArea
          let password = passwordInputArea.value
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function() {
          })
          .catch(function(error) {
            emailInput.value = ""
            passwordInputArea.value = ""
            emailInput.setAttribute('placeholder', "Invalid email")
            var errorCode = error.code;
            var errorMessage = error.message;
          });
        }
      }
    
    }
  
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      signup.createSignInContainer();
      signup.reconfirmEmail();
      let emailArea = signup.emailInputArea
      let submit = signup.submit
      submit.onclick = () => {
        email = emailArea.value
          firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          window.localStorage.removeItem('emailForSignIn');
          let body = document.querySelector('body')
          let signInContainer = signup.signInContainer
          body.removeChild(signInContainer)
        })
        .catch(function(error) {
          emailArea.value = ""
          emailArea.setAttribute('placeholder', "Invalid Email")
        });
      }
      
    }
    if (email) {
      firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        window.localStorage.removeItem('emailForSignIn');
        let body = document.querySelector('body')
        let signInContainer = signup.signInContainer
        body.removeChild(signInContainer)
      })
      .catch(function(error) {
        let emailArea = signup.emailInputArea
        emailArea.value = ""
        emailArea.setAttribute('placeholder', "Invalid Email")
      });
    }  
  }
}

let toDoList =() => {
  let toggleMenu = document.querySelector("#sidebarToggleMenu");
  toggleMenu.addEventListener("click", toggleSideBar);
  function toggleSideBar() {
    let sidebar = document.querySelector("#sidebar");
    if (toggleMenu.classList.contains("unclicked")) {
      toggleMenu.classList.remove("unclicked");
      toggleMenu.classList.add("clicked");
      sidebar.style.left = "0";

      window.addEventListener("click", closeMenu);
      function closeMenu(e) {
        if (!e.target.id.includes("sidebar")) {
          toggleMenu.classList.add("unclicked");
          toggleMenu.classList.remove("clicked");
          sidebar.style.left = "-300px";
        }
      }
    } else {
      toggleMenu.classList.add("unclicked");
      toggleMenu.classList.remove("clicked");
      sidebar.style.left = "-300px";
    }
  }

  const taskFactoryFunc = (
    description,
    dueDate,
    project,
    completion,
    filter,
    details
  ) => {
    return { description, dueDate, project, completion, filter, details};
  };

  let taskArray = [];

  const projectHashMap = new Map();

  let onStartDemoCondition = (() => {
    auth.onAuthStateChanged( user => {      
      if (user) {
        if (user.uid == "SDzLU3EAgWOXI25mAkPNM4KslHj2"){
          let thingsRef = database.collection('users').doc('whfH5WOfbwe6ZQfXmEGWgYc2WRj2')
          thingsRef.get().then(function(doc) {
            taskArray = [...doc.data().userTaskArray]
            refreshTaskContainer(taskArray)
            initialHashMapSync ();
            refreshProjectsPanel();
          })
        }
        else {
          let thingsRef = database.collection('users').doc(user.uid)
          thingsRef.get().then(function(doc) {
            if(doc.data()) taskArray = [...doc.data().userTaskArray]
            else syncWithFirebase ();
            refreshTaskContainer(taskArray)
            initialHashMapSync ();
            refreshProjectsPanel();
          })
        }
      }
    })
  })();
  

  function syncWithFirebase () {
    auth.onAuthStateChanged( user => {      
      if (user) {
        let thingsRef = database.collection('users').doc(user.uid)
        thingsRef.get().then(function(doc) {
          if (doc.exists) {

            thingsRef.set({
              userTaskArray: taskArray
            })
          } 
          else {
            thingsRef.set({
              userTaskArray: taskArray
          })
        }
      }).catch(function(error) {
      });
    }})
  }

  function initialHashMapSync () {
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].project != "") {
        if (!projectHashMap.has(taskArray[i].project)){
          projectHashMap.set(taskArray[i].project, 1)
        }
        else {
          let value = projectHashMap.get(taskArray[i].project);
          value += 1;
          projectHashMap.set(taskArray[i].project, value);
        }
      }
    }
  }
 
  const addItemsToHashMap = (projectName) => {
    if (projectName == "") return;
    else if (projectHashMap.has(projectName)) {
      let value = projectHashMap.get(projectName);
      value += 1;
      projectHashMap.set(projectName, value);
    } else {
      projectHashMap.set(projectName, 1);
    }
  };

  const removeItemsToHashMap = (projectName) => {
    if (projectHashMap.has(projectName)) {
      let value = projectHashMap.get(projectName);
      value -= 1;
      projectHashMap.set(projectName, value);
    }
    if (projectHashMap.get(projectName) == 0) {
      projectHashMap.delete(projectName);
    }
  };

  const dueDateTitle = document.querySelector("#dueDateTitle");
  dueDateTitle.setAttribute("class", "descending");
  dueDateTitle.addEventListener("click", toggleDateSort);
  function toggleDateSort() {
    let dateFilter;
    let arrow = document.querySelector("#dateArrowToggle");
    if (dueDateTitle.classList.contains("descending")) {
      dueDateTitle.classList.remove("descending");
      dueDateTitle.classList.add("ascending");
      dateFilter = taskArray.sort(function (a, b) {
        if (isBefore(toDate(new Date(a.dueDate)), toDate(new Date(b.dueDate))))
          return 1;
        else return -1;
      });
      arrow.style.transform = "rotate(180deg)";
    } else if (dueDateTitle.classList.contains("ascending")) {
      dueDateTitle.classList.add("descending");
      dueDateTitle.classList.remove("ascending");
      dateFilter = taskArray.sort(function (a, b) {
        if (!isBefore(toDate(new Date(a.dueDate)), toDate(new Date(b.dueDate))))
          return 1;
        else return -1;
      });
      arrow.style.transform = "rotate(0deg)";
    }
    refreshTaskContainer(dateFilter);
  }

  const filteredArray = (targetProject) => {
    if (targetProject == "sidebarHomeTab") {
      for (let i = 0; i < taskArray.length; i++) {
        taskArray[i].filter = "yes";
      }
    } else {
      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].project == targetProject) {
          taskArray[i].filter = "yes";
        } else {
          taskArray[i].filter = "";
        }
      }
    }
  };

  function filterProjectTab(e) {
    let selectedProject = e.target.id;
    filteredArray(selectedProject);
    refreshTaskContainer(taskArray);
    let tabTitle = document.querySelector("#topRowTitle");
    if (selectedProject == "sidebarHomeTab") {
      tabTitle.innerHTML = "Home";
    } else {
      tabTitle.innerHTML = selectedProject;
    }
  }


  let homeTab = document.querySelector("#sidebarHomeTab");
  homeTab.addEventListener("click", filterProjectTab);

  function filterTodayTasks() {
    for (let i = 0; i < taskArray.length; i++) {
      let formattedDate = toDate(new Date(taskArray[i].dueDate));
      if (isToday(formattedDate)) {
        taskArray[i].filter = "yes";
      } else {
        taskArray[i].filter = "";
      }
    }
  }
  
  function filterWeekTasks() {
    for (let i = 0; i < taskArray.length; i++) {
      let formattedDate = toDate(new Date(taskArray[i].dueDate));
      if (isThisWeek(formattedDate)) {
        taskArray[i].filter = "yes";
      } else {
        taskArray[i].filter = "";
      }
    }
  }

  function clickToday(e) {
    filterTodayTasks();
    refreshTaskContainer(taskArray);
    let tabTitle = document.querySelector("#topRowTitle");
    tabTitle.innerHTML = "Today";
  }

  function clickWeek() {
    filterWeekTasks();
    refreshTaskContainer(taskArray);
    let tabTitle = document.querySelector("#topRowTitle");
    tabTitle.innerHTML = "Week";
  }

  let todayTab = document.querySelector("#sidebarCalendarTab");
  todayTab.addEventListener("click", clickToday);
  let weekTab = document.querySelector("#sidebarWeekTab");
  weekTab.addEventListener("click", clickWeek);

  let createProjectItem = (projectName, taskNumberInput) => {
    let mainProjectsTab = document.querySelector("#sidebarUserProjects");

    let userProject = document.createElement("div");
    userProject.setAttribute("id", projectName);
    userProject.setAttribute("class", "userProject");
    userProject.addEventListener("click", filterProjectTab);

    let projectDisplayName = document.createElement("div");
    projectDisplayName.setAttribute("class", "projectName");
    projectDisplayName.innerHTML = projectName;

    let taskNumberContainer = document.createElement("div");
    taskNumberContainer.setAttribute("class", "taskNumberContainer");

    let taskNumber = document.createElement("div");
    taskNumber.setAttribute("class", "taskNumber");
    taskNumber.innerHTML = taskNumberInput;

    taskNumberContainer.appendChild(taskNumber);

    userProject.appendChild(taskNumberContainer);
    userProject.appendChild(projectDisplayName);

    mainProjectsTab.appendChild(userProject);
  };

  let genereateProjectTabsFromHashMap = () => {
    const mapKeyIterator = projectHashMap.keys();
    const mapValueIterator = projectHashMap.values();
    const mapIterator = projectHashMap[Symbol.iterator]();
    for (const item of mapIterator) {
      createProjectItem(
        mapKeyIterator.next().value,
        mapValueIterator.next().value
      );
    }
  };

  const clearProjectsPanel = () => {
    let container = document.querySelector("#sidebarUserProjects");
    clearAllChildNodes(container);
  };

  const refreshProjectsPanel = () => {
    clearProjectsPanel();
    genereateProjectTabsFromHashMap();
  };

  let generateTask = (taskDescript, dueDate, completionStatus) => {
    const userTask = document.createElement("li");
    userTask.setAttribute("class", "userTask");

    const taskDescription = document.createElement("div");
    taskDescription.setAttribute("class", "taskDescription");
    taskDescription.innerHTML = taskDescript;

    const taskDueDate = document.createElement("div");
    taskDueDate.setAttribute("class", "taskDueDate");
    taskDueDate.innerHTML = dueDate;
    let formattedDate = toDate(new Date(dueDate));
    if (isBefore(formattedDate, endOfToday())) {
      taskDueDate.style.color = "red";
    }

    const emptyBox = document.createElement("img");
    emptyBox.src = "images/checkboxEmpty.svg";
    emptyBox.setAttribute("class", "emptyCheckBox");

    const checkedBox = document.createElement("img");
    checkedBox.src = "images/checkbox.svg";
    checkedBox.setAttribute("class", "checkedBox");

    const editIcon = document.createElement("img");
    editIcon.src = "images/edit.svg";
    editIcon.setAttribute("class", "editIcon");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete.svg";
    deleteIcon.setAttribute("class", "deleteIcon");

    if (completionStatus == "complete") {
      userTask.appendChild(checkedBox);
      userTask.classList.add("checked");
    } else if (completionStatus == "") {
      userTask.appendChild(emptyBox);
    }
    // userTask.appendChild(emptyBox)

    userTask.appendChild(taskDescription);
    userTask.appendChild(taskDueDate);
    userTask.appendChild(editIcon);
    userTask.appendChild(deleteIcon);

    const toggleCheckbox = (e) => {
      if (e.target == emptyBox) {
        userTask.removeChild(emptyBox);
        userTask.insertBefore(checkedBox, taskDescription);
        userTask.classList.add("checked");
        taskArray[userTask.id].completion = "complete";
      } else if (e.target == checkedBox) {
        userTask.removeChild(checkedBox);
        userTask.insertBefore(emptyBox, taskDescription);
        userTask.classList.remove("checked");
        taskArray[userTask.id].completion = "";
      }
    };
    emptyBox.addEventListener("click", toggleCheckbox);
    checkedBox.addEventListener("click", toggleCheckbox);

    const deleteTask = (e) => {
      taskArray[userTask.id].description = "";

      refreshTaskContainer(taskArray);

      removeItemsToHashMap(taskArray[userTask.id].project);
      taskArray[userTask.id].project = "";
      refreshProjectsPanel();
      syncWithFirebase();
    };
    deleteIcon.addEventListener("click", deleteTask);

    const editTask = () => {
      // userTask = createInputForm().addTaskFormContainer
      let container = document.querySelector("#userTaskContainer");
      let form = createInputForm(
        taskArray[userTask.id].description,
        taskArray[userTask.id].details,
        taskArray[userTask.id].dueDate,
        taskArray[userTask.id].project,
        userTask.id
      ).addTaskFormContainer;
      form.setAttribute("class", "editing");
      container.insertBefore(form, userTask);
      container.removeChild(userTask);
      removeItemsToHashMap(taskArray[userTask.id].project);
      $("#dueDate").datepicker({
        format: "m/dd/yyyy",
        todayBtn: "linked",
        keyboardNavigation: false,
        autoclose: true,
        todayHighlight: true,
      });
    };
    editIcon.addEventListener("click", editTask);

    const openTask = () => {
      let taskPopUpContainer = document.createElement('div')
      taskPopUpContainer.setAttribute('class', 'taskPopUpContainer')

      let taskPopUpTopBar = document.createElement('div')
      taskPopUpTopBar.setAttribute('class', 'taskPopUpTopBar')

      let taskPopUpTitle = document.createElement('div')
      taskPopUpTitle.setAttribute('class', 'taskPopUpTitle')
      taskPopUpTitle.innerHTML = taskArray[userTask.id].description

      let taskPopUpDetails = document.createElement('div')
      taskPopUpDetails.setAttribute('class', 'taskPopUpDetails')
      if (taskArray[userTask.id].details != undefined &&taskArray[userTask.id].details != "") {
        taskPopUpDetails.innerHTML = "Details: " + taskArray[userTask.id].details
      }
      else taskPopUpDetails.innerHTML = "Details: none"
      
      let close = document.createElement('img')
      close.src = "images/add.svg"
      close.setAttribute('id', 'closePop')

      let taskPopUpDueDate = document.createElement('div')
      taskPopUpDueDate.setAttribute('class', 'taskPopUpDueDate')
      taskPopUpDueDate.innerHTML = "Due: " + taskArray[userTask.id].dueDate

      let taskPopUpProject = document.createElement('div')
      taskPopUpProject.setAttribute('class', 'taskPopUpProject')
      taskPopUpProject.innerHTML = "Project: " + taskArray[userTask.id].project

      taskPopUpContainer.appendChild(taskPopUpTopBar)
      taskPopUpTopBar.appendChild(taskPopUpTitle)
      taskPopUpContainer.appendChild(close)
      taskPopUpContainer.appendChild(taskPopUpDueDate)
      taskPopUpContainer.appendChild(taskPopUpProject)
      taskPopUpContainer.appendChild(taskPopUpDetails)

      let taskPopUpCenterer = document.createElement('div')
      taskPopUpCenterer.setAttribute('id', 'centerer')
      taskPopUpCenterer.appendChild(taskPopUpContainer)

      let mask = document.createElement('div') 
      mask.setAttribute('id', 'mask')
      
      let body = document.querySelector('body')
      body.appendChild(taskPopUpCenterer)
      body.appendChild(mask)

      function closePopUp () {
        body.removeChild(taskPopUpCenterer)
        body.removeChild(mask)
      }
      close.addEventListener('click', closePopUp)
    }
    taskDescription.addEventListener('click', openTask)

    return {
      userTask,
    };
  };

  let appendTask = (task) => {
    let container = document.querySelector("#userTaskContainer");
    container.appendChild(task);
  };

  const clearAllChildNodes = (parentNode) => {
    while (parentNode.firstElementChild) {
      parentNode.removeChild(parentNode.firstElementChild);
    }
  };

  let generateArray = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].description != "" && array[i].filter == "yes") {
        let task = generateTask(
          array[i].description,
          array[i].dueDate,
          array[i].completion
        ).userTask;
        task.setAttribute("id", `${i}`);
        appendTask(task);
      }
    }
  };

  let refreshTaskContainer = (array) => {
    let container = document.querySelector("#userTaskContainer");
    clearAllChildNodes(container);
    generateArray(array);
    addAddTaskToDocument("userTaskContainer");
  };
 
  //Function to create task form
  let createInputForm = (
    loadDescription,
    loadDetails,
    loadDueDate,
    loadProjectName,
    loadArrayIndex
  ) => {
    let arrayIndex;
    let topRowTitle = document.querySelector("#topRowTitle");
    topRowTitle = topRowTitle.innerHTML;
    if (loadArrayIndex) {
      arrayIndex = loadArrayIndex;
    }
    const addTaskFormContainer = document.createElement("form");
    addTaskFormContainer.setAttribute("id", "addTaskFormContainer");

    const addTaskTopBox = document.createElement("div");
    addTaskTopBox.setAttribute("id", "addTaskTopBox");

    const userDescriptionArea = document.createElement("textarea");
    userDescriptionArea.setAttribute("name", "message");
    userDescriptionArea.setAttribute('id', 'descriptionArea')
    userDescriptionArea.setAttribute("placeholder", "Title: Laundry");
    userDescriptionArea.setAttribute("maxlength", "35");
    userDescriptionArea.setAttribute("required", "true");
    if (loadDescription) userDescriptionArea.value = loadDescription;

    const userDetailsArea = document.createElement("textarea");
    userDetailsArea.setAttribute("name", "details");
    userDetailsArea.setAttribute('id', 'detailsArea')
    userDetailsArea.setAttribute("placeholder", "Details: e.g. fold laundry at 4pm");
    // userDetailsArea.setAttribute("required", "true");
    if (loadDetails) userDetailsArea.value = loadDetails;

    const datePicker = document.createElement("input");
    datePicker.setAttribute("type", "text");
    datePicker.setAttribute("id", "dueDate");
    datePicker.setAttribute("placeholder", "Due Date");
    datePicker.setAttribute("autocomplete", "off");
    datePicker.setAttribute("class", "form-control");
    if (loadDueDate) datePicker.value = loadDueDate;

    const projectName = document.createElement("input");
    projectName.setAttribute("type", "text");
    projectName.setAttribute("id", "inputProject");
    projectName.setAttribute("placeholder", "Project Name");
    projectName.setAttribute("autocomplete", "off");
    projectName.setAttribute("class", "form-control");
    if (loadProjectName) projectName.value = loadProjectName;
    if (topRowTitle != "Home" && topRowTitle != "Today" && topRowTitle != "Week") {
      projectName.value = topRowTitle;
    }

    addTaskTopBox.appendChild(userDescriptionArea);
    addTaskTopBox.appendChild(userDetailsArea)
    addTaskTopBox.appendChild(datePicker);
    addTaskTopBox.appendChild(projectName);

    const addTaskBottomRow = document.createElement("div");
    addTaskBottomRow.setAttribute("id", "addTaskBottomRow");

    const checkmark = document.createElement("img");
    checkmark.src = "images/checkmark.svg";

    const cancel = document.createElement("img");
    cancel.src = "images/cancel.svg";

    addTaskBottomRow.appendChild(checkmark);
    addTaskBottomRow.appendChild(cancel);

    addTaskFormContainer.appendChild(addTaskTopBox);
    addTaskFormContainer.appendChild(addTaskBottomRow);

    const getUserData = () => {
      let getUserDescription = userDescriptionArea.value;
      let getUserDetails = userDetailsArea.value;
      if (getUserDetails == "undefined") {
        getUserDetails = ""
      }
      let getUserDueDate = datePicker.value;
      let getProjectName = projectName.value;
      return {
        getUserDescription,
        getUserDetails,
        getUserDueDate,
        getProjectName,
      };
    };
    let task =  {}
    const pushFormDataToArray = (dataObject) => {
      let task = taskFactoryFunc(
        dataObject.getUserDescription,
        dataObject.getUserDueDate,
        dataObject.getProjectName,
        "",
        "yes",
        dataObject.getUserDetails
      );
      taskArray.push(task);
    };

    const clearFormData = () => {
      userDescriptionArea.value = "";
      userDetailsArea.value = "";
      datePicker.value = "";
      projectName.value = "";
    };

    checkmark.addEventListener("click", clickSubmit);
    function clickSubmit(e) {
      if (addTaskFormContainer.classList.contains("editing")) {
        taskArray[arrayIndex].description = userDescriptionArea.value;
        taskArray[arrayIndex].details = userDetailsArea.value;
        taskArray[arrayIndex].dueDate = datePicker.value;
        taskArray[arrayIndex].project = projectName.value;
        addItemsToHashMap(projectName.value);
        refreshTaskContainer(taskArray);
        refreshProjectsPanel();
        syncWithFirebase();

      } else if (userDescriptionArea.value != "") {
        let userData = getUserData();
        pushFormDataToArray(userData);
        addItemsToHashMap(projectName.value);
        clearFormData();
        refreshTaskContainer(taskArray);
        refreshProjectsPanel();
        syncWithFirebase();    

      } else {
        userDescriptionArea.setAttribute(
          "placeholder",
          "Must include a title"
        );
        userDescriptionArea.setAttribute("class", "noDescription");
      }
    }

    cancel.addEventListener("click", clickCancel);
    function clickCancel() {
      if (addTaskFormContainer.classList.contains("editing")) {
        addItemsToHashMap(projectName.value);
      }
      refreshTaskContainer(taskArray);
      refreshProjectsPanel();
    }
    return {
      addTaskFormContainer,
      getUserData,
    };
  };

  let createAddTask = () => {
    const addTaskButton = document.createElement("li");
    addTaskButton.setAttribute("class", "addTaskButton");

    const addIcon = document.createElement("img");
    addIcon.src = "images/add.svg";

    const description = document.createElement("div");
    description.setAttribute("class", "taskDescription");
    description.innerHTML = "Add Task";

    addTaskButton.appendChild(addIcon);
    addTaskButton.appendChild(description);

    addTaskButton.addEventListener("click", clickAdd);
    function clickAdd() {
      let container = document.querySelector("#userTaskContainer");
      container.removeChild(container.lastElementChild);
      addFormToDocument("userTaskContainer");

      //activate bootstrap datepicker once form is created
      $("#dueDate").datepicker({
        format: "m/dd/yyyy",
        todayBtn: "linked",
        keyboardNavigation: false,
        autoclose: true,
        todayHighlight: true,
      });
    }
    return {
      addTaskButton,
    };
  };

  //Function to add task form onto an element
  let addFormToDocument = (elementToAppendOnto) => {
    let container = document.querySelector(`#${elementToAppendOnto}`);
    let form = createInputForm();
    container.appendChild(form.addTaskFormContainer);
  };

  let addAddTaskToDocument = (elementToAppendOnto) => {
    let container = document.querySelector(`#${elementToAppendOnto}`);
    let form = createAddTask();
    container.appendChild(form.addTaskButton);
  };
  refreshTaskContainer(taskArray)
  
  return { taskFactoryFunc, projectHashMap };
};
