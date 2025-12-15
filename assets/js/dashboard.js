// مدیریت تغییر تم - نسخه یکپارچه و تصحیح شده
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobkv = document.getElementById("theme-toggler-mobile-kv");
const aboutsThemeToggle = document.getElementById('abouts-theme-toggle');
const aboutsMobileThemeToggle = document.getElementById('abouts-mobile-theme-toggle');
const blogsThemeToggle = document.getElementById('blogs-theme-toggle');
const blogsMobileThemeToggle = document.getElementById('blogs-mobile-theme-toggle');
const cardsThemeToggle = document.getElementById('cards-theme-toggle');
const contentThemeToggle = document.getElementById('content-theme-toggle');
const contentMobileThemeToggle = document.getElementById('content-mobile-theme-toggle');
const body = document.body;

const sectionHeaders = document.querySelectorAll('.cours_data-section-header');

sectionHeaders.forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// بررسی وضعیت تم در localStorage و اعمال آن
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        applyLightTheme();
        updateThemeIcons('light');
    } else {
        applyDarkTheme();
        updateThemeIcons('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// اعمال تم روشن
function applyLightTheme() {
    const themeMappings = [
        ['edd-dark-theme', 'edd-light-theme'],
        ['dashboards-dark-theme', 'dashboards-light-theme'],
        ['dark-theme', 'light-theme'],
        ['profiles-dark-theme', 'profiles-light-theme'],
        ['instru-dark-theme', 'instru-light-theme'],
        ['abouts-dark-theme', 'abouts-light-theme'],
        ['blogs-dark-theme', 'blogs-light-theme'],
        ['content-dark-theme', 'content-light-theme']
    ];

    let themeApplied = false;
    
    themeMappings.forEach(([darkClass, lightClass]) => {
        if (body.classList.contains(darkClass)) {
            body.classList.replace(darkClass, lightClass);
            themeApplied = true;
        }
    });
    
    if (!themeApplied) {
        body.classList.add('edd-light-theme');
    }
}

// اعمال تم تاریک
function applyDarkTheme() {
    const themeMappings = [
        ['edd-light-theme', 'edd-dark-theme'],
        ['dashboards-light-theme', 'dashboards-dark-theme'],
        ['light-theme', 'dark-theme'],
        ['profiles-light-theme', 'profiles-dark-theme'],
        ['instru-light-theme', 'instru-dark-theme'],
        ['abouts-light-theme', 'abouts-dark-theme'],
        ['blogs-light-theme', 'blogs-dark-theme'],
        ['content-light-theme', 'content-dark-theme']
    ];

    let themeApplied = false;
    
    themeMappings.forEach(([lightClass, darkClass]) => {
        if (body.classList.contains(lightClass)) {
            body.classList.replace(lightClass, darkClass);
            themeApplied = true;
        }
    });
    
    if (!themeApplied) {
        body.classList.add('edd-dark-theme');
    }
}

// به‌روزرسانی آیکون‌های تم
function updateThemeIcons(theme) {
    const sunIcon = '<i class="fas fa-sun"></i>';
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIconWithText = '<i class="fas fa-sun"></i><span>تغییر تم</span>';
    const moonIconWithText = '<i class="fas fa-moon"></i><span>تغییر تم</span>';
    
    const themeToggles = [
        themeToggle,
        mobileThemeToggle,
        aboutsThemeToggle,
        blogsThemeToggle,
        cardsThemeToggle,
        contentThemeToggle
    ];
    
    const mobileThemeToggles = [
        aboutsMobileThemeToggle,
        blogsMobileThemeToggle,
        contentMobileThemeToggle
    ];
    
    if (theme === 'light') {
        themeToggles.forEach(toggle => {
            if (toggle) toggle.innerHTML = sunIcon;
        });
        mobileThemeToggles.forEach(toggle => {
            if (toggle) toggle.innerHTML = sunIconWithText;
        });
    } else {
        themeToggles.forEach(toggle => {
            if (toggle) toggle.innerHTML = moonIcon;
        });
        mobileThemeToggles.forEach(toggle => {
            if (toggle) toggle.innerHTML = moonIconWithText;
        });
    }
}

// تغییر تم
function toggleTheme() {
    const darkThemes = [
        'edd-dark-theme', 'dashboards-dark-theme', 'dark-theme',
        'profiles-dark-theme', 'instru-dark-theme', 'abouts-dark-theme',
        'blogs-dark-theme', 'content-dark-theme'
    ];
    
    const isDarkTheme = darkThemes.some(theme => body.classList.contains(theme));
    
    if (isDarkTheme) {
        // تغییر به تم روشن
        applyLightTheme();
        updateThemeIcons('light');
        localStorage.setItem('theme', 'light');
    } else {
        // تغییر به تم تاریک
        applyDarkTheme();
        updateThemeIcons('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// مقداردهی اولیه تم
initializeTheme();

// افزودن event listener برای تمام دکمه‌های تغییر تم
const allThemeToggles = [
    themeToggle, mobileThemeToggle, aboutsThemeToggle, 
    aboutsMobileThemeToggle, blogsThemeToggle, blogsMobileThemeToggle,
    cardsThemeToggle, contentThemeToggle, contentMobileThemeToggle, mobkv
];

allThemeToggles.forEach(toggle => {
    if (toggle) {
        toggle.addEventListener('click', toggleTheme);
    }
});

// مدیریت منوی موبایل - نسخه یکپارچه
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const hamburgerMenu = document.getElementById('hamburger-menu');
const sidebar = document.getElementById('sidebar');
const mobileNavContainer = document.getElementById('mobile-nav-container');
const navContainer = document.getElementById('nav-container');
const sidebarClose = document.getElementById('sidebar-close');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mainLogo = document.getElementById('main-logo');

// عناصر مربوط به صفحات مختلف
const aboutsMobileMenuToggle = document.getElementById('abouts-mobile-menu-toggle');
const aboutsMobileNavContainer = document.getElementById('abouts-mobile-nav-container');
const aboutsMobileMenuOverlay = document.getElementById('abouts-mobile-menu-overlay');
const aboutsMainLogo = document.getElementById('abouts-main-logo');

const blogsMobileMenuToggle = document.getElementById('blogs-mobile-menu-toggle');
const blogsMobileNavContainer = document.getElementById('blogs-mobile-nav-container');
const blogsMobileMenuOverlay = document.getElementById('blogs-mobile-menu-overlay');

const cardsMobileMenuToggle = document.getElementById('cards-mobile-menu-toggle');
const cardsSidebar = document.getElementById('cards-sidebar');
const cardsMobileMenuOverlay = document.getElementById('cards-mobile-menu-overlay');

const contentMobileMenuToggle = document.getElementById('content-mobile-menu-toggle');
const contentMobileNavContainer = document.getElementById('content-mobile-nav-container');
const contentMobileMenuOverlay = document.getElementById('content-mobile-menu-overlay');
const contentMainLogo = document.getElementById('content-main-logo');

function toggleMobileMenu() {
    // مدیریت sidebar (برای داشبورد و cards)
    const sidebars = [sidebar, cardsSidebar];
    sidebars.forEach(sb => {
        if (sb) sb.classList.toggle('active');
    });
    
    // مدیریت mobile nav container (برای قوانین، abouts، blogs)
    const mobileNavContainers = [mobileNavContainer, aboutsMobileNavContainer, blogsMobileNavContainer, contentMobileNavContainer];
    mobileNavContainers.forEach(container => {
        if (container) container.classList.toggle('active');
    });
    
    // مدیریت nav container (برای مدرسین)
    if (navContainer) {
        navContainer.classList.toggle('active');
    }
    
    // مدیریت overlay
    const overlays = [mobileMenuOverlay, aboutsMobileMenuOverlay, blogsMobileMenuOverlay, cardsMobileMenuOverlay, contentMobileMenuOverlay];
    overlays.forEach(overlay => {
        if (overlay) overlay.classList.toggle('active');
    });
    
    // مدیریت logo
    const logos = [mainLogo, aboutsMainLogo, contentMainLogo];
    logos.forEach(logo => {
        if (logo) logo.classList.toggle('hidden');
    });
    
    // مدیریت وضعیت toggle button
    const menuToggles = [mobileMenuToggle, aboutsMobileMenuToggle, blogsMobileMenuToggle, cardsMobileMenuToggle, contentMobileMenuToggle];
    menuToggles.forEach(toggle => {
        if (toggle) toggle.classList.toggle('active');
    });
    
    // مدیریت وضعیت hamburger menu
    if (hamburgerMenu) {
        hamburgerMenu.classList.toggle('active');
        
        // تغییر آیکون منو
        if (hamburgerMenu.classList.contains('active')) {
            hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>';
            hamburgerMenu.setAttribute('aria-expanded', 'true');
        } else {
            hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
            hamburgerMenu.setAttribute('aria-expanded', 'false');
        }
    }
    
    // مدیریت اسکرول body
    const isAnyMenuOpen = 
        sidebars.some(sb => sb && sb.classList.contains('active')) ||
        mobileNavContainers.some(container => container && container.classList.contains('active')) ||
        (navContainer && navContainer.classList.contains('active'));
    
    document.body.style.overflow = isAnyMenuOpen ? 'hidden' : '';
}

// افزودن event listener با بررسی وجود عناصر
const allMenuToggles = [
    mobileMenuToggle, hamburgerMenu, sidebarClose, 
    aboutsMobileMenuToggle, blogsMobileMenuToggle, cardsMobileMenuToggle,
    contentMobileMenuToggle
];

allMenuToggles.forEach(element => {
    if (element) {
        element.addEventListener('click', toggleMobileMenu);
    }
});

// افزودن event listener برای overlayها
const allOverlays = [mobileMenuOverlay, aboutsMobileMenuOverlay, blogsMobileMenuOverlay, cardsMobileMenuOverlay, contentMobileMenuOverlay];
allOverlays.forEach(overlay => {
    if (overlay) {
        overlay.addEventListener('click', toggleMobileMenu);
    }
});

// مدیریت فرم جستجو - نسخه تصحیح شده
const searchForms = document.querySelectorAll('.dashboards-search-box, .edd-search-box, .supports-search-box, .cards-search-box, .blogs-search-box, .blogs-blog-hero-search, .blogs-mobile-search-box, .search-box, .hero-search, .mobile-search-box');

searchForms.forEach(form => {
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input[type="text"], input[type="search"], .dashboards-search-input, .edd-search-input, .supports-search-input, .cards-search-input');
            
            inputs.forEach(input => {
                if (input && input.value.trim() !== '') {
                    alert('جستجو برای: ' + input.value);
                    return;
                }
            });
        });
    }
});

// مدیریت جستجوی مدرسین
const instruSearchInput = document.querySelector('.instru-filter-search-input');
const instruSearchButton = document.querySelector('.instru-filter-search-btn');

function performInstruSearch() {
    const query = instruSearchInput?.value.trim();
    if (query && query !== '') {
        console.log(`جستجو برای: ${query}`);
    }
}

if (instruSearchButton) {
    instruSearchButton.addEventListener('click', performInstruSearch);
}

if (instruSearchInput) {
    instruSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performInstruSearch();
        }
    });
}

