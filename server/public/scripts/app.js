$(document).ready(function(){

  function buildNavSelectors(omicron){
    for(var i = 0; i < 17; i++) {
    $('.selectors').append('<div id="student' + i + '" class="selector"></div>');
    updateNavBar(0);
  };
  };
var timerStart = false;

  buildNavSelectors();

loadData();

function loadData(){

    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDOM(data.omicron);
        timerNav();


      }

    });

  };



var currentStudent = 0;

function nextStudent(){
  updateNavBar(currentStudent);
  currentStudent++;
  $('.display').empty();
  if(currentStudent == 17){
    currentStudent = 0;
  };
  loadData();
  updateNavBar(currentStudent);
};

$('.next').on('click', function(){
  nextStudent();    //create one listener for both buttons with cases in a switch statement
});

function prevStudent(){
  updateNavBar(currentStudent);
  currentStudent--;
  $('.display').empty();
  if(currentStudent == -1){
    currentStudent = 16;
  };
  loadData();
  updateNavBar(currentStudent);
};

$('.prev').on('click', function(){
  prevStudent();
});

function appendDOM(omicron){
  var studentList = omicron;
  loadName(studentList);
  loadGitHub(studentList);
  loadShoutOut(studentList);
};

function loadName(omicron){
  var studentList = omicron;
    $('.display').append('<h1 class="personName">' + studentList[currentStudent].name + '</h1>');
};
function loadGitHub(omicron){
  var studentList = omicron;
    $('.display').append('<h3 class="gitUsername">Git Username:  ' + studentList[currentStudent].git_username + '</h3>');
};
function loadShoutOut(omicron){
  var studentList = omicron;
    $('.display').append('<h3 class="shoutout">Shoutout:  ' + studentList[currentStudent].shoutout + '</h3>');
};


$('body').on("click","div",function(){
  console.log("data",$(this).data("studentnum"));    //USE THIS ALL THE TIME
  //change global student count
  //appendDom()
});

function updateNavBar(index){
  $('#student' + index).toggleClass('selected');


  //acces currentstudent
  //toggle class (to change color)
};

function timerNav(){

  if(timerStart == false){
    setInterval(nextStudent, 10000);
    timerStart = true;
  };

};

});
