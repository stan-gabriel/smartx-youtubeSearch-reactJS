import {
  SEARCH_YOUTUBE_REQUEST, SEARCH_YOUTUBE_SUCCESS, SEARCH_YOUTUBE_FAILURE,
  FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_REQUEST, FETCH_SUGGESTIONS_FAILURE,
  SAVE_VIDEO, SET_ACTIVE_TAB, SET_INPUT_VALUE, REMOVE_VIDEO, SET_SLIDER_VALUE, FILTER_VIDEOS
} from './actions';
import {TABS} from '../shared/constants';

const DEFAULT_STATE = {
  searchItems: [],
  suggestions: [],
  loading: false,
  savedVideos: JSON.parse(localStorage.getItem('savedVideos')) || [],
  tab: TABS.SEARCH_YOUTUBE,
  inputValue: '',
  sliderValue: 2000,
  minSliderValue: 0,
  maxSliderValue: 2017,
  unfilteredSavedVideos: JSON.parse(localStorage.getItem('savedVideos')) || []
};

function rootReducer (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SEARCH_YOUTUBE_SUCCESS:
      return Object.assign({}, state, {
        searchItems: action.items,
        loading: false,
        minSliderValue: action.minSliderValue,
        maxSliderValue: action.maxSliderValue,
        unfilteredSavedVideos: action.items
      });

    case FETCH_SUGGESTIONS_SUCCESS:
      return Object.assign({}, state, {
        suggestions: action.suggestions,
        loading: false
      });

    case SAVE_VIDEO:
      return Object.assign({}, state, {
        savedVideos: [...state.savedVideos, action.video]
      });

    case SET_ACTIVE_TAB:
      return Object.assign({}, state, {
        tab: action.tab
      });

    case SET_INPUT_VALUE:
      return Object.assign({}, state, {
        inputValue: action.value
      });

    case REMOVE_VIDEO:
      return Object.assign({}, state, {
        savedVideos: [
          ...state.savedVideos.slice(0, action.index),
          ...state.savedVideos.slice(action.index + 1)
        ]
      });

    case FILTER_VIDEOS:
      return Object.assign({}, state, {
        searchItems: action.videos,
        sliderValue: action.filterValue
      });

    case SEARCH_YOUTUBE_REQUEST:
    case FETCH_SUGGESTIONS_REQUEST:
      return Object.assign({}, state, {loading: true});

    case SEARCH_YOUTUBE_FAILURE:
    case FETCH_SUGGESTIONS_FAILURE:
      return Object.assign({}, state, {loading: false});

    default:
      return state;
  }
}

export default rootReducer;
