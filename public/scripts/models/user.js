'use strict';
var app = app || {};

//Local API
const __API_URL__ = 'http://localhost:3737';

//Staging API
//const __API_URL__ = 'https://d29forum-sv-staging.herokuapp.com';

//Production API
//const __API_URL__ = 'https://d29forum-sv.herokuapp.com';

(function(module) {
  const user = {};
  let currentUserId = localStorage.currentUserId;
  let currentUserName = localStorage.currentUserName;

  function User(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  // POST
  User.prototype.insert = function() {
    $.ajax({
      url: `${__API_URL__}/api/db/users`,
      method: 'POST',
      data: {username: this.username},
      success: results => {
        localStorage.currentUserId = results[0].id;
        localStorage.currentUserName = this.username;
        window.location = '../'
      }
    })
  };

  // handlebars template for user profile
  User.prototype.toHtml = function() {
    var template = Handlebars.compile($('#user-profile-template').text());
    return template(this);
  }

  // 3rd - maps user from constructor to tamplate and appends it to html
  User.renderCurrent = (ctx, next) => {
      $('#userProfile').empty();
      ctx.currentUser.map(user => $('#userProfile').append(user.toHtml()));
      $('#editProfileButton').attr('href', `/user/${ctx.params.username}/edit`)
      // next();
  }

  // 2ND - takes the individual result and maps it to  the new User constructor
  User.loadCurrent = (ctx, next) => {
      ctx.currentUser = ctx.results.map(userObject => new User(userObject));
      next();
  }
  // 1st - user api call
  User.prototype.fetch = (ctx, next) => {
    $.get(`${__API_URL__}/api/db/users/${ctx.params.username}`)
      .then(results => {
        ctx.results = results;
        next();
      });
  }

  User.prototype.login = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${this.username}/login`,
      method: 'PUT',
      data: {},
      success: callback,
      //error: app.errorView.init,
    });
  }
  
  User.updateProfileTemplate = (ctx, next) => {
    console.log(ctx.currentUser);
    $('#editUsername').val(ctx.currentUser[0].username);
    $('#editEmail').val(ctx.currentUser[0].email);
    $('#editFirst_name').val(ctx.currentUser[0].first_name);
    $('#editLast_name').val(ctx.currentUser[0].last_name);
    $('#editGravatar_hash').val(ctx.currentUser[0].gravatar_hash);
    $('#editInterests').val(ctx.currentUser[0].interests);
    next();
  }

  User.prototype.update = function(ctx, next, callback) {
    console.log(ctx.params.username);
    $.ajax({
      url: `${__API_URL__}/api/db/users/${ctx.params.username}`,
      method: 'PUT',
      data: {first_name: this.first_name, last_name: this.last_name, email: this.email,
        username: this.username, interests: this.interests, gravatar_hash: this.gravatar_hash,},
      success: callback,
      //error: app.errorView.init,
    });
    next();
  }

  User.prototype.delete = function(ctx, next) {
    console.log('delete');
    $('#userView').on('click', $('#deleteProfileButton'), function() {
      console.log(currentUserName);
      $.ajax({
        url: `${__API_URL__}/api/db/users/${currentUserName}`,
        method: 'DELETE',
        success: () => {
          localStorage.clear();
          window.location = '/';
        }
        //error: app.errorView.init,
      })
    });
    next();
  }

  //Checks if user is logged In
  User.currentUserCheck = function(ctx, next) {
    if(currentUserId) {
      $('.notLoggedIn').addClass('hidden');
      $('#loggedInUser').attr('href', `/user/${currentUserName}`).text(currentUserName);
      $('.loggedIn').removeClass('hidden');
      $('#logoutButton').on('click', () => {
        localStorage.clear();
        window.location = '/'
      });
    }
    else {
      $('.notLoggedIn').removeClass('hidden');
      $('.loggedIn').addClass('hidden');
    }
    next();
  }

  module.User = User;

})(app);