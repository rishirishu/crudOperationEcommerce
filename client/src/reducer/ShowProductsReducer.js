export const initialstate = {
    products: [],
    visible:false,
    search:{
        name:'',
        price:'',
        description:'',
        category:''
    },
    sort:'',
  }


export const CrudType = {
    SETDATA:'SETDATA',
    VISIBLE:'VISIBLE',
    SEARCH:'SEARCH',
    SORT:'SORT'
}

export const reducer = (state, action) => {
    switch (action.type) {
      case CrudType.SETDATA:
        return {
          ...state,
          products: action.payload,
        };
      case CrudType.VISIBLE:
        return {...state,visible:!state.showInputField}
    
      case CrudType.SEARCH:
        debugger
        return {...state,search:{...state.search,...action.payload}}

      case CrudType.SORT:
        debugger
        if(state.sort==action.payload){
          return{...state,sort:''}
        }
        else{
          return {...state,sort:action.payload}
        }

      default:
        return state
    }
  }

export const args = [reducer,initialstate]