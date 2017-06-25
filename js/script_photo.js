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
    var albumId = window.location.href.split("#")[2];


    if(userId == 0 && albumId == 0){
        postAll(data)
    }else if(albumId == 0){
        postUserPhotos(getUserName(userId, data),getAlbumData(albumId, data), data)
    }else{
        postAlbumPhotos(getAlbumData(albumId, data), data)
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

var postUserPhotos = function(userData, albumData, data){

    var disp = "<h3>"+userData['name']+"<h3>"
    var ctr = 0;
    for (var j = 0; j < data.photos.length && ctr < 100; j++) {
        var photoData = data.photos[j]

        if(userData['id'] == findAlbum(photoData, data)['userId']) {
            disp += "<div class = \"gallery\">"
            //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
            disp += "<img class =\"myImg\" id = " + photoData['id'] + " src = " + photoData['thumbnailUrl'] + ">"
            //disp += "</a>"
            disp += "</div>"

            disp += "<div id = \"myModal" + photoData['id'] + "\" class = \"modal\">"
            disp += "<span class = \"close\" id = \"close" + photoData['id'] + "\">&times;</span>"
            disp += "<img  class= \"modal-content\" id =  \"img" + photoData['id'] + "\" >"
            disp += "<div class = \"caption\" id = \"caption" + photoData['id'] + "\"></div>"
            disp += "</div>"
            ctr++;
        }
    }


    $(".photo_container").append(disp);

}

var findAlbum = function(photoData, data){

    for(var i = 0; i < data.albums.length; i++){
        albumData = data.albums[i]
        if(albumData['id'] == photoData['albumId'])
            return albumData
    }

}



var postAlbumPhotos = function(albumData, data){

    var disp = "<h3>"+albumData['title']+"<h3>"
    var ctr = 0;
    for (var j = 0; j < data.photos.length && ctr < 100; j++) {
        var photoData = data.photos[j]
        if(albumData['id'] == photoData['albumId']) {
            disp += "<div class = \"gallery\">"
            //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
            disp += "<img class =\"myImg\" id = " + photoData['id'] + " src = " + photoData['thumbnailUrl'] + ">"
            //disp += "</a>"
            disp += "</div>"

            disp += "<div id = \"myModal" + photoData['id'] + "\" class = \"modal\">"
            disp += "<span class = \"close\" id = \"close" + photoData['id'] + "\">&times;</span>"
            disp += "<img  class= \"modal-content\" id =  \"img" + photoData['id'] + "\" >"
            disp += "<div class = \"caption\" id = \"caption" + photoData['id'] + "\"></div>"
            disp += "</div>"
            ctr++;
        }
    }


    $(".photo_container").append(disp);


}

var postAll = function(data){

    // Get the modal
    var disp = "<h3>All Photos<h3>"
    var ctr = 0;
        for (var j = 0; j < data.photos.length && ctr < 100; j++) {
            var photoData = data.photos[j]
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


        $(".photo_container").append(disp);


}


var getUserName = function(postData_ID, data){
    for(var j = 0; j < data.users.length; j++){
        var userData = data.users[j];
        if(postData_ID == userData['id'])
            return userData;

    }
    return "unknown"
}

var getAlbumData = function(id, data){
    for(var i = 0;  i < data.albums.length; i++){
        var albumData = data.albums[i]
        if(id == albumData['id'])
            return albumData
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

