'use strict';

var app = app || {};
  (function(module) {
    Forum.subfora = [];
    function Forum(obj) {
      for (let prop in obj) this[prop] = obj[prop];
    }

//FETCH

Forum.prototype.fetchSubfora = function (ctx, next) {
  $.ajax({
    url: `${__API_URL__}/api/db/subfora`,
    method: 'POST',
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



//RENDER




  module.forum = forum;
})(app);
