let count = 0;
const productQuantities = {};

const searchProducts = () => {
  fetch('https://arfan123456.github.io/host_api10/flutter.json')
    .then(cst => cst.json())
    .then(data => showDetails(data));
};

searchProducts();

const showDetails = (products) => {
  const details = document.getElementById('display-card');


  products.forEach(element => {
    const ratingstar = ratings(element.rating.rate);
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-130">
        <img class="rounded-t-lg h-50 w-50" src="${element.image}" alt="" />
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.title.slice(0, 50)}</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${element.description.slice(0, 100)} ....</p>
          <p class="font-bold"> $ ${element.price}</p>
          <p> Rating: ${element.rating.rate}</p>
          <div>${ratingstar}</div>
          <div class="flex gap-2 mt-3">
            <button class="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
              onclick="addToCard(${element.id}, ${element.price})">Add</button>
            <button class="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
              onclick="removeFromCard(${element.id}, ${element.price})">Minus</button>
          </div>
        </div>
      </div>
    `;
    details.appendChild(div);
  });
};

const addToCard = (id, price) => {
  count++;
  document.getElementById('total-products').innerText = count;

  if (!productQuantities[id]) {
    productQuantities[id] = 0;
  }
  productQuantities[id] += 1;

  updatePrice(price);
  total();
  document.querySelector('.my-card').style.display = 'block';
};

const removeFromCard = (id, price) => {
  if (productQuantities[id] && productQuantities[id] > 0) {
    productQuantities[id] -= 1;
    count--;
    document.getElementById('total-products').innerText = count;

    subtractPrice(price);
    total();

    if (count === 0) {
      document.querySelector('.my-card').style.display = 'none';
    }
  }
};

const updatePrice = (price) => {
  const oldPrice = parseFloat(document.getElementById('price').innerText);
  const newPrice = oldPrice + price;
  document.getElementById('price').innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
};

const subtractPrice = (price) => {
  const oldPrice = parseFloat(document.getElementById('price').innerText);
  const newPrice = oldPrice - price;
  document.getElementById('price').innerText = newPrice.toFixed(2);
  DeliveryCharge(newPrice);
};

const DeliveryCharge = (newPrice) => {
  if (newPrice <= 0) {
    document.getElementById('delivery-charge').innerText = '0';
  } else if (newPrice <= 1500) {
    document.getElementById('delivery-charge').innerText = '50';
  } else if (newPrice > 1500 && newPrice < 2800) {
    document.getElementById('delivery-charge').innerText = '100';
  } else {
    document.getElementById('delivery-charge').innerText = '150';
  }
};

const calculateDiscount = (price) => {
  if (count >= 2 && count <= 3) {
    return price * 0.10; // 10% discount
  } else if (count > 3) {
    return price * 0.15; // 15% discount
  } else {
    return 0; // No discount
  }
};

const total = () => {
  const price = parseFloat(document.getElementById('price').innerText);
  const delivery = parseFloat(document.getElementById('delivery-charge').innerText);
  const discountAmount = calculateDiscount(price);

  document.getElementById('discount').innerText = discountAmount.toFixed(2);

  const totalPrice = price + delivery - discountAmount;
  document.getElementById('total').innerText = totalPrice.toFixed(2);
};

const orderProducts = () => {
  const details = document.getElementById('details');
  details.textContent = '';
  const totalPrice = document.getElementById('total').innerText;
  const div = document.createElement('div');
  div.classList.add('shopping');
  div.innerHTML = `<h4>Your total Shopping: $${totalPrice}</h4><p>Thanks for Shopping With Us!!!!!</p>`;
  details.appendChild(div);

  // Reset all values
  count = 0;
  for (let key in productQuantities) {
    productQuantities[key] = 0;
  }

  document.getElementById('total-products').innerText = '0';
  document.getElementById('price').innerText = '0.00';
  document.getElementById('delivery-charge').innerText = '0';
  document.getElementById('discount').innerText = '0.00';
  document.getElementById('total').innerText = '0.00';
};

const ratings = (rate) => {
  const fullStars = Math.floor(rate);
  const stars = Array(fullStars).fill('<i class="fas fa-star text-orange-500"></i>').join('');
  return `<h3>${stars} ${rate}</h3>`;
};
