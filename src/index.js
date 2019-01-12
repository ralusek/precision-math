'use strict';


module.exports.add = _add;
module.exports.sum = _add;

module.exports.subtract = _subtract;
module.exports.sub = _subtract;
module.exports.minus = _subtract;
module.exports.difference = _subtract;
module.exports.diff = _subtract;

module.exports.multiply = _multiply;
module.exports.mult = _multiply;
module.exports.product = _multiply;
module.exports.prod = _multiply;




/**
 *
 */
function _add(...args) {
  const operational = args.map(arg => _decimalToOperational(arg));
  const maxMagnitude = _getMaxMagnitude(...operational);
  const normalized = _normalize({maxMagnitude}, ...operational);

  const result = normalized.reduce((result, arg) => {
    return !result ? arg : {...arg, num: result.num + arg.num};
  });

  return _operationalToDecimal(result);
}


/**
 *
 */
function _subtract(...args) {
  const operational = args.map(arg => _decimalToOperational(arg));
  const maxMagnitude = _getMaxMagnitude(...operational);
  const normalized = _normalize({maxMagnitude}, ...operational);

  const result = normalized.reduce((result, arg) => {
    return !result ? arg : {...arg, num: result.num - arg.num};
  });

  return _operationalToDecimal(result);
}


/**
 *
 */
function _multiply(...args) {
  const operational = args.map(arg => _decimalToOperational(arg));
  const maxMagnitude = _getMaxMagnitude(...operational);
  const normalized = _normalize({maxMagnitude}, ...operational);

  const result = normalized.reduce((result, arg) => {
    if (!result) return agg;

    return {
      ...arg,
      num: result.num * arg.num,
      magnitude: result.magnitude + arg.magnitude
    };
  });

  const asDecimal = _operationalToDecimal(result);
  return _trimTrailingZeroesTo(asDecimal, Number(maxMagnitude));
}




/**
 *
 */
function _normalize({maxMagnitude}, ...args) {
  return args.map(arg => {
    return {
      ...arg,
      magnitude: maxMagnitude,
      num: arg.num * (BigInt(10) ** (maxMagnitude - arg.magnitude))
    };
  });
}


/**
 *
 */
function _getMaxMagnitude(...args) {
  return args.reduce((max, {magnitude}) => {
    return (magnitude > max) ? magnitude : max;
  }, BigInt(0)); 
}


/**
 *
 */
function _decimalToOperational(number) {
  const [pre, post = ''] = String(number).split('.');

  return {
    num: BigInt(pre + post),
    magnitude: BigInt(post.length)
  };
}


/**
 *
 */
function _operationalToDecimal({num, magnitude}) {
  const asString = String(num);
  if (!magnitude) return asString;

  magnitude = Number(magnitude);
  const decimalPointPosition = asString.length - magnitude;

  if (decimalPointPosition > 0) {
    return asString.slice(0, decimalPointPosition) + '.' + asString.slice(decimalPointPosition);
  }

  const pre = '0';
  const post = _pad(asString, Math.abs(decimalPointPosition));

  return  pre + '.' + post;
}


/**
 *
 */
function _pad(number, amount) {
  for (let i = 0; i < amount; i++) {
    number = '0' + number;
  }
  return number;
}


/**
 *
 */
function _trimTrailingZeroesTo(number, minPostDecimalDigits) {
  const [pre, post] = number.split('.');

  if (!post.length) return number;

  const toRemove = post.length - minPostDecimalDigits;

  if (toRemove < 0) return number;

  return pre + '.' + post.replace(new RegExp(`0{0,${toRemove}}$`), '');
}
