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
sub('2343.21200', '10.11'); // 2333.10200
mult('.2', '0.100'); // 0.020
```
