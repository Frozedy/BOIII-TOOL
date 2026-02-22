Pages.legacy = () => `
<div class="page-title">
    <span class="page-icon">◁</span>
    <h2>Legacy BOIII Download</h2>
</div>

<p class="page-intro">
    The Legacy version of BOIII is an older but stable version that can help resolve several critical
    issues that may occur with the latest version. This tool will help you install and configure the
    legacy version to get back to playing.
</p>

<div class="section">
    <div class="section-title">Critical Issues Fixed by Legacy Version</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">✦</span>
            <span class="card-title">Critical Issues Fixed by Legacy Version</span>
        </div>
        <div style="margin-top: 10px;">
            <div class="issue-card">
                <div class="card-header">
                    <span class="card-icon">✕</span>
                    <span class="card-title">Fatal Error (0xC0000005)</span>
                </div>
                <div class="card-content">A minidump has been written at (0x00007FF8A7CE7E66(0x000000037B2C7E66))</div>
            </div>
            <div class="issue-card">
                <div class="card-header">
                    <span class="card-icon">▢</span>
                    <span class="card-title">Black Screen</span>
                </div>
                <div class="card-content">Game appears to launch but displays only a black screen</div>
            </div>
            <div class="issue-card">
                <div class="card-header">
                    <span class="card-icon">✕</span>
                    <span class="card-title">Startup Crashes</span>
                </div>
                <div class="card-content">Game crashes immediately or shortly after launching</div>
            </div>
            <div class="issue-card">
                <div class="card-header">
                    <span class="card-icon">✧</span>
                    <span class="card-title">Hardware Compatibility</span>
                </div>
                <div class="card-content">Issues with certain hardware configurations or drivers</div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Download & Installation</div>
    <div class="grid-2">
        <div class="card card-glow">
            <div class="card-header">
                <span class="card-icon">↓</span>
                <span class="card-title">Direct Download</span>
            </div>
            <div class="card-content">
                <p>Download the legacy BOIII files directly from our secure server. This is the recommended method for most users.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.call('open_url', {url: 'https://drive.google.com/file/d/18-lr_MZ27eSF3v5JecT6eHpRabFeDo1p/view?usp=drive_link'})">Download Legacy Files</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <span class="card-icon">↻</span>
                <span class="card-title">Alternative Sources</span>
            </div>
            <div class="card-content">
                <p>If the direct download is slow or unavailable, you can get the legacy files from our forum or GitHub repository.</p>
                <div class="button-group">
                    <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/topic/legacy-boiii-downloads'})">Forum Download</button>
                    <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://github.com/Ezz-lol/boiii-free/releases'})">GitHub Releases</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Installation Instructions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Download the Legacy Files</div>
                <div class="step-content">Download the legacy BOIII files using one of the download buttons above. The file size is approximately 120MB.</div>
            </div>
            <div class="step">
                <div class="step-title">Close BOIII</div>
                <div class="step-content">Make sure BOIII and any related processes are completely closed before installing the legacy version. This includes launchers and updaters.</div>
            </div>
            <div class="step">
                <div class="step-title">Extract Files</div>
                <div class="step-content">Extract the downloaded ZIP file using WinRAR, 7-Zip, or Windows built-in extraction tool. You'll get a folder with several files.</div>
            </div>
            <div class="step">
                <div class="step-title">Locate Game Folder</div>
                <div class="step-content">
                    Navigate to your Black Ops III game folder. Default locations are:
                    <ul>
                        <li>Steam: <span class="code">C:\\Program Files (x86)\\Steam\\steamapps\\common\\Call of Duty Black Ops III</span></li>
                        <li>Battle.net: <span class="code">C:\\Program Files (x86)\\Call of Duty Black Ops III</span></li>
                    </ul>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Copy Files</div>
                <div class="step-content">Copy all the extracted files to your game folder. When prompted to replace existing files, click 'Yes' to all.</div>
            </div>
            <div class="step">
                <div class="step-title">Launch the Game</div>
                <div class="step-content">Launch the game using the BOIII launcher. The game should now start without the previous errors.</div>
            </div>
        </div>
    </div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ Important Notes</div>
    <ul>
        <li>The legacy version may not have all the latest features from the current release</li>
        <li>Some mods may not be compatible with the legacy version</li>
        <li>You can switch back to the current version at any time by verifying game files</li>
        <li>Your game progress and settings will not be affected by using the legacy version</li>
    </ul>
</div>

<div class="section">
    <div class="section-title">Alternative Solutions</div>
    <div class="grid">
        <div class="feature-card">
            <span class="card-icon">▢</span>
            <span class="card-title">Update Graphics Drivers</span>
            <div class="card-content">
                <p>Install the latest drivers for your graphics card.</p>
                <div class="button-group">
                    <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://www.nvidia.com/Download/index.aspx'})">NVIDIA Drivers</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◎</span>
            <span class="card-title">Verify Game Files</span>
            <div class="card-content">
                <p>Verify the integrity of your game files.</p>
                <div class="button-group">
                    <button class="btn btn-small btn-secondary" onclick="App.showPage('verify')">Verify Files</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">✕</span>
            <span class="card-title">Complete Reinstall</span>
            <div class="card-content">
                <p>Remove BOIII completely and reinstall for a fresh start.</p>
                <div class="button-group">
                    <button class="btn btn-small btn-danger" onclick="App.showPage('remover')">BOIII Remover</button>
                </div>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◇</span>
            <span class="card-title">Community Solutions</span>
            <div class="card-content">
                <p>Check our community forums for other user-discovered fixes.</p>
                <div class="button-group">
                    <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Visit Forums</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="warning-box">
    <div class="warning-title">△ Compatibility Warning</div>
    <p>Using legacy versions may prevent you from connecting to updated servers. Only use legacy versions when specifically required.</p>
</div>

<div class="support-footer">
    <p>Need more help? Reach out to us:</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Forums</button>
    </div>
</div>
`;
