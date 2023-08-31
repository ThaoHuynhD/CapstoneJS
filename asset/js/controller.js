export let URL = "https://64e380ccbac46e480e78e305.mockapi.io/product";

var dssp = [];

export let fetchProduct = () => {
  turnSpinner();
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      offSpinner();
      renderHTML(res.data);
      dssp.push(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  renderTotalItemCart();
};

export function turnSpinner() {
  document.getElementById("spinner").style.display = "flex";
}

export function totalPrice(listCart) {
  const totalPrice = (listCart || []).reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
  document.getElementById("total").innerText = totalPrice;
}

export function renderTotalItemCart() {
  const listCart = getListCartInLocal();

  const quantity = listCart.length || 0;
  updateQuantityCartInHeader(quantity);
}

export function offSpinner() {
  document.getElementById("spinner").style.display = "none";
}

export let renderHTML = (list) => {
  let createHTML = "";
  list.forEach((item, index) => {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      item;
    let contentTr = `
      <div class="col-12 col-sm-6 col-md-4 col-xl-3 pb-4">
        <div class="card" style="border-radius:20px">
          <div class="container">
            <img class="card-img-top" src="${img}" alt="${name}">
          </div>
          <div class="card-body">
            <h6 class="card-title text-center text-dark">${name}</h6>
            <p class="card-text text-danger text-center">${price}<sup><u>$</u></sup></p>
          </div>
          <div class="text-center p-2">
              <button class="btn btn-danger" onclick="addCart(${id})">
                  <i class="fa fa-shopping-cart text-white" aria-hidden="true"></i>
              </button>
              
          </div>
        </div>
      </div>
    `;
    createHTML += contentTr;
  });
  document.getElementById("contents-items").innerHTML = createHTML;
};

export let renderItemCart = (list) => {
  const listCart = list || [];
  let createTr = "";

  listCart.forEach((item, index) => {
    let {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      quantity,
    } = item;
    createTr += `
    <tr class="item-row">
        <th class="item-id" scope="row">${id}</th>
        <td class="item-img">
          <img src="${img}" alt="" style="width:100px">
        </td>
        <td class="item-name">${name}</td>
        <td class="item-quantity">
          <style>
            #buy-amount {
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            #buy-amount #amount {
              width: 100px;
              text-align: center;
              border: 1px solid #ececec;
            }
          </style>
          <div id="buy-amount" class="item-minusPlus">
            <input onchange="soLuong(${id},this)" type="number" min="1" max="10" name="amount" id="amount" value="${quantity}">
          </div>
        </td>
        <td class="item-price">${quantity * price}$</td>
        <td class="item-actions">
            <button class="btn btn-outline-danger del" onclick="deleteItem(${id})"><i class="fa-solid fa-trash"></i>Delete</button>
        </td>
        <td class="item-actions2" onclick="toggleRowActive(this)">
            <button class="btn btn-outline-purple show-detail">
              <i class="fa-solid fa-caret-down"></i>
              <i class="fa-solid fa-caret-up"></i>
            </button>
        </td>
    </tr>
      `;
  });
  document.getElementById("data-table").innerHTML = createTr;
};

export function checkItemCart(listCart, item) {
  let newListCart = [...listCart];
  const indexOf = listCart.findIndex((element) => element.id === item.id);

  if (indexOf > -1) {
    newListCart[indexOf].quantity += 1;
  } else {
    const newItem = {
      ...item,
      quantity: 1,
    };
    newListCart.push(newItem);
  }

  return newListCart;
}

export function updateQuantityCartInHeader(quantity) {
  document.getElementById("Th_Mua_hang").innerText = quantity;
  document.getElementById("Th_Mua_hang").style.color = "red";
}

export function getListCartInLocal() {
  const listCart = window.localStorage.getItem("listCart");
  return listCart ? JSON.parse(listCart) : [];
}

export function setListCartInLocal(listCart) {
  window.localStorage.setItem("listCart", JSON.stringify(listCart));
  return;
}
