// JavaScript lớn, chưa tối ưu

// Không sử dụng DOMContentLoaded hoặc defer/async
console.log("Script đang chạy ngay lập tức, có thể gây blocking render");

// Function phức tạp chạy trên main thread
function animateAllElements() {
    const elements = document.querySelectorAll('.product');
    
    elements.forEach(element => {
        // Gây ra reflow và repaint liên tục
        element.style.transform = `translateY(${Math.random() * 5}px)`;
        
        // Ép buộc reflow
        console.log(element.offsetHeight);
    });
}

// Gọi animation liên tục gây tiêu tốn hiệu suất
setInterval(animateAllElements, 100);

// Event handler không được throttle/debounce
window.addEventListener('scroll', function() {
    console.log('Scrolling...', window.scrollY);
    
    // Thực hiện các tính toán phức tạp mỗi lần scroll
    const parallaxElements = document.querySelectorAll('.hero');
    parallaxElements.forEach(element => {
        element.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });
});

// Không sử dụng lazy loading cho ảnh
function loadAllImages() {
    const images = [
        'product1.jpeg',
        'product1.jpeg',
        'product1.jpeg',
        // ... nhiều ảnh khác
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src; // Tải tất cả cùng lúc
    });
}

loadAllImages();

// Xử lý quá nhiều DOM một lúc
function createManyElements() {
    const container = document.querySelector('.testimonial-grid');
    
    // Tạo và thêm nhiều phần tử một lúc gây ra reflow liên tục
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = `<p>"Tôi rất hài lòng với sản phẩm!" - Khách hàng ${i+1}</p>`;
        container.appendChild(div); // Mỗi lần append gây ra reflow
    }
}

// Hàm tính toán phức tạp chạy trên main thread
function heavyCalculation() {
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
}

// Thực thi tính toán nặng ngay khi load trang
console.log("Kết quả tính toán nặng:", heavyCalculation());

// Thêm nhiều event listener mà không cần thiết
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    product.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    product.addEventListener('click', function() {
        console.log('Product clicked:', this.querySelector('h3').textContent);
    });
});

// Chất lượng code kém với biến toàn cục
var globalCounter = 0;

function incrementCounter() {
    globalCounter++;
    document.title = `Counter: ${globalCounter}`;
}

// Gọi hàm liên tục không cần thiết
setInterval(incrementCounter, 1000); 