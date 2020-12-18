// setTimeout(() => {
//   if(!!window.React ||
//     !!document.querySelector('[data-reactroot], [data-reactid]'))
//    console.log('React.js');
// }, 5000);

/** function to inject traversal script into running tab's context */
function injectScript(func, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', func());
  th.appendChild(s);
}

getReactInfo = () => {
  let pathfindrHasRun = false; // memoize installing the hook
  let __ReactSight_ReactVersion;
  if (!pathfindrHasRun) {
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'object') {
      console.warn('[Pathfindr]: Pathfindr requires React Dev Tools to be installed.');
    } else { 
      const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers || null;
      const instance = reactInstances.get(1);
      // const reactRoot = window.document.body.childNodes;
      const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    
      (function installHook() {
        // no instance of React detected
        if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          console.log('Error: React DevTools not present. React Sight uses React DevTools to patch React\'s reconciler');
          return;
        }
        if (instance && instance.version) {
          __ReactSight_ReactVersion = instance.version;
          // onCommitFiberRoot
          devTools.onCommitFiberRoot = (function (original) {
            return function (...args) {
              __ReactSightFiberDOM = args[1];
              if (__ReactSightDebugMode) console.log('DOM: ', __ReactSightFiberDOM);
              // traverse16(__ReactSightFiberDOM);
              // return original(...args);
            };
          })(devTools.onCommitFiberRoot);
        } else console.log('[Pathfindr] React not found');
      })()
    }
    if (instance) {
      window.addEventListener('pathfindr', () => {
        console.log('get data here')
        console.log(instance)
      });
    }
    pathfindrHasRun = true;
  }
}

// Listening for events emitted from user's application *window.postMessage()*
window.addEventListener('message', (e) => {
  if (e.source !== window) return;
  // send message to background
  chrome.runtime.sendMessage(e.data, () => {
    if (typeof e.data === 'object') {
      // console.log('**Content-scripts** received data sending to devtools...', e.data);
    }
  });
});

chrome.runtime.onMessage.addListener(() => {
  const newEvent = new Event('Pathfindr');
  window.dispatchEvent(newEvent);
});

setTimeout(() => {
  injectScript(getReactInfo, 'body');
}, 5000);