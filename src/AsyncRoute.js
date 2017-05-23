import React, {Component} from 'react';
import {object} from 'prop-types';

class AsyncRoute extends Component {
  constructor () {
    super();

    this.state = {
      loaded: false
    };
  }

  componentDidMount () {
    this.props.loadingPromise.then((module) => {
      this.component = module.default;
      this.setState({loaded: true});
    });
  }

  render () {
    if (this.state.loaded) {
      return (<this.component {...this.props.props} />);
    } else {
      return (<div></div>);
    }
  }
}

AsyncRoute.propTypes = {
  props: object,
  loadingPromise: object
};

export default AsyncRoute;
