'use strict';
var app = app || {};

(function(module) {
  function Comment(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  Comment.prototype.insert = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/comments`,
      method: 'POST',
      data: {content: this.content, creator: this.creator, thread_parent: this.thread_parent, subforum_parent: this.subforum_parent},
      success: callback,
    });
  }

  Comment.prototype.update = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/comments/${this.comment_id}`,
      method: 'PUT',
      data: {content: this.content},
      success: callback,
    });
  }

  Comment.prototype.delete = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/comments/${this.comment_id}`,
      method: 'DELETE',
      success: callback,
    })
  }

  Comment.prototype.toHtml = function() {
    let template = Handlebars.compile($('#comment-template').text());
    return template(this);
  }

  module.Comment = Comment;

})(app);
