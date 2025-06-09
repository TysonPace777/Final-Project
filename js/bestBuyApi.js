import { getRandomIndexes } from './randomApi.js';

const BASE_URL = 'https://fakestoreapi.com';

async function fetchTrendingCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    console.error('Failed to fetch categories');
    return [];
  }
  const categories = await res.json();
  return categories;
}

async function fetchProductsByCategoryName(categoryName) {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(categoryName)}`);
  if (!res.ok) {
    console.error(`Failed to fetch products for category ${categoryName}`);
    return [];
  }
  const products = await res.json();
  return products;
}

function renderProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  if (products.length === 0) {
    container.innerHTML = '<p>No products to display.</p>';
    return;
  }

  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img class="prod-img" src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p class="cost">Price: $${product.price}</p>
        <p>${product.description.substring(0, 125)}...</p>
      </div>
    `;
  });
}

export async function showRandomSuggestions() {
  try {
    const categories = await fetchTrendingCategories();
    if (categories.length === 0) {
      console.log('No trending categories found.');
      renderProducts([]);
      return;
    }

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    console.log('Random category:', randomCategory);

    const products = await fetchProductsByCategoryName(randomCategory);
    if (products.length === 0) {
      console.log(`No products found for category: ${randomCategory}`);
      renderProducts([]);
      return;
    }

    const randomIndexes = await getRandomIndexes(6, products.length);
    let selectedProducts;
    if (!randomIndexes || randomIndexes.length === 0) {
      console.log('Failed to get random indexes, falling back to random selection in code');
      selectedProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
      selectedProducts = randomIndexes.map(i => products[i]);
    }

    renderProducts(selectedProducts);
  } catch (error) {
    console.error('Error in showRandomSuggestions:', error);
    renderProducts([]);
  }
}

document.getElementById('generate').addEventListener('click', showRandomSuggestions);

showRandomSuggestions();