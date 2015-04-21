import rangeUtils from 'ember-range/lib/range-utils';

describe('rangeUtils', () => {
  beforeEach(() => {
    updateRange();
  });

  it('exists', () => {
    expect(rangeUtils).to.be.ok();
  });

  describe('#isFirstPosition', () => {
    let container, context, text;

    beforeEach(() => {
      container = document.createElement('div');
      container.classList.add('container');
      context = document.createElement('div');
      context.classList.add('context');
      container.appendChild(context);
      document.body.appendChild(container);

      text = document.createTextNode('Test');
      context.appendChild(text);
    });

    afterEach(() => {
      container.remove();
    });

    it('is false when there is no selection', () => {
      document.getSelection().removeAllRanges();
      expect(rangeUtils.isFirstPosition()).to.be.false();
    });

    it('uses the body when not given a context', () => {
      container.insertBefore(context.cloneNode(), context);
      updateRange(text, 0);
      expect(rangeUtils.isFirstPosition()).to.be.false();
    });

    describe('when the range occupies the first position', () => {
      beforeEach(() => {
        updateRange(text, 0);
      });

      describe('and the start container is an element node', () => {
        it('is true', () => {
          updateRange(context, 0);
          expect(rangeUtils.isFirstPosition('.container')).to.be.true();
        });

        describe('and the start container starts with metamorph children', () => {
          it('is true', () => {
            container.appendChild(document.createTextNode(''));
            updateRange(context, 0);
            expect(rangeUtils.isFirstPosition('.container')).to.be.true();
          });
        });
      });

      describe('and the start container is a text node', () => {
        it('is true', () => {
          expect(rangeUtils.isFirstPosition('.context')).to.be.true();
        });
      });
    });

    describe('when the range does not occupy the first position', () => {
      it('false', () => {
        updateRange(text, 1);
        expect(rangeUtils.isFirstPosition('.context')).to.be.false();
      });
    });
  });

  describe('#isLastPosition', () => {
    let container, context, text;

    beforeEach(() => {
      container = document.createElement('div');
      container.classList.add('container');
      context = document.createElement('div');
      context.classList.add('context');
      container.appendChild(context);
      document.body.appendChild(container);

      text = document.createTextNode('Test');
      context.appendChild(text);
    });

    afterEach(() => {
      container.remove();
    });

    it('is false when there is no selection', () => {
      document.getSelection().removeAllRanges();
      expect(rangeUtils.isLastPosition()).to.be.false();
    });

    it('uses the body when not given a context', () => {
      container.appendChild(context.cloneNode());
      updateRange(text, 0);
      expect(rangeUtils.isLastPosition()).to.be.false();
    });

    describe('when the range occupies the last position', () => {
      describe('and the start container is a text node', () => {
        it('is true', () => {
          updateRange(text, text.textContent.length);
          expect(rangeUtils.isLastPosition('.context')).to.be.true();
        });
      });

      describe('and the start container is an element node', () => {
        it('is true', () => {
          updateRange(context, context.childNodes.length);
          expect(rangeUtils.isLastPosition('.container')).to.be.true();
        });

        describe('and the start container ends with metamorph children', () => {
          it('is true', () => {
            container.appendChild(document.createTextNode(''));
            updateRange(context, context.childNodes.length);
            expect(rangeUtils.isLastPosition('.container')).to.be.true();
          });
        });
      });
    });

    describe('when the range does not occupy the first position', () => {
      it('false', () => {
        updateRange(text, 1);
        expect(rangeUtils.isLastPosition('.context')).to.be.false();
      });
    });
  });
});

function updateRange(startContainer, startOffset, endContainer, endOffset) {
  const range = document.createRange();

  if (startContainer) {
    range.setStart(startContainer, startOffset || 0);
  }

  if (endContainer) {
    range.setEnd(endContainer, endOffset || 0);
  }

  document.getSelection().removeAllRanges();
  document.getSelection().addRange(range);
}
