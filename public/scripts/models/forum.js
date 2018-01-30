'use strict';
var app = app || {};
<<<<<<< HEAD

  (function(module) {
    Forum.subfora = [];
    function Forum(obj) {
      for (let prop in obj) this[prop] = obj[prop];
    };

//FETCH

Forum.prototype.fetchSubfora = function (ctx, next) {
  $.ajax({
    url: `${__API_URL__}/api/db/subfora`,
    method: 'GET',
    data: {title: this.title,
           subtitle: this.subtitle,
           thread_count: this.thread_count,
           comment_count: this.comment_count,
           last_comment: this.last_comment
          },
    success: results => {
      console.log('fetchSubfora results', results);
      ctx.results= results;
      next();
    }
  });
}

//LOAD

Forum.prototype.loadSubfora = function (ctx, next) {
  Forum.subfora = ctx.results;
  console.log('Forum.subfora', Forum.subfora);

}

//RENDER




  module.Forum = Forum;
})(app);
=======

(function(module) {
  function Forum(forumObj) {
    for (let prop in forumObj) this[prop] = forumObj[prop];
  }

  Forum.all = [];

  // handlebars template for user profile
  Forum.prototype.toForumTemplateHtml = function() {
    var template = Handlebars.compile($('#forum-template').text());
    console.log(template(this));
    return template(this);
  }

  // 3rd - maps user from constructor to tamplate and appends it to html
  Forum.renderCurrent = (ctx, next) => {
      console.log('render');
      $('#subforaContainer').empty();
      Forum.all.map(forum => $('#subforaContainer').append(forum.toForumTemplateHtml()));
      // $('#editProfileButton').attr('href', `/user/${ctx.params.username}/edit`)
      // next();
  }

  // 2ND - takes the individual result and maps it to  the new User constructor
  Forum.loadCurrent = (ctx, next) => {
      Forum.all = ctx.results.map(forumObj => new Forum(forumObj));
      console.log(Forum.all);
      next();
  }

  Forum.fetchSubfora = function(ctx,next) {
    $.ajax({
      url: `${__API_URL__}/api/db/forum`,
      method: 'GET',
      success: results => {
        console.log(results);
        ctx.results = results;
        next();
      }
    });
  }

  module.Forum = Forum;
})(app);
>>>>>>> 0aec39869fef3be6975d5d93064cc78aff2ad58b
