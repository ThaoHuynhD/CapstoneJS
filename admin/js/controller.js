export let renderList = (list) => {
  var contentHTML = "";
  list.forEach((item) => {
    var rowHTML = `
    <tr class="item-row">
        <th class="item-id" scope="row">${item.id}</th>
        <td class="item-name">${item.name}</td>
        <td class="item-price">${item.price}$</td>
        <td class="item-img">
            <img src="${item.img}" alt="">
        </td>
        <td class="item-desc">${item.desc}</td>
        <td class="item-actions">
            <button class="btn btn-outline-warning fix" onclick="editData(${item.id})" data-toggle="modal" data-target="#staticBackdrop"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
            <button class="btn btn-outline-danger del" onclick="delData(${item.id})"><i class="fa-solid fa-trash"></i>Delete</button>
        </td>
        <td class="item-actions2" onclick="toggleRowActive(this)">
            <button class="btn btn-outline-purple show-detail">
            <i class="fa-solid fa-caret-down"></i>
            <i class="fa-solid fa-caret-up"></i>
            </button>
        </td>
    </tr>`;
    contentHTML += rowHTML;
  });
  document.getElementById("data-table").innerHTML = contentHTML;
};
export let getFormInfo = () => {
  var id = document.getElementById("itemId").value.trim();
  var name = document.getElementById("itemName").value.trim();
  var price = document.getElementById("itemPrice").value.trim();
  var img = document.getElementById("itemImg").value.trim();
  var desc = document.getElementById("itemDesc").value.trim();
  return {
    id: id,
    name: name,
    price: price,
    img: img,
    desc: desc,
  };
};
export let showFormInfo = (item) => {
  document.getElementById("itemId").value = item.id;
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemPrice").value = item.price;
  document.getElementById("itemImg").value = item.img;
  document.getElementById("itemDesc").value = item.desc;
};
export let showSpinner = () => {
  document.getElementById("waiting-screen").classList.remove("d-none");
}
export let hideSpinner = () => {
  document.getElementById("waiting-screen").classList.add("d-none");
}
export let setActiveButton = (buttonId) => {
  document.getElementById("defaultButton").classList.remove("active");
  document.getElementById("lowToHighButton").classList.remove("active");
  document.getElementById("highToLowButton").classList.remove("active");
  document.getElementById(buttonId).classList.add("active");
}

