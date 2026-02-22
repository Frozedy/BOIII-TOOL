// ─── Troubleshoot Hub ─────────────────────────────────────────────
Pages.troubleshoot = () => `
<div class="page-title">
    <span class="page-icon">✦</span>
    <h2>Troubleshooting</h2>
</div>

<p class="page-intro">
    Find solutions to common Black Ops III issues. Click on any issue below for detailed troubleshooting steps.
</p>

<div class="grid-2">
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('wont_launch')">
        <div class="card-header">
            <span class="card-icon">✕</span>
            <span class="card-title">Game Won't Launch</span>
        </div>
        <div class="card-content"><p>Game doesn't start, closes immediately, or shows an error on launch.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('crashes')">
        <div class="card-header">
            <span class="card-icon">✕</span>
            <span class="card-title">Crashes & Errors</span>
        </div>
        <div class="card-content"><p>Game crashes during gameplay, loading screens, or with error codes.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('memory')">
        <div class="card-header">
            <span class="card-icon">▢</span>
            <span class="card-title">Memory Errors</span>
        </div>
        <div class="card-content"><p>Out of memory errors, memory allocation failures, or high RAM usage.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('black_screen')">
        <div class="card-header">
            <span class="card-icon">▢</span>
            <span class="card-title">Black Screen</span>
        </div>
        <div class="card-content"><p>Game launches but displays only a black screen.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('stuttering')">
        <div class="card-header">
            <span class="card-icon">◧</span>
            <span class="card-title">Stuttering & FPS</span>
        </div>
        <div class="card-content"><p>Low framerates, stuttering, freezing, or poor performance.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('connection')">
        <div class="card-header">
            <span class="card-icon">◎</span>
            <span class="card-title">Connection Issues</span>
        </div>
        <div class="card-content"><p>Can't connect to servers, high ping, disconnections.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('audio')">
        <div class="card-header">
            <span class="card-icon">♪</span>
            <span class="card-title">Audio Issues</span>
        </div>
        <div class="card-content"><p>No sound, distorted audio, or audio cutting out.</p></div>
    </div>
    <div class="card card-dark" style="cursor:pointer;" onclick="App.showPage('settings_reset')">
        <div class="card-header">
            <span class="card-icon">✧</span>
            <span class="card-title">Settings Reset</span>
        </div>
        <div class="card-content"><p>Settings not saving, resetting after restart, or config issues.</p></div>
    </div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ General Tips</div>
    <ul>
        <li>Always make sure your game files are verified before troubleshooting</li>
        <li>Keep your graphics drivers up to date</li>
        <li>Add the game folder to your antivirus exclusions</li>
        <li>Run the game as Administrator if you encounter permission issues</li>
        <li>Try the Legacy version if nothing else works</li>
    </ul>
</div>

<div class="support-footer">
    <p>Issue not listed? Get help from the community:</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Forums</button>
    </div>
</div>
`;

// ─── Won't Launch ────────────────────────────────────────────────
Pages.wont_launch = () => `
<div class="page-title">
    <span class="page-icon">✕</span>
    <h2>Game Won't Launch</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Solutions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Verify Game Files</div>
                <div class="step-content">
                    Missing or corrupted files are the most common cause. Use the verification tool to check your installation.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small" onclick="App.showPage('verify')">Verify Files</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Install Visual C++ Redistributables</div>
                <div class="step-content">
                    Make sure you have the latest Visual C++ Redistributables installed. Download both x86 and x64 versions.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe'})">Download x64</button>
                        <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://aka.ms/vs/17/release/vc_redist.x86.exe'})">Download x86</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Run as Administrator</div>
                <div class="step-content">
                    Right-click on boiii.exe and select "Run as administrator". This can fix permission-related launch failures.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Antivirus Exclusion</div>
                <div class="step-content">
                    Add the entire game folder to your antivirus exclusions. Windows Defender and other AV software may quarantine game files.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Try Legacy Version</div>
                <div class="step-content">
                    If none of the above work, try the legacy version which may be compatible with your system.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small btn-secondary" onclick="App.showPage('legacy')">Legacy Download</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Crashes ─────────────────────────────────────────────────────
Pages.crashes = () => `
<div class="page-title">
    <span class="page-icon">✕</span>
    <h2>Crashes & Errors</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Common Crash Fixes</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Fatal Error 0xC0000005</div>
                <div class="step-content">
                    This is an access violation error. Solutions:
                    <ul>
                        <li>Download and install the <a href="#" onclick="App.showPage('legacy');return false;" style="color:var(--accent);">Legacy version</a></li>
                        <li>Update your graphics drivers to the latest version</li>
                        <li>Verify game files for corruption</li>
                        <li>Disable overlays (Discord, GeForce Experience, etc.)</li>
                    </ul>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Crash on Map Load</div>
                <div class="step-content">
                    <ul>
                        <li>Verify game files, map assets may be corrupted or missing</li>
                        <li>Lower graphics settings, especially texture quality</li>
                        <li>Close background applications to free RAM</li>
                        <li>Make sure you have the required DLC files for the map</li>
                    </ul>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Crash During Gameplay</div>
                <div class="step-content">
                    <ul>
                        <li>Monitor GPU temperatures, crashes can indicate overheating</li>
                        <li>Lower graphics settings (shadows, anti-aliasing, textures)</li>
                        <li>Update DirectX: <span class="code">dxdiag</span> to check current version</li>
                        <li>Disable mods if any are installed</li>
                    </ul>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Crash with No Error</div>
                <div class="step-content">
                    <ul>
                        <li>Check Windows Event Viewer for crash details</li>
                        <li>Run a complete reinstall (remove BOIII, re-download)</li>
                        <li>Update Windows to the latest version</li>
                        <li>Test with minimal background processes</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Memory Errors ───────────────────────────────────────────────
