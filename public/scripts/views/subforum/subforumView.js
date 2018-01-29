'use strict';

(function(module) {
    const subforumView = {};

    subforumView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.threadsContainer').empty();
        $('.subforumView').removeClass('hidden');
        $('.newThreadButton').on('click', ()=> {
          page.show(`/subfora/${ctx.params.subforum_id}/threads/new`);
        });
        next();
    }
    
    module.subforumView = subforumView;
})(app);
