// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var mainCounter = true;

$(function () {
  //
  // listener for click events on the save button. code
  // uses the id in the containing time-block as a key to save in
  // local storage. 
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
  // Function to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 
  //
  function applyFormatting() {

    var thisHour = dayjs().hour();

    for (var i = 9; i < 18; i++) {

      var divId = "hour-" + (i);
      var timeBlockEl = document.getElementById(divId);

      if (i < thisHour) {

        //apply past format
        timeBlockEl.setAttribute("class", "row time-block past");

      } else {

        if (thisHour === i) {

          //apply present format
          timeBlockEl.setAttribute("class", "row time-block present");

        } else {

          //apply future format
          timeBlockEl.setAttribute("class", "row time-block future");

        }
      }
    }

    var taskText = getTaskFromStorage(i);

    timeBlockEl.children[1].value = taskText;
  }

  //
  // function to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. 
  // Specifically, return 'taskText' for the hour if exists
  // else, return ""
  //
  function getTaskFromStorage(hour) {

    var taskLines = localStorage.getItem("taskLines");
    // use tasklines array to find hour
    if (taskLines) {
      var i = 0;
      taskLines = JSON.parse(taskLines);

      for (var i = 0; i < taskLines.length; i++) {
        if (taskLines[i].hour == hour) {
          // found a stored entry for this hour
          // return the taskText
          return taskLines[i].taskText;
        }
      }
    }

    // no entry for this hour stored
    // so return empty string
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


  // run this to show the time at page load
  setInterval(function () {

    if (mainCounter) {

      for (var i = 9; i < 18; i++) {

        var divId = "hour-" + (i);
        var timeBlockEl = document.getElementById(divId);

        var taskText = getTaskFromStorage(i);

        timeBlockEl.children[1].value = taskText;
      }

      mainCounter = false;

    }

    // print the date at the top of the page
    var today = dayjs();

    applyFormatting();

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

});
