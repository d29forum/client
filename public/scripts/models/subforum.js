'use strict';
var app = app || {};

(function(module) {
  Subforum.threads = [];
  function Subforum(obj) {
    for (let prop in obj) this[prop] = obj[prop];
  }

  Subforum.prototype.insert = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/subfora`,
      method: 'POST',
      data: {title: this.title, subtitle: this.subtitle},
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  Subforum.prototype.fetchThreads = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/subfora/${this.id}`,
      method: 'GET',
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  Subforum.prototype.loadThreads = function(ctx,next) {
    Subforum.threads = ctx.results.map(thread => new app.Thread(threads));
    next();
  }

  Subforum.prototype.render = function(ctx,next) {
    let $subforumView = $('.subforumView');
    Subforum.threads.forEach(threads => $subforumView.append(thread.toHtml()));
    next();
  }

  Subforum.prototype.update = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/subfora/${this.id}`,
      method: 'PUT',
      data: {title: this.title, subtitle: this.subtitle},
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  Subforum.prototype.delete = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/subfora/${this.id}`,
      method: 'DELETE',
      success: results => {
        ctx.results = results;
        next();
      }
    });
  }

  module.Subforum = Subforum;
})(app);
