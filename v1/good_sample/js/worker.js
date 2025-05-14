// worker.js - Tệp JS cho Web Worker
self.onmessage = function(e) {
    // Nhận dữ liệu từ thread chính
    const data = e.data;
    
    // Thực hiện một tác vụ nặng
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += i;
    }
    
    // Trả kết quả về thread chính
    self.postMessage(result);
}; 