Pages.memory = () => `
<div class="page-title">
    <span class="page-icon">▢</span>
    <h2>Memory Errors</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Solutions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Increase Virtual Memory / Page File</div>
                <div class="step-content">
                    <ol>
                        <li>Open System Properties → Advanced → Performance Settings</li>
                        <li>Go to Advanced tab → Virtual Memory → Change</li>
                        <li>Uncheck "Automatically manage paging file size"</li>
                        <li>Set Custom Size: Initial = 8192 MB, Maximum = 16384 MB</li>
                        <li>Click Set, OK, and restart your PC</li>
                    </ol>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Close Background Applications</div>
                <div class="step-content">
                    Close memory-hungry applications like Chrome, Discord, and other games before launching. BO3 requires 6-8 GB of free RAM.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Lower Texture Settings</div>
                <div class="step-content">
                    High and Extra texture quality requires significant VRAM. If your GPU has less than 6 GB VRAM, use Medium or Low textures.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Use Launch Parameters</div>
                <div class="step-content">
                    Add these to your launch options:
                    <div class="code-block" style="margin-top:8px;">-maxmem 8192</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Black Screen ────────────────────────────────────────────────
Pages.black_screen = () => `
<div class="page-title">
    <span class="page-icon">▢</span>
    <h2>Black Screen</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Solutions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Try Legacy Version</div>
                <div class="step-content">
                    Black screens are most commonly fixed by using the legacy version.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small" onclick="App.showPage('legacy')">Legacy Download</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Switch Display Mode</div>
                <div class="step-content">
                    Try pressing <span class="code">Alt + Enter</span> to toggle between fullscreen and windowed mode. Or add to launch parameters:
                    <div class="code-block" style="margin-top:8px;">-windowed</div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Update Graphics Drivers</div>
                <div class="step-content">
                    Install the latest drivers for your GPU:
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://www.nvidia.com/Download/index.aspx'})">NVIDIA</button>
                        <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://www.amd.com/en/support'})">AMD</button>
                        <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://www.intel.com/content/www/us/en/download-center/home.html'})">Intel</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Delete Config Files</div>
                <div class="step-content">
                    Delete the <span class="code">players</span> folder in your game directory to reset all settings. The game will recreate it on next launch.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Disable Overlays</div>
                <div class="step-content">
                    Disable Discord overlay, GeForce Experience overlay, and any other game overlays that may conflict.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Stuttering & FPS ────────────────────────────────────────────
