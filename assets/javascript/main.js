/* Calcuates the percentage of the
bar fill based on the percentage of
use (of a particular language) over
the time of my life having
programming knowledge */
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

/* Extends the height of the fill-height
elements to on the page, assuming that the
height was not scalling properly. *cough*
*cough* *IE* */
function extendHeight(){
  var height = $('#main-content')[0].offsetHeight | $('#main-content')[0].clientHeight | $('#main-content')[0].scrollHeight;
  // console.log(height);
  $('.fill-height').each(function(i,e){
    // console.log(i,e.getAttribute("style"));
    $(e)[0].style.height = height;
    if(e.getAttribute("style") === null){
      e.setAttribute("style","height: " + height +"px;");
    }
  });
};

/* Hides/Shows the language details of
the selected language from the select
form input on mobile scaled devices */
function selectLanguageDetails(){
  $('select').on('change',function(event){
	// console.log(event.target.value);
	$('.language-details').each(function(i,e){
		if(!e.classList.contains('hidden')){
			e.classList.add("hidden");
        }
		else if(e.classList.contains('hidden') && e.classList.contains(event.target.value)){
			e.classList.remove("hidden");
        }
    });
  });
}

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
