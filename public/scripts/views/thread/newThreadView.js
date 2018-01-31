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
        $('.newThreadView').removeClass('hidden');

        $('.addThreadButton').on('click', () => {
          let newThread = new app.Thread({creator: localStorage.currentUserId, title: $('.newThreadTitle').val(), content: $('.newThreadContent').val(), subforum_parent: ctx.params.subforum_id});
          if (localStorage.currentUserId) newThread.insert();
          else {
            localStorage.deferredRoute = '/subfora/${ctx.params.subfora_id}/threads/new';
            page.show('/login');
          }
        });
    }

    module.newThreadView = newThreadView;
})(app);
