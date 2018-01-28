'use strict';
var app = app || {};

(function(module) {
  function Comment(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  Comment.prototype.insert = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/comments`,
      method: 'POST',
      data: {content: this.content, creator: this.creator, thread_parent: this.thread_parent, subforum_parent: this.subforum_parent},
    })
    .then(results => {
      ctx.results = results;
      next();
    });
  }

  Comment.prototype.update = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/comments/${this.id}`,
      method: 'PUT',
      data: {content: this.content},
    })
    .then(results => {
      ctx.results = results;
      next();
    });
  }

  Comment.prototype.delete = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/comments/${this.id}`,
      method: 'DELETE',
    })
    .then(results => {
      ctx.results = results;
      next();
    });
  }

  Comment.prototype.toHtml = function() {
    let template = Handlebars.compile($('#comment-template').text());
    console.log(this);
    return template(this);
  }

  module.Comment = Comment;

})(app);
