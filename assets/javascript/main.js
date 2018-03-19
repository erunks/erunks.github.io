function calculateBarFill(){
  $('.skill-fill').each(function(i,e){
    // console.log(i,e);
    var json = JSON.parse(e.attributes['data'].value);
    var start = new Date(json["init"]);
    var end = (json["active"] == "") ? new Date() : new Date(json["active"]);

    var age = (new Date()) - (new Date("2013-09-01T00:00:00.000"));
    var elapsedYear = end - start;
    var elementWidth = window.getComputedStyle(e,null).length;

    var percentage = (elapsedYear/age) * 100.0;
    e.setAttribute("style","width: "+percentage+"%; display: block; visibility: visible;");
  });
};

/* Does exactly what the function name says,
also handles all the animation transitions
for the nav-menu and paired screen overlay */
function toggleNav(){
  var nav = $('.nav-menu')[0];
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
