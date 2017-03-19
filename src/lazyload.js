const loadImage = (img, { onLoad, onProgress, onStart, onError } = {}) => new Promise((resolve, reject) => {
  const src = img.getAttribute('data-src');
  const srcset = img.getAttribute('data-srcset');

  if (!(src || srcset)) {
    resolve(img);
  }

  const onLoaded = (e) => {
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
    img.src = src;
    img.removeAttribute('data-src');
  }
  if (srcset && img.getAttribute('srcset') !== srcset) {
    img.srcset = srcset;
    img.removeAttribute('data-srcset');
  }
});

const lazyLoad = (el, { resize = false, selector = '[data-src], [data-srcset]', onLoad = null } = {}) => {
  if (!el) {
    return Promise.reject(el);
  }
  const images = Array.prototype.slice.call(el.querySelectorAll(selector));

  if (!images.length) {
    return Promise.resolve(el);
  }

  const height = resize ? el.clientHeight : 0;

  return Promise.all(images.map(img => loadImage(img, { onLoad })))
    .then(() => {
      if (height && typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }

      return images;
    })
}

export default lazyLoad;
