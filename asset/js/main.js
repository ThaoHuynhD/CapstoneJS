import { checkSearch } from "../../admin/js/validate.js";
import {
  URL,
  fetchProduct,
  offSpinner,
  renderHTML,
  renderItemCart,
  turnSpinner,
  renderTotalItemCart,
  totalPrice,
  checkItemCart,
  updateQuantityCartInHeader,
  getListCartInLocal,
  setListCartInLocal,
} from "./controller.js";

const APPLE = "Apple";
const SAMSUNG = "Samsung";

fetchProduct();

window.showCart = () => {
  const listCart = getListCartInLocal();
  document.getElementById("cart_show").style.display = "flex";
  renderItemCart(listCart);
  totalPrice(listCart);
};

window.outCart = () => {
  document.getElementById("cart_show").style.display = "none";
};

// Sort
document.getElementById("selectList").addEventListener("change", function () {
  var list = [];
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      list = res.data;
      if (this.value == APPLE) {
        let arrayIP = list.filter((item) => item.type === "Iphone");
        renderHTML(arrayIP);
      } else if (this.value == SAMSUNG) {
        let arraySS = list.filter((item) => item.type === "Samsung");
        renderHTML(arraySS);
      } else {
        renderHTML(list);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Search
window.searchList = () => {
  var list = [];
  let nameSearch = document.getElementById("searchIP").value.trim();
  var isValid = checkSearch(nameSearch);
  if (!isValid) return;
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      console.log("1");
      list = res.data;
      console.log("🚀 ~ file: main.js:61 ~ .then ~ list:", list);
      let objSearch = list.filter((item) =>
        item.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
      renderHTML(objSearch);
      document.getElementById(
        "search-alert"
      ).innerHTML = `There are ${objSearch.length} results match your search.`;
      document.getElementById("search-alert").classList.remove("d-none");
    })
    .catch((err) => {
      console.log("2");
      console.log("🚀 ~ file: main.js:62 ~ err:", err);
      turnSpinner();
    });
};

// Cart
window.addCart = (id) => {
  const listCart = getListCartInLocal();
  axios({
    url: `${URL}/${id}`,
    method: "GET",
  })
    .then((res) => {
      const newListCart = checkItemCart(listCart, res.data);
      updateQuantityCartInHeader(newListCart.length);
      setListCartInLocal(newListCart);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.deleteItem = (id) => {
  const listCart = getListCartInLocal();

  const newListCart = listCart.filter((element) => element.id !== String(id));
  setListCartInLocal(newListCart);
  renderItemCart(newListCart);
  renderTotalItemCart();
  totalPrice(newListCart);
};

window.clearCart = () => {
  window.localStorage.removeItem("listCart");
  renderItemCart([]);
  renderTotalItemCart();
  totalPrice([]);
};

window.purchase = () => {
  window.clearCart();
  window.outCart();
  totalPrice([]);
  // alert("Mua hàng thành công !");
};

window.soLuong = (id, inputElement) => {
  const listCart = getListCartInLocal();
  const indexOf = listCart.findIndex((element) => Number(element.id) === id);
  const value = inputElement.value;

  if (indexOf > -1) {
    listCart[indexOf].quantity = Number(value);
    setListCartInLocal(listCart);
    renderItemCart(listCart);
    totalPrice(listCart);
  }
};

window.toggleRowActive = (button) => {
  const itemRow = button.closest(".item-row");
  const isActive = itemRow.classList.contains("active");

  const allItemRows = document.querySelectorAll(".item-row");
  allItemRows.forEach((row) => row.classList.remove("active"));

  if (!isActive) {
    itemRow.classList.add("active");
  }
};
