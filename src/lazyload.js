const source = src => src;

const loadImage = (img, { onLoad, onProgress, onStart, onError, setSource = source } = {}) => new Promise((resolve, reject) => {
  const src = img.getAttribute('data-src');
  const srcset = img.getAttribute('data-srcset');

  if (!(src || srcset)) {
    resolve(img);
  }

  const onLoaded = (e) => {
    e.target.removeEventListener('load', onLoaded);
    e.target.removeEventListener('error', onLoaded);

    setTimeout(() => {
      if (onLoad) {
        onLoad(img);
      }
      resolve(img);
    }, 0);
  }

  img.addEventListener('load', onLoaded);
  img.addEventListener('error', onLoaded);

  if (src && img.getAttribute('src') !== src) {
    img.src = setSource(src);
    img.removeAttribute('data-src');
  }
  if (srcset && img.getAttribute('srcset') !== srcset) {
    img.srcset = setSource(srcset);
    img.removeAttribute('data-srcset');
  }
});

const lazyLoad = (el, { resize = false, selector = '[data-src], [data-srcset]', onLoad, onProgress, onStart, onError, setSource } = {}) => {
  if (!el) {
    return Promise.reject(el);
  }
  const images = Array.prototype.slice.call(el.querySelectorAll(selector));

  if (!images.length) {
    return Promise.resolve(el);
  }

  const height = resize ? el.clientHeight : 0;

  return Promise.all(images.map(img => loadImage(img, { onLoad, onProgress, onStart, onError, setSource })))
    .then(() => {
      if (height && typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }

      return images;
    })
}

export default lazyLoad;
