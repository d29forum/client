'use strict';

// MODALS
$('.modal-toggle1').on('click', function(e) {
    e.preventDefault();
    $('#modal1').toggleClass('is-visible');
});

$('.modal-toggle2').on('click', function(e) {
    e.preventDefault();
    $('#modal2').toggleClass('is-visible');
});

// NAV
$('.hamburger').on('click', function(){
    $('.flipping').toggleClass('flip');
    $(this).toggleClass('open');
    $('#hamburgerToggle').slideToggle(500);
    $('nav').toggleClass('darkNav');
    $('.userContainer').toggleClass('slideOut');
});
$('#hamburgerToggle a').on('click', function() {
    $('.flipping').toggleClass('flip');
    $('.hamburger').toggleClass('open');
    $('#hamburgerToggle').slideToggle(500);
    $('nav').toggleClass('darkNav');
    $('.userContainer').toggleClass('slideOut');
});

// HOME ACCORDION

$('.subforaContainer').on('click', '.accordionToggle', function() { 
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
});