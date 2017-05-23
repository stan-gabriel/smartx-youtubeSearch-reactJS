import React from 'react';
import {shape, string, number, func} from 'prop-types';

import './VideoItem.scss';

VideoItem.propTypes = {
  video: shape({
    title: string,
    thumbnails: shape({
      medium: shape({
        url: string
      })
    }),
    user: string,
    watches: number,
    upvotes: number
  }),
  handleVideo: func.isRequired
};

export default function VideoItem (props) {
  const {
    video,
    handleVideo,
    btnTitle = 'Save'
  } = props;
  const {
    title,
    thumbnails: {medium: {url}},
    user,
    watches,
    upvotes
  } = video;

  return (
    <div className='video-item'>
      <div className='img-container'>
        <img src={url} alt='item image' />
      </div>
      <div className='content'>
        <span className='title'>{title}</span>
        <span className='user'>{user}</span>
        <div className='watches'>
          {watches} views
        </div>
        <div className='upvotes'>
          <i className='fa fa-thumbs-up fa-2x' aria-hidden='true' />
          <span>{upvotes}</span>
        </div>
        <button onClick={() => handleVideo(video)}>{btnTitle}</button>
      </div>
    </div>
  );
}