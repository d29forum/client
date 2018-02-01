'use strict';
var app = app || {};

(function(module) {
    const forumView = {};

    forumView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.forumView').removeClass('hidden');
        $('.subforaContainer').on('click', '.accordionToggle', forumView.accordionControls);
        localStorage.banner ? $('.banner').addClass('hidden') : $('.banner').on('click', '.bannerCloseIconSpan', forumView.hideBanner);
        next();
    }

    forumView.hideBanner = function() {
        $('.banner').fadeOut(250);
        localStorage.banner = 'hide';
        // .hide(2500);
    }

    forumView.accordionControls = function() { 
        if($(this).parent().find('.lastPostRow').hasClass('randomClass')) {
            $(this).parent().find('.lastPostRow').removeClass('randomClass').addClass('hidden').slideToggle(500);
        }
        else {
            $('.subforaContainer').find('.randomClass').removeClass('randomClass').addClass('hidden').slideToggle(500);
            $(this).parent().find('.lastPostRow').addClass('randomClass').slideToggle(500).removeClass('hidden');
        }
        if($(this).hasClass('openAccordion')) {
            $(this).removeClass('openAccordion');
        }
        else {
            $('.subforaContainer').find('.openAccordion').removeClass('openAccordion');
            $(this).addClass('openAccordion');
        }
    }
    
    module.forumView = forumView;
})(app);
