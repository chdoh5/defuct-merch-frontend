//vars
const container = document.querySelector(".row");
const row = document.getElementById("first-row");
let card;
let user = "";
let username;
const userInput = document.getElementById("login-input");
const loginButton = document.getElementById("login-submit");
const loginForm = document.getElementById("login-form");
const productDetailContainer = document.getElementById("product-detail");
const cartDropdown = document.getElementById("cart-dropdown");
const dropdownButton = document.getElementById("navbarDropdown");
const cartItemList = document.getElementById("cart-item-list");
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
                    <a href="#">
                        <img class="pic-1" src=${product.image_url}>
                    </a>
                </div>
                <div class="product-content">
                    <h3 class="title"><a href="#">${product.name}</a></h3>
                    <div class="price">$${product.price}
                    </div>
                </div>
                <ul class="social">
                    <li class="see-more-button"> <a  data-id=${product.id} class="see-more-button" data-tip="Quick View"><i class="fa fa-search" ></i></a></li>
                </ul>
            </div>
        </div>`;
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
  if (clicked.className == "see-more-button") {
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
  const userList = currentUserData.filter(
    data => data.username == userInput.value
  );
  user = userList;
  if (userList[0]) {
    loginForm.innerHTML = `Welcome Back ${username}!`;
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
  loginForm.innerHTML = `Welcome ${username}!`;
};
const fetchCarts = () => {
  cartItemList.innerHTML = [];
  fetch("http://localhost:3000/carts")
    .then(resp => resp.json())
    .then(cartData => renderCarts(cartData));
};
const renderCarts = cartData => {
  const currentCart = cartData.filter(data => data.user_id === user[0].id);
  currentCart.forEach(cart => {
    const li = `<li>${cart.product.name}<button class="delete" data-id="${cart.id}">Delete</button></li>`;
    cartItemList.innerHTML += li;
  });
};
const postCart = () => {
    if(user=="") {
        alert("Please sign in")
    } else {
  event.preventDefault();
  const clicked = event.target;
  const user_id = user[0].id;
  const product_id = clicked.dataset.id;
  
  if (clicked.id === "add-to-cart") {
    fetch("http://localhost:3000/carts", createNewCartObj(user_id, product_id))
      .then(resp => resp.json())
      .then(newCartData => console.log(newCartData));
    }
  alert("Added to Cart!")
    }
}
// const createNewCartObj = (user_id, product_id) => {
//     return {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application"
//         },
//         body: JSON.stringify({
//             user_id: user_id,
//             product_id: product_id
//         })
//     }
// }
function createNewCartObj(user_id, product_id) {
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
}
// const renderNewCart = newCartData => {};

const deleteCart = () => {
    clicked=event.target
    const cartId = parseInt(clicked.dataset.id)
    
    if(clicked.className==="delete") {
        fetch(`http://localhost:3000/carts/${cartId}`, createDeleteObj() )
            .then( resp => resp.json() )
            .then( deleteData => renderDelete(deleteData) )
    }
}

const createDeleteObj = () => {
    return {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    }   

}

const renderDelete = (deleteData) => {
    console.log("Deleted")
}

//event listeners
loginButton.addEventListener("click", fetchCurrentUser);
container.addEventListener("click", fetchOneProduct);
dropdownButton.addEventListener("click", fetchCarts);
productDetailContainer.addEventListener("click", postCart);
cartItemList.addEventListener('click', deleteCart)
//run it
fetchProducts();



//  <li>
//    <a href="" data-tip="Add to Cart">
//      <i class="fa fa-shopping-cart"></i>
//    </a>
//  </li>;
