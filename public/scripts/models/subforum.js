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
      url: `${__API_URL__}/api/db/subfora/${ctx.params.subforum_id}`,
      method: 'GET',
      success: results => {
        console.log(results);
        ctx.results = results;
        next();
      }
    });
  }

  Subforum.prototype.loadThreads = function(ctx,next) {
    Subforum.threads = ctx.results.map(thread => new app.Thread(thread));
    next();
  }

  Subforum.prototype.render = function(ctx,next) {
    Subforum.threads.forEach(thread => $('.threadsContainer').append(thread.toHtml()));
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
