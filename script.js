const data = [
  {
    id: 1,
    name: "SUPIMA Cotton Crew Neck Short Sleeve T-Shirt",
    img: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455365/sub/goods_455365_sub14.jpg?width=750",
    price: 590,
    category: "T-shirt",
  },
  {
    id: 2,
    name: "Crew Neck Short Sleeve T-Shirt",
    img: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=750",
    price: 290,
    category: "T-shirt",
  },
  {
    id: 3,
    name: "Sweat Pullover Long Sleeve Hoodie",
    img: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/444967/sub/goods_444967_sub14.jpg?width=750",
    price: 1990,
    category: "Hoodie",
  },
  {
    id: 4,
    name: "Ultra Stretch DRY-EX Full-Zip Hoodie",
    img: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465203/sub/goods_465203_sub14.jpg?width=750",
    price: 1490,
    category: "Hoodie",
  },
  {
    id: 5,
    name: "Sweat Wide Pants",
    img: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/471809/sub/goods_471809_sub14.jpg?width=750",
    price: 1590,
    category: "Pants",
  },
];

const products = document.querySelector(".products");
const categories = document.querySelector(".categories");
const search = document.querySelector(".search");
const all = document.querySelector(".all");
const priceRange = document.querySelector(".priceRange");
const priceText = document.querySelector(".price-text");

function displayProducts(filteredProducts) {
  products.innerHTML = filteredProducts
    .map(
      (product) => `<div class="product">
        <img
        src="${product.img}"
        alt=""
        />
        <p>${product.name}</p>
        <p class="price">PHP ${product.price}.00</p>
        <p class="category">${product.category}</p>
        </div>`
    )
    .join("");
}

// SHOW ALL PRODUCTS  FIRST
displayProducts(data.filter((item) => item.name.includes("")));

// SEARCH INPUT
search.addEventListener("keyup", (e) =>
  displayProducts(
    data.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
  )
);

// SELECT CATEGORY
data.forEach((product) => {
  if (!categories.innerHTML.includes(product.category)) {
    const category = document.createElement("li");
    category.classList.add("categoryList");
    category.innerHTML = product.category;
    categories.appendChild(category);

    category.addEventListener("click", () => {
      displayProducts(
        data.filter((item) =>
          item.category.toLowerCase().includes(product.category.toLowerCase())
        )
      );
      document.querySelectorAll(".categoryList").forEach((category) => {
        category.classList.remove("selected");
      });
      all.classList.remove("selected");
      category.classList.add("selected");
    });
  }
});

console.log(document.querySelectorAll(".category"));
// ALL PRODUCTS
all.addEventListener("click", () => {
  displayProducts(data.filter((item) => item.name.includes("")));
  document.querySelectorAll(".categoryList").forEach((category) => {
    category.classList.remove("selected");
  });
  all.classList.add("selected");
});

// PRICE INPUT RANGE

const priceList = data.map((product) => product.price);
priceRange.max = Math.max(...priceList);
priceRange.min = Math.min(...priceList);

priceRange.addEventListener("input", (e) => {
  displayProducts(data.filter((item) => item.price <= e.target.value));
  priceText.innerHTML = `PHP ${e.target.value}.00`;
});
