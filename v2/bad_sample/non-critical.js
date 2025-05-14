/**
 * Non-optimized non-critical JS for product interactions
 * No debounce, throttle or requestAnimationFrame usage
 */

// Global variables
var activeProducts = {};
var toastTimeout;
var productData = {
    1: {
        id: 1,
        title: "Sản phẩm 1",
        price: "250.000đ",
        description: "Mô tả chi tiết về Sản phẩm 1. Sản phẩm có chất lượng cao, đã được kiểm định và đảm bảo an toàn cho người sử dụng.",
        features: ["Chất liệu cao cấp", "Bền bỉ", "Thiết kế hiện đại"]
    },
    2: {
        id: 2,
        title: "Sản phẩm 2",
        price: "350.000đ",
        description: "Mô tả chi tiết về Sản phẩm 2. Sản phẩm có nhiều tính năng nổi bật và phù hợp với nhiều nhu cầu sử dụng khác nhau.",
        features: ["Tiết kiệm năng lượng", "Thân thiện môi trường", "Dễ sử dụng"]
    }
};

// Đánh dấu khi đang mở modal để tránh đóng ngay lập tức
var isOpeningModal = false;
var currentOpenModal = null;

// Function to show product detail modal (not optimized)
function showProductDetail(productId) {
    // Đánh dấu đang mở modal để ngăn đóng ngay lập tức
    isOpeningModal = true;
    
    // Xử lý không tối ưu: ẩn tất cả modals trước khi hiển thị modal mới
    $(".product-card").each(function() {
        // Multiple direct DOM queries and style changes
        $(this).find(".product-detail-modal").hide();
    });
    
    // Find specific product and show modal (không tối ưu, tìm kiếm DOM nhiều lần)
    var targetProduct = $(".product-card").eq(productId - 1);
    var modal = targetProduct.find(".product-detail-modal");
    
    // Lưu lại modal đang mở để sau này đóng
    currentOpenModal = modal;
    
    // Tạo overlay nền cho modal
    if (!$("#modal-backdrop").length) {
        $("body").append('<div id="modal-backdrop" class="modal-backdrop"></div>');
    }
    
    // Hiển thị backdrop với hiệu ứng fade in
    $("#modal-backdrop").css({
        display: "block",
        opacity: 0
    }).animate({
        opacity: 0.5
    }, 300);
    
    // Định vị modal ở giữa màn hình
    modal.css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "500px",
        width: "90%",
        zIndex: 1001,
        background: "white",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        display: "block",
        opacity: 0,
        padding: "24px 28px" // Điều chỉnh padding cho giống good_sample
    });
    
    // Thêm class cho modal để style giống với good_sample
    modal.addClass("styled-modal");
    
    // Cập nhật nội dung modal từ productData
    var product = productData[productId];
    if (product) {
        var title = modal.find("h3");
        title.text(product.title);
        
        var description = modal.find("p").first();
        description.text(product.description);
        
        // Thêm giá sản phẩm
        if (modal.find('.product-price').length) {
            modal.find('.product-price').html('<strong>Giá: </strong>' + product.price);
        } else {
            var priceHtml = '<p class="product-price mt-4"><strong>Giá: </strong>' + product.price + '</p>';
            description.after(priceHtml);
        }
        
        // Thêm nhãn "Tính năng:"
        var featureTitle = modal.find('.feature-title');
        if (!featureTitle.length) {
            modal.find('ul').before('<h4 class="feature-title font-bold mt-4 mb-2">Tính năng:</h4>');
        } else {
            featureTitle.text('Tính năng:');
        }
        
        var featuresHtml = "";
        for (var i = 0; i < product.features.length; i++) {
            featuresHtml += "<li>" + product.features[i] + "</li>";
        }
        modal.find("ul").html(featuresHtml);
    }
    
    // Force reflow (bad practice)
    modal[0].offsetHeight;
    
    // Hiển thị modal với hiệu ứng fade in
    modal.animate({
        opacity: 1
    }, 300);
    
    // Store active product
    activeProducts[productId] = true;
    
    // Show toast notification
    showToast("Đang xem sản phẩm " + productId);
    
    // Log to console on each interaction
    console.log("Product " + productId + " detail opened");
    
    // Reset cờ mở modal sau khi hoàn tất
    setTimeout(function() {
        isOpeningModal = false;
    }, 100);
    
    // Ngăn sự kiện lan truyền
    return false;
}

// Function to close global modal (not optimized)
function closeGlobalModal() {
    if (currentOpenModal) {
        // Fade out modal
        currentOpenModal.animate({
            opacity: 0
        }, 300, function() {
            // Reset styles để không ảnh hưởng đến layout
            $(this).css({
                position: "",
                top: "",
                left: "",
                transform: "",
                maxWidth: "",
                width: "",
                zIndex: "",
                background: "",
                boxShadow: "",
                borderRadius: "",
                display: "none",
                opacity: "",
                padding: ""
            });
            
            // Xóa class đã thêm
            $(this).removeClass("styled-modal");
        });
        
        // Fade out backdrop
        $("#modal-backdrop").animate({
            opacity: 0
        }, 300, function() {
            $(this).css("display", "none");
        });
        
        currentOpenModal = null;
    }
    
    // Remove from active products
    activeProducts = {};
    
    // Log again
    console.log("Modal closed");
}

