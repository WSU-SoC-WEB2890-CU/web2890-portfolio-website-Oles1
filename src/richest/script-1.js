/* source: https://www.investopedia.com/articles/investing/012715/5-richest-people-world.asp */
/* This is the unordered list of names that are draggable */
const draggable_list = document.getElementById("draggable-list");
//check is the id of our button
const check1 = document.getElementById("check1");
const check2 = document.getElementById("check2");

const richestPeople = [
  "Elon Musk",
  "Jeff Bezos",
  "Bernard Arnault",
  "Mark Zuckerberg",
  "Bill Gates",
  "Larry Ellison",
  "Larry Page",
  "Steve Ballmer",
  "Sergey Brin",
  "Warren Buffett",
];

const listItems = [];

/*create a variable that keeps track of the index of each item */
let dragStartIndex;

/*create the function that will be generating the list */
createList();
function createList() {
  /*
    -iterate through the copied richestPeople array
    -person represents each item from the array and index is an index for that item (that name)
    -map gets here because we need to sort this copied array randomly
    */
  [...richestPeople] //spread operator
    /* to helps sort in a different order every time we refresh the window */
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    /*  
        map() creates a new array from calling a function for every array element.
        map() does not execute the function for empty elements. 
        map() does not change the original array.*/
    .map((a) => a.value)
    .forEach((person, index) => {
      //console.log(person);
      const listItem = document.createElement("li");

      /* add this class to change the color to green if the item has been dragged to the correct place
            listItem.classList.add('right'); */

      //then give an attribute to this list item
      listItem.setAttribute("data-index", index);
      //add an html to this list item
      //index+1 because I don't want 0 as the index for the first richest name listed
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;
      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });
  addEventListener();
  // cvv; //THIS ONE IS GIVING AN ERROR!!!!!!!!!!!!!!!
}

function dragStart() {
  //console.log ('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragOver(e) {
  //console.log ('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  //console.log ('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute("data-index"); //+this means our constant is going to be a posiive number

  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  //here, we swap the two items as we have dragged and dropped item one over item two.
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragEnter() {
  //console.log ('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  //console.log ('Event: ', 'dragleave');
  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check1.addEventListener("click", checkOrder);
check2.addEventListener("click", checkOrder);

$(".btn-task-description").click(function () {
  $(".task-description").slideToggle("slow");
});
//create a function with click so that the message "click here" becomes "hide description"
