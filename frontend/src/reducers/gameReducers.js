import {
    ALL_GAMES_REQUEST,
    ALL_GAMES_SUCCESS,
    ALL_GAMES_FAIL,
    ADMIN_GAMES_REQUEST,
    ADMIN_GAMES_SUCCESS,
    ADMIN_GAMES_FAIL,
    NEW_GAME_REQUEST,
    NEW_GAME_SUCCESS,
    NEW_GAME_RESET,
    NEW_GAME_FAIL,
    DELETE_GAME_REQUEST,
    DELETE_GAME_SUCCESS,
    DELETE_GAME_RESET,
    DELETE_GAME_FAIL,
    UPDATE_GAME_REQUEST,
    UPDATE_GAME_SUCCESS,
    UPDATE_GAME_RESET,
    UPDATE_GAME_FAIL,
    GAME_DETAILS_REQUEST,
    GAME_DETAILS_SUCCESS,
    GAME_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/gameConstants'

export const gamesReducer = (state = { games: [] }, action) => {
    switch (action.type) {
        case ALL_GAMES_REQUEST:
        case ADMIN_GAMES_REQUEST:
            return {
                loading: true,
                games: []
            }

        case ALL_GAMES_SUCCESS:
            return {
                loading: false,
                games: action.payload.games,
                gamesCount: action.payload.gamesCount,
                resPerPage: action.payload.resPerPage,
                filteredGamesCount: action.payload.filteredGamesCount
            }

        case ADMIN_GAMES_SUCCESS:
            return {
                loading: false,
                games: action.payload
            }

        case ALL_GAMES_FAIL:
        case ADMIN_GAMES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newGameReducer = (state = { game: {} }, action) => {
    switch (action.type) {

        case NEW_GAME_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_GAME_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                game: action.payload.game
            }

        case NEW_GAME_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_GAME_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const gameReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_GAME_REQUEST:
        case UPDATE_GAME_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_GAME_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_GAME_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_GAME_FAIL:
        case UPDATE_GAME_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_GAME_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_GAME_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const gameDetailsReducer = (state = { game: {} }, action) => {
    switch (action.type) {

        case GAME_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GAME_DETAILS_SUCCESS:
            return {
                loading: false,
                game: action.payload
            }

        case GAME_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newGameReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const gameReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}