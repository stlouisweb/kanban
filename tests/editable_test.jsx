import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  Simulate
  } from 'react-addons-test-utils';
import assert from 'assert';
import Editable from '../app/components/Editable.jsx';

describe('Editable', () => {
  it('triggers onValueClick', () => {
  let triggered = false;
  const value = 'value';
  const onValueClick = () => triggered = true;
  const component = renderIntoDocument(
  <Editable value={value} onValueClick={onValueClick} />
  );
  const valueComponent = findRenderedDOMComponentWithClass(component, 'value');
  Simulate.click(valueComponent);
  assert.equal(triggered, true);
  });

  it('triggers onEdit', () => {
    let triggered = false;
    const newValue = 'value';
    const onEdit = (val) => {
      triggered = true;
      assert.equal(val, newValue);
    };
    const component = renderIntoDocument(
      <Editable editing={true} value={'value'} onEdit={onEdit} />
    );
    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = newValue;
    Simulate.blur(input);
    assert.equal(triggered, true);
  });

  it('triggers checkEnter', () => {
    let triggered = false;
    const newValue = 'value enter';
    const onEdit = (val) => {
      triggered = true;
      assert.equal(val, newValue);
    };
    const component = renderIntoDocument(
      <Editable editing={true} value={'value enter'} onEdit={onEdit} />
    );
    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = newValue;
    Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
    assert.equal(triggered, false);
  });

  it('allows deletion', () => {
    let deleted = false;
    const onDelete = () => {
      deleted = true;
    };
    const component = renderIntoDocument(
      <Editable value={'value'} onDelete={onDelete} />
    );
    let deleteComponent = findRenderedDOMComponentWithClass(component, 'delete');
      Simulate.click(deleteComponent);
      assert.equal(deleted, true);
  });
});
