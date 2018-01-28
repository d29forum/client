'use strict';
var app = app || {};

(function(module) {
    const threadView = {};

    threadView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.threadView').removeClass('hidden');
    }
    
    module.threadView = threadView;
})(app);
