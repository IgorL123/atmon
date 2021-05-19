
export default function alertReducer(state = {error: null}, action) {

    if (action.payload !== undefined){
        if (action.payload.data !== undefined){
            if (action.payload.data.token === undefined){

                const error = action.payload.data;
                if(error){
                    return {
                        ...state,
                        error: error,
                    }
                }
            }
        }
    }

    return state;
}