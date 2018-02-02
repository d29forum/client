'use strict';
var app = app || {};

(function(module) {
  Subforum.threads = [];
  function Subforum(obj) {
    for (let prop in obj) this[prop] = obj[prop];
  }

  Subforum.viewAndPostColors = (ctx, next) => {
    let viewCount =
      $('.subforaViewCount').map(function() {
        return parseInt($(this).data('view-count'));
       }).get();

    let avgViewCount = viewCount.reduce((acc, cur) => {
        return cur += acc;
      })/viewCount.length;

    let commentCount =
      $('.threadsubforaPostCount').map(function() {
        return parseInt($(this).data('comment-count'));
      }).get();

    let avgPostCount = commentCount.reduce((acc, cur) => {
        return cur += acc;
      })/commentCount.length;

    $('.threadsubforaPostCount[data-comment-count]').each(function() {
      if(parseInt($(this).data('comment-count')) > avgPostCount) {
        $(this).addClass('aboveAvg');
      }
      else {
        $(this).addClass('belowAvg');
      }
    });

    $('.subforaViewCount[data-view-count]').each(function() {
      if(parseInt($(this).data('view-count')) > avgViewCount) {
        $(this).addClass('aboveAvg');
      }
      else {
        $(this).addClass('belowAvg');
      }
    });
    $('.lastCommentCreatedOnDateP a:contains("Today")').css('margin-right', '35px');
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
    $('.subforumView header .subforum-title').empty();
    $('.subforumView header .subforum-title').append(`<h3 class="bread-crumbs"><a href="/">D29 FORUM</a><span> > </span><a href="${window.location}">${ctx.results[0].subforum_title.toUpperCase()}</a></h3>`);
    $('.newThreadButton').on('click', ()=> {
      page.show(`/subfora/${ctx.params.subforum_id}/${ctx.results[0].subforum_title}/threads/new`);
    });
//    var sfsort = callback => {
      Subforum.threads.sort((a,b) => b.last_comment - a.last_comment);
//      callback();
//    }
    Subforum.threads.forEach(thread => $('.threadsContainer').append(thread.toHtml()));
    sfsort(() => Subforum.threads.forEach(thread => $('.threadsContainer').append(thread.toHtml())));

    $('.thread').on('click','.username', function() {
      page.show(`/user/${$(this).text()}`);
    });
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
