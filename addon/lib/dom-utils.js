const toArray = arr => Array.prototype.slice.call(arr);

export default {
  getNonMetamorphChildren,
  isFirstChild,
  isLastChild,
};

function getNonMetamorphChildren(node) {
  return toArray(node.childNodes).filter(node => !isMetamorph(node));
}

function isFirstChild(node, context) {
  return isPositionalChild('first', node, context);
}

function isLastChild(node, context) {
  return isPositionalChild('last', node, context);
}

function isPositionalChild(position, node, context = 'body') {
  const nextPrev = position === 'first' ? 'previous' : 'next';

  while (node[`${nextPrev}Sibling`] && (node = node[`${nextPrev}Sibling`])) {
    if (!isMetamorph(node)) {
      return false;
    }
  }

  if (node.parentElement && !node.parentElement.matches(context)) {
    return isPositionalChild(position, node.parentElement, context);
  }

  return true;
}

function isMetamorph(node) {
  return node.nodeType === Node.TEXT_NODE && node.textContent === '';
}
