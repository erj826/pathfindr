setTimeout(() => {
  if(!!window.React ||
    !!document.querySelector('[data-reactroot], [data-reactid]'))
   console.log('React.js');
}, 5000);

function installHook() {
  let __ReactSightFiberDOM;

  function createComponentRecursively(node, parents) {
    const newComponent = {
      // name: '',
      // children: [],
      // state: null,
      props: null,
      // id: null,
      // isDOM: null,
    };

    if (node.type) {
      // if (node.type.name) {
      //   newComponent.name = node.type.name;
      //   newComponent.isDOM = false;
      // }
      // else {
      //   newComponent.name = node.type;
      //   newComponent.isDOM = true;
      // }
      if (node.type.propTypes) {
        newComponent.props = Object.keys(node.type.propTypes)
      }
    }
    // only add if props were found
    if (newComponent.props) parents.push(newComponent);
    if (node.child != null) createComponentRecursively(node.child, parents);
    // if (node.sibling != null) createComponentRecursively(node.sibling, parents);
  }

  function componentTreeCreator(node) {
    const components = [];
    createComponentRecursively(node.current.child, components)
    console.log(components)
  }
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers || null;
    const instance = reactInstances.get(1);

    // onCommitFiberRoot
    devTools.onCommitFiberRoot = (function (original) {
      return function (...args) {
        __ReactSightFiberDOM = args[1];
        componentTreeCreator(__ReactSightFiberDOM);
        return original(...args);
      };
    })(devTools.onCommitFiberRoot);
  } else {
    console.log('sadly didnt find react dev tools')
  }
}

// execute the install hook in web page context
const script = document.createElement('script');
script.textContent = `;(${installHook.toString()})();`;
document.documentElement.appendChild(script);