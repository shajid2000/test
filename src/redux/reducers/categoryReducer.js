const initialState = {
    subCategoryList: [],
    subCategoryItems: [],
    count: 0,
  };

  const handleItem = (state = initialState, action) => {

    // console.log(state.cart);
    switch (action.type) {
      case "GET_SUBCATEGORY":
        return { ...state, subCategoryList: [...action.payload] };
  
  
      case "GET_ITEMS_SUBCATEGORY":
        return { ...state, subCategoryItems: [...action.payload] };
      case "GET_COUNT":
        return {
          ...state,
          count: action.payload,
        };
      default:
        return state;
    }
  };


  export default handleItem;

