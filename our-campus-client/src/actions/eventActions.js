import axios from "axios";
import {
  EVENT_LIST_FAIL,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_REQUEST,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_CREATE_REVIEW_REQUEST,
  EVENT_CREATE_REVIEW_SUCCESS,
  EVENT_CREATE_REVIEW_FAIL,
  EVENT_TOP_REQUEST,
  EVENT_TOP_SUCCESS,
  EVENT_TOP_FAIL,
} from "../constants/eventConstants";

export const listEvents =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: EVENT_LIST_REQUEST });
      const { data } = await axios.get(
        `/events?keyword=${keyword}`
      );

      dispatch({
        type: EVENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listEventtDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });
    const { data } = await axios.get(`/events/${id}`);

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/events/${id}`, config);
    dispatch({
      type: EVENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEvent = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/events`, {}, config);
    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEvent = (event) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/events/${event._id}`,
      event,
      config
    );
    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEventReview =
  (eventId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/events/${eventId}/reviews`, review, config);
      dispatch({
        type: EVENT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: EVENT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopEvents = () => async (dispatch) => {
  try {
    dispatch({ type: EVENT_TOP_REQUEST });
    const { data } = await axios.get(`/events/top`);

    dispatch({
      type: EVENT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
