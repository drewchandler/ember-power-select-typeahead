import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PowerSelectTypeahead extends Component {
  get concatenatedTriggerClasses() {
    let classes = ['ember-power-select-typeahead-trigger'];
    let passedClass = this.args.triggerClass;
    if (passedClass) {
      classes.push(passedClass);
    }
    return classes.join(' ');
  }

  get concatenatedDropdownClasses() {
    let classes = ['ember-power-select-typeahead-dropdown'];
    let passedClass = this.args.dropdownClass;
    if (passedClass) {
      classes.push(passedClass);
    }
    return classes.join(' ');
  }

  @action
  onKeyDown(select, e) {
    let action = this.args.onkeydown;

    // if user passes `onkeydown` action
    if (action && action(select, e) === false) {
      return false;
    } else {
      // if escape, then clear out selection
      if (e.keyCode === 27) {
        select.actions.choose(null);
      }
    }
  }
}
