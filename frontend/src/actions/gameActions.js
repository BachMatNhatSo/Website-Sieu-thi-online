import axios from 'axios';

import {
    ALL_GAMES_REQUEST,
    ALL_GAMES_SUCCESS,
    ALL_GAMES_FAIL,
    ADMIN_GAMES_REQUEST,
    ADMIN_GAMES_SUCCESS,
    ADMIN_GAMES_FAIL,
    NEW_GAME_REQUEST,
    NEW_GAME_SUCCESS,
    NEW_GAME_FAIL,
    DELETE_GAME_REQUEST,
    DELETE_GAME_SUCCESS,
    DELETE_GAME_FAIL,
    UPDATE_GAME_REQUEST,
    UPDATE_GAME_SUCCESS,
    UPDATE_GAME_FAIL,
    GAME_DETAILS_REQUEST,
    GAME_DETAILS_SUCCESS,
    GAME_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/gameConstants'

export const getGames = (keyword = '', currentPage = 1, downloads, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_GAMES_REQUEST })

        let link = `/api/v1/games?keyword=${keyword}&page=${currentPage}&downloads[gte]=${downloads}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/games?keyword=${keyword}&page=${currentPage}&downloads[gte]=${downloads}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_GAMES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_GAMES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newGame = (gameData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_GAME_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/game/new`, gameData, config)

        dispatch({
            type: NEW_GAME_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_GAME_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete game (Admin)
export const deleteGame = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GAME_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/game/${id}`)

        dispatch({
            type: DELETE_GAME_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_GAME_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Game (ADMIN)
export const updateGame = (id, gameData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_GAME_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/game/${id}`, gameData, config)

        dispatch({
            type: UPDATE_GAME_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_GAME_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getGameDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: GAME_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/game/${id}`)

        dispatch({
            type: GAME_DETAILS_SUCCESS,
            payload: data.game
        })

    } catch (error) {
        dispatch({
            type: GAME_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (gameId, reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/games/${gameId}/reviews`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminGames = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_GAMES_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/games`)

        dispatch({
            type: ADMIN_GAMES_SUCCESS,
            payload: data.games
        })

    } catch (error) {

        dispatch({
            type: ADMIN_GAMES_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get game reviews
export const getGameReviews = (gameId) => async (dispatch) => {
    try {
      dispatch({ type: GET_REVIEWS_REQUEST });
  
      const { data } = await axios.get(`/api/games/${gameId}/reviews`);
  
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

// Delete game review
export const deleteReview = (id, gameId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST })
  
      const { data } = await axios.delete(`/api/v1/reviews?id=${id}&gameId=${gameId}`)
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      })
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      })
    }
  }
  

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}