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