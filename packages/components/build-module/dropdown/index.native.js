/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
class Dropdown extends Component {
  constructor() {
    super(...arguments);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      isOpen: false
    };
  }
  componentWillUnmount() {
    const {
      isOpen
    } = this.state;
    const {
      onToggle
    } = this.props;
    if (isOpen && onToggle) {
      onToggle(false);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      isOpen
    } = this.state;
    const {
      onToggle
    } = this.props;
    if (prevState.isOpen !== isOpen && onToggle) {
      onToggle(isOpen);
    }
  }
  toggle() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }
  close() {
    this.setState({
      isOpen: false
    });
  }
  render() {
    const {
      isOpen
    } = this.state;
    const {
      renderContent,
      renderToggle
    } = this.props;
    const args = {
      isOpen,
      onToggle: this.toggle,
      onClose: this.close
    };
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [renderToggle(args), isOpen && renderContent(args)]
    });
  }
}
export default Dropdown;
//# sourceMappingURL=index.native.js.map