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

  // 3rd - maps book from constructor to tamplate and appends it to html
  User.renderCurrent = (ctx, next) => {
      $('#userProfile').empty();
      console.log(ctx.currentUser);
      ctx.currentUser.map(user => $('#userProfile').append(user.toHtml()));
      $('#editProfileButton').attr('href', `/book/${ctx.params.username}/edit`)
      // next();
  }

  // 2ND - takes the individual result and maps it to  the new Book constructor
  User.loadCurrent = (ctx, next) => {
      console.log(ctx.results);
      ctx.currentUser = ctx.results.map(userObject => new User(userObject));
      next();
  }
  // 1st - user api call
  User.prototype.fetch = (ctx, next) => {
    $.get(`${__API_URL__}/api/db/users/${ctx.params.username}`)
      .then(results => {
        ctx.results = results;
        console.log(ctx.results);
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
  
  User.prototype.update = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${this.username}`,
      method: 'PUT',
      data: {first_name: this.first_name, last_name: this.last_name, email: this.email,
        username: this.username, interests: this.interests, role: this.role, gravatar_hash: this.gravatar_hash,},
      success: callback,
      //error: app.errorView.init,
    });
  }

  User.prototype.delete = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${this.username}`,
      method: 'DELETE',
      success: callback,
      //error: app.errorView.init,
    });
  }

  User.currentUserCheck = function(ctx, next) {
    if(currentUserId) {
      $('.notLoggedIn').addClass('hidden');
      $('.loggedIn').attr('href', `/user/${currentUserName}`).text(currentUserName).removeClass('hidden');
    }
    else {
      $('.notLoggedIn').removeClass('hidden');
      $('.loggedIn').addClass('hidden');
    }
    console.log('ctx.params.username');
    next();
  }

  module.User = User;

})(app);