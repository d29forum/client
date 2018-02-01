'use strict';
var app = app || {};

(function(module) {
  function Forum(forumObj) {
    for (let prop in forumObj) this[prop] = forumObj[prop];
  }

  Forum.all = [];

  Forum.threadAndPostColors = (ctx, next) => {
    let threadCount =
      $('.subforaThreadCount').map(function() {
        return parseInt($(this).data('thread-count'));
       }).get();

    let avgThreadCount = threadCount.reduce((acc, cur) => {
        return cur += acc;
      })/threadCount.length;

    let commentCount =
      $('.subforaPostCount').map(function() {
        return parseInt($(this).data('comment-count'));
      }).get();

    let avgPostCount = commentCount.reduce((acc, cur) => {
        return cur += acc;
      })/commentCount.length;

    $('.subforaPostCount[data-comment-count]').each(function() {
      if(parseInt($(this).data('comment-count')) > avgPostCount) {
        $(this).addClass('aboveAvg');
      }
      else {
        $(this).addClass('belowAvg');
      }
    });

    $('.subforaThreadCount[data-thread-count]').each(function() {
      if(parseInt($(this).data('thread-count')) > avgThreadCount) {
        $(this).addClass('aboveAvg');
      }
      else {
        $(this).addClass('belowAvg');
      }
    });
    $('.subforaLastPost:contains("Today")').css('margin-right', '35px');
  }
  // handlebars template for user profile
  Forum.prototype.toForumTemplateHtml = function() {
    var template = Handlebars.compile($('#forum-template').text());
    // console.log(template(this));
    return template(this);
  }

  // 3rd - maps user from constructor to tamplate and appends it to html
  Forum.renderCurrent = (ctx, next) => {
      $('#subforaContainer').empty();
      Forum.all.sort((a,b) => a.subforaid - b.subforaid);
      Forum.all.map(subforum => {
        // console.log(subforum.created_on);
        subforum.created_on = `${app.Helper.parseDate(subforum.created_on)} ${app.Helper.parseTime(subforum.created_on)}`;
      })
      //forumsort(() => {
        Forum.all.map(forum => $('#subforaContainer').append(forum.toForumTemplateHtml()))
      //});
      // $('#editProfileButton').attr('href', `/user/${ctx.params.username}/edit`)
      next();
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
