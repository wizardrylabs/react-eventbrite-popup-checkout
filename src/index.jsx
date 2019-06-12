import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export default class EventbritePopupCheckout extends React.Component {

  state = { isEventbriteLoaded: false };

  /** @type {string} */
  elementId = uuid();

  /** @type {string} */
  get scriptId() {
    return `eb-script-${this.elementId}`;
  }

  /** @type {string} */
  get buttonId() {
    return `eb-button-${this.elementId}`;
  }

  /** @returns {Promise<{ createWidget: Function }>} */
  fetchEBWidgets = () => new Promise((resolve, reject) => {
    if (window.EBWidgets) {
      return resolve(window.EBWidgets);
    }

    const { ebScriptPath } = this.props;
    const script = document.createElement('script');
    script.id = this.scriptId;
    script.async = true;
    script.src = ebScriptPath;
    script.addEventListener('load', () => resolve(window.EBWidgets));

    /** @param {Error} e */
    const handleErr = e => {
      console.error(`Failed to load Eventbrite script from ${ebScriptPath}`);
      reject(e);
    };
    script.addEventListener('error', handleErr);
    script.addEventListener('abort', handleErr);

    document.head.appendChild(script);
  });

  handleClick = () => {
    if (this.state.isEventbriteLoaded) { return; }
    const url = `https://www.eventbrite.com/e/${this.props.ebEventId}`;
    window.open(url, '_blank');
  };

  /** @returns {Promise<void>} */
  async componentWillMount() {
    try {
      const EBWidgets = await this.fetchEBWidgets();

      EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: this.props.ebEventId,
        modal: this.props.isModal,
        modalTriggerElementId: this.buttonId,
        onOrderComplete: this.props.onOrderComplete
      });

      this.setState({ isEventbriteLoaded: true });
    } catch (e) {
      this.setState({ isEventbriteLoaded: false })
    }
  }

  componentWillUnmount() {
    const script = document.getElementById(this.scriptId);

    if (script) {
      script.remove();
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <button
        id={this.buttonId}
        className={className}
        onClick={this.handleClick}>{children}</button>
    )
  }

  static propTypes = {
    className: PropTypes.string,
    ebEventId: PropTypes.string.isRequired,
    ebScriptPath: PropTypes.string,
    isModal: PropTypes.bool,
    onOrderComplete: PropTypes.func
  };

  static defaultProps = {
    className: '',
    ebScriptPath: 'https://www.eventbrite.ca/static/widgets/eb_widgets.js',
    isModal: true,
    onOrderComplete: () => {}
  };

}
