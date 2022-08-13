const menu = document.querySelector('#menu')
const cart = document.querySelector('#cart')
const totalAmount = document.querySelector('#total-amount')
const button = document.querySelector('#submit-button')

let productData = []
let cartItems = []
let total = 0

axios.get('https://ac-w3-dom-pos.firebaseio.com/products.json')
  .then(res => {
    productData = res.data
    displayProduct(productData)
  })


function displayProduct(products) {
  products.forEach(product => {
    menu.innerHTML += `
      <div class="col-3">
       <div class="card">
          <img src=${product.imgUrl} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <a id=${product.id} href="#" class="btn btn-primary">加入購物車</a>
          </div>
        </div>
      </div>
    `
  })
}

function addToCart(event) {
  const id = event.target.id
  //抓取該商品
  const addedProduct = productData.find(item => item.id === id)
  const {name, price} = addedProduct

  //確認是否已經在購物車
  const targetCardItem = cartItems.find(item => item.id === id)

  if (targetCardItem) {
    targetCardItem.quantity += 1
  } else {
    cartItems.push({
      id, 
      name,
      price,
      quantity: 1
    })
  }

   cart.innerHTML = cartItems.map(item => `
    <li class="list-group-item">${item.name} X ${item.quantity} 小計：${item.price * item.quantity}</li>
  `).join('')

  calculateTotal(price)
}

function calculateTotal(price) {
  total += price
  totalAmount.textContent = total
}

function submit() {
  let result = ''
  cartItems.forEach(item => {
    result += `
    ${item.name} X ${item.quantity} 小計：${item.price * item.quantity}\n
    `
  })
  result += `合計:${total}`

  alert(result)
  reset()
}

function reset() {
  cart.innerHTML = ''
  totalAmount.textContent = '--'
}




menu.addEventListener('click', addToCart)
button.addEventListener('click', submit)