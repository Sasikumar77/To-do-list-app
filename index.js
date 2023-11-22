const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");



function createTask() {
    let taskArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    let taskId = Date.now(); 

    //create object with input values
    let taskObject = {
        id : taskId,
        task : taskInput.value,
        priority : priorityInput.value
    }
    //pushing the object in taskArray
    taskArray.push(taskObject);
    //Set the array in local
    localStorage.setItem("tasks",JSON.stringify(taskArray));
}

function listTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    let taskArray = JSON.parse(localStorage.getItem("tasks"));

    if(taskArray){
        // Sorting the array based on the "priority" property
        taskArray.sort((a, b) => a.priority - b.priority);

        console.log(taskArray);
        let tasks = "";
        taskArray.forEach(obj => {
            let priority = "";
            if(obj.priority == 1){
                priority = "high"
            }
            else if(obj.priority == 2){
                priority = "mid"
            }
            else{
                priority = "low"
            }
            tasks += `<div class="task ${priority}"><input type="radio"><p>${obj.task}</p><i class="fa-solid fa-trash"></i></div>`
        });
        taskContainer.innerHTML = tasks;
    }

    //Deleting tasks
    let trashIcon = document.querySelectorAll(".fa-trash");
    let tasks = document.querySelectorAll(".task");

    console.log(trashIcon);
    for (let i = 0; i < trashIcon.length; i++) {
        trashIcon[i].addEventListener("click",()=>{
            tasks[i].remove();

            let taskArr = JSON.parse(localStorage.getItem("tasks"));
            taskArr.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(taskArr));
        })   
    }
}

listTasks();

taskInput.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        if(taskInput.value){
        createTask();
        listTasks();
        }
    }
})