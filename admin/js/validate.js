export let checkAllInPut = (item) => {
  console.log("item: ", item);
  var isValid =
    checkName(item.name) &
    checkPrice(item.price) &
    checkImg(item.img) &
    checkDesc(item.desc);
  console.log("isValid: ", isValid);
  return isValid;
};
export function checkName(value) {
  if (value.length == 0) {
    showAlert("alertName", `Empty value is not allowed`);
    return false;
  } else {
    hideAlert("alertName");
    return true;
  }
}
function checkPrice(value) {
  if (value.length == 0) {
    showAlert("alertPrice", `Empty value is not allowed`);
    return false;
  } else if (isNaN(value) || value < 0) {
    showAlert("alertPrice", `Value must be a number and >= 0`);
    return false;
  } else {
    hideAlert("alertPrice");
    return true;
  }
}
function checkImg(value) {
  var pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (value.length == 0) {
    showAlert("alertImg", `Empty value is not allowed`);
    return false;
  } else if (!pattern.test(value)) {
    showAlert("alertImg", `Value must be a link`);
    return false;
  } else {
    hideAlert("alertImg");
    return true;
  }
}
function checkDesc(value) {
  if (value.length == 0) {
    showAlert("alertDesc", `Empty value is not allowed`);
    return false;
  } else {
    hideAlert("alertDesc");
    return true;
  }
}
export let checkSearch = (value) => {
  if (value.length == 0) {
    showAlert("alertSearch", `Empty value is not allowed`);
    return false;
  } else {
    hideAlert("alertSearch");
    return true;
  }
};
export let hideAlert = (idErr) => {
  document.getElementById(idErr).classList.add("d-none");
};
export let showAlert = (idErr, message) => {
  document.getElementById(idErr).classList.remove("d-none");
  document.getElementById(idErr).innerHTML = message;
};
