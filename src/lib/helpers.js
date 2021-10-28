export const handleKeyUp = (e, callback) => {
  // if keycode is enter or space
  if (e.keyCode === 13 || e.keyCode === 32) {
    callback();
  }
};

export default {
  handleKeyUp,
};
