'use strict';

(function(module) {
    const newThreadView = {};

    newThreadView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off;
        if (localStorage.deferredRoute) {
          delete localStorage.deferredRoute;
        } else {
          $('.newThreadTitle').empty();
          $('.newThreadContent').empty();
        }
        $('.newThreadView header').empty();
        $('.newThreadView header').append(`<h3 class="bread-crumbs"><a href="/">D29 FORUM</a><span> > </span><a href="${window.location}">${ctx.params.subforum_title.toUpperCase()}</a><span> > </span><a href="${window.location}">NEW TOPIC</a></h3>`);
        $('.newThreadView').removeClass('hidden');

        $('.addThreadButton').on('click', () => {
          let newThread = new app.Thread({creator: localStorage.currentUserId, title: $('.newThreadTitle').val(), content: $('.newThreadContent').val(), subforum_parent: ctx.params.subforum_id});
          if (localStorage.currentUserId) newThread.insert();
          else {
            localStorage.deferredRoute = '/subfora/${ctx.params.subfora_id}/${ctx.params.subforum_title}/threads/new';
            page.show('/login');
          }
        });
    }

    module.newThreadView = newThreadView;
})(app);