// مدیریت دکمه‌های عملیات
const actionButtons = document.querySelectorAll('.dashboards-action-btn, .edd-btn, .profiles-btn, .instru-btn-profile, .cards-add-to-cart-btn, .cards-remove-btn, .cards-quantity-btn, .cards-checkout-btn, .btn-enroll');

actionButtons.forEach(button => {
    if (button) {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span')?.textContent || this.textContent;
            const classList = this.classList;
            
            if (classList.contains('instru-btn-profile')) {
                // منطق برای دکمه‌های پروفایل مدرسین
                const instructorId = this.getAttribute('data-instructor');
                if (instructorId) {
                    openInstructorPopup(instructorId);
                }
            } else if (classList.contains('cards-add-to-cart-btn')) {
                // منطق برای افزودن به سبد خرید
                const cartItem = this.closest('.cards-cart-item');
                const itemTitle = cartItem?.querySelector('.cards-item-title')?.textContent;
                showNotification(`دوره "${itemTitle}" به سبد خرید اضافه شد!`);
            } else if (classList.contains('cards-remove-btn')) {
                // منطق برای حذف از سبد خرید
                const cartItem = this.closest('.cards-cart-item');
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    cartItem.remove();
                    updateCartTotal();
                    checkEmptyCart();
                    showNotification('دوره با موفقیت از سبد خرید حذف شد');
                }, 300);
            } else if (classList.contains('cards-quantity-btn')) {
                // منطق برای تغییر تعداد
                const action = this.getAttribute('data-action');
                const quantityElement = this.parentElement.querySelector('.cards-quantity-value');
                let quantity = parseInt(quantityElement.textContent);
                
                if (action === 'increase') {
                    quantity++;
                } else if (action === 'decrease' && quantity > 1) {
                    quantity--;
                }
                
                quantityElement.textContent = quantity;
                updateCartTotal();
            } else if (classList.contains('cards-checkout-btn')) {
                // منطق برای پرداخت
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showNotification('در حال انتقال به درگاه پرداخت...');
                }, 2000);
            } else if (classList.contains('btn-enroll')) {
                // منطق برای دکمه‌های ثبت‌نام دوره
                // const courseTitle = this.closest('.course-card')?.querySelector('.course-title')?.textContent;
                // const coursePrice = this.closest('.course-card')?.querySelector('.course-price')?.textContent;
                
                // // نمایش پیام موفقیت
                // this.innerHTML = '<i class="fas fa-check"></i><span>افزوده شد به سبد</span>';
                // this.style.background = 'var(--success-color)';
                
                // // بازگشت به حالت اولیه بعد از 2 ثانیه
                // setTimeout(() => {
                //     this.innerHTML = '<i class="fas fa-shopping-cart"></i><span>افزودن به سبد خرید</span>';
                //     this.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
                // }, 2000);
                
                // console.log(`دوره "${courseTitle}" با قیمت ${coursePrice} به سبد خرید افزوده شد.`);
            } else {
                // منطق عمومی برای دکمه‌های دیگر
                const courseRow = this.closest('tr');
                
                if (courseRow) {
                    const courseName = courseRow.querySelector('.dashboards-course-name');
                    if (courseName) {
                        alert('ادامه دوره: ' + courseName.textContent);
                    }
                } else {
                    if (buttonText.includes('ارسال تکلیف')) {
                        alert('فرم ارسال تکلیف باز خواهد شد');
                    } else if (buttonText.includes('مشاهده جزئیات')) {
                        alert('جزئیات تکلیف نمایش داده خواهد شد');
                    } else if (buttonText.includes('دانلود')) {
                        alert('گواهینامه دانلود خواهد شد');
                    } else if (buttonText.includes('اشتراک‌گذاری')) {
                        alert('گواهینامه به اشتراک گذاشته خواهد شد');
                    } else if (buttonText.includes('ویرایش پروفایل') || buttonText.includes('ویرایش اطلاعات') || buttonText.includes('ویرایش مهارت') || buttonText.includes('ویرایش بیو')) {
                        openEditModal();
                    }
                }
            }
        });
    }
});

