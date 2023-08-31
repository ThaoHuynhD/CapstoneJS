import {
  getFormInfo,
  renderList,
  showFormInfo,
  showSpinner,
  hideSpinner,
  setActiveButton,
} from "./controller.js";
import { checkAllInPut, checkSearch, hideAlert } from "./validate.js";
// https://64e380ccbac46e480e78e305.mockapi.io/product
let url = "https://64e380ccbac46e480e78e305.mockapi.io/product";
window.fetchList = () => {
  axios
    .get(url)
    .then(function (res) {
      renderList(res.data);
      setActiveButton("defaultButton");
    })
    .catch(function (err) {
      console.log(err);
    });
};
fetchList();
window.addData = () => {
  var item = getFormInfo();
  var isValid = checkAllInPut(item);
  console.log("isValid: ", isValid);
  if (!isValid) return;
  $("#myModal").modal("hide");
  showSpinner();
  axios
    .post(url, item)
    .then(function (res) {
      fetchList();
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.delData = (id) => {
  showSpinner();
  axios
    .delete(`${url}/${id}`)
    .then(function (res) {
      fetchList();
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.editData = (id) => {
  showSpinner();
  $("#myModal").modal("show");
  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.remove("d-none");
  axios
    .get(`${url}/${id}`)
    .then(function (res) {
      showFormInfo(res.data);
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.updateData = () => {
  var item = getFormInfo();
  var isValid = checkAllInPut(item);
  if (!isValid) return;
  $("#myModal").modal("hide");
  showSpinner();
  axios
    .put(`${url}/${item.id}`, item)
    .then(function (res) {
      fetchList();
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.showNewData = () => {
  showSpinner();
  document.getElementById("addBtn").classList.remove("d-none");
  document.getElementById("updateBtn").classList.add("d-none");
  document.getElementById("itemId").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemImg").value = "";
  document.getElementById("itemDesc").value = "";
  hideSpinner();
};
window.searchValue = () => {
  var search = document.getElementById("searchValue").value.trim();
  var isValid = checkSearch(search);
  if (!isValid) return;
  var list = [];
  axios
    .get(url)
    .then(function (res) {
      list = res.data.filter((item) => item.name.match(search));
      renderList(list);
      document.getElementById(
        "search-alert"
      ).innerHTML = `There are ${list.length} results match your search.`;
      document.getElementById("search-alert").classList.remove("d-none");
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.sortLowtoHigh = () => {
  var list = [];
  axios
    .get(url)
    .then(function (res) {
      list = res.data;
      list.sort((a, b) => a.price - b.price);
      renderList(list);
      setActiveButton("lowToHighButton");
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.sortHightoLow = () => {
  var list = [];
  axios
    .get(url)
    .then(function (res) {
      list = res.data;
      list.sort((a, b) => b.price - a.price); // Sort by the 'price' property
      renderList(list);
      setActiveButton("highToLowButton");
      hideSpinner();
    })
    .catch(function (err) {
      console.log(err);
      hideSpinner();
    });
};
window.clearModalAlert = () => {
  hideAlert("alertName");
  hideAlert("alertPrice");
  hideAlert("alertImg");
  hideAlert("alertDesc");
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
