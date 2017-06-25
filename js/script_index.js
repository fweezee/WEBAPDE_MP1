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

    var username;
    var scrollCtr = 10;

    //POST ALL
    // for(var i = 0; i < data.posts.length && i < scrollCtr; i++){
    //         postData = data.posts[i];
    //         postID = postData['id']
    //
    //         username = getUserName(postData['id'], data);
    //
    //         var disp = "<div class = \"posts_data\">\n";
    //         disp += "<h1>" + postData['title'] + "</h1><br/>";
    //         disp += "<a href=\"profile.html#" + postID + "\" id = \"link_name\">" + username + "</a>"
    //         disp += "<p>" + postData['body'] + "</p>"
    //         disp += "</div>"
    //         $("#posts").append(disp);
    // }

    postShiz(data, scrollCtr)


    //POST ALL

    //
    // $("a#link_name").click(function(){
    //     var userId = window.location.href.split("#")[1];
    //     alert(userId); // dis da user id na
    // });

    document.addEventListener('scroll', function (event) {
        if (document.body.scrollHeight ==
            document.body.scrollTop +
            window.innerHeight) {
            scrollCtr+=10
            postShiz(data, scrollCtr)
        }
    });

});

function postShiz(data, scrollCtr){
    for(var i = scrollCtr; i < data.posts.length && i < scrollCtr+10; i++){
        var postData = data.posts[i];
        var postID = postData['userId']

        var username = getUserName(postData, data);
        console.log(username)

        var disp = "<div class = \"posts_data\">\n";
        disp += "<h1>" + postData['title'] + "</h1><br/>";
        disp += "<a href=\"profile.html#" + postID + "\" id = \"link_name\">" + username + "</a>"
        disp += "<p>" + postData['body'] + "</p>"
        disp += "</div>"
        $("#posts").append(disp);
    }
}

var getUserName = function(postData, data){
    console.log("dasf")
    for(var j = 0; j < data.users.length; j++){
        console.log("asdf")
        var userData = data.users[j];
        if(postData['userId'] == userData['id'])
            return userData['username'];
    }
    return "unknown"
}

function setID(val){
    console.log(val)
    localStorage.setItem("id", val)
    window.location.href = "profile.html"
}

function profilePage(){
    var x = document.getElementById(id);
    console.log (x.id);
    var data = new Data("https://jsonplaceholder.typicode.com");

}