// مدیریت اسکرول هدر
const headers = [
    document.getElementById('page-header'),
    document.getElementById('abouts-page-header'),
    document.getElementById('blogs-page-header'),
    document.getElementById('content-page-header')
];

headers.forEach(header => {
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
});

// مدیریت ناوبری قوانین
const termsNavLinks = document.querySelectorAll('.term-1-terms-nav-link');
const termsSections = document.querySelectorAll('.term-1-terms-section');

if (termsNavLinks.length > 0 && termsSections.length > 0) {
    termsNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // حذف کلاس active از همه لینک‌ها
            termsNavLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // اضافه کردن کلاس active به لینک فعلی
            this.classList.add('active');
            
            // اسکرول به بخش مربوطه
            const sectionId = this.getAttribute('href');
            if (sectionId && sectionId !== '#') {
                const targetSection = document.querySelector(sectionId);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });

    // مدیریت اسکرول و برجسته‌سازی بخش فعال
    function highlightActiveSection() {
        let fromTop = window.scrollY + 100;
        
        termsSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                termsNavLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    if (linkHref === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
}

// مدیریت فرم خبرنامه
const newsletterForms = document.querySelectorAll('.term-1-newsletter-form, .blogs-newsletter-form, .newsletter-form');

newsletterForms.forEach(newsletterForm => {
    if (newsletterForm) {
        const newsletterSuccess = newsletterForm.closest('.term-1-newsletter')?.querySelector('#newsletter-success');
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.term-1-newsletter-input, .blogs-newsletter-input, .newsletter-input');
            const button = this.querySelector('.term-1-btn-newsletter, .blogs-btn-newsletter, .btn-newsletter');
            
            if (emailInput && emailInput.value.trim() !== '') {
                // نمایش وضعیت لودینگ
                const originalText = button.innerHTML;
                
                if (button.classList.contains('blogs-btn-newsletter') || button.classList.contains('btn-newsletter')) {
                    button.innerHTML = '<i class="fas fa-check"></i><span>عضویت موفق</span>';
                    button.style.background = 'var(--success-color)';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.background = '';
                        emailInput.value = '';
                    }, 3000);
                } else {
                    button.innerHTML = '<div class="term-1-loading"></div>';
                    button.disabled = true;
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        emailInput.value = '';
                        if (newsletterSuccess) {
                            newsletterSuccess.classList.add('show');
                            setTimeout(() => {
                                newsletterSuccess.classList.remove('show');
                            }, 3000);
                        }
                    }, 1000);
                }
                
                // ذخیره ایمیل در localStorage
                localStorage.setItem('newsletter_email', emailInput.value);
                console.log(`ایمیل ${emailInput.value} برای خبرنامه ثبت شد.`);
            }
        });
    }
});

