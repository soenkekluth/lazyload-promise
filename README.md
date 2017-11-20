# lazyload-promise

[![Greenkeeper badge](https://badges.greenkeeper.io/soenkekluth/lazyload-promise.svg)](https://greenkeeper.io/)
> lazy loading images src and or srcset width promise magic

## Example
https://rawgit.com/soenkekluth/lazyload-promise/master/example/index.html

## Install

```
$ npm install --save lazyload-promise
# or 
$ yarn add lazyload-promise
```


## Usage

```js

import lazyload from 'lazyload-promise';

const nodeContainingImages = document.querySelector('#nodeContainingImages');

lazyload(nodeContainingImages)
  .then(......)

// optional get load event of each image:

lazyload(nodeContainingImages, {onLoad:(e)=>{....}})
  .then(......)

```
## License

MIT © [Sönke Kluth](https://soenkekluth.com)
