const INITIAL_STATE = {
    userName : "",
    configNumber: "20",
    themePokedex: false,
}

const reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
    case "GET_USERNAME":
        return {
            ...state,
            userName: action.payload
        }
    case "CHANGE_NUMBER_CONFIG":
        return{
            ...state,
            configNumber: action.payload
        }

    case "CHANGE_THEME_POKEDEX":
        return {
            ...state,
            themePokedex: !state.themePokedex
        }

    default:
	    return state;
  }
}

export default reducer;