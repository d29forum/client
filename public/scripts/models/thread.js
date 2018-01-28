'use strict';
var app = app || {};

(function(module) {
  Thread.comments = [];
  function Thread(obj) {
    for (let prop in obj) this[prop] = obj[prop];
  }

  Thread.prototype.insert = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/thread`,
      method: 'POST',
      data: {title: this.title, creator: this.creator, subforum_parent: this.subforum_parent, last_comment: this.last_comment},
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  Thread.prototype.fetchComments = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/thread/${this.id}`,
      method: 'GET',
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  Thread.prototype.loadComments = function(ctx,next) {
    Thread.comments = ctx.results.map(comment => new app.Comment(comment));
    next();
  }

  Thread.prototype.render = function(ctx,next) {
    let $threadView = $('.threadView');
    Thread.comments.forEach(comment => $threadView.append(comment.toHtml()));
    next();
  }

  Thread.prototype.update = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/threads/${this.id}`,
      method: 'PUT',
      data: {title: this.title, subforum_parent: this.subforum_parent},
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  Thread.prototype.delete = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/thread/${this.id}`,
      method: 'DELETE',
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  module.Thread = Thread;
})(app);
