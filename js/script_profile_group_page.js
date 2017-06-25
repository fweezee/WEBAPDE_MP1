//INDEX
var username_global;
$(document).ready(function () {

//    var data = new Data('assets/data/test'); // must enable cross-origin requests in chrome for testing according to mig
    var data = new Data("https://jsonplaceholder.typicode.com");
    console.log(data.getUserAlbums(1));

    $("#search").on('focus', function () {
        $("#mag").attr("src", "img/mag-focus.png");
    });

    $("#search").on('focusout', function () {
        $("#mag").attr("src", "img/mag.png");
    });

    var top = $("#mainNav").offset().top;
    var sticky = function () {
        var winTop = $(window).scrollTop();

        if (winTop > top) {
            $("#topBar").addClass('sticky');
            $("#mainNav").addClass('stickyNav');
            $("#title h1").addClass('stickyTitle');
            $("#body").addClass("stickyBody");
        } else {
            $("#topBar").removeClass('sticky');
            $("#mainNav").removeClass('stickyNav');
            $("#title h1").removeClass('stickyTitle');
            $("#body").removeClass("stickyBody");
        }
    };

    $(window).scroll(function () {
        sticky();
    });

    for(var i = 0;  i < data.users.length; i++){
        var userData = data.users[i]

        var disp = "<div class = user_box>"
            disp += "<a href = \"profile.html#" + userData['id'] + "\" id = \"link_name\"><img src=\"img/temp.gif\" id = prof_img float = \"left\">\n</a>"
            disp += "<h5><a href=\"profile.html#" + userData['id'] + "\" id = \"name-display\"> "+ userData['name']+ "</a></h5>"
            disp += "<font id = \"username\"> @" + userData['username'] + " </font>"
            disp += "</div>"

        $("#users").append(disp);

    }



});






