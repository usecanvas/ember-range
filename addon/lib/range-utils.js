import domUtils from 'ember-range/lib/dom-utils';

export default {
  isFirstPosition,
  isLastPosition,
};

function isFirstPosition(context) {
  return isPosition('first', context);
}

function isLastPosition(context) {
  return isPosition('last', context);
}

function isPosition(position, context = 'body') {
  const selection = window.getSelection();
  const range = selection.rangeCount ? selection.getRangeAt(0) : null;

  if (!range) {
    return false;
  }

  const firstLast = position === 'first' ? 'First' : 'Last';
  const { startContainer, startOffset } = range;

  if (!domUtils[`is${firstLast}Child`](startContainer, context)) {
    return false;
  }

  if (position === 'first' && startOffset === 0) {
    return true;
  }

  if (startContainer.nodeType === Node.TEXT_NODE) {
    const targetOffset = position === 'first' ?
      0 : startContainer.textContent.length;

    return startOffset === targetOffset;
  }

  const nonMetamorphs = domUtils.getNonMetamorphChildren(startContainer);
  const targetNode = position === 'first' ?
    nonMetamorphs[0] : nonMetamorphs[nonMetamorphs.length - 1];

  return startContainer.childNodes[startOffset - 1] === targetNode;
}
