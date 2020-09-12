let toDoList = (() => {

    const taskFactoryFunc = (description, dueDate, project, priority, completion) => {
        // const completion = "",
        return {description, dueDate, project, completion};
    }
    let task = taskFactoryFunc("testestest", "1/1/2020", "projecttest", "high","")

    const taskArray = [];
    
    const pushTaskObjtoArray = (createdTask) => {
        taskArray.push(createdTask)
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
            taskArray.push(dataObject)
        }
        
        const clearFormData = () => {
            userDescriptionArea.value = ""
            datePicker.value = ""
            projectName.value = ""
        }
        
        checkmark.addEventListener('click', clickSubmit)
        function clickSubmit(e) {
            let userData = getUserData()
            pushFormDataToArray(userData);
            clearFormData();
            let container = document.querySelector('#userTaskContainer')
            container.removeChild(container.lastElementChild)
            addAddTaskToDocument('userTaskContainer')
            console.log(taskArray)
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

    addAddTaskToDocument('userTaskContainer')
        
    return {taskFactoryFunc, taskArray}
})();

