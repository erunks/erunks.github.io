function addMagic(pin, trigger){
	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({
		triggerElement: trigger,
		triggerHook: 0
	})
	.setPin(pin)
	.addIndicators()
	.addTo(controller);
};