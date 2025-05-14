// Main JavaScript file (đã tối ưu)

// Imports đúng cách
import { debounce, throttle } from './utils.js';
import { loadProducts } from './components.js';
import { setupLazyLoad } from './lazy-load.js';

// Đảm bảo DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo ứng dụng
    initApp();
});

function initApp() {
    // Tải sản phẩm với loading skeleton
    loadProducts();
    
    // Thiết lập lazy loading cho testimonials
    setupLazyLoad();
    
    // Thiết lập scroll handler với throttle
    setupScrollHandlers();
    
    // Thiết lập các event listeners khác
    setupEventListeners();
}

function setupScrollHandlers() {
    // Sử dụng throttle để giới hạn số lần gọi hàm xử lý scroll
    window.addEventListener('scroll', throttle(function() {
        // Xử lý scroll hiệu quả
    }, 100));
}

function setupEventListeners() {
    // Sử dụng event delegation thay vì nhiều event listeners
    document.querySelector('#products').addEventListener('click', function(e) {
        const product = e.target.closest('.product');
        if (product) {
            handleProductClick(product);
        }
    });
    
    // Xử lý nút "Load more"
    const loadMoreBtn = document.querySelector('#load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreTestimonials();
        });
    }
}

function handleProductClick(product) {
    // Xử lý khi người dùng nhấp vào sản phẩm
    console.log('Product clicked:', product.querySelector('h3').textContent);
}

// Sử dụng pagination thay vì tải tất cả cùng lúc
let currentPage = 1;
const testimonialsPerPage = 6;

function loadMoreTestimonials() {
    // Sử dụng debounce để tránh nhiều lần click nhanh
    debounce(async function() {
        currentPage++;
        try {
            // Mô phỏng fetch từ API
            const newTestimonials = await fetchTestimonials(currentPage, testimonialsPerPage);
            renderTestimonials(newTestimonials);
            
            // Ẩn nút nếu không còn testimonials
            if (newTestimonials.length < testimonialsPerPage) {
                document.querySelector('#load-more').style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading testimonials:', error);
        }
    }, 300)();
}

async function fetchTestimonials(page, limit) {
    // Mô phỏng API call
    return new Promise(resolve => {
        setTimeout(() => {
            // Giả lập dữ liệu từ API
            const testimonials = Array.from({ length: page < 5 ? limit : Math.floor(Math.random() * limit) }, (_, i) => ({
                id: (page - 1) * limit + i + 1,
                text: `"Sản phẩm tuyệt vời! Tôi rất hài lòng với trải nghiệm." - Khách hàng ${(page - 1) * limit + i + 1}`
            }));
            resolve(testimonials);
        }, 500);
    });
}

function renderTestimonials(testimonials) {
    const container = document.querySelector('#testimonials');
    
    // Xóa thông báo loading
    const loadingText = container.querySelector('.loading-text');
    if (loadingText) {
        loadingText.remove();
    }
    
    // Sử dụng DocumentFragment để tránh reflow liên tục
    const fragment = document.createDocumentFragment();
    
    testimonials.forEach(item => {
        const div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = `<p>${item.text}</p>`;
        fragment.appendChild(div);
    });
    
    container.appendChild(fragment);
} 