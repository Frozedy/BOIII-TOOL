const App = {
    currentPage: 'home',
    pendingCallbacks: {},
    callbackId: 0,

    init() {
        this.setupNavigation();
        this.setupHeader();
        this.setupMessageHandler();
        this.detectGamePath();
        this.showPage('home');
    },

    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.showPage(page);
            });
        });
    },

    setupHeader() {
        document.getElementById('browse-path').addEventListener('click', async () => {
            const path = await this.call('browse_folder', { title: 'Select BO3 Directory' });
            if (path) {
                const valid = await this.validateGamePath(path);
                if (valid) {
                    document.getElementById('game-path').value = path;
                    const banner = document.getElementById('path-warning-banner');
                    if (banner) banner.remove();
                } else {
                    const use = confirm('BlackOps3.exe was not found in this folder. Use it anyway?');
                    if (use) {
                        document.getElementById('game-path').value = path;
                    }
                }
            }
        });

        document.getElementById('discord-btn').addEventListener('click', () => {
            this.call('open_url', { url: 'https://dc.ezz.lol/' });
        });
    },

    setupMessageHandler() {
        window.chrome.webview.addEventListener('message', (event) => {
            const data = event.data;
            
            if (data.type === 'progress' && data.id) {
                const callback = this.pendingCallbacks[data.id + '_progress'];
                if (callback) {
                    callback(data);
                }
                return;
            }

            if (data.id && this.pendingCallbacks[data.id]) {
                const { resolve, reject } = this.pendingCallbacks[data.id];
                delete this.pendingCallbacks[data.id];
                delete this.pendingCallbacks[data.id + '_progress'];
                
                if (data.error) {
                    reject(new Error(data.error));
                } else {
                    resolve(data.data);
                }
            }
        });
    },

    call(action, params = {}, progressCallback = null) {
        return new Promise((resolve, reject) => {
            const id = 'cb_' + (++this.callbackId);
            this.pendingCallbacks[id] = { resolve, reject };
            
            if (progressCallback) {
                this.pendingCallbacks[id + '_progress'] = progressCallback;
            }
            
            const message = JSON.stringify({ action, id, ...params });
            window.chrome.webview.postMessage(message);
        });
    },

    showPage(pageName) {
        this.currentPage = pageName;
        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === pageName);
        });

        const content = document.getElementById('page-content');
        content.scrollTop = 0;

        if (Pages[pageName]) {
            content.innerHTML = Pages[pageName]();
            
            if (PageInit[pageName]) {
                PageInit[pageName]();
            }
        } else {
            content.innerHTML = '<div class="card"><p>Page not found</p></div>';
        }
    },

    async detectGamePath() {
        try {
            const detected = await this.call('detect_game_path');
            if (detected) {
                document.getElementById('game-path').value = detected;
            } else {
                setTimeout(() => {
                    this.showPathWarning();
                }, 500);
            }
        } catch (e) {
        }
    },

    async validateGamePath(path) {
        if (!path) return false;
        try {
            return await this.call('validate_game_path', { path });
        } catch (e) {
            return false;
        }
    },

    showPathWarning() {
        const content = document.getElementById('page-content');
        if (!content) return;
        const existing = document.getElementById('path-warning-banner');
        if (existing) return;
        const banner = document.createElement('div');
        banner.id = 'path-warning-banner';
        banner.style.cssText = 'background:#2a1a00;border:1px solid var(--accent);border-radius:8px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:12px;';
        banner.innerHTML = '<span style="color:var(--accent);font-size:18px;font-weight:bold;">△</span>' +
            '<div style="flex:1;"><strong style="color:var(--accent);">Game path not detected</strong>' +
            '<p style="color:var(--text-medium);margin:4px 0 0;font-size:13px;">Could not auto-detect your Black Ops III installation. Please set the game path manually using the Browse button above.</p></div>';
        content.insertBefore(banner, content.firstChild);
    },

    getGamePath() {
        return document.getElementById('game-path').value || 
               'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Call of Duty Black Ops III';
    },

    formatSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let unit = 0;
        let size = bytes;
        while (size >= 1024 && unit < 4) {
            size /= 1024;
            unit++;
        }
        return size.toFixed(2) + ' ' + units[unit];
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

const Pages = {};
const PageInit = {};
