// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var mainCounter = true;

$(function () {
  //
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  $(".time-block").on("click", function (event) {

    event.preventDefault();

    // since time-block is the textarea and numbering
    // and the button, we want to 
    // check if the button was clicked
    var eventElName = event.target.nodeName;
    if ((eventElName == "I") || (eventElName == "BUTTON")) {
      // button was clicked

      var timeBlockEl = event.currentTarget;

      // find what hour the timeblock is for
      // get the left digit
      var hour = Number(timeBlockEl.getAttribute("id").at(5));
      if (hour != 9) {
        // get the right digit since hour is double digits
        hour = Number(hour) * 10 + Number(timeBlockEl.getAttribute("id").at(6));
      }

      // remove any existing entry for this time-block
      // removeTaskFromStorage(hour);

      // add an updated new entry for this time-block
      storeTaskInStorage(hour, timeBlockEl.children[1].value);

    }




    // function renderTasks() {

    //   for(i=9; i<17; i++) {
    //     var taskline = getTaskFromStorage(i);
    //   }
    // }


  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // return 'taskText' for the hour if exists
  // else, return ""
  function getTaskFromStorage(hour) {

    var taskLines = localStorage.getItem("taskLines");
    // use tasklines array to find hour
    if (taskLines) {
      var i = 0;
      taskLines = JSON.parse(taskLines);
      // console.log(taskLines.hour+"-"+taskLines.taskText);
      for (var i = 0; i < taskLines.length; i++) {
        if (taskLines[i].hour == hour) {
          return taskLines[i].taskText;
        }
      }
    }

    return "";
  }

  //
  // this funtion retrieves the task lines in storage and
  // if the hour is found it replaces the text to taskText
  // else it creates a new entry and stores it
  //
  function storeTaskInStorage(hour, taskText) {

    var taskLines = localStorage.getItem("taskLines");

    if (taskLines) {

      taskLines = JSON.parse(taskLines);

      for (var i = 0; i < taskLines.length; i++) {
        if (taskLines[i].hour == hour) {
          taskLines[i].taskText = taskText;
          localStorage.setItem("taskLines", JSON.stringify(taskLines));
          return;
        }
      }

      var newTaskLine = {
        hour: hour,
        taskText: taskText
      };

      taskLines.push(newTaskLine);
      localStorage.setItem("taskLines", JSON.stringify(taskLines));


    } else {

      var newTaskLine = {
        hour: hour,
        taskText: taskText
      };

      var taskLines = [newTaskLine];
      localStorage.setItem("taskLines", JSON.stringify(taskLines));

    }
  }

  //
  // the given hour is removed from the storage list if it exists
  //
  function removeTaskFromStorage(hour) {

    var taskLines = localStorage.getItem("taskLines");
    if (taskLines) {

      var i = 0;
      taskLines = JSON.parse(taskLines);

      while (i < taskLines.length) {

        var taskLine = taskLines[i];
        if (taskLine.hour = hour) {

          // this is the entry to remove
          taskLines.toSpliced(i, 1);

        }
      }
    }
  }
  //
  // TODO: Add code to display the current date in the header of the page.
  //
  function renderTaskList() {

  }
  setInterval(function () {

    if (mainCounter) {

      for (var i = 9; i < 18; i++) {

        var divId = "hour-" + (i);
        var timeBlockEl = document.getElementById(divId);

        var taskText = getTaskFromStorage(i);
        //   timeBlockEl.children[1].textContent = taskText;

        // var timeBlockEl = document.getElementById("hour-9");
        // console.log(divId);

        // timeBlockEl.children[1].value = "rama lama ding dong"
        // .children[1].textContent = "manual input";

        // var taskText = getTaskFromStorage(i + hour);
        timeBlockEl.children[1].value = taskText;
      }

      mainCounter = false;

    }

    var today = dayjs();
    switch (dayjs().date()) {

      case 1:
        $('#currentDay').text(today.format('dddd, MMMM D[st], YYYY'));
      case 2:
        $('#currentDay').text(today.format('dddd, MMMM D[nd], YYYY'));
      case 3:
        $('#currentDay').text(today.format('dddd, MMMM D[rd], YYYY'));
      case 21:
        $('#currentDay').text(today.format('dddd, MMMM D[st], YYYY'));
      case 22:
        $('#currentDay').text(today.format('dddd, MMMM D[nd], YYYY'));
      case 23:
        $('#currentDay').text(today.format('dddd, MMMM D[rd], YYYY'));
      case 31:
        $('#currentDay').text(today.format('dddd, MMMM D[st], YYYY'));
      default:
        $('#currentDay').text(today.format('dddd, MMMM D[th], YYYY'));
    }




  }, 1000);



  // for (var i=9; i<18; i++){
  //   var j= "hour-"+String(i).toString;
  //   console.log("adding"+getTaskFromStorage(i).taskText);
  // }

});
