'use strict';

(function(module) {
    const newThreadView = {};

    newThreadView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off;
        $('.newThreadView').removeClass('hidden');

        $('.addThreadButton').on('click', () => {
          let newThread = new app.Thread({creator: localStorage.currentUserId, title: $('.newThreadTitle').val(), content: $('.newThreadContent').val(), subforum_parent: ctx.params.subforum_id});
          newThread.insert(); 
        });
    }

    module.newThreadView = newThreadView;
})(app);
