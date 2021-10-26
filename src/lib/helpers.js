import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';
import split from 'lodash/split';

export const handleKeyUp = (e, callback) => {
  // if keycode is enter or space
  if (e.keyCode === 13 || e.keyCode === 32) {
    callback();
  }
};

const measurementRegex = new RegExp(/(deg|px|turn)$/);

export const transformStyleToMap = (transform) => {
  let temp = compact(split(transform, /[()]\s?/));
  temp = map(chunk(temp, 2), ([key, value]) => {
    if (measurementRegex.test(value)) {
      const s = split(value, measurementRegex);
      return [key, { value: parseFloat(s[0]), unit: s[1] }];
    }

    return [key, value];
  });
  return fromPairs(temp);
};

export default {
  transformStyleToMap,
};
