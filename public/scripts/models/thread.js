'use strict';
var app = app || {};

(function(module) {
  Thread.comments = [];
  function Thread(obj) {
    for (let prop in obj) this[prop] = obj[prop];
  }

  Thread.prototype.insert = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/threads`,
      method: 'POST',
      data: {title: this.title, creator: this.creator, subforum_parent: this.subforum_parent, content: this.content},
      success: results => {
        console.log(results);
        page.show(`/subfora/${this.subforum_parent}/threads/${results[0].thread_id}`);
      },
    });
  }

  Thread.prototype.fetchComments = function(ctx,next) {
    console.log(ctx.params.thread_id);
    $.ajax({
      url: `${__API_URL__}/api/db/thread/${ctx.params.thread_id}`,
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
    Thread.comments.sort((a,b) => a.comment_id - b.comment_id);
    Thread.comments.forEach(comment => $('.threadView .commentContainer').append(comment.toHtml()));
   
    if (localStorage.currentUserId) {
      $(`.${localStorage.currentUserName} .editCommentButton`).removeClass('hidden').on('click', function() {
        Thread.comments.forEach(comment => {
          if (comment.comment_id === $(this).parent().parent().parent().data('comment-id')) app.editCommentView.init(comment);
        });
      });
    }    
  }

  Thread.prototype.toHtml = function() {
    let template = Handlebars.compile($('#thread-template').text());
    return template(this);
  }

  Thread.prototype.update = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/threads/${this.id}`,
      method: 'PUT',
      data: {title: this.title, subforum_parent: this.subforum_parent},
      success: callback, 
    });
  }

  Thread.prototype.delete = function(callback) {
    $.ajax({
      url: `${__API_URL__}/api/db/thread/${this.id}`,
      method: 'DELETE',
      success: callback,
    });
  }

  module.Thread = Thread;
})(app);