Pages.stuttering = () => `
<div class="page-title">
    <span class="page-icon">◧</span>
    <h2>Stuttering & FPS Issues</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Performance Optimization</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Lower Graphics Settings</div>
                <div class="step-content">
                    Start with low settings and increase gradually:
                    <ul>
                        <li>Shadows: Low or Off</li>
                        <li>Anti-Aliasing: Off or FXAA</li>
                        <li>Texture Quality: Medium</li>
                        <li>Texture Filtering: Bilinear</li>
                        <li>Volumetric Lighting: Off</li>
                        <li>Subsurface Scattering: Off</li>
                    </ul>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Launch Parameters</div>
                <div class="step-content">
                    Add these to your launch options for better performance:
                    <div class="code-block" style="margin-top:8px;">-nointro -high -maxmem 8192</div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Set High Performance Power Plan</div>
                <div class="step-content">
                    <ol>
                        <li>Open Control Panel → Power Options</li>
                        <li>Select "High performance" power plan</li>
                        <li>For laptops: Make sure you're plugged in while gaming</li>
                    </ol>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Close Background Applications</div>
                <div class="step-content">
                    Close Chrome, streaming software, and other resource-heavy applications. Game DVR in Windows Settings can also cause stuttering, disable it.
                </div>
            </div>
            <div class="step">
                <div class="step-title">GPU-Specific Settings</div>
                <div class="step-content">
                    <strong>NVIDIA:</strong> Set "Power management mode" to "Prefer maximum performance" in NVIDIA Control Panel for the game.<br>
                    <strong>AMD:</strong> Set "Graphics Profile" to "Gaming" in AMD Software.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Connection Issues ───────────────────────────────────────────
Pages.connection = () => `
<div class="page-title">
    <span class="page-icon">◎</span>
    <h2>Connection Issues</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Solutions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Check Server Status</div>
                <div class="step-content">
                    Make sure the server you're trying to connect to is online and running the same version. Check the server browser for available servers.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Open Required Ports</div>
                <div class="step-content">
                    Forward these ports on your router:
                    <table class="data-table" style="margin-top:8px;">
                        <thead><tr><th>Protocol</th><th>Ports</th></tr></thead>
                        <tbody>
                            <tr><td>UDP</td><td>3074</td></tr>
                            <tr><td>UDP</td><td>27014-27050</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Disable VPN / Proxy</div>
                <div class="step-content">
                    Disable any VPN or proxy that's not required for the game (unless using Radmin/Hamachi for LAN play).
                </div>
            </div>
            <div class="step">
                <div class="step-title">Firewall Settings</div>
                <div class="step-content">
                    Add boiii.exe to your Windows Firewall exceptions. You can use the button on the Server page to automatically create firewall rules.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small btn-secondary" onclick="App.showPage('server')">Server Setup</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Use Radmin VPN</div>
                <div class="step-content">
                    If direct connections don't work, use Radmin VPN to play via virtual LAN.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small btn-secondary" onclick="App.showPage('friends')">Friends Guide</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Audio Issues ────────────────────────────────────────────────
Pages.audio = () => `
<div class="page-title">
    <span class="page-icon">♪</span>
    <h2>Audio Issues</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Solutions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Check Audio Output</div>
                <div class="step-content">
                    Make sure the correct audio device is selected in both Windows audio settings and in-game audio settings. Right-click the speaker icon in the system tray → Sound Settings.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Verify Game Files</div>
                <div class="step-content">
                    Missing audio files can cause no sound or corrupted audio. Run the verification tool to check.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small" onclick="App.showPage('verify')">Verify Files</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Install Language Pack</div>
                <div class="step-content">
                    If you're missing audio for certain languages, download the appropriate language pack.
                    <div class="button-group" style="margin-top:8px;">
                        <button class="btn btn-small btn-secondary" onclick="App.showPage('languages')">Language Packs</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Audio Driver Update</div>
                <div class="step-content">
                    Update your audio drivers. Open Device Manager → Sound, video and game controllers → right-click your audio device → Update driver.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Disable Audio Enhancements</div>
                <div class="step-content">
                    Right-click speaker icon → Sound Settings → Device properties → Additional device properties → Advanced tab → Uncheck "Enable audio enhancements".
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;

// ─── Settings Reset ──────────────────────────────────────────────
Pages.settings_reset = () => `
<div class="page-title">
    <span class="page-icon">✧</span>
    <h2>Settings Reset</h2>
    <span class="page-badge">Troubleshooting</span>
</div>

<div class="section">
    <div class="section-title">Solutions</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Check File Permissions</div>
                <div class="step-content">
                    Make sure the <span class="code">players</span> folder and its contents are not read-only.
                    <ol style="margin-top:8px;">
                        <li>Navigate to your game folder → players</li>
                        <li>Right-click the folder → Properties</li>
                        <li>Uncheck "Read-only" and apply to all subfolders</li>
                    </ol>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Run as Administrator</div>
                <div class="step-content">
                    If the game can't write to its config files, running as administrator gives it the necessary permissions.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Don't Install in Program Files</div>
                <div class="step-content">
                    Windows UAC restricts write access to Program Files. If your game is there, consider moving it to a different location like <span class="code">C:\\Games\\</span>.
                </div>
            </div>
            <div class="step">
                <div class="step-title">Manually Edit Config</div>
                <div class="step-content">
                    If settings keep resetting, try editing the config file directly:
                    <div class="code-block" style="margin-top:8px;">players\\default\\config.cfg</div>
                    <p style="margin-top:8px;">Open this file with a text editor and modify your settings there.</p>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Antivirus Interference</div>
                <div class="step-content">
                    Some antivirus software blocks config file writes. Add the game folder to your antivirus exclusion list.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="button-group"><button class="btn btn-secondary" onclick="App.showPage('troubleshoot')">← Back to Troubleshooting</button></div>
`;
