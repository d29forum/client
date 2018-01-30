'use strict';
var app = app || {};

(function(module) {
  function Subforum(obj) {
    for (let prop in obj) this[prop] = obj[prop];
  }

  Forum.subforums = [];

  // Forum.prototype.insert = function(ctx,next) {
  //   $.ajax({
  //     url: `${__API_URL__}/api/db/forum`,
  //     method: 'POST',
  //     data: {title: this.title, subtitle: this.subtitle},
  //     success: results => {
  //       ctx.results = results;
  //       next();
  //     }
  //   });
  // }

  module.Forum = Forum;
})(app);