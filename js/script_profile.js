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


    var disp = "<div class = \"profile_box\">\n"
        disp += "<a href = \"photo.html#" + userData['id'] + "#0\" id = \"link_name\"><img src=\"img/temp.gif\" id = prof_img float = \"left\">\n</a>"
        disp += "<h5 id = \"name-display\"> "+ userData['name']+ "</h5>"
        disp += "<font id = \"username\"> @" + userData['username'] + " </font>"
        disp += "</div>"
    $(".profile_container").append(disp);


    var disp = "<div class = \"profile_info_box\">\n"
        disp += "<ul class = info_font>\n"
        disp += "<li size = \"2\">"+userData['email']+"</li>"
        disp += "<li>Street: "+userData['address']['street']+"</li>"
        disp += "<li>Suite: " +userData['address']['suite']+"</li>"
        disp += "<li>City: "+userData['address']['city']+"</li>"
        disp += "<li>Zip-Code: "+userData['address']['zipcode']+"</li>"
        disp += "<li>Phone: "+userData['phone']+"</li>"
        disp += "<li>Website: "+userData['website']+"</li>"
        disp += "<li>Company: "+userData['company']['name']+"</li>"
        disp += "<li>Catchphrase: "+userData['company']['catchPhrase']+"</li>"
        disp += "<li>Business Strategy: "+ userData['company']['bs']+"</li>"
        disp += "</ul>"
        disp += "</div>"
    $(".profile_info").append(disp);

    var scrollCtr = 0;

    profilePost(data, userData, scrollCtr)

    // document.addEventListener('scroll', function (event) {
    //     if (document.body.scrollHeight ==
    //         document.body.scrollTop +
    //         window.innerHeight) {
    //         scrollCtr+=10
    //         profilePost(data, userData, scrollCtr)
    //     }
    // });

    document.addEventListener('scroll', function (event) {
        if (document.body.scrollHeight ==
            document.body.scrollTop +
            window.innerHeight) {
            scrollCtr+=10
            profilePost(data, userData, scrollCtr)
        }
    });

    for(var i = 0; i < data.posts.length; i++){
        postData = data.posts[i];
        console.log(data.posts.length)

        if(postData['userId'] == userData['id']) {
            var disp = "<div class = \"profile_post_box\">\n";
            disp += "<h1>" + postData['title'] + "</h1><br/>";
            disp += "<a href=\"profile.html#" + postData['id'] + "\" id = \"link_name\">" + userData['username'] + "</a>"
            disp += "<p>" + postData['body'] + "</p>"
            disp += "</div>"
            $(".profile_post").append(disp);
        }
    }

    var disp = "<a href = \"album.html#" + userId + "\" id = \"album_link\">Albums of User</a>"
    $(".profile_album").append(disp);

    var ctr_al = 0;
    for(var i = 0; i < data.albums.length ; i++){
        var albumData = data.albums[i]
        if(userData['id'] == albumData['userId']){
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

        $(".profile_album").append(disp);
        }
    }


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

function profilePost(data, userData, scrollCtr){
    for(var i = scrollCtr; i < data.posts.length ; i++){
        postData = data.posts[i];
        console.log(data.posts.length)

        if(postData['userId'] == userData['id']) {
            var disp = "<div class = \"profile_post_box\">\n";
            disp += "<h1>" + postData['title'] + "</h1><br/>";
            disp += "<a href=\"profile.html#" + postData['id'] + "\" id = \"link_name\">" + userData['username'] + "</a>"
            disp += "<p>" + postData['body'] + "</p>"
            disp += "</div>"
            $(".profile_post").append(disp);
        }
    }
}


var getPhoto = function(id, data){
    for(var i = 0; i < data.photos.length; i++) {
        var photoData = data.photos[i]
        if(photoData['id'] == id){
            return photoData
        }
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



