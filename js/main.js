document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 本日の蒸したてカウンター (Today's Steamed Counter)
    // ==========================================
    const steamStatusElement = document.getElementById('steam-status-text');
    
    if (steamStatusElement) {
        const updateSteamStatus = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMin = now.getMinutes();
            
            // 開店時間（10:00）
            const openHour = 10;
            const openMin = 0;
            
            // 現在時刻（分換算）
            const currentTotalMin = currentHour * 60 + currentMin;
            // 開店時刻（分換算）
            const openTotalMin = openHour * 60 + openMin;
            
            const diffMin = openTotalMin - currentTotalMin;
            
            if (diffMin > 0) {
                // 開店前 (Before opening)
                // 60分以内なら分表示、それ以上なら「準備中」など柔軟に
                if (diffMin <= 60) {
                     steamStatusElement.textContent = `本日のお赤飯、蒸し上がりまであとxc2xa0${diffMin}分`;
                } else {
                     steamStatusElement.textContent = `本日のお赤飯、10時に蒸し上がります`;
                }
                steamStatusElement.parentElement.classList.remove('is-ready');
            } else {
                // 開店後 (After opening)
                steamStatusElement.textContent = `ただいま蒸したて！`;
                steamStatusElement.parentElement.classList.add('is-ready');
            }
        };
        
        // 初回実行
        updateSteamStatus();
        // 1分ごとに更新
        setInterval(updateSteamStatus, 60000);
    }

    // ==========================================
    // 2. スクロールアニメーション (Scroll Animations)
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // 要素が20%見えたら発火
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示したら監視を解除する場合
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
});
