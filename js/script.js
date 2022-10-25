document.getElementById("submit").addEventListener("click", submitTask);
document.getElementById("clearAll").addEventListener("click", clearAll);

function submitTask(){
    var value = document.getElementById("taskvalue").value;

    //Checking that the input is correct (not too short and not empty)
    if(checkContent(value) != true){
        return;
    }

    let tasks = document.getElementById("tasklist");

    //Creating a new listing (a new "li" element for a task)
    let newtask = listItem(value);
    tasks.appendChild(newtask); //Appending to the excisting "ul" element

    //Emptying the textarea for the next task
    var textarea = document.getElementById("taskvalue");
    textarea.value = "";

    //Pushing new tasks to local Storage
    let list = JSON.parse(localStorage.getItem("tasks"));
    if (list == null) {
        list = []
    }
    list.push(value);
    localStorage.setItem("tasks", JSON.stringify(list));

    amountOfTasks();
}

function listItem(x){
    //let määrä = document.getElementsByTagName("li").length;

    //Creating the "li" element
    let newtask = document.createElement("li");
    newtask.className = "task";
    newtask.id = "task";

    //Creating "input" element, defining type, id and class
    let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox"; 
        checkbox.className = "checkbox";
        checkbox.addEventListener("click", markTasks); //Adding a listener for functionality
    newtask.appendChild(checkbox); //Appending to the "li" element

    //Creating a text node (this wont allow using html tags)
    let textNode = document.createTextNode(x);
    newtask.appendChild(textNode); //Appending to "li" element

    //Creating a button, defining class and innerHTML (text shown to the user in browser)
    let remove = document.createElement("button");
        remove.className = "remove";
        remove.innerHTML = "remove";
        remove.addEventListener("click", removeTask); //Adding a listener for functionality
    newtask.appendChild(remove); //Appending to the "li" element

    return newtask; //Returning the finished "li" element
}

function checkContent(x){
    let box = document.getElementById("taskvalue");

    //Chenking that input is not blank
    if(x == ''){
        box.style.border = "2px dotted red"; //Textareas border change if error occurs

        alert("Your input cannot be blank!");
        return false;
    }

    //Checking that input is not too short
    if(x.length <= 3){
        box.style.border = "2px dotted red";

        alert("Your input was too short!");
        return false;
    }

    //This one return the border to it's original form after error when valid input is submitted
    //Operates every round when input is valid, but is form the reason stated over this.
    box.style.border = "1px solid grey";
    box.style.borderRadius = "2px"
    return true;
}

function markTasks(){
    let state = this.checked; //This one checks the state of the task (done=true or undone=false)
    let task = this.parentElement;

    itemsLeft();

    //If task is being marked undone, this makes the listing take its original form.
    if( state == false){
            task.style.color = "black";
            task.style.textDecoration = "none";
        return;
    }

    //These apply when the task is being marked as done
    task.style.color = "lightgrey";
    task.style.textDecoration = "line-through";
}

function removeTask(){
    //Removing task ("li" elements) from the "ul" element
    let removed = this.parentElement;
    removed.remove();

    amountOfTasks();
}

function clearAll(){
    //The amount of "li" elements
    let amount = document.getElementsByClassName("task").length;

    //This one goes through every "li" element and removes them
    for(var i = 0; i < amount; i++){
        let removed = document.getElementById("task");
        removed.remove();
    }

    localStorage.removeItem("tasks"); //removes all the tasks from local storage

    amountOfTasks();
}

function amountOfTasks(){
    //Calculating the amount of tasks ("li" elements)
    let tasks = document.getElementsByClassName("task").length;
    let place = document.getElementById("amount");

    place.innerHTML = tasks + " Items left";
}

function itemsLeft(){
    var tasks = document.getElementsByClassName("checkbox").length;
    var done = 0; //Always starting from zero so the count is accurate even when marking tasks undone.

    //Checking the array of "li" elements for their state (done/notdone).
    for(let i = 0; i < tasks; i++){
        var state = document.getElementsByClassName("checkbox")[i].checked;

        //Increasing the "done" value with one every time a task is marked done
        if(state == true){
            done++;
        }
    }

    //Updating the Items left calculator to show accordingly
    let place = document.getElementById("amount");
    place.innerHTML = (tasks-done) + " Items left";
}