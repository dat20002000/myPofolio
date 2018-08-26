$(document).ready(function() {
    "use-strict";

    // Url jumping
    $(function() {
        $('a[href*=\\#]:not([href=\\#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    // One page scrolling
    $(document).ready(function() {
        $('#fullpage').fullpage({
            // menu: '.go-navbar',

            // Scrolling
            css3: true,
            scrollingSpeed: 700,
            fitToSection: true,
            fitToSectionDelay: 1000,
            scrollBar: true,
            loopBottom: true,
            normalScrollElements: '#our-works',
            scrollOverflow: false,
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 5,

            // Accessibility
            keyboardScrolling: true,
            animateAnchor: true,

            // Design
            controlArrows: true,
            verticalCentered: true,
            responsiveWidth: 0,
            responsiveHeight: 0,

            lazyLoading: true,
        });
    });
    
    //show background img when scroll down 200 from top
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var status = parseFloat($('#img-bg')[0].style.opacity);
        if(scroll < 1200 && status >= 0) {
            $('#img-bg')[0].style.opacity = Math.min(scroll / 200, 1).toString();
        } else {
            $('#img-bg')[0].style.opacity = Math.max(1 - scroll / 200, 0).toString();
        }
    });
    
    //trigger collapse
    $('#collapseExample').collapse('toggle');
    window.setTimeout(function(){
        $('#collapseExample').collapse('toggle');
    }, 350);
    
    $('#collapseExample').on('shown.bs.collapse', function () {
        $('div[name=more]').css({display: 'none'});
        $('div[name=less]').css({display: 'block'});
    })
    
    $('#collapseExample').on('hidden.bs.collapse', function () {
        $('div[name=more]').css({display: 'block'});
        $('div[name=less]').css({display: 'none'});
    })

    $('.single-team .team-thumbnail').popover();
    
    // Animate for our team
    var bodyRect = document.body.getBoundingClientRect();
    var elID = "";
    var currentID = 0;
    
    $('.single-team').each(function(index){
        $(this)[0].setAttribute('id', 'pro-' + index);
        document.getElementById('pro-' + index).count = 2;
    });
    function profileBlow() {
        for (var i = 0; i < $('.single-team').length; i++) {
            var el = document.getElementById('pro-' + i);
            var elRect = $('#pro-' + i + ' .team-thumbnail')[0].getBoundingClientRect();
            $('#pro-' + i).css({transform: 'translateX(' + el.count + 'px)'});
            if(bodyRect.width > elRect.left) {
                el.count += 0.5;
            } else {
                el.count = 0.5
                $('#pro-' + i).css({transform: 'translateX(' + el.count + 'px)'});
                $('#pro-' + i + ' .team-thumbnail')[0].style.left = '-' + $('#pro-' + i + ' .team-thumbnail').width()/2 + 'px';
            }
        }
    }
    var refreshIntervalId = window.setInterval(profileBlow, 20);
    $('.single-team .team-thumbnail').mouseover(function(){
        elID = this.parentElement.id;
        currentID = parseInt(elID.substr(elID.length - 1));
        for (var i = 0; i < $('.single-team').length; i++) {
            if(currentID != i) {
                $('#pro-' + i).css({filter: 'blur(2px)'});
            }
        }
        clearInterval(refreshIntervalId);
    });
    $('.single-team .team-thumbnail').mouseleave(function(){
        elID = this.parentElement.id;
        currentID = parseInt(elID.substr(elID.length - 1));
        for (var i = 0; i < $('.single-team').length; i++) {
            if(currentID != i) {
                $('#pro-' + i).css({filter: 'blur(0px)'});
            }
        }
        refreshIntervalId = window.setInterval(profileBlow, 20);
    });

    // Animate and WOW Animation
    var wow = new WOW({
        offset: 0,
        mobile: true,
        live: true,
    });
    wow.init();
});

var navStatus = false;
// Overlay menu
function triggerNav() {
    if(navStatus) {
        $('.main-nav').removeClass('displayed');
        $('.main-nav').css({height: 0});
        $('.nav-overlay').removeClass('displayed');
        $('.nav-overlay').css({height: 0});
        $('.menu-button').removeClass('active').css({position: 'absolute'});
        navStatus = false;
    }
    else {
        $('.main-nav').addClass('displayed');
        $('.main-nav').css({height: '100%'});
        $('.nav-overlay').addClass('displayed');
        $('.nav-overlay').css({height: '100%'});
        $('.menu-button').addClass('active').css({position: 'fixed'});
        navStatus = true;
    }
}