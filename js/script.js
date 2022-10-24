document.getElementById("submit").addEventListener("click", submitTask);

function submitTask(){
    var value = document.getElementById("task").value;

    if(checkContent(value) != true){
        return;
    }

    let tasks = document.getElementById("tasklist");

    let newtask = listItem(value);
    tasks.appendChild(newtask);

    var textarea = document.getElementById("task");
    textarea.value = "";

    AmountOfTasks();
}

function listItem(x){
    let määrä = document.getElementsByTagName("li").length;

    let newtask = document.createElement("li");
    newtask.className = "tehtävä";

    let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox";
        checkbox.className = "notdone";
        checkbox.addEventListener("click", mark);
    newtask.appendChild(checkbox);

    let textNode = document.createTextNode(x);
    newtask.appendChild(textNode);

    let remove = document.createElement("button");
        remove.class = "remove";
        remove.innerHTML = "poista";
        remove.addEventListener("click", removeTask);
    newtask.appendChild(remove);

    return newtask;
}

function checkContent(x){
    let box = document.getElementById("task");

    if(x == ''){
        box.style.border = "2px dotted red";

        alert("Your input cannot be blank!");
        return false;
    }

    if(x.length <= 3){
        box.style.border = "2px dotted red";

        alert("Your input was too short!");
        return false;
    }

    box.style.border = "1px solid grey";
    box.style.borderRadius = "2px"
    return true;
}

function mark(){
    let state = this.checked;
    let task = this.parentElement;

    if( state == false){
            task.style.color = "black";
            task.style.textDecoration = "none";
        return;
    }

    task.style.color = "lightgrey";
    task.style.textDecoration = "line-through";
}

function removeTask(){
    let removed = this.parentElement;
    removed.remove();

    AmountOfTasks();
    tasksDone();
    tasksNotDone();
}

function clearAll(){

}