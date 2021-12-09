import Product from '../../models/product';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

//Note** Our reducers must be synchronous but with the addition of redux thunk - We can include async code in our action creators


// When we add redux thunk, the action creators don't have to automatically return teh action and payload - Instaed we use the dispatch method and we can return a function and we can execute any async code we want
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!    
    try {
      const response = await fetch(
        'https://react-native-shop-f6bef-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedProducts = [];
      //When we fetch data from firebase, we receive an object of data and we want to put that in an array - i.e. loadedProducts array
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};


export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://react-native-shop-f6bef-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,          
          price,
        }),
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {    
    const response = await fetch(
      `https://react-native-shop-f6bef-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {    
    const response = await fetch(
      `https://react-native-shop-f6bef-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};