// Function to close product detail modal (not optimized)
function closeProductDetail(productId) {
    // Đóng modal hiện tại
    closeGlobalModal();
}

// Function to show toast notification (not optimized)
function showToast(message) {
    // Clear previous toast timer if exists
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    // Direct DOM manipulation for toast
    var toast = $("#mainToast");
    
    // Multiple style manipulations causing reflows
    toast.text(message);
    toast.css({
        display: "block",
        height: "auto",
        opacity: 0
    });
    
    // Force reflow (bad practice)
    toast[0].offsetHeight;
    
    // More style changes
    toast.css({
        opacity: 1
    });
    
    // Set timeout to hide toast
    toastTimeout = setTimeout(function() {
        toast.css({
            opacity: 0
        });
        
        setTimeout(function() {
            toast.css({
                display: "none",
                height: 0
            });
        }, 300);
    }, 3000);
}

// Thêm style cho modal backdrop và modal vào CSS
$("head").append(`
    <style>
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.5;
            display: none;
            z-index: 1000;
        }
        
        .styled-modal {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #2d3748;
        }
        
        .styled-modal h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #1a202c;
            line-height: 1.2;
        }
        
        .styled-modal p {
            margin-bottom: 1rem;
            line-height: 1.6;
            color: #4a5568;
            font-size: 0.95rem;
        }
        
        .styled-modal .product-price {
            font-size: 1rem;
            margin: 1.25rem 0 1rem;
            color: #2d3748;
        }
        
        .styled-modal .product-price strong {
            font-weight: 600;
        }
        
        .styled-modal .feature-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 1.5rem 0 0.75rem;
            color: #2d3748;
        }
        
        .styled-modal ul {
            list-style-type: disc;
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
            padding-left: 0.5rem;
        }
        
        .styled-modal li {
            margin-bottom: 0.5rem;
            color: #4a5568;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .styled-modal .close-modal {
            background-color: #2d3748;
            color: white;
            padding: 0.5rem 1.25rem;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            font-weight: 500;
            font-size: 0.95rem;
            transition: background-color 0.2s;
            margin-top: 0.5rem;
        }
        
        .styled-modal .close-modal:hover {
            background-color: #4a5568;
        }
    </style>
`);

// Initialize page with redundant operations
$(document).ready(function() {
    console.log("Product page initialized");
    
    // Redundant event binding
    $(".product-card").on("click", function(e) {
        // Ngăn sự kiện lan truyền để không trigger event delegation
        e.stopPropagation();
    });
    
    // Inefficient event delegation - sửa lại
    $(document).on("click", function(e) {
        // Bỏ qua tính năng đóng modal khi click ra ngoài để giống với good_sample
        // (lưu ý: good_sample không đóng modal khi click ra ngoài)
        
        // Commented out closing behavior:
        // if ($("#modal-backdrop").is(":visible") && 
        //     !$(e.target).closest(".product-detail-modal").length && 
        //     !$(e.target).closest(".product-card").length) {
        //     closeGlobalModal();
        // }
    });
    
    // Thêm sự kiện để ngăn bubble up từ modal
    $(document).on("click", ".product-detail-modal", function(e) {
        e.stopPropagation();
    });
    
    // Unnecessary initial operations
    $(".product-detail-modal").each(function() {
        $(this).hide();
    });
});

// Thêm vào đầu file non-critical.js của bad_sample
document.addEventListener('DOMContentLoaded', function() {
    console.time('Thêm 10000 phần tử');
    
    // Tạo container mới nếu không tìm thấy container thích hợp
    let productContainer = document.querySelector('.products-container') || document.querySelector('.grid');
    
    if (!productContainer) {
        // Tạo container mới và thêm vào đầu body
        productContainer = document.createElement('div');
        productContainer.className = 'products-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8';
        
        // Thêm tiêu đề
        const heading = document.createElement('h2');
        heading.className = 'text-2xl font-bold text-center mb-8 text-red-600';
        heading.textContent = 'Thêm 10,000 sản phẩm (không tối ưu)';
        
        // Thêm vào body
        document.body.insertBefore(heading, document.body.firstChild);
        document.body.insertBefore(productContainer, heading.nextSibling);
    }
    
    // Tạo 10,000 phần tử
    const fragment = document.createDocumentFragment();
    for (let i = 3; i <= 10000; i++) {
        const product = document.createElement('div');
        product.className = 'product-card bg-white rounded shadow border border-gray-200 overflow-hidden';
        product.innerHTML = `
            <div class="relative w-full h-48">
                <img src="https://picsum.photos/id/${i % 100}/300/200" alt="Sản phẩm ${i}" class="w-full h-full object-cover mb-3">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold">Sản phẩm ${i}</h3>
                <p class="text-red-600 font-bold mb-2">${Math.floor(Math.random() * 500 + 100)}.000đ</p>
            </div>
        `;
        fragment.appendChild(product);
    }
    
    productContainer.appendChild(fragment);
    console.timeEnd('Thêm 10000 phần tử');
    console.log('Số lượng phần tử trong DOM:', document.querySelectorAll('*').length);
});

// Cập nhật hàm showProductDetail để hoạt động với các phần tử mới
function showProductDetail(id) {
    // Cách không tối ưu: hiển thị alert trong trường hợp không có DOM cụ thể
    alert('Chi tiết sản phẩm ' + id);
} 