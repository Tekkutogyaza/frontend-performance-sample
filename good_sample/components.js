// Component-specific functions
import { lazyLoadImage, batchDOMUpdates } from './utils.js';

// Product loading
export async function loadProducts() {
    try {
        // Mô phỏng API call để lấy dữ liệu sản phẩm
        const products = await fetchProducts();
        
        // Dùng batch DOM update để tránh reflow liên tục
        batchDOMUpdates(() => {
            renderProducts(products);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        showErrorMessage();
    }
}

async function fetchProducts() {
    // Mô phỏng API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: 'Sản phẩm 1',
                    description: 'Mô tả sản phẩm 1',
                    image: 'product1.webp'
                },
                {
                    id: 2,
                    name: 'Sản phẩm 2',
                    description: 'Mô tả sản phẩm 2',
                    image: 'product1.webp'
                },
                {
                    id: 3,
                    name: 'Sản phẩm 3',
                    description: 'Mô tả sản phẩm 3',
                    image: 'product1.webp'
                }
            ]);
        }, 800);
    });
}

function renderProducts(products) {
    const container = document.getElementById('products');
    
    // Xóa skeletons
    container.innerHTML = '';
    
    // Sử dụng DocumentFragment để tối ưu DOM manipulation
    const fragment = document.createDocumentFragment();
    
    products.forEach(product => {
        const productEl = createProductElement(product);
        fragment.appendChild(productEl);
    });
    
    // Chỉ thêm vào DOM một lần duy nhất
    container.appendChild(fragment);
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.className = 'product';
    div.setAttribute('data-id', product.id);
    
    div.innerHTML = `
        <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="200">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        </div>
    `;
    
    return div;
}

function showErrorMessage() {
    const container = document.getElementById('products');
    container.innerHTML = '<p class="error-message">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>';
} 