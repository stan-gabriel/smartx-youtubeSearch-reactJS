import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {string, func} from 'prop-types';

import YoutubeAutocomplete from './YoutubeAutocomplete';
import {setActiveTab, searchYoutube} from './redux/actionCreators';
import {TABS} from './shared/constants';
import './Header.scss';

Header.propTypes = {
  tab: string,
  handleSearch: func,
  handleActiveTab: func
};

function Header ({
  handleActiveTab,
  tab,
  handleSearch
}) {
  const isSearchYoutubeTab = tab === TABS.SEARCH_YOUTUBE;
  const selectedClassName = isSearchYoutubeTab ? 'search-youtube-selected' : 'my-videos-selected';
  return (
    <div className='header'>
      <div className={`links-container ${selectedClassName}`}>
        <Link
          to='/'
          onClick={handleActiveTab('/')}
        >
          Search Youtube
        </Link>
        <Link
          to='/my-videos'
          onClick={handleActiveTab('/my-videos')}
        >
          My Videos
        </Link>
      </div>
      {
        isSearchYoutubeTab &&
        <div className='autocomplete-container'>
          <YoutubeAutocomplete />
          <button onClick={handleSearch}>Search</button>
        </div>
      }
    </div>
  );
}

const mapStateToProps = ({tab}) => {
  return {tab};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleActiveTab (url)  {
      return () => {
        dispatch(setActiveTab(url));
      };
    },
    handleSearch () {
      dispatch((dispatch, getState) => {
        const {inputValue} = getState();
        dispatch(searchYoutube(inputValue));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
