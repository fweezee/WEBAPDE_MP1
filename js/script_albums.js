/**
 * Created by Jords on 6/24/2017.
 */
/**
 * Created by Jords on 6/24/2017.
 */
//INDEX
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

    var userId = window.location.href.split("#")[1];
    var userData = getUserName(userId, data)

    if(userId == 0){
        postAll(data)
    }else{
        postSome(userData, data)
    }

    var modal;

    $('img').click(function(){
        var img = $('.myImg');
        var modal = document.getElementById('myModal'+this.id)
        var modalImg = $("#img" + this.id);
        var captionText = document.getElementById("caption"+this.id);
        modal.style.display = "block";
        var newSrc = getPhoto(this.id, data)['url'];
        modalImg.attr('src', newSrc);
        captionText.innerHTML = getPhoto(this.id, data)['title'];
        //DITO PROBLEMA NG CLOSE HINDI MAKITA UNG SPAN
        var span = document.getElementById("close"+this.id)[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
    });


});

var getPhoto = function(id, data){
    for(var i = 0; i < data.photos.length; i++) {
        var photoData = data.photos[i]
        if(photoData['id'] == id){
            return photoData
        }
    }
}

var postSome = function(userData, data){

    for(var i = 0; i < data.albums.length; i++) {
        var albumData = data.albums[i]

        console.log(userData['id'] + " " + albumData['userId'])
        if (userData['id'] == albumData['userId']) {
            var disp = "<div class = \"profile_album_box\">\n"
            disp += "<h3><a href=\"photo.html#0#" + albumData['id'] + "\" id = \"link_name\">" + albumData['title'] + "</a></h3>"
            var ctr = 0

            for (var j = 0; j < data.photos.length && ctr < 6; j++) {
                var photoData = data.photos[j]
                if (albumData['id'] == photoData['albumId']) {
                    disp += "<div class = \"gallery\">"
                    //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
                    disp += "<img class =\"myImg\" id = "+photoData['id']+" src = " + photoData['thumbnailUrl'] + ">"
                    //disp += "</a>"
                    disp += "</div>"

                    disp += "<div id = \"myModal"+photoData['id']+"\" class = \"modal\">"
                    disp += "<span class = \"close\" id = \"close"+photoData['id']+"\">&times;</span>"
                    disp += "<img  class= \"modal-content\" id =  \"img"+photoData['id']+"\" >"
                    disp += "<div class = \"caption\" id = \"caption"+photoData['id']+"\"></div>"
                    disp += "</div>"
                    ctr++;
                }
            }

            disp += "</div>"
            $(".albums_container").append(disp);

        }
    }


}

var postAll = function(data){

    // Get the modal

    for(var i = 0; i < data.albums.length; i++){
        var albumData = data.albums[i]

            var disp = "<div class = \"profile_album_box\">\n"
            disp += "<h3><a href=\"photo.html#0#" + albumData['id'] + "\" id = \"link_name\">" + albumData['title'] + "</a></h3>"
            var ctr = 0
            for (var j = 0; j < data.photos.length && ctr < 6; j++) {
                var photoData = data.photos[j]
                if (albumData['id'] == photoData['albumId']) {
                    disp += "<div class = \"gallery\">"
                    //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
                    disp += "<img class =\"myImg\" id = "+photoData['id']+" src = " + photoData['thumbnailUrl'] + ">"
                    //disp += "</a>"
                    disp += "</div>"

                    disp += "<div id = \"myModal"+photoData['id']+"\" class = \"modal\">"
                    disp += "<span class = \"close\" id = \"close"+photoData['id']+"\">&times;</span>"
                    disp += "<img  class= \"modal-content\" id =  \"img"+photoData['id']+"\" >"
                    disp += "<div class = \"caption\" id = \"caption"+photoData['id']+"\"></div>"
                    disp += "</div>"
                    ctr++;
                }
            }

            disp += "</div>"
            $(".albums_container").append(disp);

    }
}


var getUserName = function(postData_ID, data){
    for(var j = 0; j < data.users.length; j++){
        userData = data.users[j];
        if(postData_ID == userData['id'])
            return userData;

    }
    return "unknown"
}

var getImage = function(userData, data){


    for(var i = 0; i < data.photos.length; i++){
        var photoData = data.photos[i]
        console.log(photoData['id'])


        if(photoData['id'] == userData){
            alert("found pic")
            return photoData['url']
        }
    }
    return null
}



