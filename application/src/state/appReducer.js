const SET_SEED = "SET_SEED";
const SET_LANG ="SET_LANG";
const SET_MISTAKE ="SET_MISTAKE";


const defaultState = {
currentSeed: 0,
currentLang:'',
currentMistake:0,

}

export default function appReducer(state=defaultState,action){
    switch(action.type){
        case SET_SEED:
            return{
                ...state,
                currentSeed:action.seed,


            }
            case SET_LANG:
            return{
                ...state,
                currentLang:action.lang,


            }
            case SET_MISTAKE:
                return{
                    ...state,
                    currentMistake:action.mistake,
    
    
                }
            
        default:
            return state;
    }
    
}

export const setSeed = seed =>({type:SET_SEED,seed:seed});
export const setLang = lang =>({type:SET_LANG,lang:lang});
export const setMistake = mistake =>({type:SET_MISTAKE,mistake:mistake});
