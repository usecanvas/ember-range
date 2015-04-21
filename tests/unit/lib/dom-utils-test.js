import domUtils from 'ember-range/lib/dom-utils';

describe('DomUtils', () => {
  it('exists', () => {
    expect(domUtils).to.be.ok();
  });

  describe('#isFirstChild', () => {
    let container, context, morph, node;

    beforeEach(() => {
      container = document.createElement('div');
      context = document.createElement('div');
      context.classList.add('context');
      container.appendChild(context);
      document.body.appendChild(container);

      morph = document.createTextNode('');
      node = document.createElement('div');
    });

    afterEach(() => {
      container.remove();
    });

    describe('when not given a context', () => {
      afterEach(() => {
        node.remove();
      });

      it('uses the body', () => {
        document.body.insertBefore(node, document.body.firstChild);
        expect(domUtils.isFirstChild(node)).to.be.true();
      });
    });

    it('ignores nodes before the given context', () => {
      container.insertBefore(node.cloneNode(), context);
      expect(domUtils.isFirstChild(node, '.context')).to.be.true();
    });

    describe('when the node is the first node', () => {
      it('is true', () => {
        context.appendChild(node);
        expect(domUtils.isFirstChild(node, '.context')).to.be.true();
      });
    });

    describe('when the node is preceded by metamorphs', () => {
      it('is true', () => {
        context.appendChild(morph);
        context.appendChild(node);
        expect(domUtils.isFirstChild(node, '.context')).to.be.true();
      });
    });

    describe('when the node is an ancestor of the first node', () => {
      let parent;

      beforeEach(() => {
        parent = document.createElement('div');
        parent.appendChild(node);
        context.appendChild(parent);
      });

      it('is true', () => {
        expect(domUtils.isFirstChild(node, '.context')).to.be.true();
      });

      describe('and the ancestor is preceded by metamorphs', () => {
        beforeEach(() => {
          context.insertBefore(morph, parent);
        });

        it('is true', () => {
          expect(domUtils.isFirstChild(node, '.context')).to.be.true();
        });
      });
    });

    describe('when the node is preceded by non-metamorph nodes', () => {
      it('is false', () => {
        context.appendChild(node.cloneNode());
        context.appendChild(node);
        expect(domUtils.isFirstChild(node)).to.be.false();
      });
    });

    describe('when the node is an ancestor of a not-first node', () => {
      beforeEach(() => {
        const parent = document.createElement('div');
        parent.appendChild(node);
        context.appendChild(parent);
        context.insertBefore(node.cloneNode(), parent);
      });

      it('is false', () => {
        expect(domUtils.isFirstChild(node, '.context')).to.be.false();
      });
    });
  });

  describe('#isLastChild', () => {
    let container, context, morph, node;

    beforeEach(() => {
      container = document.createElement('div');
      context = document.createElement('div');
      context.classList.add('context');
      container.appendChild(context);
      document.body.appendChild(container);

      morph = document.createTextNode('');
      node = document.createElement('div');
    });

    afterEach(() => {
      container.remove();
    });

    describe('when not given a context', () => {
      afterEach(() => {
        node.remove();
      });

      it('uses the body', () => {
        document.body.appendChild(node);
        expect(domUtils.isLastChild(node)).to.be.true();
      });
    });

    it('ignores nodes before the given context', () => {
      container.insertBefore(node.cloneNode(), context.nextSibling);
      expect(domUtils.isLastChild(node, '.context')).to.be.true();
    });

    describe('when the node is the last node', () => {
      it('is true', () => {
        context.appendChild(node);
        expect(domUtils.isLastChild(node, '.context')).to.be.true();
      });
    });

    describe('when the node is followed by metamorphs', () => {
      it('is true', () => {
        context.appendChild(node);
        context.appendChild(morph);
        expect(domUtils.isLastChild(node, '.context')).to.be.true();
      });
    });

    describe('when the node is an ancestor of the last node', () => {
      let parent;

      beforeEach(() => {
        parent = document.createElement('div');
        parent.appendChild(node);
        context.appendChild(parent);
      });

      it('is true', () => {
        expect(domUtils.isLastChild(node, '.context')).to.be.true();
      });

      describe('and the ancestor is preceded by metamorphs', () => {
        beforeEach(() => {
          context.insertBefore(morph, parent);
        });

        it('is true', () => {
          expect(domUtils.isLastChild(node, '.context')).to.be.true();
        });
      });
    });

    describe('when the node is followed by non-metamorph nodes', () => {
      it('is false', () => {
        context.appendChild(node);
        context.appendChild(node.cloneNode());
        expect(domUtils.isLastChild(node)).to.be.false();
      });
    });

    describe('when the node is an ancestor of a not-last node', () => {
      beforeEach(() => {
        const parent = document.createElement('div');
        parent.appendChild(node);
        context.appendChild(parent);
        context.appendChild(node.cloneNode());
      });

      it('is false', () => {
        expect(domUtils.isLastChild(node, '.context')).to.be.false();
      });
    });
  });

  describe('#getNonMetamorphChildren', () => {
    let element, node, text;

    beforeEach(() => {
      node = document.createElement('div');
      element = document.createElement('div');
      text = document.createTextNode('Text');
      node.appendChild(element);
      node.appendChild(document.createTextNode(''));
      node.appendChild(text);
    });

    it('returns the non-metamorph children of the node', () => {
      expect(domUtils.getNonMetamorphChildren(node)).to.eql([element, text]);
    });
  });
});
