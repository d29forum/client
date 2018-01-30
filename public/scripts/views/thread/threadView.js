'use strict';
var app = app || {};

(function(module) {
    const threadView = {};

    threadView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.threadView').removeClass('hidden');
        $('.commentContainer').empty();
        if (localStorage.deferredRoute) {
          delete localStorage.deferredRoute;
        } else {
          $('.addCommentTextArea').val('');
        }
        $('.addCommentButton').on('click', () => {
          if (localStorage.currentUserId) {
            let comment = new app.Comment({content: $('.addCommentTextArea').val(), creator: localStorage.currentUserId, thread_parent: ctx.params.thread_id, subforum_parent: ctx.params.subforum_id,});
            comment.insert(() => page.show(`/subfora/${ctx.params.subforum_id}/threads/${ctx.params.thread_id}`));
          }
          else {
            localStorage.deferredRoute = `/subfora/${ctx.params.subforum_id}/threads/${ctx.params.thread_id}`;
            page.show('/login');
          }
        });

        next();
    }
    
    module.threadView = threadView;
})(app);
