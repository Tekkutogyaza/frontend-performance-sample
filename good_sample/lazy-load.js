// Lazy loading functionality
import { debounce } from './utils.js';

// Thiết lập lazy loading cho testimonials
export function setupLazyLoad() {
    // Sử dụng Intersection Observer để theo dõi khi nào phần tử xuất hiện trong viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Khi phần tử xuất hiện trong viewport, load testimonials
                loadInitialTestimonials();
                // Sau khi đã load, không cần theo dõi nữa
                observer.disconnect();
            }
        });
    }, {
        // Bao nhiêu phần trăm của phần tử cần hiển thị để kích hoạt callback
        threshold: 0.1,
        // Margin để kích hoạt callback sớm hơn (vd: khi còn cách 200px)
        rootMargin: '0px 0px 200px 0px'
    });
    
    // Theo dõi phần tử này
    const observerTarget = document.getElementById('testimonial-observer');
    if (observerTarget) {
        observer.observe(observerTarget);
    }
    
    // Thiết lập lazy loading cho hình ảnh
    setupLazyImages();
}

// Tải đợt đánh giá đầu tiên
function loadInitialTestimonials() {
    // Wrap trong debounce để tránh gọi nhiều lần nếu bị trigger nhiều lần
    debounce(async () => {
        try {
            // Giả lập API call
            const testimonials = await fetch('https://catfact.ninja/fact')
                .then(res => {
                    // Mô phỏng API
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve([
                                { id: 1, text: '"Sản phẩm tuyệt vời! Tôi rất hài lòng." - Khách hàng 1' },
                                { id: 2, text: '"Dịch vụ khách hàng xuất sắc." - Khách hàng 2' },
                                { id: 3, text: '"Tôi sẽ mua lại lần nữa." - Khách hàng 3' },
                                { id: 4, text: '"Chất lượng vượt trội so với giá tiền." - Khách hàng 4' },
                                { id: 5, text: '"Đã mua và không thất vọng." - Khách hàng 5' },
                                { id: 6, text: '"Giao hàng nhanh chóng." - Khách hàng 6' }
                            ]);
                        }, 500);
                    });
                });
            
            displayTestimonials(testimonials);
        } catch (error) {
            console.error('Error loading testimonials:', error);
        }
    }, 100)();
}

function displayTestimonials(testimonials) {
    const container = document.getElementById('testimonials');
    
    // Xóa thông báo loading
    container.innerHTML = '';
    
    // Tạo và thêm testimonials
    const fragment = document.createDocumentFragment();
    
    testimonials.forEach(testimonial => {
        const div = document.createElement('div');
        div.className = 'testimonial';
        div.innerHTML = `<p>${testimonial.text}</p>`;
        fragment.appendChild(div);
    });
    
    container.appendChild(fragment);
}

// Thiết lập lazy loading cho hình ảnh
function setupLazyImages() {
    // Sử dụng native lazy loading nếu trình duyệt hỗ trợ
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            // Đảm bảo ảnh có thuộc tính width/height để tránh layout shift
            if (!img.getAttribute('width')) img.setAttribute('width', '100%');
            if (!img.getAttribute('height')) img.setAttribute('height', 'auto');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        setupLazyLoadFallback();
    }
}

// Fallback cho trình duyệt không hỗ trợ lazy loading tự nhiên
function setupLazyLoadFallback() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src') || image.getAttribute('src');
                    
                    if (src) {
                        image.src = src;
                        image.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Polyfill cho trình duyệt cũ
        // Chỉ load khi cuộn tới gần ảnh
        let active = false;
        
        const lazyLoad = () => {
            if (active === false) {
                active = true;
                
                setTimeout(() => {
                    lazyImages.forEach(lazyImage => {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && 
                            lazyImage.getBoundingClientRect().bottom >= 0) && 
                            getComputedStyle(lazyImage).display !== "none") {
                            
                            const src = lazyImage.getAttribute('data-src') || lazyImage.getAttribute('src');
                            if (src) {
                                lazyImage.src = src;
                                lazyImage.removeAttribute('data-src');
                            }
                            
                            lazyImage.classList.remove("lazy");
                            
                            lazyImages = lazyImages.filter(image => image !== lazyImage);
                            
                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });
                    
                    active = false;
                }, 200);
            }
        };
        
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
        
        // Trigger initial load
        lazyLoad();
    }
} 