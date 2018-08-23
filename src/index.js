// TODO: Handle resizing https://www.npmjs.com/package/react-resize-detector
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Style from 'style-it';

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    primaryColor: PropTypes.string, 
    fadeColor: PropTypes.string,
    fadeHeight: PropTypes.string,
  }

  state = {
    overlayClasses: []
  }

  componentDidMount() {
    this.handleScroll();
  }

  handleScroll = () => {
    const scrollableScrollTop = this.scrollableElement.scrollTop;
    const scrollableHeight = this.scrollableElement.clientHeight;
    const contentHeight = this.contentElement.clientHeight;
    const diff = scrollableScrollTop - contentHeight;
    const atBottom = this.scrollableElement.scrollHeight === contentHeight + scrollableScrollTop;
    const overlayClasses = [];
    if (scrollableScrollTop === 0) {
      overlayClasses.push("top");
    } 
    if (atBottom) {
      overlayClasses.push("bottom");
    }
    this.setState({overlayClasses});
  }

  render() {
    const {
      children,
      fadeColor,
      primaryColor,
      fadeHeight,
    } = this.props
    const { overlayClasses } = this.state;
    return (
    <Style>
      {`
        .${styles.overlay}:before {
          background: linear-gradient(${primaryColor}, ${fadeColor});
          height: ${fadeHeight};
        }
        .${styles.overlay}:after {
          background: linear-gradient(${fadeColor}, ${primaryColor});
          height: ${fadeHeight};
        }
     `}
        <div className={styles.container}>
          <div className={styles.scrollable} onScroll={this.handleScroll} ref={r => (this.scrollableElement = r)}>
            <div className={`${styles.overlay} ${overlayClasses.map(s => styles[s])}`}></div>
            <div className={styles.content} ref={r => (this.contentElement = r)}>
              {children}
            </div>
          </div>
        </div>
      </Style>
    )
  }
}

ExampleComponent.defaultProps = {
    primaryColor: "#ffffff",
    fadeColor: "transparent",
    fadeHeight: "20px",
};