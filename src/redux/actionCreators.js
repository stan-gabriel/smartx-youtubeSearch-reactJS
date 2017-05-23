import axios from 'axios';
import jsonp from 'jsonp';

import {
  SEARCH_YOUTUBE_FAILURE,
  SEARCH_YOUTUBE_REQUEST,
  SEARCH_YOUTUBE_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_SUGGESTIONS_SUCCESS,
  SAVE_VIDEO,
  SET_ACTIVE_TAB,
  SET_INPUT_VALUE,
  NOOP,
  REMOVE_VIDEO,
  SET_SLIDER_VALUE,
  FILTER_VIDEOS
} from './actions';
import {API_KEY, MAIN_URL} from '../shared/constants';

export function searchYoutube (searchTerm) {
  return async function (dispatch) {
    const searchUrl = `${MAIN_URL}/search?part=snippet&maxResults=50&q=${searchTerm}&key=${API_KEY}`;
    dispatch({type: SEARCH_YOUTUBE_REQUEST});

    try {
      let {data} = await axios.get(searchUrl);
      const itemIDs = data.items.map(({id: {videoId}}) => videoId).join();

      const itemsStatisticsUrl = `${MAIN_URL}/videos?part=statistics&id=${itemIDs}&key=${API_KEY}`;
      const statisticsResponse = await axios.get(itemsStatisticsUrl);

      const items = data
        .items
        .map(({id: {videoId}, snippet: {title, channelTitle: user, thumbnails, publishedAt}}, index) => {
          const {statistics: {viewCount, likeCount}} = statisticsResponse.data.items[index] ||
          {statistics: {viewCount: 0, likeCount: 0}};
          return {
            id: videoId,
            title,
            user,
            thumbnails,
            watches: viewCount,
            upvotes: likeCount,
            publishedYear: new Date(publishedAt).getFullYear()
          };
        });

      const publishedYears = items.map(item => item.publishedYear);

      dispatch({
        type: SEARCH_YOUTUBE_SUCCESS,
        items,
        minSliderValue: Math.min.apply(Math, publishedYears),
        maxSliderValue: Math.max.apply(Math, publishedYears)
      });
    } catch (error) {
      console.log(error);
      dispatch({type: SEARCH_YOUTUBE_FAILURE, error});
    }
  };
}

export function fetchSuggestions (searchTerm) {
  return async function (dispatch) {
    dispatch({type: FETCH_SUGGESTIONS_REQUEST});
    const suggestionsUrl = `http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=${encodeURI(searchTerm)}`;
    jsonp(suggestionsUrl, null, (error, data) => {
      if (error) {
        dispatch({type: FETCH_SUGGESTIONS_FAILURE, error});
      } else {
        const [, suggestions] = data;
        dispatch({type: FETCH_SUGGESTIONS_SUCCESS, suggestions: suggestions.map(suggestion => suggestion[0])});
      }
    });
  };
}

export function saveVideo (video) {
  let savedVideos = localStorage.getItem('savedVideos'); // eslint-disable-line
  if (savedVideos === null) {
    savedVideos = [];
  } else {
    savedVideos = JSON.parse(savedVideos);
  }

  if (savedVideos.find(v => v.id === video.id)) {
    return {type: NOOP};
  }

  savedVideos.push(video);
  localStorage.setItem('savedVideos', JSON.stringify(savedVideos)); // eslint-disable-line

  return {type: SAVE_VIDEO, video};
}

export function removeVideo (video) {
  let savedVideos = localStorage.getItem('savedVideos'); // eslint-disable-line
  if (savedVideos === null) {
    savedVideos = [];
  } else {
    savedVideos = JSON.parse(savedVideos);
  }

  const index = savedVideos.findIndex(v => v.id === video.id);
  savedVideos = [
    ...savedVideos.slice(0, index),
    ...savedVideos.slice(index + 1)
  ];
  localStorage.setItem('savedVideos', JSON.stringify(savedVideos)); // eslint-disable-line

  return {type: REMOVE_VIDEO, index};
}

export function setActiveTab (tab) {
  return {
    type: SET_ACTIVE_TAB,
    tab
  }
}

export function setInputValue (value) {
  return {
    type: SET_INPUT_VALUE,
    value
  }
}

export function filterVideos (filterValue) {
  return (dispatch) => dispatch((dispatch, getState) => {
    const {unfilteredSavedVideos} = getState();
    return {
      type: FILTER_VIDEOS,
      videos: unfilteredSavedVideos.filter(({publishedYear}) => publishedYear >= filterValue),
      filterValue
    };
  });
}
