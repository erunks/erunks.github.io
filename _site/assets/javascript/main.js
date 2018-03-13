function toggleNav(){
  var nav = $('.nav-menu')[0];
  var icon = $('.nav-menu-icon')[0];
  if(nav.classList.contains("hidden")){
    nav.classList.remove("hidden");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  }
  else{
    nav.classList.add("hidden");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  }
};
