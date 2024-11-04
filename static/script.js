document.addEventListener('DOMContentLoaded', function() {
  // مدیریت آپلود فایل‌ها
  const uploadForm = document.getElementById('uploadForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', function(event) {
      event.preventDefault();  // جلوگیری از رفرش شدن صفحه

      const fileInput = document.getElementById('fileInput');
      const files = fileInput.files;
      const hashtagInput = document.getElementById('hashtagInput').value;  // دریافت هشتگ‌ها
      const errorElement = document.getElementById('error');
      errorElement.textContent = '';  // پاک کردن پیام خطای قبلی

      // بررسی اینکه آیا بیش از 3 فایل انتخاب شده است
      if (files.length > 3) {
        errorElement.textContent = "شما می‌توانید حداکثر ۳ عکس آپلود کنید.";
        return;
      }

      if (files.length === 0) {
        errorElement.textContent = "لطفاً حداقل یک عکس انتخاب کنید.";
        return;
      }

      if (!hashtagInput) {
        errorElement.textContent = "لطفاً یک هشتگ وارد کنید.";
        return;
      }

      // نمایش نوار بارگذاری
      const loadingElement = document.createElement('p');
      loadingElement.classList.add('loading');
      loadingElement.textContent = 'در حال بارگذاری عکس‌ها...';
      document.getElementById('uploadSection').appendChild(loadingElement);

      // پاک کردن پیش‌نمایش قبلی
      const albumGrid = document.getElementById('albumGrid');
      albumGrid.innerHTML = '';

      setTimeout(() => {  // شبیه‌سازی تأخیر بارگذاری
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();

          reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.classList.add('album-photo');
            albumGrid.appendChild(imgElement);
          };

          reader.readAsDataURL(file);
        }

        // نمایش جمله پس از انتخاب عکس
        const albumPreview = document.getElementById('albumPreview');
        const messageElement = document.createElement('p');
        messageElement.textContent = `ما یک آلبوم اختصاصی و شخصی سازی شده از این عکس‌ها و هشتگ "${hashtagInput}" برای شما خواهیم ساخت.`;
        albumPreview.insertBefore(messageElement, albumPreview.firstChild);

        // نمایش بخش پیش‌نمایش آلبوم
        albumPreview.style.display = 'block';

        // حذف نوار بارگذاری
        loadingElement.remove();

        // اضافه کردن دکمه ثبت سفارش
        const orderButton = document.createElement('button');
        orderButton.textContent = 'ثبت سفارش';
        orderButton.classList.add('order-button'); // اضافه کردن کلاس برای استایل
        orderButton.addEventListener('click', function() {
          alert('سفارش شما با موفقیت ثبت شد. از طرف تیم پشتیبانی ظرف 1 یا 2 روز آینده با شما تماس خواهند گرفت!');
        });

        albumPreview.appendChild(orderButton);

      }, 1500);  // زمان تأخیر 1.5 ثانیه
    });
  }

  // انیمیشن هاور دکمه‌ها
  document.addEventListener('scroll', function() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(function(item, index) {
      const position = item.getBoundingClientRect();
      if (position.top < window.innerHeight && !item.classList.contains('show')) {
        setTimeout(function() {
          item.classList.add('show');
        }, index * 200); // تاخیر در نمایش هر آیتم
      }
    });
  });

  // انیمیشن اسکرول برای بخش‌ها
  document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function(element) {
      const position = element.getBoundingClientRect();
      if (position.top < window.innerHeight) {
        element.classList.add('show');
      }
    });
  });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // جلوگیری از ارسال فرم

      const phoneEmailInput = document.getElementById('phoneEmail');
      const errorMessage = document.getElementById('error-message');

      if (phoneEmailInput.value === '') {
        errorMessage.style.display = 'block';
      } else {
        errorMessage.style.display = 'none';
        // اینجا می‌توانید کد مرتبط با ارسال اطلاعات یا نمایش پیام موفقیت را اضافه کنید
        alert('ورود موفقیت‌آمیز بود!');
      }
    });
  }

  // اسلایدر بزرگتر با تغییر دستی با نقاط
  let slideIndexLarge = 1;
  showSlidesLarge(slideIndexLarge);

  function currentSlideLarge(n) {
    showSlidesLarge(slideIndexLarge = n);
  }

  function showSlidesLarge(n) {
    let i;
    let slides = document.querySelectorAll(".large-slider .slides");
    let dots = document.querySelectorAll(".large-slider .dot");
    if (n > slides.length) { slideIndexLarge = 1 }
    if (n < 1) { slideIndexLarge = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndexLarge - 1].style.display = "block";
    dots[slideIndexLarge - 1].className += " active";
  }

  // اسلایدر کوچکتر بدون دکمه و نقاط (تغییر خودکار)
  let slideIndexSmall = 0;
  showSlidesSmall();

  function showSlidesSmall() {
    let i;
    let slides = document.querySelectorAll(".small-slider .slides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndexSmall++;
    if (slideIndexSmall > slides.length) { slideIndexSmall = 1 }
    slides[slideIndexSmall - 1].style.display = "block";
    setTimeout(showSlidesSmall, 3000); // تغییر خودکار هر 3 ثانیه
  }
});


async function submitOrder() {
  const selectedOptions = [];
  document.querySelectorAll('.options-container .checkbox:checked').forEach(checkbox => {
      selectedOptions.push(checkbox.value);
  });

  const orderDetails = document.getElementById('orderDetails').value.trim();
  const customerName = document.getElementById('customerName').value.trim();
  const customerPhone = document.getElementById('customerPhone').value.trim();

  // بررسی کامل بودن مراحل
  if (selectedOptions.length === 0) {
      alert('لطفاً حداقل یک گزینه را انتخاب کنید.');
      return;
  }
  if (!orderDetails) {
      alert('لطفاً توضیحات سفارش خود را وارد کنید.');
      return;
  }
  if (!customerName) {
      alert('لطفاً نام خود را وارد کنید.');
      return;
  }
  if (!customerPhone) {
      alert('لطفاً شماره تماس خود را وارد کنید.');
      return;
  }

  // ساختار داده‌های سفارش برای ارسال به بک‌اند
  const orderData = {
      options: selectedOptions.join(','), // ارسال گزینه‌ها به صورت رشته
      description: orderDetails,
      name: customerName,
      phone: customerPhone
  };

  try {
      // ارسال درخواست POST به API
      const response = await fetch('http://127.0.0.1:8000/api/orders/create/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
      });

      // بررسی پاسخ سرور
      const result = await response.json();
      if (response.ok) {
          alert(result.message); // پیام موفقیت
      } else {
          alert('خطا در ارسال سفارش: ' + JSON.stringify(result));
      }
  } catch (error) {
      alert('ارتباط با سرور برقرار نشد');
  }
}
