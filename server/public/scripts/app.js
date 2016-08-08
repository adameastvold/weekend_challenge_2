$(document).ready(function() {

    function buildNavSelectors(omicron) {
        for (var i = 0; i < 17; i++) {
            $('.selectors').append('<div id="student' + i + '" class="selector"></div>');
            updateNavBar(0);
        };
    };

    var timerStart = false;

    //  Append selector buttons to DOM

    buildNavSelectors();

    // The AJAX call, also includes all appending to DOM and my Timer start

    loadData();

    function loadData() {

        $.ajax({
            type: "GET",
            url: "/data",
            success: function(data) {
                appendDOM(data.omicron);
                timerNav();


            }

        });

    };

    // Declared global as a counter

    var currentStudent = 0;

    // nextStudent and prevStudent are my buttons which use the global counter

    function nextStudent() {
        updateNavBar(currentStudent);
        currentStudent++;
        $('.display').empty();
        if (currentStudent == 17) {
            currentStudent = 0;
        };
        loadData();
        updateNavBar(currentStudent);
    };

    $('.next').on('click', function() {
        nextStudent(); //create one listener for both buttons with cases in a switch statement
    });

    function prevStudent() {
        updateNavBar(currentStudent);
        currentStudent--;
        $('.display').empty();
        if (currentStudent == -1) {
            currentStudent = 16;
        };
        loadData();
        updateNavBar(currentStudent);
        timerNav();
    };

    $('.prev').on('click', function() {
        prevStudent();
    });

    // This combines all of my appending to DOM functions

    function appendDOM(omicron) {
        var studentList = omicron;
        loadName(studentList);
        loadGitHub(studentList);
        loadShoutOut(studentList);
    };

    // This appends the names of students
    function loadName(omicron) {
        var studentList = omicron;
        $('.display').append('<h1 class="personName">' + studentList[currentStudent].name + '</h1>');
    };

    // This appends the GitHub Username

    function loadGitHub(omicron) {
        var studentList = omicron;
        $('.display').append('<h3 class="gitUsername">Git Username:  ' + studentList[currentStudent].git_username + '</h3>');
    };

    // This appends the shoutouts

    function loadShoutOut(omicron) {
        var studentList = omicron;
        $('.display').append('<h3 class="shoutout">Shoutout:  ' + studentList[currentStudent].shoutout + '</h3>');
    };


    // I used the following to test things
    // $('body').on("click", "div", function() {
    //     console.log("data", $(this).data("studentnum")); //USE THIS ALL THE TIME
    //     //change global student count
    //     //appendDom()
    // });

    // The following function will toggleClass for the color on the selectors

    function updateNavBar(index) {
        $('#student' + index).toggleClass('selected');

    };

    // timerNav is how I created the timer

    function timerNav() {

        if (timerStart == false) {
            setInterval(nextStudent, 5000);
            timerStart = true;
        };

    };


// Made attempt at the timer reset but it definitely did not work :/

    // function timerReset(){
    //   clearInterval(timer, 5000);
    // }
});
