function toggleNav(){
  var nav = $('.nav-menu')[0];
  var icon = $('.nav-menu-icon')[0];
  var screenOverlay = $('.overlay-screen')[0];

  $(nav).on('animationend',function(event){
    if(nav.classList.contains("slide-out")){
      nav.classList.remove("slide-out");
      nav.classList.add("hidden");
      screenOverlay.classList.add("hidden");
    }
    else if(nav.classList.contains("slide-in")){
      nav.classList.remove("slide-in");
    }
  });

  $(screenOverlay).on('animationend',function(event){
    if(screenOverlay.classList.contains("fade-out")){
      screenOverlay.classList.remove("fade-out");
    }
    else if(screenOverlay.classList.contains("fade-in")){
      screenOverlay.classList.remove("fade-in");
    }
  });

  if(nav.classList.contains("hidden")){
    nav.classList.remove("hidden");
    screenOverlay.classList.remove("hidden");
    nav.classList.add("slide-in");
    screenOverlay.classList.add("fade-in");
  }
  else{
    nav.classList.add("slide-out");
    screenOverlay.classList.add("fade-out");
  }
};