// مدیریت تب‌ها
const tabs = document.querySelectorAll('.edd-tab');
const tabContents = document.querySelectorAll('.edd-tab-content');

if (tabs.length > 0 && tabContents.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // حذف کلاس active از همه تب‌ها
            tabs.forEach(t => t.classList.remove('active'));
            // اضافه کردن کلاس active به تب انتخاب شده
            tab.classList.add('active');
            
            // حذف کلاس active از همه محتواها
            tabContents.forEach(content => content.classList.remove('active'));
            // نمایش محتوای مرتبط با تب انتخاب شده
            const tabId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// مدیریت مودال ویرایش پروفایل
const editProfileBtn = document.getElementById('edit-profile-btn');
const editProfileModal = document.getElementById('edit-profile-modal');
const modalClose = document.getElementById('modal-close');
const cancelEdit = document.getElementById('cancel-edit');
const profileForm = document.getElementById('profile-form');
const saveProfileBtn = document.getElementById('save-profile');

function openEditModal() {
    if (editProfileModal) {
        editProfileModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeEditModal() {
    if (editProfileModal) {
        editProfileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

if (editProfileBtn) {
    editProfileBtn.addEventListener('click', openEditModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closeEditModal);
}

if (cancelEdit) {
    cancelEdit.addEventListener('click', closeEditModal);
}

// بستن مودال با کلیک خارج از آن
if (editProfileModal) {
    editProfileModal.addEventListener('click', function(e) {
        if (e.target === editProfileModal) {
            closeEditModal();
        }
    });
}

// مدیریت ارسال فرم پروفایل
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (saveProfileBtn) {
            // شبیه‌سازی بارگذاری
            saveProfileBtn.disabled = true;
            saveProfileBtn.innerHTML = '<span class="profiles-loading-spinner"></span> در حال ذخیره...';
            
            // شبیه‌سازی تاخیر در ذخیره‌سازی
            setTimeout(function() {
                saveProfileBtn.disabled = false;
                saveProfileBtn.innerHTML = '<i class="fas fa-check"></i> ذخیره تغییرات';
                
                // نمایش پیام موفقیت
                alert('تغییرات با موفقیت ذخیره شد!');
                closeEditModal();
            }, 1500);
        }
    });
}

// مدیریت دکمه‌های ویرایش جزئی پروفایل
const editPersonalInfo = document.getElementById('edit-personal-info');
const editSkills = document.getElementById('edit-skills');
const editBio = document.getElementById('edit-bio');

if (editPersonalInfo) {
    editPersonalInfo.addEventListener('click', function(e) {
        e.preventDefault();
        openEditModal();
    });
}

if (editSkills) {
    editSkills.addEventListener('click', function(e) {
        e.preventDefault();
        openEditModal();
    });
}

if (editBio) {
    editBio.addEventListener('click', function(e) {
        e.preventDefault();
        openEditModal();
    });
}

// مدیریت آپلود آواتار
const avatarEdit = document.querySelector('.profiles-avatar-edit');
if (avatarEdit) {
    avatarEdit.addEventListener('click', function() {
        alert('آپلود تصویر پروفایل');
    });
}

// مدیریت سوالات متداول
const faqItems = document.querySelectorAll('.supports-faq-item, .content-faq-item');
faqItems.forEach(item => {
    if (item) {
        const question = item.querySelector('.supports-faq-question, .content-faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // بستن سایر آیتم‌ها
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // باز/بسته کردن آیتم فعلی
                item.classList.toggle('active');
            });
        }
    }
});

// مدیریت فرم پشتیبانی
const supportForm = document.getElementById('support-form');
const openTicketBtn = document.getElementById('open-ticket-btn');

if (supportForm) {
    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name')?.value,
            email: document.getElementById('email')?.value,
            subject: document.getElementById('subject')?.value,
            category: document.getElementById('category')?.value,
            message: document.getElementById('message')?.value
        };
        
        alert('تیکت پشتیبانی شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
        supportForm.reset();
    });
}

