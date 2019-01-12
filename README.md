### Perform precise operations on arbitrarily large decimals without the usage of floats.

Leverages native JavaScript `BigInt`, so should be faster than string manipulation libraries.
Allows for unlimited arbitrary digits (up to the absurd limitations of BigInt)

`$ npm install --save precision-math`


##### Include the package.
``` javascript
const {add, sub, mult} = require('precision-math');
```


##### Do some math!
``` javascript
add('.2', '0.1'); // 0.3
// Trailing 0s are only ever trimmed to the precision of the maximum
// encountered post-decimal digits.
sub('2343.21200', '10.11'); // 2333.10200
mult('.2', '0.100'); // 0.020

// Fun!
mult(
  '84329810756392221989004327891809679902229299040756637438294362784.4328000000011011',
  '50000042242410000043288888282.00000000000000000000421414777',
  '999999999999.99999999'
); // 4216494100114052296988957280801318867457046311073172564636761834886925607535808706713829063214866342509500.32251147080314365825467118279366225165139359801890453
```
