import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, object, bool, func, number} from 'prop-types';

import VideoItem from './VideoItem';
import Filters from './Filters';
import './SearchVideos.scss';
import {saveVideo, filterVideos} from './redux/actionCreators';

SearchVideos.propTypes = {
  searchItems: arrayOf(object),
  handleSaveVideo: func,
  handleSliderValue: func,
  sliderValue: number
};

export function SearchVideos ({
  searchItems,
  handleSaveVideo,
  handleSliderValue,
  sliderValue,
  minSliderValue,
  maxSliderValue
}) {
  return (
    <div className='search-videos'>
      {
        searchItems.length > 0 &&
        <Filters
          handleSliderValue={handleSliderValue}
          sliderValue={sliderValue}
          minSliderValue={minSliderValue}
          maxSliderValue={maxSliderValue}
        />
      }
      <div className='video-items-list'>
        {
          searchItems.map(
            (item, index) => (
              <VideoItem
                video={item}
                key={item.id || index}
                handleVideo={handleSaveVideo}
              />
            )
          )
        }
      </div>
    </div>
  );
}
const mapStateToProps = ({
  sliderValue,
  searchItems,
  loading,
  minSliderValue,
  maxSliderValue
}) => {
  return {
    searchItems,
    loading,
    sliderValue,
    minSliderValue,
    maxSliderValue
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveVideo (video) {
      return dispatch(saveVideo(video));
    },
    handleSliderValue ({target:{value}}) {
      return dispatch(filterVideos(Number(value))(dispatch));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideos);
