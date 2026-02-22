Pages.download = () => `
<div class="page-title">
    <span class="page-icon">◈</span>
    <h2>BOIII Download Guide</h2>
    <span class="page-badge">v1.5.2</span>
</div>

<p class="page-intro">
    Welcome to the BOIII Download Guide! This guide will walk you through the steps to download,
    install, and set up BOIII, the enhanced custom client for Black Ops III.
    Follow along to get started and jump into the action!
</p>

<div class="section">
    <div class="section-title">System Requirements</div>
    <div class="card">
        <table class="data-table">
            <tr><th>Requirement</th><th>Specification</th></tr>
            <tr><td class="accent-cell">Operating System</td><td>Windows 10 64-bit or Windows 11</td></tr>
            <tr><td class="accent-cell">Processor</td><td>Intel Core i3-4170 or AMD FX-8120</td></tr>
            <tr><td class="accent-cell">Memory</td><td>8 GB RAM</td></tr>
            <tr><td class="accent-cell">Graphics</td><td>NVIDIA GeForce GTX 660 / AMD Radeon HD 7850</td></tr>
            <tr><td class="accent-cell">DirectX</td><td>Version 11</td></tr>
            <tr><td class="accent-cell">Network</td><td>Broadband Internet connection</td></tr>
            <tr><td class="accent-cell">Storage</td><td>100 GB available space</td></tr>
        </table>
    </div>
</div>

<div class="section">
    <div class="section-title">Getting Started</div>
    
    <div class="card card-accent" style="margin-bottom: 15px;">
        <div class="card-header">
            <span class="card-icon">▶</span>
            <span class="card-title">Step 1: Get Base Game</span>
        </div>
        <div class="card-content">
            <p>You need a copy of Black Ops III to use BOIII. You can get it via Steam or follow our installation guide for alternative methods. Having the game from Steam is not a requirement.</p>
            <div class="button-group">
                <button class="btn" onclick="App.call('open_url', {url: 'https://store.steampowered.com/app/311210/'})">Steam Store Page</button>
                <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/topic/5/bo3-guide'})">Installation Guide</button>
            </div>
        </div>
    </div>

    <div class="card card-accent" style="margin-bottom: 15px;">
        <div class="card-header">
            <span class="card-icon">↓</span>
            <span class="card-title">Step 2: Download BOIII</span>
        </div>
        <div class="card-content">
            <p>Download the latest version of BOIII from our official GitHub repository. Make sure to get the most recent release for the best experience.</p>
            <div class="button-group">
                <button class="btn" onclick="App.call('open_url', {url: 'https://github.com/Ezz-lol/boiii-free/releases/latest'})">Download BOIII</button>
            </div>
        </div>
    </div>

    <div class="card card-accent" style="margin-bottom: 15px;">
        <div class="card-header">
            <span class="card-icon">◉</span>
            <span class="card-title">Step 3: Installation</span>
        </div>
        <div class="card-content">
            <p>Place the BOIII launcher in your Black Ops III game folder and run it as administrator. The launcher will download and install all necessary components automatically.</p>
        </div>
    </div>

    <div class="card card-accent">
        <div class="card-header">
            <span class="card-icon">►</span>
            <span class="card-title">Step 4: Launch Game</span>
        </div>
        <div class="card-content">
            <p>After installation is complete, you can launch the game directly through the BOIII launcher. You'll have access to all enhanced features and community servers.</p>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Latest News</div>
    <div class="card">
        <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--card-border);">
            <span style="font-size: 20px;">►</span>
            <div><strong class="text-white">BOIII v1.0.5 Released</strong><br><span class="text-muted">New version with improved stability and new features</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--card-border);">
            <span style="font-size: 20px;">◎</span>
            <div><strong class="text-white">Server Browser</strong><br><span class="text-muted">New server browser functionality added</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--card-border);">
            <span style="font-size: 20px;">✦</span>
            <div><strong class="text-white">Crash Fixes</strong><br><span class="text-muted">Fixed various crash issues reported by the community</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0;">
            <span style="font-size: 20px;">◇</span>
            <div><strong class="text-white">Custom Content</strong><br><span class="text-muted">Added support for custom maps and mods</span></div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Key Features</div>
    <div class="grid">
        <div class="feature-card">
            <span class="card-icon">✦</span>
            <span class="card-title">Enhanced Performance</span>
            <div class="card-content">Improved game performance with optimized code and reduced memory usage</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◎</span>
            <span class="card-title">Dedicated Servers</span>
            <div class="card-content">Play on community-hosted dedicated servers with better stability</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◎</span>
            <span class="card-title">Advanced Server Browser</span>
            <div class="card-content">Find servers with detailed filtering options and sorting</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">▶</span>
            <span class="card-title">Controller Support</span>
            <div class="card-content">Enhanced controller support with customizable button mapping</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◆</span>
            <span class="card-title">Custom Content</span>
            <div class="card-content">Support for custom maps, mods, and game modes</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">▣</span>
            <span class="card-title">Anti-Cheat Protection</span>
            <div class="card-content">Built-in anti-cheat system to ensure fair gameplay</div>
        </div>
    </div>
</div>

<div class="info-box">
    <div class="info-box-title">◆ IMPORTANT INFORMATION</div>
    <p>BOIII is a community-made modification that requires a legitimate copy of Black Ops III. It enhances the base game but does not replace it. All files are scanned and verified to be safe, but use at your own risk. For any issues, please visit our forums or Discord for support.</p>
</div>

<div class="section">
    <div class="section-title">Game File Download (Torrent)</div>
    <div class="card">
        <div class="card-content">
            <p>If you don't have access to the game files, you can download them via torrent using <strong>qBittorrent</strong>:</p>
            <ul>
                <li><strong>Base Game (MP/ZM):</strong> ~44 GB - Required for all modes</li>
                <li><strong>Campaign:</strong> ~24 GB - Optional single player content</li>
                <li><strong>Zombie Chronicles:</strong> ~20 GB - Remastered zombies maps</li>
                <li><strong>DLC Pack:</strong> ~37 GB - Additional multiplayer and zombies content</li>
            </ul>
            <div class="button-group">
                <button class="btn" onclick="App.call('open_url', {url: 'https://rentry.org/boiiidownloads'})">Download Guide</button>
                <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://www.qbittorrent.org/download'})">Get qBittorrent</button>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Folder Structure</div>
    <div class="card">
        <div class="code-block">
Call of Duty Black Ops III/
├── boiii.exe          (BOIII Client)
├── BlackOps3.exe      (Original game - required)
├── zone/              (Game data)
├── players2/          (Player settings)
├── usermaps/          (Custom maps)
├── mods/              (Mods folder)
└── data/              (BOIII data)
        </div>
    </div>
</div>

<div class="warning-box">
    <div class="warning-title">△ Antivirus Warning</div>
    <p>Some antivirus software may flag BOIII as a false positive. Add an exception for your game folder to prevent issues.</p>
</div>

<div class="section">
    <div class="section-title">Troubleshooting & Support</div>
    <div class="grid-2">
        <div class="feature-card">
            <span class="card-icon">≡</span>
            <span class="card-title">Common Issues</span>
            <div class="card-content">
                <p>Find solutions to common problems and troubleshooting tips.</p>
                <div class="button-group">
                    <button class="btn btn-small" onclick="App.showPage('wont_launch')">View Common Issues</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">✦</span>
            <span class="card-title">BOIII Remover</span>
            <div class="card-content">
                <p>Having problems? Use our remover tool for a clean reinstall.</p>
                <div class="button-group">
                    <button class="btn btn-small btn-danger" onclick="App.showPage('remover')">BOIII Remover Tool</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="support-footer">
    <p>Join our community for help, updates, and discussions:</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Community</button>
        <button class="btn" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Official Forums</button>
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://github.com/Ezz-lol/boiii-free'})">GitHub Repository</button>
    </div>
</div>
`;

PageInit.download = () => {
    // No init needed
};
