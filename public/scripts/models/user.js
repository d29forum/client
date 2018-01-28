'use strict';
var app = app || {};

//Local API
const __API_URL__ = 'http://localhost:3737';

//Staging API
//const __API_URL__ = 'https://d29forum-sv-staging.herokuapp.com';

//Production API
//const __API_URL__ = 'https://d29forum-sv.herokuapp.com';

(function(module) {
  function User(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  User.prototype.insert = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/users`,
      method: 'POST',
      data: {first_name: this.first_name, last_name: this.last_name, email: this.email, username: this.username,
        interests: this.interests, role: this.role, gravatar_hash: this.gravatar_hash,},
      success: callback,
      //error: app.errorView.init,
    });
  }

  User.prototype.fetch = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${this.username}`,
      method: 'GET',
      success: callback,
      //error: app.errorView.init,
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
      url: `${__API_URL__}/api/db/users/${this.username;}`,
      method: 'DELETE',
      success: callback,
      //error: app.errorView.init,
    });
  }

  module.User = User;

})(app);

var trogdor = new app.User({first_name: 'trogdor', last_name: 'dragoon', email: 'scaley@stuff.com', username: 'burninator3', interests: 'burninating the countryside', role: 'user', gravatar_hash: '0'});
