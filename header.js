// 共通ヘッダーとナビゲーション機能

// ページ定義
const PAGES = {
    home: { path: '../index.html', title: 'ホーム' },
    login: { path: '../login/index.html', title: 'ログイン' },
    register: { path: '../register/index.html', title: '会員登録' },
    menu: { path: '../menu/index.html', title: 'メニュー' },
    cart: { path: '../cart/index.html', title: 'カート' },
    detail: { path: '../detail/index.html', title: '商品詳細' },
    'order-dashboard': { path: '../order-dashboard/index.html', title: '注文管理' }
};

// 現在のページを取得
function getCurrentPage() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment !== '');
    
    if (segments.length === 0 || segments[segments.length - 1] === 'index.html') {
        if (segments.length <= 1) {
            return 'home';
        }
        return segments[segments.length - 2];
    }
    
    return segments[segments.length - 1];
}

// ページの順番を定義
const PAGE_ORDER = ['home', 'login', 'register', 'menu', 'cart', 'detail', 'order-dashboard'];

// 前のページと次のページを取得
function getNavigationPages() {
    const currentPage = getCurrentPage();
    const currentIndex = PAGE_ORDER.indexOf(currentPage);
    
    const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
    const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;
    
    return { prevPage, nextPage };
}

// ヘッダーHTMLを生成
function generateHeader() {
    const currentPage = getCurrentPage();
    const { prevPage, nextPage } = getNavigationPages();
    
    let headerHTML = `
    <header class="common-header">
        <div class="header-content">
            <h1 class="site-title">小松購買システム</h1>
            <nav class="main-nav">
                <div class="nav-links">
    `;
    
    // 全ページへのリンクを生成
    for (const [key, page] of Object.entries(PAGES)) {
        const isActive = key === currentPage ? 'active' : '';
        const href = key === 'home' ? (getCurrentPage() === 'home' ? '#' : '../index.html') : page.path;
        headerHTML += `<a href="${href}" class="nav-link ${isActive}">${page.title}</a>`;
    }
    
    headerHTML += `
                </div>
            </nav>
        </div>
        <div class="page-navigation">
            <div class="nav-controls">
    `;
    
    // 前へボタン
    if (prevPage) {
        const prevPageData = PAGES[prevPage];
        const prevHref = prevPage === 'home' ? '../index.html' : prevPageData.path;
        headerHTML += `<button class="nav-btn prev-btn" onclick="location.href='${prevHref}'">&lt; ${prevPageData.title}</button>`;
    } else {
        headerHTML += `<button class="nav-btn prev-btn disabled" disabled>&lt; 前へ</button>`;
    }
    
    // 現在のページ表示
    const currentPageTitle = PAGES[currentPage] ? PAGES[currentPage].title : currentPage;
    headerHTML += `<span class="current-page">${currentPageTitle}</span>`;
    
    // 次へボタン
    if (nextPage) {
        const nextPageData = PAGES[nextPage];
        const nextHref = nextPage === 'home' ? '../index.html' : nextPageData.path;
        headerHTML += `<button class="nav-btn next-btn" onclick="location.href='${nextHref}'">${nextPageData.title} &gt;</button>`;
    } else {
        headerHTML += `<button class="nav-btn next-btn disabled" disabled>次へ &gt;</button>`;
    }
    
    headerHTML += `
            </div>
        </div>
    </header>
    `;
    
    return headerHTML;
}

// DOMが読み込まれたらヘッダーを挿入
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    body.insertAdjacentHTML('afterbegin', generateHeader());
});

// ページ間のナビゲーション関数
function navigateToPage(pageName) {
    if (PAGES[pageName]) {
        const href = pageName === 'home' ? '../index.html' : PAGES[pageName].path;
        location.href = href;
    }
}

// キーボードナビゲーション
document.addEventListener('keydown', function(e) {
    const { prevPage, nextPage } = getNavigationPages();
    
    if (e.key === 'ArrowLeft' && prevPage) {
        e.preventDefault();
        navigateToPage(prevPage);
    } else if (e.key === 'ArrowRight' && nextPage) {
        e.preventDefault();
        navigateToPage(nextPage);
    }
});