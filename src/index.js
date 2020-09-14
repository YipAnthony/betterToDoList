import {isToday, toDate, isThisWeek, isBefore, endOfToday, add, format} from 'date-fns'

let toDoList = (() => {

    let toggleMenu = document.querySelector('#sidebarToggleMenu')
    toggleMenu.addEventListener('click', toggleSideBar)
    function toggleSideBar() {
        let sidebar = document.querySelector('#sidebar')
        if (toggleMenu.classList.contains('unclicked')) {
            toggleMenu.classList.remove('unclicked')
            toggleMenu.classList.add('clicked')
            sidebar.style.left = "0"

            window.addEventListener('click', closeMenu)
            console.log('test')
            function closeMenu(e) {
                if (!e.target.id.includes('sidebar')){
                    toggleMenu.classList.add('unclicked')
                    toggleMenu.classList.remove('clicked')
                    sidebar.style.left = "-300px"
                }
            }
        }
        else {
            toggleMenu.classList.add('unclicked')
            toggleMenu.classList.remove('clicked')
            sidebar.style.left = "-300px"
        }
    }

    const taskFactoryFunc = (description, dueDate, project, completion, filter) => {
        return {description, dueDate, project, completion, filter};
    }
 
    const taskArray = [];
    const projectHashMap = new Map();

    const addItemsToHashMap = (projectName) => {
        if (projectName == "") return
        else if (projectHashMap.has(projectName)){
            let value = projectHashMap.get(projectName);
            value += 1;
            projectHashMap.set(projectName, value)
        }
        else {
            projectHashMap.set(projectName, 1)
        }
    }

    const removeItemsToHashMap = (projectName) => {
        if (projectHashMap.has(projectName)){
            let value = projectHashMap.get(projectName);
            value -= 1;
            projectHashMap.set(projectName, value)
        }
        if (projectHashMap.get(projectName) == 0) {
            projectHashMap.delete(projectName)
        }
    }

    const dueDateTitle = document.querySelector('#dueDateTitle')
    dueDateTitle.setAttribute('class', 'descending')
    dueDateTitle.addEventListener('click', toggleDateSort)
    function toggleDateSort() {
        let dateFilter;
        let arrow = document.querySelector('#dateArrowToggle')
        if (dueDateTitle.classList.contains('descending')) {
            dueDateTitle.classList.remove('descending')
            dueDateTitle.classList.add('ascending')
            dateFilter = taskArray.sort(
                function(a,b) {
                    if (isBefore(toDate(new Date(a.dueDate)),toDate(new Date(b.dueDate)))) return 1;
                    else return -1;
                }
            )
            arrow.style.transform = "rotate(180deg)"
        } else if (dueDateTitle.classList.contains('ascending')) {
            dueDateTitle.classList.add('descending')
            dueDateTitle.classList.remove('ascending')
            dateFilter = taskArray.sort(
                function(a,b) {
                    if (!isBefore(toDate(new Date(a.dueDate)),toDate(new Date(b.dueDate)))) return 1;
                    else return -1;
                }
            )
            arrow.style.transform = "rotate(0deg)"
        }
        refreshTaskContainer(dateFilter)
    }
    
    

    const filteredArray = (targetProject) => {
        if (targetProject == "sidebarHomeTab") {
            for (let i = 0; i < taskArray.length; i++) {
                taskArray[i].filter = "yes"
            } 
        }
        else {
            for (let i = 0; i < taskArray.length; i++) {
                if (taskArray[i].project == targetProject){
                    taskArray[i].filter = "yes"
                }
                else {
                    taskArray[i].filter = ""
                }
            }
        }
    } 

    function filterProjectTab(e) {
        let selectedProject = e.target.id
        filteredArray(selectedProject)
        refreshTaskContainer(taskArray)
        let tabTitle = document.querySelector('#topRowTitle')
        if (selectedProject == "sidebarHomeTab") {
            tabTitle.innerHTML = "Home"
        } else {
            tabTitle.innerHTML = selectedProject
        }
    }

    let homeTab = document.querySelector('#sidebarHomeTab')
    homeTab.addEventListener('click', filterProjectTab)

    function filterTodayTasks() {
        for (let i = 0; i < taskArray.length; i++) {
            let formattedDate = toDate(new Date(taskArray[i].dueDate))
            if (isToday(formattedDate)) {
                taskArray[i].filter = "yes"
            }
            else {
                taskArray[i].filter = ""
            }
        }   
    }

    function filterWeekTasks() {
        for (let i = 0; i < taskArray.length; i++) {
            let formattedDate = toDate(new Date(taskArray[i].dueDate))
            if (isThisWeek(formattedDate)) {
                taskArray[i].filter = "yes"
            }
            else {
                taskArray[i].filter = ""
            }
        }   
    }

    function clickToday(e) {
        filterTodayTasks();
        refreshTaskContainer(taskArray)
        let tabTitle = document.querySelector('#topRowTitle')
        tabTitle.innerHTML = "Today"
    }

    function clickWeek() {
        filterWeekTasks();
        refreshTaskContainer(taskArray)
        let tabTitle = document.querySelector('#topRowTitle')
        tabTitle.innerHTML = "Today"
    }

    let todayTab = document.querySelector('#sidebarCalendarTab')
    todayTab.addEventListener('click', clickToday)
    let weekTab = document.querySelector('#sidebarWeekTab')
    weekTab.addEventListener('click', clickWeek)

    let createProjectItem = (projectName, taskNumberInput) => {
        let mainProjectsTab = document.querySelector('#sidebarUserProjects')

        let userProject = document.createElement('div')
        userProject.setAttribute('id', projectName)
        userProject.setAttribute('class', 'userProject')
        userProject.addEventListener('click', filterProjectTab)

        let projectDisplayName = document.createElement('div')
        projectDisplayName.setAttribute('class', "projectName")
        projectDisplayName.innerHTML = projectName

       

        let taskNumberContainer = document.createElement('div')
        taskNumberContainer.setAttribute('class', 'taskNumberContainer')

        let taskNumber = document.createElement('div')
        taskNumber.setAttribute('class', 'taskNumber')
        taskNumber.innerHTML = taskNumberInput

        taskNumberContainer.appendChild(taskNumber)

        userProject.appendChild(taskNumberContainer)
        userProject.appendChild(projectDisplayName)

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

    let generateTask = (taskDetails, dueDate, completionStatus) => {
        const userTask = document.createElement('li')
        userTask.setAttribute('class', "userTask")

        const taskDescription = document.createElement('div')
        taskDescription.setAttribute('class', 'taskDescription')
        taskDescription.innerHTML = taskDetails

        const taskDueDate = document.createElement('div')
        taskDueDate.setAttribute('class', 'taskDueDate')
        taskDueDate.innerHTML = dueDate
        let formattedDate = toDate(new Date(dueDate))
        if (isBefore(formattedDate, endOfToday())) {
            taskDueDate.style.color = "red"
        }

        const emptyBox = document.createElement('img')
        emptyBox.src = "images/checkboxEmpty.svg"
        emptyBox.setAttribute('class', 'emptyCheckBox')

        const checkedBox = document.createElement('img')
        checkedBox.src = "images/checkbox.svg"
        checkedBox.setAttribute('class', 'checkedBox')

        const editIcon = document.createElement('img')
        editIcon.src = "images/edit.svg"
        editIcon.setAttribute('class', 'editIcon')

        const deleteIcon = document.createElement('img')
        deleteIcon.src = "images/delete.svg"
        deleteIcon.setAttribute('class', 'deleteIcon')

        if (completionStatus == "complete") {
            userTask.appendChild(checkedBox)
            userTask.classList.add('checked')
        } else if (completionStatus == "") {
            userTask.appendChild(emptyBox)
        }
        // userTask.appendChild(emptyBox)


        userTask.appendChild(taskDescription)
        userTask.appendChild(taskDueDate)
        userTask.appendChild(editIcon)
        userTask.appendChild(deleteIcon)

        const toggleCheckbox = (e) => {
            if (e.target == emptyBox) {
                userTask.removeChild(emptyBox)
                userTask.insertBefore(checkedBox, taskDescription)
                userTask.classList.add('checked')
                taskArray[userTask.id].completion = "complete"
            }
            else if (e.target == checkedBox) {
                userTask.removeChild(checkedBox)
                userTask.insertBefore(emptyBox, taskDescription)
                userTask.classList.remove('checked')
                taskArray[userTask.id].completion = ""
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

        const editTask = () => {
            // userTask = createInputForm().addTaskFormContainer
            let container = document.querySelector('#userTaskContainer')
            let form = createInputForm(
                taskArray[userTask.id].description, 
                taskArray[userTask.id].dueDate, 
                taskArray[userTask.id].project,
                userTask.id
            ).addTaskFormContainer;
            form.setAttribute('class', "editing")
            container.insertBefore(form, userTask)
            container.removeChild(userTask)
            removeItemsToHashMap(taskArray[userTask.id].project)
            $('#dueDate').datepicker({
                format: "m/dd/yyyy",
                todayBtn: "linked",
                keyboardNavigation: false,
                todayHighlight: true
            });

        }
        editIcon.addEventListener('click', editTask)

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
                let task = generateTask(array[i].description, array[i].dueDate, array[i].completion).userTask
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
    let createInputForm = (loadDescription, loadDueDate, loadProjectName, loadArrayIndex) => {
        let arrayIndex
        let topRowTitle = document.querySelector('#topRowTitle')
        topRowTitle = topRowTitle.innerHTML
        if (loadArrayIndex) {
            arrayIndex = loadArrayIndex
        } 
        const addTaskFormContainer = document.createElement('form')
        addTaskFormContainer.setAttribute('id', 'addTaskFormContainer')
    
        const addTaskTopBox = document.createElement('div')
        addTaskTopBox.setAttribute('id', 'addTaskTopBox')
    
        const userDescriptionArea = document.createElement('textarea')
        userDescriptionArea.setAttribute('name', "message")
        userDescriptionArea.setAttribute('placeholder', "e.g. fold laundry at 4pm")
        userDescriptionArea.setAttribute('required', 'true')
        if (loadDescription) userDescriptionArea.value = loadDescription
    
        const datePicker = document.createElement('input')
        datePicker.setAttribute('type', 'text')
        datePicker.setAttribute('id', 'dueDate')
        datePicker.setAttribute('placeholder', 'Due Date')
        datePicker.setAttribute('autocomplete', 'off')
        datePicker.setAttribute('class', 'form-control')
        if (loadDueDate) datePicker.value = loadDueDate
    
        const projectName = document.createElement('input')
        projectName.setAttribute('type', 'text')
        projectName.setAttribute('id', 'inputProject')
        projectName.setAttribute('placeholder', 'Project Name')
        projectName.setAttribute('autocomplete', 'off')
        projectName.setAttribute('class', 'form-control')
        if (loadProjectName) projectName.value = loadProjectName
        if (topRowTitle != "Home") {
            console.log(topRowTitle)
            projectName.value = topRowTitle
        }
    
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
            let getUserDescription = userDescriptionArea.value
            let getUserDueDate = datePicker.value
            let getProjectName = projectName.value
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
            if (addTaskFormContainer.classList.contains('editing')){
                taskArray[arrayIndex].description = userDescriptionArea.value;
                console.log (userDescriptionArea.value)
                taskArray[arrayIndex].dueDate = datePicker.value;
                taskArray[arrayIndex].project = projectName.value;
                addItemsToHashMap(projectName.value)
                refreshTaskContainer(taskArray);
                refreshProjectsPanel();
            }
            else if (userDescriptionArea.value != ""){
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
            if (addTaskFormContainer.classList.contains('editing')){
                addItemsToHashMap(projectName.value)
            }
            refreshTaskContainer(taskArray);
            refreshProjectsPanel();
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
                format: "m/dd/yyyy",
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
        function todayPlus(daysToAdd) {
            return format(add(endOfToday(), {days: daysToAdd}), 'M/dd/yyyy')
        } 
        taskArray.push(taskFactoryFunc("Meal Prep", todayPlus(1) , "Chores","", "yes"))
        addItemsToHashMap("Chores")
        taskArray.push(taskFactoryFunc("Laundry", todayPlus(0), 'Chores', "complete", "yes"))
        addItemsToHashMap("Chores")
        taskArray.push(taskFactoryFunc("Wash dishes", todayPlus(2), 'Chores', "", "yes"))
        addItemsToHashMap("Chores")
        taskArray.push(taskFactoryFunc("Take out the trash", todayPlus(2), 'Chores', "", "yes"))
        addItemsToHashMap("Chores")
        taskArray.push(taskFactoryFunc("Push Day", todayPlus(0), 'Workout', "complete", "yes"))
        addItemsToHashMap("Workout")
        taskArray.push(taskFactoryFunc("Pull Day", todayPlus(1), 'Workout', "", "yes"))
        addItemsToHashMap("Workout")
        taskArray.push(taskFactoryFunc("Leg Day", todayPlus(2), 'Workout', "", "yes"))
        addItemsToHashMap("Workout")
        taskArray.push(taskFactoryFunc("Cardio", todayPlus(3), 'Workout', "", "yes"))
        addItemsToHashMap("Workout")
        taskArray.push(taskFactoryFunc("Create function: edit tasks", todayPlus(0), 'Current project', "complete", "yes"))
        addItemsToHashMap("Current project")
        taskArray.push(taskFactoryFunc("Add media queries", todayPlus(0), 'Current project', "complete", "yes"))
        addItemsToHashMap("Current project")
        taskArray.push(taskFactoryFunc("Create function: sort by due date", todayPlus(0), 'Current project', "complete", "yes"))
        addItemsToHashMap("Current project")
        taskArray.push(taskFactoryFunc("Sidebar: filter by project name", todayPlus(0), 'Current project', "complete", "yes"))
        addItemsToHashMap("Current project")
        taskArray.push(taskFactoryFunc("Review factory functions", todayPlus(1), 'Coding', "complete", "yes"))
        addItemsToHashMap("Coding")
        taskArray.push(taskFactoryFunc("Review modular patterns", todayPlus(0), 'Coding', "complete", "yes"))
        addItemsToHashMap("Coding")
        taskArray.push(taskFactoryFunc("factory functions vs constructors", todayPlus(1), 'Coding', "", "yes"))
        addItemsToHashMap("Coding")
        taskArray.push(taskFactoryFunc("Daily codewars", todayPlus(0), 'Coding', "complete", "yes"))
        addItemsToHashMap("Coding")
        taskArray.push(taskFactoryFunc("Review git rebasing", todayPlus(1), 'Coding', "", "yes"))
        addItemsToHashMap("Coding")
        taskArray.push(taskFactoryFunc("How to write a README", todayPlus(1), 'Coding', "", "yes"))
        addItemsToHashMap("Coding")
        taskArray.push(taskFactoryFunc("Daily Hangboard", todayPlus(0), 'Climbing', "", "yes"))
        addItemsToHashMap("Climbing")

    
       

        refreshTaskContainer(taskArray);
        genereateProjectTabsFromHashMap();
    }
    window.onload = demo();

    return {taskFactoryFunc, projectHashMap}
})();