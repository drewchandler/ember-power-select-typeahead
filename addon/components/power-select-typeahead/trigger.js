import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { isBlank } from '@ember/utils';

export default class PowerSelectTypeaheadTrigger extends Component {
  @tracked text = '';

  /**
   * power-select updates the state of the publicAPI (select) for every typeahead
   * so we capture this as `state` via oldSelect && newSelect
   *
   * @private
   * @method updateSelect
   */
  @action
  updateSelect(_, [select]) {
    let { oldSelect } = this;
    this.oldSelect = select;

    if (!oldSelect) {
      return;
    }

    /*
     * We need to update the input field with value of the selected option whenever we're closing
     * the select box.
     */
    if (oldSelect.isOpen && !select.isOpen && select.searchText) {
      let input = document.querySelector(`#ember-power-select-typeahead-input-${select.uniqueId}`);
      let newText = this.getSelectedAsText();
      if (input.value !== newText) {
        input.value = newText;
      }

      this.text = newText;
    }

    if (select.lastSearchedText !== oldSelect.lastSearchedText) {
      if (isBlank(select.lastSearchedText)) {
        schedule('actions', null, select.actions.close, null, true);
      } else {
        schedule('actions', null, select.actions.open);
      }
    }

    if (oldSelect.selected !== select.selected) {
      this.text = this.getSelectedAsText();
    }
  }

  /**
   * on mousedown prevent propagation of event
   *
   * @private
   * @method stopPropagation
   * @param {Object} event
   */
  @action
  stopPropagation(e) {
    e.stopPropagation();
  }

  /**
   * called from power-select internals
   *
   * @private
   * @method handleKeydown
   * @param {Object} event
   */
  @action
  handleKeydown(e) {
    // up or down arrow and if not open, no-op and prevent parent handlers from being notified
    if ([38, 40].indexOf(e.keyCode) > -1 && !this.args.select?.isOpen) {
      e.stopPropagation();
      return;
    }
    let isLetter = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 32; // Keys 0-9, a-z or SPACE
    // if isLetter, escape or enter, prevent parent handlers from being notified
    if (isLetter || [13, 27].indexOf(e.keyCode) > -1) {
      let { select } = this.args;
      // open if loading msg configured
      if (!select.isOpen && this.args.loadingMessage) {
        schedule('actions', null, select.actions.open);
      }
      e.stopPropagation();
    }

    // optional, passed from power-select
    let onkeydown = this.args.onKeydown;
    if (onkeydown && onkeydown(e) === false) {
      return false;
    }
  }

  /**
   * obtains seleted value based on complex object or primitive value from power-select publicAPI
   *
   * @private
   * @method getSelectedAsText
   */
  getSelectedAsText() {
    let labelPath = this.args.extra?.labelPath;
    let value;
    if (labelPath) {
      // complex object
      value = this.args.select?.selected?.[labelPath];
    } else {
      // primitive value
      value = this.args.select?.selected;
    }
    if (value === undefined) {
      value = '';
    }
    return value;
  }
}
