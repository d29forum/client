'use strict';
var app = app || {};

(function(module) {
  function Forum(forumObj) {
    for (let prop in forumObj) this[prop] = forumObj[prop];
  }

  Forum.all = [];

  // handlebars template for user profile
  Forum.prototype.toForumTemplateHtml = function() {
    var template = Handlebars.compile($('#forum-template').text());
    // console.log(template(this));
    return template(this);
  }

  // 3rd - maps user from constructor to tamplate and appends it to html
  Forum.renderCurrent = (ctx, next) => {
      // console.log('render');
      $('#subforaContainer').empty();
      Forum.all.map(forum => $('#subforaContainer').append(forum.toForumTemplateHtml()));
      // $('#editProfileButton').attr('href', `/user/${ctx.params.username}/edit`)
      // next();
  }

  // 2ND - takes the individual result and maps it to  the new User constructor
  Forum.loadCurrent = (ctx, next) => {
      Forum.all = ctx.results.map(forumObj => new Forum(forumObj));
      // console.log(Forum.all);
      next();
  }

  Forum.fetchSubfora = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/forum`,
      method: 'GET',
      success: results => {
        // console.log(results);
        ctx.results = results;
        next();
      }
    });
  }

  module.Forum = Forum;
})(app);