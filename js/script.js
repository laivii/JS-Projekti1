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
        checkbox.className = "notdone";
        checkbox.addEventListener("click", markDone);
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
    if(x == ''){
        alert("Your input was too short");
        return false;
    } 
    return true;
}

function markDone(){
    let task = this.parentElement;
        task.style.color = "lightgrey";
        task.style.textDecoration = "line-through";

    let x = document.getElementsByClassName("notdone")[0];
    x.setAttribute("class", "done");

    tasksDone();
    tasksNotDone();
}

function tasksDone(){
    let place = document.getElementById("done");
    let amount = document.getElementsByClassName("done").length;

    place.innerHTML = amount + " done";
}

function tasksNotDone() {
    let place = document.getElementById("notdone");
    let amount = document.getElementsByClassName("notdone").length;

    place.innerHTML = amount + " not done";
}

function AmountOfTasks(){
    let place = document.getElementById("amount");
    let notdone = document.getElementById("notdone");
    let amount = document.getElementsByClassName("tehtävä").length;

    if(amount == 1){
        place.innerHTML = amount + " task";
    } else {
        place.innerHTML = amount + " tasks";
    }

    notdone.innerHTML = amount + " not done";
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