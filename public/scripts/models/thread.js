'use strict';
var app = app || {};

(function(module) {
  Thread.comments = [];
  function Thread(obj) {
    for (let prop in obj) this[prop] = obj[prop];
  }

  Thread.prototype.fetchComments = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/thread/${this.id}`,
      method: 'GET',
    })
    .then(results => {
      ctx.results = results;
      next();
    });
  }

  Thread.prototype.loadComments = function(ctx,next) {
    this.comments = ctx.results.map(comment => new Comment(comment));
    next();
  }

  Thread.prototype.render = function(ctx,next) {
    let $threadView = $('.threadView');
    this.comments.forEach(comment => $threadView.append(comment.toHtml()));
    next();
  }

  module.Thread = Thread;
})(app);