// اسکرول به فرم هنگام کلیک روی دکمه ارسال تیکت
if (openTicketBtn) {
    openTicketBtn.addEventListener('click', () => {
        const contactFormSection = document.querySelector('.supports-contact-form-section');
        if (contactFormSection) {
            contactFormSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// مدیریت فیلترهای مدرسین
const categoryFilter = document.getElementById('category-filter');
const experienceFilter = document.getElementById('experience-filter');
const ratingFilter = document.getElementById('rating-filter');

function filterInstructors() {
    const category = categoryFilter?.value;
    const experience = experienceFilter?.value;
    const rating = ratingFilter?.value;
    
    console.log(`فیلترها: دسته‌بندی=${category}, تجربه=${experience}, امتیاز=${rating}`);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterInstructors);
}

if (experienceFilter) {
    experienceFilter.addEventListener('change', filterInstructors);
}

if (ratingFilter) {
    ratingFilter.addEventListener('change', filterInstructors);
}

// مدیریت پاپ آپ مدرسین
const instructorPopup = document.getElementById('instructor-popup');
const popupClose = document.getElementById('popup-close');

const instructorsData = {
    1: {
        name: "دکتر وحید پویافر",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/pouyafar/fa/teachersInfo/cv/345' },
            { name: 'Google Scholar', url: `https://scholar.google.com/citations?user=nB_QyO0AAAAJ&hl=en` },
            { name: 'ORCID', url: `https://orcid.org/0000-0003-3130-8713` },
            { name: 'Research GATE', url: `https://www.researchgate.net/profile/Vahid-Pouyafar` },
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1383', uni: 'دانشگاه تبریز' },
            { name: 'کارشناسی ارشد', year: '1385', uni: 'دانشگاه صنعتی امیرکبیر' },
            { name: 'دکترای تخصصی', year: '1391', uni: 'دانشگاه صنعتی امیرکبیر' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/pouyafar/fa/teachersInfo/teacher-personal-image/2024/66f08b7300091-800px-vahid.pouyafar.jpg"
    },
    2: {
        name: "دکتر محمد زادشکویان",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/zadshakoyan/fa/teachersInfo/cv/546' }           
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1366', uni: 'دانشگاه تبریز' },
            { name: 'کارشناسی ارشد', year: '1373', uni: 'دانشگاه بوردو فرانسه' },
            { name: 'دکترای تخصصی', year: '1377', uni: 'دانشگاه بوردو فرانسه' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/zadshakoyan/fa/teachersInfo/teacher-personal-image/2025/1752566434-68760aa2c6d76-.jpg"
    },
    3: {
        name: "دکتر محمدرضا شبگرد",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/mrshabgard/fa/teachersInfo/cv/13' },
            { name: 'ORCID', url: 'https://orcid.org/my-orcid?orcid=0000-0002-5959-4371' },
            { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=_AzCW6UAAAAJ&hl=en&oi=ao' },           
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1366', uni: 'دانشگاه تبریز' },
            { name: 'کارشناسی ارشد', year: '1372', uni: 'دانشگاه صنعتی امیرکبیر' },
            { name: 'دکترای تخصصی', year: '1385', uni: 'دانشگاه تبریز، فرصت مطالعاتی دانشگاه کاردیف انگلستان' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/mrshabgard/fa/teachersInfo/teacher-personal-image/2024/66c32ee30c66b-revised-figure-shabghard.png"
    },
    4: {
        name: "دکتر کریم شلش‌نژاد",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/shelesh-nezhad/fa/teachersInfo/cv/29' },
            { name: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=7801506859' },
            { name: 'Web of Science', url: 'https://www.webofscience.com/wos/author/rid/AAC-3489-2022' },
            { name: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&user=EZh7aKYAAAAJ' },           
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1366', uni: 'دانشگاه امیرکبیر' },
            { name: 'کارشناسی ارشد', year: '1372', uni: 'Wollongong University, Australia' },
            { name: 'دکترای تخصصی', year: '1385', uni: 'Queensland University of Technology (QUT), Australia' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/shelesh-nezhad/fa/teachersInfo/teacher-personal-image/2024/6627e6731aa9f-k.shelesh-nezhad-personnal-photo0003.jpg"
    },
    5: {
        name: "دکتر مقصود شلوندی",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/mshalvandi/fa/teachersInfo/cv/30' },
            { name: 'Google Scholar', url: `https://scholar.google.com/citations?user=fJB1H6cAAAAJ&hl=en` }
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1383', uni: 'دانشگاه تبریز' },
            { name: 'کارشناسی ارشد', year: '1385', uni: 'دانشگاه تربیت مدرس تهران' },
            { name: 'دکترای تخصصی', year: '1395', uni: 'دانشگاه تربیت مدرس تهران' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/mshalvandi/fa/teachersInfo/teacher-personal-image/2024/66ba6c0478500-photo-2022-02-04-00-42-49.jpg"
    },
    6: {
        name: "دکتر مهران محبوب خواه",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/mahboobkhah/fa/teachersInfo/cv/683' },
            { name: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=23767929800' },
            { name: 'Web of Science', url: 'https://www.webofscience.com/wos/author/record/2428357' },
            { name: 'ORCID', url: 'https://orcid.org/0000-0003-0275-4837' },
            { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=sSst3icAAAAJ&hl=en' },           
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1377', uni: 'دانشگاه امیرکبیر' },
            { name: 'کارشناسی ارشد', year: '1379', uni: 'دانشگاه صنعتی شریف' },
            { name: 'دکترای تخصصی', year: '1386', uni: 'دانشگاه تربیت مدرس تهران' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/mahboobkhah/fa/teachersInfo/teacher-personal-image/2024/660f08d6b8631-pic.jpg"
    },    
    7: {
        name: "دکتر امیر مصطفی پور",
        title: "دکترای تخصصی",       
        bio: "عضو هیئت علمی تمام وقت",
        skills: [
            { name: 'رزومه', url: 'https://faculty.tabrizu.ac.ir/a-mostafapur/fa/teachersInfo/cv/717' }            
        ],
        savabegh_tahsili: [
            { name: 'کارشناسی', year: '1374', uni: 'دانشگاه تبریز' },
            { name: 'کارشناسی ارشد', year: '1376', uni: 'دانشگاه صنعتی امیرکبیر' },
            { name: 'دکترای تخصصی', year: '1384', uni: 'دانشگاه صنعتی امیرکبیر' },
        ],
        avatar: "https://faculty.tabrizu.ac.ir/images/a-mostafapur/fa/teachersInfo/teacher-personal-image/2024/6643378faaa88-image0098.jpg"
    },
    
};

function openInstructorPopup(instructorId) {
    const instructor = instructorsData[instructorId];
    if (instructor && instructorPopup) {
        document.getElementById('popup-name').textContent = instructor.name;
        document.getElementById('popup-title').textContent = instructor.title;
        document.getElementById('popup-avatar').src = instructor.avatar;
        document.getElementById('popup-avatar').alt = instructor.name;
        
        // به‌روزرسانی امتیاز
        const ratingElement = document.getElementById('popup-rating');
        if (ratingElement) {
            ratingElement.innerHTML = '';
            const fullStars = Math.floor(instructor.rating);
            const hasHalfStar = instructor.rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                ratingElement.innerHTML += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                ratingElement.innerHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                ratingElement.innerHTML += '<i class="far fa-star"></i>';
            }
            
            ratingElement.innerHTML += `<span>${instructor.rating}</span>`;
        }
        
        // به‌روزرسانی آمار
        const coursesElement = document.getElementById('popup-courses');
        const studentsElement = document.getElementById('popup-students');
        const reviewsElement = document.getElementById('popup-reviews');
        
        if (coursesElement) coursesElement.textContent = instructor.courses;
        if (studentsElement) studentsElement.textContent = instructor.students.toLocaleString();
        if (reviewsElement) reviewsElement.textContent = instructor.reviews.toLocaleString();
        
        // به‌روزرسانی بیوگرافی
        const bioElement = document.getElementById('popup-bio');
        if (bioElement) bioElement.textContent = instructor.bio;
        
        // به‌روزرسانی مهارت‌ها
        const skillsContainer = document.getElementById('popup-skills');
        if (skillsContainer) {
            skillsContainer.innerHTML = '';
            instructor.skills.forEach(skill => {
                const skillElement = document.createElement('a');
                skillElement.className = 'instru-skill-tag';
                skillElement.href = skill.url;
                skillElement.target = "_blank";
                skillElement.textContent = skill.name;
                skillsContainer.appendChild(skillElement);
            });
        }

        const savabeghTahsili = document.getElementById('popup-courses-list');
        if(savabeghTahsili) {
            savabeghTahsili.innerHTML = '';
            instructor.savabegh_tahsili.forEach(savabegh => {
                savabeghTahsili.insertAdjacentHTML("beforeend", `
                         <div class="instru-popup-course">
                            <div class="instru-popup-course-title">${savabegh.name}</div>
                            <div class="instru-popup-course-meta">
                                <span>سال ${savabegh.year}</span>
                                <span>${savabegh.uni}</span>
                            </div>
                        </div>                              
                    `)
            });
        }
        
        // نمایش پاپ آپ
        instructorPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // فوکوس روی دکمه بستن برای دسترسی پذیری
        setTimeout(() => {
            if (popupClose) popupClose.focus();
        }, 100);
    }
}

function closeInstructorPopup() {
    if (instructorPopup) {
        instructorPopup.classList.remove('active');
        document.body.style.overflow = '';
        
        // بازگرداندن فوکوس به دکمه‌ای که پاپ آپ را باز کرده
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('instru-btn-profile')) {
            activeElement.focus();
        }
    }
}

if (popupClose) {
    popupClose.addEventListener('click', closeInstructorPopup);
}

// بستن پاپ آپ با کلیک خارج از محتوا
if (instructorPopup) {
    instructorPopup.addEventListener('click', function(e) {
        if (e.target === instructorPopup) {
            closeInstructorPopup();
        }
    });
}

// مدیریت حذف مهارت‌ها
const skillRemoveButtons = document.querySelectorAll('.profiles-skill-remove');
skillRemoveButtons.forEach(button => {
    if (button) {
        button.addEventListener('click', function() {
            const skillTag = this.closest('.profiles-skill-tag');
            if (skillTag) {
                skillTag.style.opacity = '0';
                setTimeout(() => {
                    skillTag.remove();
                }, 300);
            }
        });
    }
});

// مدیریت ریسپانسیو در هنگام تغییر اندازه پنجره
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // بستن منوهای موبایل
        const allSidebars = [sidebar, cardsSidebar];
        const allMobileNavContainers = [mobileNavContainer, aboutsMobileNavContainer, blogsMobileNavContainer, navContainer, contentMobileNavContainer];
        const allOverlays = [mobileMenuOverlay, aboutsMobileMenuOverlay, blogsMobileMenuOverlay, cardsMobileMenuOverlay, contentMobileMenuOverlay];
        const allLogos = [mainLogo, aboutsMainLogo, contentMainLogo];
        const allMenuToggles = [mobileMenuToggle, aboutsMobileMenuToggle, blogsMobileMenuToggle, cardsMobileMenuToggle, contentMobileMenuToggle, hamburgerMenu];
        
        allSidebars.forEach(sb => {
            if (sb) sb.classList.remove('active');
        });
        
        allMobileNavContainers.forEach(container => {
            if (container) container.classList.remove('active');
        });
        
        allOverlays.forEach(overlay => {
            if (overlay) overlay.classList.remove('active');
        });
        
        allLogos.forEach(logo => {
            if (logo) logo.classList.remove('hidden');
        });
        
        allMenuToggles.forEach(toggle => {
            if (toggle) {
                toggle.classList.remove('active');
                if (toggle === hamburgerMenu) {
                    toggle.innerHTML = '<i class="fas fa-bars"></i>';
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        document.body.style.overflow = '';
    }
});

// بهبود دسترسی: اضافه کردن قابلیت بستن منو با کلید ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const isAnyMenuOpen = 
            (sidebar && sidebar.classList.contains('active')) || 
            (mobileNavContainer && mobileNavContainer.classList.contains('active')) ||
            (navContainer && navContainer.classList.contains('active')) ||
            (aboutsMobileNavContainer && aboutsMobileNavContainer.classList.contains('active')) ||
            (blogsMobileNavContainer && blogsMobileNavContainer.classList.contains('active')) ||
            (cardsSidebar && cardsSidebar.classList.contains('active')) ||
            (contentMobileNavContainer && contentMobileNavContainer.classList.contains('active'));
        
        if (isAnyMenuOpen) {
            toggleMobileMenu();
        }
        
        // بستن پاپ آپ مدرسین
        if (instructorPopup && instructorPopup.classList.contains('active')) {
            closeInstructorPopup();
        }
        
        // بستن مودال ویرایش پروفایل
        if (editProfileModal && editProfileModal.style.display === 'flex') {
            closeEditModal();
        }
    }
});

// بهبود UX: جلوگیری از زوم ناخواسته در موبایل هنگام کلیک روی input
document.addEventListener('touchstart', function() {}, {passive: true});

// بهبود UX: اسکرول نرم به بخش‌ها
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // فقط برای لینک‌های داخلی اعمال شود
            if (href === '#' || href.startsWith('#!')) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// بستن منوی موبایل در صورت کلیک روی لینک‌ها (برای منوی موبایل)
const mobileNavLinks = document.querySelectorAll('.term-1-mobile-nav-link, .mobile-nav-link, .supports-nav-link, .instru-nav-link, .abouts-mobile-nav-link, .blogs-mobile-nav-link, .content-mobile-nav-link');
mobileNavLinks.forEach(link => {
    if (link) {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    }
});

// انیمیشن اسکرول برای عناصر مختلف
function setupScrollAnimations() {
    const elementsToAnimate = [
        '.instru-instructor-card', '.instru-why-instructor-card', '.instru-process-step',
        '.abouts-mission-card', '.abouts-vision-card', '.abouts-value-card', 
        '.abouts-team-card', '.abouts-timeline-content',
        '.blogs-blog-post', '.blogs-sidebar-widget',
        '.cards-cart-item',
        '.feature-card', '.course-card', '.why-us-feature',
        '.content-contact-card', '.content-contact-form-container', '.content-faq-item'
    ];
    
    const allElements = document.querySelectorAll(elementsToAnimate.join(', '));
    
    // تنظیم حالت اولیه برای انیمیشن
    allElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    function animateOnScroll() {
        allElements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                // تاخیر برای انیمیشن‌های پلکانی
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

// فراخوانی تابع انیمیشن
setupScrollAnimations();

// بهبود بارگذاری تصاویر
function loadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// فراخوانی تابع بارگذاری تصاویر
loadImages();

// بهبود تجربه کاربری: نمایش وضعیت بارگذاری برای عملیات زمان‌بر
document.querySelectorAll('.profiles-btn, .edd-btn, .dashboards-action-btn, .cards-add-to-cart-btn, .btn-enroll').forEach(button => {
    if (button) {
        button.addEventListener('click', function() {
            if (this.classList.contains('profiles-btn-primary') || 
                this.classList.contains('edd-btn-primary') || 
                this.classList.contains('dashboards-action-btn-primary') ||
                this.classList.contains('cards-add-to-cart-btn') ||
                this.classList.contains('btn-enroll')) {
                // اضافه کردن افکت کلیک برای دکمه‌های اصلی
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    }
});

// توابع کمکی برای cards
function updateCartTotal() {
    console.log('مجموع سبد خرید به‌روزرسانی شد');
}

function checkEmptyCart() {
    const cartItems = document.querySelectorAll('.cards-cart-items .cards-cart-item');
    if (cartItems.length === 0) {
        console.log('سبد خرید خالی است');
    }
}

function showNotification(message) {
    const notification = document.getElementById('cards-notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        alert(message); // Fallback
    }
}

function showLoading() {
    const loadingOverlay = document.getElementById('cards-loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('cards-loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// بهبود UX: نمایش انیمیشن هنگام بارگذاری صفحه برای cards
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelectorAll('.cards-cart-item');
    cartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s, transform 0.3s';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// مدیریت فرم تماس
const contentContactForm = document.getElementById('content-contact-form');
const contentSuccessMessage = document.getElementById('content-success-message');

if (contentContactForm) {
    contentContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contentName = document.getElementById('content-name')?.value;
        const contentEmail = document.getElementById('content-email')?.value;
        const contentSubject = document.getElementById('content-subject')?.value;
        const contentMessage = document.getElementById('content-message')?.value;
        
        // اعتبارسنجی فرم
        let contentIsValid = true;
        
        // اعتبارسنجی نام
        if (!contentName?.trim()) {
            document.getElementById('content-name')?.parentElement?.classList.add('error');
            contentIsValid = false;
        } else {
            document.getElementById('content-name')?.parentElement?.classList.remove('error');
        }
        
        // اعتبارسنجی ایمیل
        const contentEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!contentEmailRegex.test(contentEmail)) {
            document.getElementById('content-email')?.parentElement?.classList.add('error');
            contentIsValid = false;
        } else {
            document.getElementById('content-email')?.parentElement?.classList.remove('error');
        }
        
        // اعتبارسنجی موضوع
        if (!contentSubject?.trim()) {
            document.getElementById('content-subject')?.parentElement?.classList.add('error');
            contentIsValid = false;
        } else {
            document.getElementById('content-subject')?.parentElement?.classList.remove('error');
        }
        
        // اعتبارسنجی پیام
        if (!contentMessage?.trim()) {
            document.getElementById('content-message')?.parentElement?.classList.add('error');
            contentIsValid = false;
        } else {
            document.getElementById('content-message')?.parentElement?.classList.remove('error');
        }
        
        if (!contentIsValid) return;
        
        // شبیه‌سازی ارسال فرم
        const contentSubmitBtn = this.querySelector('.content-btn-submit');
        const contentOriginalText = contentSubmitBtn.innerHTML;
        
        contentSubmitBtn.innerHTML = '<div class="content-loading-spinner"></div><span>در حال ارسال...</span>';
        contentSubmitBtn.disabled = true;
        
        setTimeout(() => {
            contentSubmitBtn.innerHTML = '<i class="fas fa-check"></i><span>پیام ارسال شد</span>';
            contentSubmitBtn.style.background = 'var(--success-color)';
            
            // نمایش پیام موفقیت
            if (contentSuccessMessage) {
                contentSuccessMessage.style.display = 'block';
                
                // اسکرول به پیام موفقیت
                contentSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // بازگشت به حالت اولیه بعد از 5 ثانیه
            setTimeout(() => {
                contentSubmitBtn.innerHTML = contentOriginalText;
                contentSubmitBtn.disabled = false;
                contentSubmitBtn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
                contentContactForm.reset();
                if (contentSuccessMessage) {
                    contentSuccessMessage.style.display = 'none';
                }
            }, 5000);
        }, 2000);
    });
}

// مدیریت دکمه بازگشت به بالا
const contentBackToTopBtn = document.getElementById('content-back-to-top');

if (contentBackToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            contentBackToTopBtn.classList.add('visible');
        } else {
            contentBackToTopBtn.classList.remove('visible');
        }
    });

    contentBackToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// مدیریت دکمه‌های نقشه
const contentGetDirectionsBtn = document.getElementById('content-get-directions');
const contentFullscreenMapBtn = document.getElementById('content-fullscreen-map');

if (contentGetDirectionsBtn) {
    contentGetDirectionsBtn.addEventListener('click', function() {
        window.open('https://www.google.com/maps/dir//35.689197,51.389749', '_blank');
    });
}

if (contentFullscreenMapBtn) {
    contentFullscreenMapBtn.addEventListener('click', function() {
        const contentMapContainer = document.querySelector('.content-map-container');
        if (!document.fullscreenElement) {
            if (contentMapContainer.requestFullscreen) {
                contentMapContainer.requestFullscreen();
            } else if (contentMapContainer.webkitRequestFullscreen) {
                contentMapContainer.webkitRequestFullscreen();
            } else if (contentMapContainer.msRequestFullscreen) {
                contentMapContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });
}

// اعتبارسنجی فرم در زمان تایپ
const contentFormInputs = document.querySelectorAll('.content-form-input, .content-form-textarea');

contentFormInputs.forEach(input => {
    if (input) {
        input.addEventListener('input', function() {
            this.parentElement.classList.remove('error');
        });
    }
});

// انیمیشن برای سکشن "چرا فراآموز؟"
function animateWhyUs() {
    const features = document.querySelectorAll('.why-us-feature');
    
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(50px)';
        feature.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateX(0)';
                }
            });
        });
        
        observer.observe(feature);
    });
}

// فعال‌سازی انیمیشن‌ها هنگام لود صفحه
document.addEventListener('DOMContentLoaded', function() {
    animateWhyUs();
    
    // مقداردهی اولیه تم برای محتوای خاص
    if (localStorage.getItem('theme') === 'light' && body.classList.contains('content-dark-theme')) {
        body.classList.replace('content-dark-theme', 'content-light-theme');
    }
});

    // اسکریپت برای مدیریت تب‌ها
    document.addEventListener('DOMContentLoaded', function() {
        // مدیریت تب‌ها
        const tabs = document.querySelectorAll('.profiles-settings-tab');
        const tabContents = document.querySelectorAll('.profiles-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // حذف کلاس active از همه تب‌ها
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // اضافه کردن کلاس active به تب انتخاب شده
                tab.classList.add('active');
                
                // نمایش محتوای تب مربوطه
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });

        if (mobileMenuToggle && mobileMenuOverlay && sidebar) {
            mobileMenuToggle.addEventListener('click', function() {
                sidebar.classList.add('active');
                mobileMenuOverlay.classList.add('active');
            });
            
            mobileMenuOverlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            });
        }
    });