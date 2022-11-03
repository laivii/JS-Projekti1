//Eventlistener for Submit button
document.getElementById("submit").addEventListener("click", submitTask);

//Listener for Enter-keypress --> submitting by pressing enter
document.getElementById("taskvalue").addEventListener("keypress", submitWithEnter);

//Listener for Clear all -button
document.getElementById("clearAll").addEventListener("click", clearAll);

document.getElementById("hideDone").addEventListener("click", hideDoneTasks);

document.getElementById("showAll").addEventListener("click", showAll);

printFromStorage(); //Printing is here so when we have stored data we can continue rigth were we left

function printFromStorage(){
    let list = JSON.parse(localStorage.getItem("tasks")); //list = the list of task put to the storage or 'null' if there is none
    
    //Checking this so we don't get unnecessary errors
    if(list == null){
     return;
    }

    let määrä = list.length; //Gives the length/amount of the tasks stored in local storage

    //Prints the tasks from local storage and set's their state
    for(let i =  0; i < määrä; i++){
        createlistItem(list[i].task, list[i].state);
    }

    itemsLeft(); //Updating Items Left calculator
}

function submitWithEnter(enter){
    //If the key is not "Enter" then the code will not process
    if(enter.key != "Enter"){
        return;
    }

    enter.preventDefault();
    document.getElementById("submit").click(); //Simulates a mouse click on "Submit"-button
}

function submitTask(){
    var value = document.getElementById("taskvalue").value; //Get's textare value
    var state = false;

    if(checkContent(value) == true){
        //Creating a new listing (a new "li" element for a task)
        createlistItem(value,state);

        //Saving to to local storage
        savingToStorage(value);
    }

    //Emptying the textarea for the next task
    var textarea = document.getElementById("taskvalue");
    textarea.value = "";
}

function savingToStorage(value){
    //Pushing new tasks to local Storage
    let list = JSON.parse(localStorage.getItem("tasks"));

    //Checks that list is not null and if it is sets value to an empty list
    if (list == null) {
        list = [];
    }

    taskObj = {
        "task": value,
        "state": false /*We need to format this here so we can change it later in "markDone" function. 
                        However every new task state is anyway false.*/
    }

    list.push(taskObj); //Pushing this to the list and seting it to local storage.
    localStorage.setItem("tasks", JSON.stringify(list));
}

function createlistItem(value, state){
    let tasks = document.getElementById("tasklist");

    //Creating the "li" element
    var which = document.getElementsByClassName("task").length;
    let newtask = document.createElement("li");
    newtask.className = "task";
    newtask.id = `${which}`;

    //Creating "input" element, defining type, id and class
    let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox"; 
        checkbox.className = "checkbox";
        checkbox.checked = state;
        checkbox.addEventListener("click", markTasks); //Adding a listener for functionality
    newtask.appendChild(checkbox); //Appending to the "li" element

    //This one is for that the style is correct while printing from local storage
    if(state == true){
        newtask.style.color = "lightgrey";
        newtask.style.textDecoration = "line-through";
    }

    //Creating a text node (this wont allow using html tags)
    let textNode = document.createTextNode(value);
    newtask.appendChild(textNode); //Appending to "li" element


    //Creating a button, defining class
    let remove = document.createElement("input");
        remove.type = "image";
        remove.className = "remove";
        remove.src = "images/remove.png";
        remove.style.height = "10%";
        remove.style.width = "10%";
        remove.addEventListener("click", removeTask); //Adding a listener for functionality
    newtask.appendChild(remove); //Appending to the "li" element

    //Appending to the excisting "ul" element
    tasks.appendChild(newtask);

    amountOfTasks();
}

function checkContent(value){
    let box = document.getElementById("taskvalue");

    //Chenking that input is not blank
    if(value == ''){
        box.style.border = "2px solid #FF7D78"; //Textareas border change if error occurs

        alert("Your input cannot be blank!");
        return false;
    }

    //Checking that input is not too short
    if(value.length <= 3){
        box.style.border = "2px solid #FF7D78";

        alert("Your input was too short!");
        return false;
    }

    //This one return the border to it's original form after error when valid input is submitted
    //Operates every round when input is valid, but is form the reason stated over this.
    box.style.border = "none";
    box.style.borderRadius = "1rem";
    return true;
}

function markTasks(){
    let state = this.checked; //This one checks the state of the task (done=true or undone=false)
    let task = this.parentElement;

    var storage = JSON.parse(localStorage.getItem("tasks"));

    //Chencking that storage is not null so we don't get errors
    if(storage == null){
        return;
    }

    itemsLeft();

    //If task is being marked undone, this makes the listing take its original form.
    if(state == false){
            task.style.color = "black";
            task.style.textDecoration = "none";

            //Saving the state to local storage
            storage[task.id].state = false;
            localStorage.setItem("tasks", JSON.stringify(storage));
        return;
    }

    //These apply when the task is being marked as done
    task.style.color = "lightgrey";
    task.style.textDecoration = "line-through";

    //Saving the state to local storage
    storage[task.id].state = true;
    localStorage.setItem("tasks", JSON.stringify(storage));
}

function hideDoneTasks(){
    var tasks = document.getElementsByClassName("checkbox").length;

    //Checking the array of "li" elements for their state (done/notdone).
    for(let i = 0; i < tasks; i++){
        var tehtävä = document.getElementsByClassName("checkbox")[i];
        var state = tehtävä.checked;
        var äippä = tehtävä.parentElement;

        //Increasing the "done" value with one every time a task is marked done
        if(state != true){
            return;
        }

        äippä.style.display = "none";
    }
}

function showAll(){
    var tasks = document.getElementsByClassName("checkbox").length;

    //Checking the array of "li" elements for their state (done/notdone).
    for(let i = 0; i < tasks; i++){
        var tehtävä = document.getElementsByClassName("checkbox")[i];
        var state = tehtävä.checked;
        var äippä = tehtävä.parentElement;

        //Increasing the "done" value with one every time a task is marked done
        if(state != true){
            return;
        }

        äippä.style.display = "block";
    }
}

function removeTask(){
    //Removing task ("li" elements) from the "ul" element
    let removed = this.parentElement;
    removed.remove();

    amountOfTasks();
}

function clearAll(){
    //Setting "list" value as the "ul" element we gather our tasks to
    var list = document.getElementById("tasklist");
    list.remove(); //Deleting the whole "ul" element

    //Creating a new "ul" element to the same "div" element as the last one
    var place = document.getElementById("taskhome");
    let newUl = document.createElement("ul");
        newUl.id = "tasklist";
    place.appendChild(newUl); //Appending it to the "div"
    
    localStorage.removeItem("tasks"); //removes all the tasks from local storage

    amountOfTasks(); //Updating the task calculator
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