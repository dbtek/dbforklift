function init(){
  var sections = ['home','about','services','references','contact'];
  var sectionPositions = [];
  var autoScroll = false;

  var parseHash = function() {
    if(window.location.hash)
      return window.location.hash.slice(window.location.hash.indexOf('!')+1);
    else
      return null;
  };

  var scroll = function(divId) {
    if(divId && $('#'+divId).length){
      autoScroll = true;
      $("html, body").animate({ scrollTop: $('#'+divId).offset().top }, 1000, function(){
        autoScroll = false;
      });
    }
    else
      console.error('Section ' + divId + ' not found!');
  };

  var activateNavLink = function(href) {
    var navLinks = $('.navbar-dbf .nav-menu li');
    navLinks.each(function(key,navLink){
      navLink = $(navLink);
      navLink.removeClass('active');
      if(navLink.find('a').attr('href') == href)
        navLink.addClass('active');
    });
  };

  var findCurrentScrollSection = function(i) {
    var pos = window.scrollY;
    if(i < sectionPositions.length) {
      if(pos >= sectionPositions[i].pos) {
        if(!sectionPositions[i+1] || pos < sectionPositions[i+1].pos)
          return sectionPositions[i].id;
        else
          return findCurrentScrollSection(i+1);
      }
    }
  };

  window.onhashchange = function() {
    scroll(parseHash());
    activateNavLink(window.location.hash);
  };

  window.onscroll = function(){
    if(!autoScroll)
      activateNavLink('#!'+findCurrentScrollSection(0));
  };

  sections.forEach(function(val){
    sectionPositions.push({id: val, pos: $('#'+val).offset().top});
  });

  // first nav.
  scroll(parseHash());
}

init();
