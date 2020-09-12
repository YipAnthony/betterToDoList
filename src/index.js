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

    //delete task from array

    const userTaskContainer = document.querySelector('#userTaskContainer')

    //create task form
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

        return addTaskFormContainer
    }
    
    


    // console.log(createInputForm())

    return {taskFactoryFunc, taskArray, createInputForm}
})();

let userTaskContainer = document.querySelector('#userTaskContainer')
console.log(userTaskContainer)

let testInputForm = toDoList.createInputForm();
console.log(testInputForm)

userTaskContainer.appendChild(testInputForm)
