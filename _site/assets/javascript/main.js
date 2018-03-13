function toggleNav(){
  var nav = $('.nav-menu')[0];
  if(nav.classList.contains("hidden")){
    nav.classList.remove("hidden");
  }
  else{
    nav.classList.add("hidden");
  }
};
