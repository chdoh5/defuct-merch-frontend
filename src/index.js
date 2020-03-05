//vars
const container = document.querySelector(".row");
const row = document.getElementById("first-row");
let card;
let user = "";
let userList;
let username;
const userInput = document.getElementById("login-input");
const loginButton = document.getElementById("login-submit");
const loginForm = document.getElementById("login-form");
const productDetailContainer = document.getElementById("product-detail");
const cartDropdown = document.getElementById("cart-dropdown");
const dropdownButton = document.getElementById("navbarDropdown");
const cartItemList = document.getElementById("cart-item-list");
const signoutButton = document.getElementById("signout");

const fetchProducts = () => {
  fetch("http://localhost:3000/products")
    .then(resp => resp.json())
    .then(product => renderProducts(product));
};
// const renderProducts = (product) => {
//     product.forEach(product => {
//        const card=`<div id="product-card" data-id=${product.id}><img data-id=${product.id} src="${product.image_url}" class="card-img-top" alt="...">
//        <div class="card-body">
//          <h5 class="card-title">${product.name}</h5>
//          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//        </div></div>`
//         container.innerHTML += card
//     })
// }
const renderProducts = product => {
  product.forEach(product => {
    const card = `<div class="col-md-3 col-sm-6">
            <div class="product-grid6">
                <div class="product-image6">
                    
                        <img class="pic-1" src=${product.image_url}>
                    
                </div>
                <div class="product-content">
                    <h3  class="title"><a href="#">${product.name}</a></h3>
                    <div class="price">$${product.price}
                    </div>
                </div>
                <ul class="social">
                    <li class="see-more-button"> <a  data-id=${product.id} id="hi" data-tip="Quick View"><i  data-id=${product.id} class="fa fa-search" ></i></a></li>
                </ul>
            </div>
        </div>`


        
    // const card = `
    //   <div class="product-column col-lg-3 col-md-6">
    //   <div class="card">
    //         <div class="card-header">
    //           <h3>${product.name}</h3>
    //         </div>
    //         <div class="card-body">
    //         <img class="card-img-top" src=${product.image_url}>
    //           <h2 class="price-text">$${product.price}</h2>
    //           <button  class="see-more-button" data-id="${product.id} class="btn btn-lg btn-block btn-outline-dark" type="button">
    //            See More...
    //           </button>
    //         </div>
    //         </div>`;
    container.innerHTML += card;
  });
};
const fetchOneProduct = () => {
  const clicked = event.target;
  const productId = clicked.dataset.id;
  
  if (
    clicked.className === "see-more-button" ||
    clicked.parentElement.id === "hi"
  ) {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(resp => resp.json())
      .then(oneProductData => renderOneProduct(oneProductData));
  }
};
// Change picture size in <img    >
const renderOneProduct = oneProductData => {
  const addToCartButton = document.getElementById("add-to-cart");
  const productInfo = oneProductData.data.attributes;
  const oneProductDetailCard = `<h1 id='foo'>${productInfo.name}</h1>
    <img src=${productInfo.image_url} >
    <h3>$${productInfo.price}</h3>
    <p>${productInfo.description}</p>
    <button id="add-to-cart" data-id=${oneProductData.data.id} class="btn btn-info">
      Add to Cart
    </button></a>`;
  productDetailContainer.innerHTML = oneProductDetailCard;
  window.location.href = "#foo";
};
// const userLogin
// let user = ""
// hit submit if value takes value
// do a fetch post to backend
// findorcreateby on backend
// render in json
// feed return value into new function
// set user = "name"
// set form to display=block (show) none (hide)
const fetchCurrentUser = () => {
  username = userInput.value;
  event.preventDefault();
  if (username == "") {
    alert("Please enter username");
  } else {
    fetch("http://localhost:3000/users")
      .then(resp => resp.json())
      .then(currentUserData => renderCurrentUser(currentUserData));
  }
};
const renderCurrentUser = currentUserData => {
  userList = currentUserData.filter(data => data.username == userInput.value);
  user = userList;
  if (userList[0]) {
    loginForm.innerHTML = `<style="color:#7fcd91" Welcome Back ${username}!&emsp;</bur><button id="signout"><a href="javascript:window.location.reload(true)">Sign Out</a></button>`;
  } else {
    postNewUser();
  }
};
const postNewUser = () => {
  fetch("http://localhost:3000/users", createNewUser(username))
    .then(resp => resp.json())
    .then(newUserData => renderNewUser(newUserData));
};
function createNewUser(username) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      username: username
    })
  };
}
const renderNewUser = newUserData => {
  userList.push(newUserData);
  loginForm.innerHTML = `Welcome ${username}!!&emsp;</bur><button id="signout"><a href="javascript:window.location.reload(true)">Sign Out</a></button>`;
};
const fetchCarts = () => {
  if (user == "") {
    cartItemList.innerText = "Cart Empty";
  } else {
    cartItemList.innerHTML = [];
    fetch("http://localhost:3000/carts")
      .then(resp => resp.json())
      .then(cartData => renderCarts(cartData));
  }
};
const renderCarts = cartData => {
  const currentCart = cartData.filter(data => data.user_id === user[0].id);
  if (!currentCart[0]) {
    cartItemList.innerText = "Cart Empty";
  } else {
    currentCart.forEach(cart => {
      const li = `<li>${cart.product.name}&emsp;<i class="far fa-times-circle" data-id="${cart.id}"></i></li>`;
      cartItemList.innerHTML += li;
    });
  }
};





const postCart = () => {
  if (user == "") {
    alert("Please sign in")
    window.location.href = "#header";
  } else {
    event.preventDefault();
    const clicked = event.target;
    const user_id = user[0].id;
    const product_id = clicked.dataset.id;

    if (clicked.id === "add-to-cart") {
      fetch(
        "http://localhost:3000/carts",
        createNewCartObj(user_id, product_id)
      )
        .then(resp => resp.json())
        .then(newCartData => console.log(newCartData));
    }
    alert("Added to Cart!");
    window.location.href = "#header";
  }
};
const createNewCartObj = (user_id, product_id) => {
  console.log("here");
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user_id: user_id,
      product_id: product_id
    })
  };
};

// function createNewCartObj(user_id, product_id) {
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       user_id: user_id,
//       product_id: product_id
//     })
//   };
// }
// // const renderNewCart = newCartData => {};

const deleteCart = () => {
  clicked = event.target;
  const cartId = parseInt(clicked.dataset.id);

  if (clicked.className === "far fa-times-circle") {
    fetch(`http://localhost:3000/carts/${cartId}`, createDeleteObj())
      .then(resp => resp.json())
      .then(deleteData => renderDelete(deleteData));
  }
};

const createDeleteObj = () => {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
};

const renderDelete = deleteData => {
  console.log("Deleted");
};

const signout = () => {
  const clicked = event.target;
  if (clicked.id == "signout") {
    user = "";
    loginForm.innerHTML = `<form id="login-form" class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" id="login-input" type="text" placeholder="Login" aria-label="Login">
        <button id="login-submit" class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
      </form>`;
  }
};

//event listeners
loginButton.addEventListener("click", fetchCurrentUser);
container.addEventListener("click", fetchOneProduct);
dropdownButton.addEventListener("click", fetchCarts);
productDetailContainer.addEventListener("click", postCart);
cartItemList.addEventListener("click", deleteCart);
loginForm.addEventListener("click", signout);
//run it
fetchProducts();

//  <li>
//    <a href="" data-tip="Add to Cart">
//      <i class="fa fa-shopping-cart"></i>
//    </a>
//  </li>;
