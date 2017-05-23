import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, object, func} from 'prop-types';

import VideoItem from './VideoItem';
import {removeVideo} from './redux/actionCreators';

MyVideos.propTypes = {
  savedVideos: arrayOf(object),
  handleRemoveVideo: func
};

export function MyVideos ({savedVideos, handleRemoveVideo}) {
  return (
    <div className="search-videos">
      <div className="video-items-list">
      {savedVideos.map(
        (item, index) => (
          <VideoItem
            video={item}
            key={item.id || index}
            btnTitle="Remove"
            handleVideo={handleRemoveVideo}
          />
        )
      )}
      </div>
    </div>
  );
}

const mapStateToProps = ({savedVideos}) => {
  return {
    savedVideos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemoveVideo(video) {
      return dispatch(removeVideo(video));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyVideos);
