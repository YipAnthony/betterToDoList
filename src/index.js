let toDoList = (() => {

    const taskFactoryFunc = (description, dueDate, project, priority, completion) => {
        // const completion = "",
        return {description, dueDate, project, priority,completion};
    }
    let task = taskFactoryFunc("testestest", "1/1/2020", "projecttest", "high","")

    const taskArray = [];
    
    const pushTaskObjtoArray = (createdTask) => {
        taskArray.push(createdTask)
    }

    //delete task from array



    console.log(taskArray)

    return {taskFactoryFunc, taskArray}
})();
