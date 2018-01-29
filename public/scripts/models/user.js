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
  let currentUserId = localStorage.currentUserId || '';
  let currentUserName = localStorage.currentUserName || '';

  function User(obj) {
    for (var prop in obj) obj[prop] ? this[prop] = obj[prop] : this[prop] = null;
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

  User.login = function(user) {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${user.username}`,
      method: 'GET',
      success:(results => {
        console.log(results);
        if(!results[0]) {
          User.userIdNotFound(user.username);
        }
        else if (results[0].username == user.username){
          localStorage.currentUserId = results[0].id;
          localStorage.currentUserName = results[0].username;
          window.location = '../';
        }
      })
      //error: app.errorView.init,
    });
  }

  User.userIdNotFound = function(user) {
    $('.modal').toggleClass('is-visible');
    $('#userNameEntered').text(user);
    $('#modalCreateUserButton').on('click')
  }
  
  User.updateProfileTemplate = (ctx, next) => {
    $('#editUsername').val(ctx.currentUser[0].username);
    $('#editEmail').val(ctx.currentUser[0].email);
    $('#editFirst_name').val(ctx.currentUser[0].first_name);
    $('#editLast_name').val(ctx.currentUser[0].last_name);
    $('#editGravatar_hash').val(ctx.currentUser[0].gravatar_hash);
    $('#editInterests').val(ctx.currentUser[0].interests);
  }

  User.prototype.update = function() {
    let user = new app.User({
        username: $('#editUsername').val(),
        email: $('#editEmail').val(),
        first_name: $('#editFirst_name').val(),
        last_name: $('#editLast_name').val(),
        gravatar_hash: $('#editGravatar_hash').val(),
        interests: $('#editInterests').val()
    });

    $.ajax({
      url: `${__API_URL__}/api/db/users/${currentUserName}`,
      method: 'PUT',
      data: {first_name: user.first_name, last_name: user.last_name, email: user.email,
        username: user.username, interests: user.interests, gravatar_hash:  user.gravatar_hash},
      success: results => {
        localStorage.currentUserName = results;
        currentUserName = results;
        page.show(`/user/${results}`);
      },
      //error: app.errorView.init,
    });
  }

  User.prototype.delete = function() {
      $.ajax({
        url: `${__API_URL__}/api/db/users/${currentUserName}`,
        method: 'DELETE',
        success: () => {
          localStorage.clear();
          window.location = '/';
        }
        //error: app.errorView.init,
      })

  }

  //Checks if user is logged In
  User.currentUserCheck = function(ctx, next) {
    console.log('currentuser check');
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
