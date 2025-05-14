// Utility functions

// Debounce - ngăn thực thi quá thường xuyên
export function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle - giới hạn tần suất thực thi
export function throttle(func, limit) {
    let inThrottle;
    
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// requestAnimationFrame wrapper để tối ưu hiệu năng
export function rafThrottle(callback) {
    let requestId = null;
    
    return function(...args) {
        if (requestId === null) {
            requestId = requestAnimationFrame(() => {
                callback(...args);
                requestId = null;
            });
        }
    };
}

// Lazy load image helper
export function lazyLoadImage(img, src) {
    return new Promise((resolve, reject) => {
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
    });
}

// Tối ưu DOM batch update
export function batchDOMUpdates(updateFn) {
    // Đọc tất cả trạng thái DOM trước
    requestAnimationFrame(() => {
        // Viết tất cả thay đổi trong next frame
        requestAnimationFrame(() => {
            updateFn();
        });
    });
} 