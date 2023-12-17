// http://robertpenner.com/easing_terms_of_use.html

/**
 * Calculates an easing multiplier for: Quad In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInQuad = (position: number): number => {
  return Math.pow(position, 2);
};

/**
 * Calculates an easing multiplier for: Quad Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutQuad = (position: number): number => {
  return -(Math.pow(position - 1, 2) - 1);
};

/**
 * Calculates an easing multiplier for: Quad In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutQuad = (position: number): number => {
  if ((position /= 0.5) < 1) {
    return 0.5 * Math.pow(position, 2);
  }
  return -0.5 * ((position -= 2) * position - 2);
};

/**
 * Calculates an easing multiplier for: Cubic In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInCubic = (position: number): number => {
  return Math.pow(position, 3);
};

/**
 * Calculates an easing multiplier for: Cubic Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutCubic = (position: number): number => {
  return Math.pow(position - 1, 3) + 1;
};

/**
 * Calculates an easing multiplier for: Cubic In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutCubic = (position: number): number => {
  if ((position /= 0.5) < 1) return 0.5 * Math.pow(position, 3);
  return 0.5 * (Math.pow(position - 2, 3) + 2);
};

/**
 * Calculates an easing multiplier for: Quart In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInQuart = (position: number): number => {
  return Math.pow(position, 4);
};

/**
 * Calculates an easing multiplier for: Quad Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutQuart = (position: number): number => {
  return -(Math.pow(position - 1, 4) - 1);
};

/**
 * Calculates an easing multiplier for: Quart In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutQuart = (position: number): number => {
  if ((position /= 0.5) < 1) return 0.5 * Math.pow(position, 4);
  return -0.5 * ((position -= 2) * Math.pow(position, 3) - 2);
};

/**
 * Calculates an easing multiplier for: Quint In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInQuint = (position: number): number => {
  return Math.pow(position, 5);
};

/**
 * Calculates an easing multiplier for: Quint Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutQuint = (position: number): number => {
  return Math.pow(position - 1, 5) + 1;
};

/**
 * Calculates an easing multiplier for: Quint In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutQuint = (position: number): number => {
  if ((position /= 0.5) < 1) return 0.5 * Math.pow(position, 5);
  return 0.5 * (Math.pow(position - 2, 5) + 2);
};

/**
 * Calculates an easing multiplier for: Sine In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInSine = (position: number): number => {
  return -Math.cos(position * (Math.PI / 2)) + 1;
};

/**
 * Calculates an easing multiplier for: Sine Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutSine = (position: number): number => {
  return Math.sin(position * (Math.PI / 2));
};

/**
 * Calculates an easing multiplier for: Sine In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutSine = (position: number): number => {
  return -0.5 * (Math.cos(Math.PI * position) - 1);
};

/**
 * Calculates an easing multiplier for: Expo In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInExpo = (position: number): number => {
  return position === 0 ? 0 : Math.pow(2, 10 * (position - 1));
};

/**
 * Calculates an easing multiplier for: Expo Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutExpo = (position: number): number => {
  return position === 1 ? 1 : -Math.pow(2, -10 * position) + 1;
};

/**
 * Calculates an easing multiplier for: Expo In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutExpo = (position: number): number => {
  if (position === 0) return 0;
  if (position === 1) return 1;
  if ((position /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (position - 1));
  return 0.5 * (-Math.pow(2, -10 * --position) + 2);
};

/**
 * Calculates an easing multiplier for: Circ In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInCirc = (position: number): number => {
  return -(Math.sqrt(1 - position * position) - 1);
};

/**
 * Calculates an easing multiplier for: Circ Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutCirc = (position: number): number => {
  return Math.sqrt(1 - Math.pow(position - 1, 2));
};

/**
 * Calculates an easing multiplier for: Circ In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutCirc = (position: number): number => {
  if ((position /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - position * position) - 1);
  return 0.5 * (Math.sqrt(1 - (position -= 2) * position) + 1);
};

/**
 * Calculates an easing multiplier for: Bounce Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutBounce = (position: number): number => {
  if (position < 1 / 2.75) {
    return 7.5625 * position * position;
  } else if (position < 2 / 2.75) {
    return 7.5625 * (position -= 1.5 / 2.75) * position + 0.75;
  } else if (position < 2.5 / 2.75) {
    return 7.5625 * (position -= 2.25 / 2.75) * position + 0.9375;
  }
  return 7.5625 * (position -= 2.625 / 2.75) * position + 0.984375;
};

/**
 * Calculates an easing multiplier for: Back In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInBack = (position: number): number => {
  const s = 1.70158;
  return position * position * ((s + 1) * position - s);
};

/**
 * Calculates an easing multiplier for: Back Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeOutBack = (position: number): number => {
  const s = 1.70158;
  return (position = position - 1) * position * ((s + 1) * position + s) + 1;
};

/**
 * Calculates an easing multiplier for: Back In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeInOutBack = (position: number): number => {
  let s = 1.70158;
  if ((position /= 0.5) < 1) {
    return 0.5 * (position * position * (((s *= 1.525) + 1) * position - s));
  }
  return 0.5 * ((position -= 2) * position * (((s *= 1.525) + 1) * position + s) + 2);
};

/**
 * Calculates an easing multiplier for: Elastic
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeElastic = (position: number): number => {
  return -1 * Math.pow(4, -8 * position) * Math.sin(((position * 6 - 1) * (2 * Math.PI)) / 2) + 1;
};

/**
 * Calculates an easing multiplier for: Swing In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const swingInOut = (position: number): number => {
  let s = 1.70158;
  return (position /= 0.5) < 1
    ? 0.5 * (position * position * (((s *= 1.525) + 1) * position - s))
    : 0.5 * ((position -= 2) * position * (((s *= 1.525) + 1) * position + s) + 2);
};

/**
 * Calculates an easing multiplier for: Swing In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeSwingIn = (position: number): number => {
  const s = 1.70158;
  return position * position * ((s + 1) * position - s);
};

/**
 * Calculates an easing multiplier for: Swing Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeSwingOut = (position: number): number => {
  const s = 1.70158;
  return (position -= 1) * position * ((s + 1) * position + s) + 1;
};

/**
 * Calculates an easing multiplier for: Bounce
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeBounce = (position: number): number => {
  if (position < 1 / 2.75) {
    return 7.5625 * position * position;
  } else if (position < 2 / 2.75) {
    return 7.5625 * (position -= 1.5 / 2.75) * position + 0.75;
  } else if (position < 2.5 / 2.75) {
    return 7.5625 * (position -= 2.25 / 2.75) * position + 0.9375;
  }
  return 7.5625 * (position -= 2.625 / 2.75) * position + 0.984375;
};

/**
 * Calculates an easing multiplier for: Bounce Past
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeBouncePast = (position: number): number => {
  if (position < 1 / 2.75) {
    return 7.5625 * position * position;
  } else if (position < 2 / 2.75) {
    return 2 - (7.5625 * (position -= 1.5 / 2.75) * position + 0.75);
  } else if (position < 2.5 / 2.75) {
    return 2 - (7.5625 * (position -= 2.25 / 2.75) * position + 0.9375);
  }
  return 2 - (7.5625 * (position -= 2.625 / 2.75) * position + 0.984375);
};

/**
 * Calculates an easing multiplier for: Simple In+Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeFromTo = (position: number): number => {
  if ((position /= 0.5) < 1) {
    return 0.5 * Math.pow(position, 4);
  }
  return -0.5 * ((position -= 2) * Math.pow(position, 3) - 2);
};

/**
 * Calculates an easing multiplier for: Simple In
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeFrom = (position: number): number => {
  return Math.pow(position, 4);
};

/**
 * Calculates an easing multiplier for: Simple Out
 * @param position - The current position between start and end (from `0` to `1`)
 * @returns The easing multiplier for the position.
 * @group Easing
 */
export const easeTo = (position: number): number => {
  return Math.pow(position, 0.25);
};
