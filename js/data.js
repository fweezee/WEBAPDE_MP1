// Class Constructor
var Data = function(src){
    this.src = src;

    // Constants according to mig
    this._POSTS_ = function () { return 1; };
    this._USERS_ = function () { return 2; };
    this._TODO_ = function () { return 3 ; };
    this._ALBUMS_ = function () { return 4; };
    this._PHOTOS_ = function () { return 5; };
    this._COMMENTS_ = function () { return 6; };

    // Initialize class variables
    this.posts = [];
    this.users = [];
    this.todos = [];
    this.albums = [];
    this.photos = [];
    this.comments = [];

    /* Collect Data from fake JSON server */
    this.getData(this._POSTS_);
    this.getData(this._USERS_);
    this.getData(this._TODO_);
    this.getData(this._ALBUMS_);
    this.getData(this._PHOTOS_);
    this.getData(this._COMMENTS_);

}

/*  Gets the appropriate data from the fake JSON server
    and places it in the right variable */
Data.prototype.getData = function (type) {

    var url = this.src;

    switch(type){ // choose which page to connect to
        case this._POSTS_:
            url += "/posts";
            break;
        case this._USERS_:
            url += "/users";
            break;
        case this._TODO_:
            url += "/todos";
            break;
        case this._ALBUMS_:
            url += "/albums";
            break;
        case this._PHOTOS_:
            url += "/photos";
            break;
        default:
            url += "/comments";
    }

//    url += '.json' // comment out to use saved data if slow connection according to mig

    var data = $.ajax({ // connect and retrieve data from the server
        url: url,
        method: 'GET',
        dataType: 'json',
        async: false
    }).responseJSON;

    switch(type){ // place in the appropriate variable
        case this._POSTS_:
            this.posts = data;
            break;
        case this._USERS_:
            this.users = data;
            break;
        case this._TODO_:
            this.todos = data;
            break;
        case this._ALBUMS_:
            this.albums = data;
            break;
        case this._PHOTOS_:
            this.photos = data;
            break;
        default:
            this.comments = data;
    }

}


/* Returns the user object that contains the supplied parameter str */ //<<<<< mig did dis
Data.prototype.searchUser = function (str) {

    for(var i = 0; i < this.users.length; i++)
        if(this.users[i].username === str)
            return this.users[i];

    return null;
}

/* Gets the albums that a specific user owns */
Data.prototype.getUserTodos = function (userId) {
    var data = [];

    for(var i = 0; i < this.todo.length; i++) // iterate through all known albums
        if(this.todo[i].userId === userId)
            data.push(this.todo[i]);

    return data;
}

/* Gets the albums that a specific user owns */
Data.prototype.getUserAlbums = function (userId) {
    var data = [];

    for(var i = 0; i < this.albums.length; i++) // iterate through all known albums
        if(this.albums[i].userId === userId)
            data.push(this.albums[i]);

    return data;
}

/* Gets the photos belonging to a specific album */
Data.prototype.getAlbumPhotos = function (albumId) {
    var data = [];

    for(var i = 0; i < this.photos.length; i++) // iterate through all known photos
        if(this.photos[i].albumId === albumId)
            data.push(this.photos[i]);

    return data;
}

/* Gets all photos owned by a specific user */
Data.prototype.getUserPhotos = function (userId) {
    var albums = this.getUserAlbums(userId); // get all the albums the user owns
    var photos = [];

    for(var i = 0; i < albums.length; i++) // iterate through all the albums the user owns
        photos.push(this.getAlbumPhotos(albums[i].id)); // get all photos in the album and insert into array

    return photos;
}

/* Gets all the posts that a specific user has */
Data.prototype.getUserPosts = function (userId) {
    var posts = [];

    for(var i = 0; i < this.posts.length; i++)
        if(this.posts[i].userId === userId)
            posts.push(this.posts[i]);

    return posts;
}

/* Gets all the comments that belong to a specific post */
Data.prototype.getPostComments = function (postId) {
    var comments = [];

    for(var i = 0; i < this.comments.length; i++)
        if(this.comments[i].postId === postId)
            comments.push(this.comments[i]);

    return comments;
}

/* Gets all tasks a specific user has (completed and uncompleted)*/
Data.prototype.getUserTodo = function (userId) {
    var todo = [];

    for(var i = 0; i < this.todos.length; i++)
        if(this.todos[i].userId === userId)
            todo.push(this.todos[i]);

    return todo;
}

/* Gets the tasks a specific user has completed */
Data.prototype.getUserCompleted = function (userId) {
    var todo = this.getUserTodo(userId);
    var compTodo = [];

    for(var i = 0; i < todo.length; i++)
        if(todo[i].userId === userId && todo[i].completed);
            todo.push(todo[i]);

    return compTodo;

}

/* Gets the tasks a specific user has not completed */
Data.prototype.getUserTasks = function (userId) {
    var todo = this.getUserTodo(userId);
    var task = [];

    for(var i = 0; i < todo.length; i++)
        if(todo[i].userId === userId && !todo[i].completed)
            task.push(todo[i]);

    return task;
}
