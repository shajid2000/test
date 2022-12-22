const initialState = {
    signagesCategory: {},
    signagesSubcategoryList: [],
    assetMarkingCategory: {},
    assetMarkingSubcategoryList: [],
    floorGraphicsCategory: {},
    floorGraphicsSubcategoryList: [],
    pictogramsCategory: {},
    pictogramsSubcategoryList: [],
    count: 0,
  };

  const handleProduct = (state = initialState, action) => {

    // console.log(state.cart);
    switch (action.type) {
      case "GET_SIGNAGES":
        return { ...state, signagesSubcategoryList: action.payload.postersExists, count: action.payload.count };
  
  
      case "GET_ASSET-MARKINGS":
        return { ...state, assetMarkingSubcategoryList: action.payload.postersExists, count: action.payload.count };

        case "GET_FLOORGRAPHICS":
          return { ...state, floorGraphicsSubcategoryList: action.payload.postersExists, count: action.payload.count };

          case "GET_PICTOGRAMS":
            return { ...state, signagesSubcategoryList: action.payload.postersExists, count: action.payload.count };
  
      default:
        return state;
    }
  };
  
  export default handleProduct;