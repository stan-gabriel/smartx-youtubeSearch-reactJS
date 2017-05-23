/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Typeahead from 'react-typeahead2';
import {func, string, arrayOf} from 'prop-types';

import setOptionTemplate from './OptionsTemplate';
import {fetchSuggestions, searchYoutube, setInputValue} from './redux/actionCreators';
import './YoutubeAutocomplete.scss';

class YoutubeAutocomplete extends Component {
  static propTypes = {
    handleChange: func,
    onDropDownClose: func,
    placeHolder: string,
    className: string,
    suggestions: arrayOf(string)
  };

  handleChange = ({target:{value}}) => {
    this.props.handleInputValue(value);
    this.props.handleChange(value);
  };

  onClick = ({suggestion}) => {
    this.props.handleInputValue(suggestion);
  };

  onDropDownClose = () => {
    this.props.handleInputValue(this.props.inputValue);
  };

  render () {
    const {
      placeHolder,
      className,
      suggestions,
      inputValue
    } = this.props;

    return <div>
      <Typeahead
        value={inputValue}
        options={suggestions.map((suggestion, index) => ({id: index, suggestion}))}
        displayKey='suggestion'
        optionTemplate={setOptionTemplate('option-template')}
        onChange={this.handleChange}
        onOptionClick={this.onClick}
        onOptionChange={this.onClick}
        onBlur={this.onDropDownClose}
      />
    </div>
  }
}

const mapStateToProps = ({suggestions, inputValue}) => {
  return {suggestions, inputValue};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(searchTerm){
      return dispatch(fetchSuggestions(searchTerm));
    },
    handleInputValue(value) {
      return dispatch(setInputValue(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeAutocomplete);