let toDoList = (() => {

    const taskFactoryFunc = (description, dueDate, project, completion, filter) => {
        return {description, dueDate, project, completion, filter};
    }
 
    const taskArray = [];
    const projectHashMap = new Map();

    const addItemsToHashMap = (projectName) => {
        if (projectName == "") return
        else if (projectHashMap.has(projectName)){
            value = projectHashMap.get(projectName);
            value += 1;
            projectHashMap.set(projectName, value)
        }
        else {
            projectHashMap.set(projectName, 1)
        }
    }

    const removeItemsToHashMap = (projectName) => {
        if (projectHashMap.has(projectName)){
            value = projectHashMap.get(projectName);
            value -= 1;
            projectHashMap.set(projectName, value)
        }
        if (projectHashMap.get(projectName) == 0) {
            projectHashMap.delete(projectName)
        }
    }

    const filteredArray = (targetProject) => {
        for (let i = 0; i < taskArray.length; i++) {
            if (taskArray[i].project == targetProject){
                taskArray[i].filter = "yes"
            }
            else {
                taskArray[i].filter = ""
            }
        }
    } 

    function filterProjectTab(e) {
        let selectedProject = e.target.id
        filteredArray(selectedProject)
        refreshTaskContainer(taskArray)
    }
    let createProjectItem = (projectName, taskNumberInput) => {
        let mainProjectsTab = document.querySelector('#sidebarUserProjects')

        let userProject = document.createElement('div')
        userProject.setAttribute('id', projectName)
        userProject.setAttribute('class', 'userProject')
        userProject.addEventListener('click', filterProjectTab)

        let projectDisplayName = document.createElement('div')
        projectDisplayName.setAttribute('class', "projectName")
        projectDisplayName.innerHTML = projectName

        userProject.appendChild(projectDisplayName)

        let taskNumberContainer = document.createElement('div')
        taskNumberContainer.setAttribute('class', 'taskNumberContainer')

        let taskNumber = document.createElement('div')
        taskNumber.setAttribute('class', 'taskNumber')
        taskNumber.innerHTML = taskNumberInput

        taskNumberContainer.appendChild(taskNumber)

        userProject.appendChild(taskNumberContainer)

        mainProjectsTab.appendChild(userProject)
        
    }

    let genereateProjectTabsFromHashMap = () => {
        const mapKeyIterator = projectHashMap.keys()
        const mapValueIterator = projectHashMap.values()
        const mapIterator = projectHashMap[Symbol.iterator]()
        for (const item of mapIterator){
            createProjectItem(mapKeyIterator.next().value, mapValueIterator.next().value)
        }
    }

    const clearProjectsPanel = () => {
        let container = document.querySelector('#sidebarUserProjects')
        clearAllChildNodes(container)
    }

    const refreshProjectsPanel = () => {
        clearProjectsPanel();
        genereateProjectTabsFromHashMap();
    }

    let generateTask = (taskDetails, dueDate) => {
        const userTask = document.createElement('li')
        userTask.setAttribute('class', "userTask")

        const taskDescription = document.createElement('div')
        taskDescription.setAttribute('class', 'taskDescription')
        taskDescription.innerHTML = taskDetails

        const taskDueDate = document.createElement('div')
        taskDueDate.setAttribute('class', 'taskDueDate')
        taskDueDate.innerHTML = dueDate

        const emptyBox = document.createElement('img')
        emptyBox.src = "images/checkboxEmpty.svg"
        emptyBox.setAttribute('class', 'emptyCheckBox')

        const checkedBox = document.createElement('img')
        checkedBox.src = "images/checkbox.svg"
        checkedBox.setAttribute('class', 'checkedBox')

        const deleteIcon = document.createElement('img')
        deleteIcon.src = "images/delete.svg"
        deleteIcon.setAttribute('class', 'deleteIcon')

        
        userTask.appendChild(emptyBox)
        userTask.appendChild(taskDescription)
        userTask.appendChild(taskDueDate)
        userTask.appendChild(deleteIcon)

        const toggleCheckbox = (e) => {
            if (e.target == emptyBox) {
                userTask.removeChild(emptyBox)
                userTask.insertBefore(checkedBox, taskDescription)
                userTask.classList.add('checked')
            }
            else if (e.target == checkedBox) {
                userTask.removeChild(checkedBox)
                userTask.insertBefore(emptyBox, taskDescription)
                userTask.classList.remove('checked')
            }
        }
        emptyBox.addEventListener('click', toggleCheckbox)
        checkedBox.addEventListener('click', toggleCheckbox)

        const deleteTask = (e) => {
            taskArray[userTask.id].description = "";
            
            refreshTaskContainer(taskArray);
            console.log(taskArray[userTask.id].project)

            removeItemsToHashMap(taskArray[userTask.id].project)
            taskArray[userTask.id].project = ""
            refreshProjectsPanel();
        }
        deleteIcon.addEventListener('click', deleteTask)
            
        return {
            userTask,
            
        }
    }

    let appendTask = (task) => {
        let container = document.querySelector('#userTaskContainer')
        container.appendChild(task)
    }

    const clearAllChildNodes = (parentNode) => {
        while (parentNode.firstElementChild) {
            parentNode.removeChild(parentNode.firstElementChild);
        }
    }

    let generateArray = (array) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].description != "" && array[i].filter == "yes"){
                let task = generateTask(array[i].description, array[i].dueDate).userTask
                task.setAttribute('id', `${i}`)
                appendTask(task);
            }
        }
    }

    let refreshTaskContainer = (array) => {
        let container = document.querySelector('#userTaskContainer')
        clearAllChildNodes(container);
        generateArray(array);
        addAddTaskToDocument('userTaskContainer');
    }
    //Function to create task form
    let createInputForm = () => {
        const addTaskFormContainer = document.createElement('form')
        addTaskFormContainer.setAttribute('id', 'addTaskFormContainer')
    
        const addTaskTopBox = document.createElement('div')
        addTaskTopBox.setAttribute('id', 'addTaskTopBox')
    
        const userDescriptionArea = document.createElement('textarea')
        userDescriptionArea.setAttribute('name', "message")
        userDescriptionArea.setAttribute('placeholder', "e.g. fold laundry at 4pm")
        userDescriptionArea.setAttribute('required', 'true')
    
        const datePicker = document.createElement('input')
        datePicker.setAttribute('type', 'text')
        datePicker.setAttribute('id', 'dueDate')
        datePicker.setAttribute('placeholder', 'Due Date')
        datePicker.setAttribute('autocomplete', 'off')
        datePicker.setAttribute('class', 'form-control')
    
        const projectName = document.createElement('input')
        projectName.setAttribute('type', 'text')
        projectName.setAttribute('id', 'inputProject')
        projectName.setAttribute('placeholder', 'Project Name')
        projectName.setAttribute('autocomplete', 'off')
        projectName.setAttribute('class', 'form-control')
    
        addTaskTopBox.appendChild(userDescriptionArea)
        addTaskTopBox.appendChild(datePicker)
        addTaskTopBox.appendChild(projectName)
    
        const addTaskBottomRow = document.createElement('div')
        addTaskBottomRow.setAttribute('id', 'addTaskBottomRow')
    
        const checkmark = document.createElement('img')
        checkmark.src = "images/checkmark.svg"
    
        const cancel = document.createElement('img')
        cancel.src = 'images/cancel.svg'
    
        addTaskBottomRow.appendChild(checkmark)
        addTaskBottomRow.appendChild(cancel)
    
        addTaskFormContainer.appendChild(addTaskTopBox)
        addTaskFormContainer.appendChild(addTaskBottomRow)

        const getUserData = () => {
            getUserDescription = userDescriptionArea.value
            getUserDueDate = datePicker.value
            getProjectName = projectName.value
            return{
                getUserDescription,
                getUserDueDate,
                getProjectName
            }
        }
        const pushFormDataToArray = (dataObject) => {
            
            let task = taskFactoryFunc(
                dataObject.getUserDescription, 
                dataObject.getUserDueDate,
                dataObject.getProjectName,
                "",
                "yes"
            )
            taskArray.push(task)
        }
        
        const clearFormData = () => {
            userDescriptionArea.value = ""
            datePicker.value = ""
            projectName.value = ""
        }
        
        checkmark.addEventListener('click', clickSubmit)
        function clickSubmit(e) {
            if (userDescriptionArea.value != ""){
                let userData = getUserData()
                pushFormDataToArray(userData);
                addItemsToHashMap(projectName.value)
                clearFormData();
                refreshTaskContainer(taskArray);
                refreshProjectsPanel();
            }
            else {
                userDescriptionArea.setAttribute('placeholder', "Must include a description")
                userDescriptionArea.setAttribute('class', 'noDescription')
            }
        }

        cancel.addEventListener('click', clickCancel)
        function clickCancel() {
            let container = document.querySelector('#userTaskContainer')
            container.removeChild(container.lastElementChild)
            addAddTaskToDocument('userTaskContainer')
        }
        return {
            addTaskFormContainer,
            getUserData,
        }
    }

    let createAddTask = () => {
        const addTaskButton = document.createElement('li')
        addTaskButton.setAttribute('class', "addTaskButton")

        const addIcon = document.createElement('img')
        addIcon.src = "images/add.svg"

        const description = document.createElement('div')
        description.setAttribute('class', 'taskDescription')
        description.innerHTML = "Add Task"

        addTaskButton.appendChild(addIcon)
        addTaskButton.appendChild(description)

        addTaskButton.addEventListener('click', clickAdd)
        function clickAdd() {
            let container = document.querySelector('#userTaskContainer')
            container.removeChild(container.lastElementChild)
            addFormToDocument("userTaskContainer");
            
            //activate bootstrap datepicker once form is created
            $('#dueDate').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                todayHighlight: true
            });
        }

        return {
            addTaskButton,
        }
    }

    //Function to add task form onto an element
    let addFormToDocument = (elementToAppendOnto) => {
        let container = document.querySelector(`#${elementToAppendOnto}`)
        let form = createInputForm();
        container.appendChild(form.addTaskFormContainer)
    }

    let addAddTaskToDocument = (elementToAppendOnto) => {
        let container = document.querySelector(`#${elementToAppendOnto}`)
        let form = createAddTask();
        container.appendChild(form.addTaskButton)
    }



    // only for demo load-up
    // Demo Array input
    
    const demo = () => {
        let task = taskFactoryFunc("Meal Prep", "9/14/2020", "Chores","", "yes")
        addItemsToHashMap("Chores")
        let task2 = taskFactoryFunc("Wash dishes", '9/15/2020', 'Chores', "", "yes")
        addItemsToHashMap("Chores")
        let task3 = taskFactoryFunc("Exercise", '9/13/2020', 'Fitness', "", "yes")
        addItemsToHashMap("Fitness")

        taskArray.push(task);
        taskArray.push(task2);
        taskArray.push(task3)
        refreshTaskContainer(taskArray);
        genereateProjectTabsFromHashMap();
    }
    
    window.onload = demo();

    

    return {taskFactoryFunc, projectHashMap}
})();