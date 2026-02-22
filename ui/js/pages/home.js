Pages.home = () => `
<div class="page-title">
    <span class="page-icon">◈</span>
    <h2>Welcome to BOIII Tool</h2>
    <span class="page-badge">v1.5.2</span>
</div>

<p class="page-intro">
    This comprehensive tool will help you get started with BOIII (Black Ops III Custom Client),
    understand its features, troubleshoot common issues, and optimize your gaming experience.
    Use the navigation on the left to access different sections.
</p>

<div class="section">
    <div class="section-title">Quick Start Guide</div>
    <div class="grid">
        <div class="feature-card">
            <span class="card-icon">↓</span>
            <span class="card-title">Download & Install</span>
            <div class="card-content">
                <p>Get the latest BOIII client and install it on your system.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.showPage('download')">Download Now</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">▶</span>
            <span class="card-title">Play With Friends</span>
            <div class="card-content">
                <p>Play with your friends and enjoy multiplayer fun.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.showPage('friends')">Play Now</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◇</span>
            <span class="card-title">Maps & Mods</span>
            <div class="card-content">
                <p>Learn how to install custom maps and mods for enhanced gameplay.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.showPage('boiiiwd')">Mods Guide</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">✦</span>
            <span class="card-title">Troubleshooting</span>
            <div class="card-content">
                <p>Fix common issues and ensure smooth gameplay experience.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.showPage('wont_launch')">Fix Issues</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Installation Guide</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Download BOIII</div>
                <div class="step-content">
                    <p>Download the latest version of BOIII from our official sources.</p>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Extract Files</div>
                <div class="step-content">
                    <p>Extract the downloaded files using WinRAR or 7-Zip to a location of your choice.</p>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Run Installer</div>
                <div class="step-content">
                    <p>Run the installer and follow the on-screen instructions to complete the installation.</p>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Verify Installation</div>
                <div class="step-content">
                    <p>Verify your installation using our built-in verification tool to ensure all files are correctly installed.</p>
                </div>
            </div>
        </div>
        <div class="button-group">
            <button class="btn" onclick="App.showPage('download')">Download BOIII</button>
            <button class="btn btn-secondary" onclick="App.showPage('verify')">Verify Files</button>
            <button class="btn btn-secondary" onclick="App.showPage('legacy')">Legacy Version</button>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Key Features</div>
    <div class="grid">
        <div class="feature-card">
            <span class="card-icon">►</span>
            <span class="card-title">Performance Enhancements</span>
            <div class="card-content">Optimized game engine for better performance and reduced stuttering</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◆</span>
            <span class="card-title">Graphics Improvements</span>
            <div class="card-content">Enhanced visual fidelity with improved textures and lighting effects</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">♪</span>
            <span class="card-title">Audio Refinements</span>
            <div class="card-content">Improved audio mixing and spatial sound for better gaming experience</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">✦</span>
            <span class="card-title">Mod Support</span>
            <div class="card-content">Extended support for custom maps, modes, and other community mods</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">↗</span>
            <span class="card-title">Server Browser</span>
            <div class="card-content">Enhanced server browser with filtering and favorite options</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">▣</span>
            <span class="card-title">Anti-Cheat System</span>
            <div class="card-content">Built-in anti-cheat system to ensure fair gameplay</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">★</span>
            <span class="card-title">Quick Match</span>
            <div class="card-content">Find and join games faster with our improved matchmaking system</div>
        </div>
        <div class="feature-card">
            <span class="card-icon">★</span>
            <span class="card-title">Custom Game Modes</span>
            <div class="card-content">Create and play unique game modes not available in the original game</div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Advanced Launch Options</div>
    <div class="card">
        <div class="card-header">
            <span class="card-icon">✧</span>
            <span class="card-title">Launch Options</span>
        </div>
        <p style="margin-bottom: 15px; color: var(--text-medium);">
            Add these launch options to optimize your game performance or troubleshoot issues:
        </p>
        <table class="data-table">
            <tr><th>Option</th><th>Description</th></tr>
            <tr><td class="accent-cell">-skip_intro</td><td>Skip the intro videos when launching the game</td></tr>
            <tr><td class="accent-cell">-novid</td><td>Skip the intro videos (alternative)</td></tr>
            <tr><td class="accent-cell">-window</td><td>Run the game in windowed mode</td></tr>
            <tr><td class="accent-cell">-refresh [rate]</td><td>Set a specific refresh rate (e.g., -refresh 144)</td></tr>
            <tr><td class="accent-cell">-nothreadedrendering</td><td>Disable threaded rendering for some systems</td></tr>
            <tr><td class="accent-cell">-limitfps [value]</td><td>Limit FPS to a specific value</td></tr>
            <tr><td class="accent-cell">-d3d11</td><td>Force DirectX 11 mode</td></tr>
            <tr><td class="accent-cell">-safemode</td><td>Launch the game in safe mode for troubleshooting</td></tr>
        </table>
    </div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ Notes & Recommendations</div>
    <ul>
        <li>Always keep your game updated to the latest version for optimal performance and security.</li>
        <li>Back up your game files and configurations before making major changes.</li>
        <li>Make sure your system meets the minimum requirements before installing.</li>
        <li>Join our Discord community for help with any issues not covered in this guide.</li>
        <li>Report any bugs or issues on our forum to help us improve the experience for everyone.</li>
    </ul>
</div>

<div class="section">
    <div class="section-title">Common Troubleshooting</div>
    <div class="grid">
        <div class="feature-card">
            <span class="card-icon">↻</span>
            <span class="card-title">Game Crashes on Startup</span>
            <div class="card-content">
                <p>Verify game files, update graphics drivers, and check for conflicting software.</p>
                <div class="button-group">
                    <button class="btn btn-small" onclick="App.showPage('crashes')">Fix Crashes</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◎</span>
            <span class="card-title">Performance Issues</span>
            <div class="card-content">
                <p>Lower graphics settings, update drivers, and close background applications.</p>
                <div class="button-group">
                    <button class="btn btn-small" onclick="App.showPage('stuttering')">Boost FPS</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">♪</span>
            <span class="card-title">Audio Problems</span>
            <div class="card-content">
                <p>Check audio device settings, update audio drivers, and verify game files.</p>
                <div class="button-group">
                    <button class="btn btn-small" onclick="App.showPage('audio')">Audio Fixes</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">⊞</span>
            <span class="card-title">Connection Issues</span>
            <div class="card-content">
                <p>Check your internet connection, verify port forwarding, and router settings.</p>
                <div class="button-group">
                    <button class="btn btn-small" onclick="App.showPage('connection')">Network Guide</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Tool Options</div>
    <div class="button-group">
        <button class="btn btn-danger" onclick="App.showPage('remover')">BOIII Remover Tool</button>
        <button class="btn" onclick="App.showPage('verify')">Verify BOIII Files</button>
        <button class="btn btn-secondary" onclick="App.showPage('server')">Create Server</button>
    </div>
</div>

<div class="section">
    <div class="section-title">Community & Support</div>
    <div class="grid">
        <div class="feature-card">
            <span class="card-icon">▷</span>
            <span class="card-title">Discord Community</span>
            <div class="card-content">
                <p>Join our Discord server for live support, updates, and to connect with other players.</p>
                <div class="button-group">
                    <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Join Discord</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">▸</span>
            <span class="card-title">Forums</span>
            <div class="card-content">
                <p>Visit our forums to discuss game features, report bugs, and share your feedback.</p>
                <div class="button-group">
                    <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Visit Forums</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">≡</span>
            <span class="card-title">GitHub Repository</span>
            <div class="card-content">
                <p>Check out our GitHub repo for technical details and contribute to the project.</p>
                <div class="button-group">
                    <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://github.com/Ezz-lol/boiii-free'})">GitHub</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="credits">
    BOIII Tool v1.5.2 &copy; 2025 | Created by the BOIII Community<br>
    This tool is not affiliated with Activision or Treyarch. Use at your own risk.
</div>
`;
