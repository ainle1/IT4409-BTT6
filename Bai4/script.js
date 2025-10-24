// Đợi DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM cần thiết
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('product-list');

    // Hàm tìm kiếm sản phẩm
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                product.style.display = ''; // Hiện sản phẩm
            } else {
                product.style.display = 'none'; // Ẩn sản phẩm
            }
        });
    }

    // Sự kiện tìm kiếm khi click nút
    searchBtn.addEventListener('click', searchProducts);

    // Sự kiện tìm kiếm khi nhập (keyup)
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });

    // Toggle form thêm sản phẩm
    addProductBtn.addEventListener('click', function() {
        addProductForm.classList.toggle('hidden');
    });

    // Xử lý submit form thêm sản phẩm
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Lấy giá trị từ form
        const name = document.getElementById('productName').value;
        const desc = document.getElementById('productDesc').value;
        const price = document.getElementById('productPrice').value;
        const imageUrl = document.getElementById('productImage').value || 'https://via.placeholder.com/150';

        // Tạo sản phẩm mới
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item';
        newProduct.innerHTML = `
            <img src="${imageUrl}" alt="${name}" width="150">
            <h3>${name}</h3>
            <p>${desc}</p>
            <p><strong>Giá:</strong> ${price}₫</p>
        `;

        // Thêm sản phẩm vào danh sách
        productList.appendChild(newProduct);

        // Reset form và ẩn đi
        this.reset();
        this.classList.add('hidden');
    });

    // Thêm nút Cancel cho form (tùy chọn)
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Hủy';
    cancelBtn.style.marginLeft = '10px';
    addProductForm.querySelector('button[type="submit"]').after(cancelBtn);

    cancelBtn.addEventListener('click', function() {
        addProductForm.reset();
        addProductForm.classList.add('hidden');
    });

    // Validation functions
    function validateProduct(form) {
        let isValid = true;
        const errors = {};

        // Reset previous errors
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        document.getElementById('formError').textContent = '';

        // Validate name
        const name = form.productName.value.trim();
        if (!name) {
            errors.name = 'Vui lòng nhập tên sản phẩm';
            isValid = false;
        } else if (name.length < 3) {
            errors.name = 'Tên sản phẩm phải có ít nhất 3 ký tự';
            isValid = false;
        }

        // Validate price
        const price = parseFloat(form.productPrice.value);
        if (!price || isNaN(price)) {
            errors.price = 'Vui lòng nhập giá hợp lệ';
            isValid = false;
        } else if (price < 1000) {
            errors.price = 'Giá phải lớn hơn 1.000₫';
            isValid = false;
        }

        // Validate description
        const desc = form.productDesc.value.trim();
        if (!desc) {
            errors.desc = 'Vui lòng nhập mô tả sản phẩm';
            isValid = false;
        } else if (desc.length < 10) {
            errors.desc = 'Mô tả phải có ít nhất 10 ký tự';
            isValid = false;
        }

        // Show errors if any
        if (!isValid) {
            Object.keys(errors).forEach(key => {
                const group = form.querySelector(`#product${key.charAt(0).toUpperCase() + key.slice(1)}`).closest('.form-group');
                group.classList.add('error');
                group.querySelector('.error-message').textContent = errors[key];
            });
        }

        return isValid;
    }

    // Handle form submission
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateProduct(this)) {
            return;
        }

        // Get form values
        const name = this.productName.value.trim();
        const desc = this.productDesc.value.trim();
        const price = parseFloat(this.productPrice.value);
        const imageUrl = this.productImage.value || 'https://via.placeholder.com/150';

        // Create new product
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item';
        newProduct.innerHTML = `
            <img src="${imageUrl}" alt="${name}" width="150">
            <h3>${name}</h3>
            <p>${desc}</p>
            <p><strong>Giá:</strong> ${price.toLocaleString('vi-VN')}₫</p>
        `;

        // Add to start of list
        const productList = document.getElementById('product-list');
        productList.insertBefore(newProduct, productList.firstChild);

        // Reset and hide form
        this.reset();
        this.classList.add('hidden');
    });
});
