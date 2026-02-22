// ─── Friends Guide ───────────────────────────────────────────────
Pages.friends = () => `
<div class="page-title">
    <span class="page-icon">◇</span>
    <h2>Play with Friends</h2>
</div>

<p class="page-intro">
    Since BOIII uses a custom networking stack, playing with friends requires additional setup.
    Below are the recommended methods to connect with friends online.
</p>

<div class="section">
    <div class="section-title">Method 1: Radmin VPN (Recommended)</div>
    <div class="card card-glow">
        <div class="card-header">
            <span class="card-icon">◎</span>
            <span class="card-title">Radmin VPN Setup</span>
        </div>
        <div class="card-content">
            <p>Radmin VPN is a free virtual LAN tool that creates a secure private network for gaming. This is the most reliable method.</p>
            <div class="steps">
                <div class="step">
                    <div class="step-title">Download & Install Radmin VPN</div>
                    <div class="step-content">
                        Download Radmin VPN from the official website and install it.
                        <div class="button-group" style="margin-top:8px;">
                            <button class="btn" onclick="App.call('open_url', {url: 'https://www.radmin-vpn.com/'})">Download Radmin VPN</button>
                        </div>
                    </div>
                </div>
                <div class="step">
                    <div class="step-title">Create or Join a Network</div>
                    <div class="step-content">
                        <ul>
                            <li><strong>Host:</strong> Click "Create Network", set a name and password, share with friends</li>
                            <li><strong>Join:</strong> Click "Join Network", enter the network name and password</li>
                        </ul>
                    </div>
                </div>
                <div class="step">
                    <div class="step-title">Get Your Radmin IP</div>
                    <div class="step-content">
                        Your Radmin IP is shown in the Radmin VPN window (usually starts with 26.x.x.x). Share this with friends who want to connect.
                    </div>
                </div>
                <div class="step">
                    <div class="step-title">Connect In-Game</div>
                    <div class="step-content">
                        <ul>
                            <li><strong>Host:</strong> Start a private match normally</li>
                            <li><strong>Join:</strong> Open console (~) and type: <span class="code">connect &lt;host_radmin_ip&gt;</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Method 2: Hamachi</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">↗</span>
            <span class="card-title">Hamachi Setup</span>
        </div>
        <div class="card-content">
            <p>LogMeIn Hamachi is another virtual LAN tool. Free version supports up to 5 users per network.</p>
            <div class="steps">
                <div class="step">
                    <div class="step-title">Download & Install Hamachi</div>
                    <div class="step-content">
                        <div class="button-group" style="margin-top:8px;">
                            <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://vpn.net/'})">Download Hamachi</button>
                        </div>
                    </div>
                </div>
                <div class="step">
                    <div class="step-title">Create/Join Network & Connect</div>
                    <div class="step-content">
                        Same process as Radmin VPN, create or join a network, then use the Hamachi IP (usually 25.x.x.x) to connect in-game via console.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Method 3: Port Forwarding (Direct)</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">◇</span>
            <span class="card-title">Port Forwarding</span>
        </div>
        <div class="card-content">
            <p>If you have access to your router, you can forward the required ports for a direct connection without VPN software.</p>
            <table class="data-table">
                <thead><tr><th>Protocol</th><th>Ports</th><th>Purpose</th></tr></thead>
                <tbody>
                    <tr><td>UDP</td><td>3074</td><td>Game traffic</td></tr>
                    <tr><td>UDP</td><td>27014-27050</td><td>Steam & server</td></tr>
                </tbody>
            </table>
            <div class="button-group" style="margin-top: 12px;">
                <button class="btn btn-small btn-secondary" onclick="App.call('open_url', {url: 'https://portforward.com/'})">Port Forwarding Guide</button>
            </div>
        </div>
    </div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ Connection Tips</div>
    <ul>
        <li>Make sure both players are on the same BOIII version</li>
        <li>Disable Windows Firewall temporarily if you have connection issues</li>
        <li>The host should have a stable internet connection</li>
        <li>If using VPN, ensure all players are connected to the same network before launching</li>
    </ul>
</div>

<div class="support-footer">
    <p>Still having trouble connecting?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
    </div>
</div>
`;

// ─── BOIIIWD Guide ──────────────────────────────────────────────
Pages.boiiiwd = () => `
<div class="page-title">
    <span class="page-icon">▣</span>
    <h2>BOIIIWD - Workshop Downloader</h2>
</div>

<p class="page-intro">
    BOIIIWD is a dedicated tool for downloading Steam Workshop content for Black Ops III.
    It allows you to download custom maps, mods, and other workshop items without needing Steam.
</p>

<div class="section">
    <div class="section-title">Download BOIIIWD</div>
    <div class="card card-glow">
        <div class="card-header">
            <span class="card-icon">↓</span>
            <span class="card-title">Latest Release</span>
        </div>
        <div class="card-content">
            <p>Download the latest version of BOIIIWD from GitHub.</p>
            <div class="button-group">
                <button class="btn" onclick="App.call('open_url', {url: 'https://github.com/faroukbmiled/BOIIIWD/releases/latest/download/Release.zip'})">Download BOIIIWD</button>
                <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://github.com/faroukbmiled/BOIIIWD/releases/latest'})">GitHub Page</button>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Features</div>
    <div class="grid-3">
        <div class="feature-card">
            <span class="card-icon">◇</span>
            <span class="card-title">Custom Maps</span>
            <div class="card-content"><p>Download custom Zombies and Multiplayer maps</p></div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◈</span>
            <span class="card-title">Mods</span>
            <div class="card-content"><p>Install gameplay mods and modifications</p></div>
        </div>
        <div class="feature-card">
            <span class="card-icon">▷</span>
            <span class="card-title">Easy to Use</span>
            <div class="card-content"><p>Simple GUI - paste workshop URL and download</p></div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">How to Use</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Download & Extract</div>
                <div class="step-content">Download BOIIIWD and extract it to any folder.</div>
            </div>
            <div class="step">
                <div class="step-title">Set Game Path</div>
                <div class="step-content">Set your Black Ops III game directory in the tool settings.</div>
            </div>
            <div class="step">
                <div class="step-title">Find Workshop Content</div>
                <div class="step-content">Browse the Steam Workshop for Black Ops III and copy the URL of the item you want.</div>
            </div>
            <div class="step">
                <div class="step-title">Paste & Download</div>
                <div class="step-content">Paste the workshop URL into BOIIIWD and click Download. The content will be installed to Yyour game directory automatically.</div>
            </div>
        </div>
    </div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ Mouse Bindings</div>
    <ul>
        <li><strong>Right-click on queue item</strong> – Remove from queue</li>
        <li><strong>Double-click workshop ID field</strong> – Paste from clipboard</li>
        <li><strong>Middle-click</strong> – Open Steam Workshop in browser</li>
    </ul>
</div>

<div class="support-footer">
    <p>Having issues with BOIIIWD?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://github.com/faroukbmiled/BOIIIWD/issues'})">Report Issue</button>
    </div>
</div>
`;

// ─── DLCs Guide ──────────────────────────────────────────────────
Pages.dlcs = () => `
<div class="page-title">
    <span class="page-icon">▶</span>
    <h2>DLC Content</h2>
</div>

<p class="page-intro">
    Download and install DLC content for Black Ops III including map packs and Zombies Chronicles.
</p>

<div class="section">
    <div class="section-title">Available DLC</div>
    <div class="grid-2">
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">▣</span>
                <span class="card-title">DLC 1 - Awakening</span>
            </div>
            <div class="card-content">
                <p>Includes Skyjacked, Rise, Splash, Gauntlet, and <strong>Der Eisendrache</strong> Zombies map.</p>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">▣</span>
                <span class="card-title">DLC 2 - Eclipse</span>
            </div>
            <div class="card-content">
                <p>Includes Verge, Knockout, Spire, Rift, and <strong>Zetsubou No Shima</strong> Zombies map.</p>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">▣</span>
                <span class="card-title">DLC 3 - Descent</span>
            </div>
            <div class="card-content">
                <p>Includes Berserk, Citadel, Micro, Rupture, and <strong>Gorod Krovi</strong> Zombies map.</p>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">▣</span>
                <span class="card-title">DLC 4 - Salvation</span>
            </div>
            <div class="card-content">
                <p>Includes Citadel, Outlaw, Rupture, Micro, and <strong>Revelations</strong> Zombies map.</p>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Zombies Chronicles (ZC)</div>
    <div class="card card-glow">
        <div class="card-header">
            <span class="card-icon">◈</span>
            <span class="card-title">Zombies Chronicles</span>
        </div>
        <div class="card-content">
            <p>Remastered classic Zombies maps including:</p>
            <div class="grid-3" style="margin-top: 10px;">
                <div style="text-align:center;padding:8px;"><strong>Nacht der Untoten</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Verruckt</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Shi No Numa</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Kino der Toten</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Ascension</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Shangri-La</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Moon</strong></div>
                <div style="text-align:center;padding:8px;"><strong>Origins</strong></div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Download DLC</div>
    <div class="card card-accent">
        <div class="card-header">
            <span class="card-icon">↓</span>
            <span class="card-title">DLC Torrent Download</span>
        </div>
        <div class="card-content">
            <p>Download all DLC content via torrent. This includes DLC 1-4 and Zombies Chronicles.</p>
            <div class="button-group">
                <button class="btn" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/assets/uploads/files/1687274331519-t7_dlc.torrent'})">Download DLC Torrent</button>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Installation</div>
    <div class="card card-dark">
        <div class="steps">
            <div class="step">
                <div class="step-title">Download DLC Files</div>
                <div class="step-content">Use the torrent link above to download all DLC files.</div>
            </div>
            <div class="step">
                <div class="step-title">Extract to Game Folder</div>
                <div class="step-content">Copy the downloaded files to your Black Ops III game directory, maintaining the folder structure.</div>
            </div>
            <div class="step">
                <div class="step-title">Verify Installation</div>
                <div class="step-content">Launch the game and check if the DLC maps appear in your map selection.</div>
            </div>
        </div>
    </div>
</div>

<div class="support-footer">
    <p>Need help with DLC installation?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
    </div>
</div>
`;

// ─── Languages Guide ─────────────────────────────────────────────
Pages.languages = () => `
<div class="page-title">
    <span class="page-icon">◎</span>
    <h2>Language Packs</h2>
</div>

<p class="page-intro">
    Download and install language packs to play Black Ops III in your preferred language.
    Language packs include translated menus, subtitles, and audio.
</p>

<div class="section">
    <div class="section-title">Download Language Packs</div>
    <div class="card card-glow">
        <div class="card-header">
            <span class="card-icon">↓</span>
            <span class="card-title">All Language Packs</span>
        </div>
        <div class="card-content">
            <p>Download the complete language pack bundle containing all available languages.</p>
            <div class="button-group">
                <button class="btn" onclick="App.call('open_url', {url: 'https://drive.proton.me/urls/CSY9JE37RW#pCdmFTDwA11y'})">Download Language Packs</button>
            </div>
            <div class="info-box" style="margin-top: 12px;">
                <p><strong>Password:</strong> <span class="code">Ezz</span>
                <button class="btn btn-small btn-secondary" style="margin-left:8px;" onclick="App.call('copy_to_clipboard', {text: 'Ezz'})">Copy</button></p>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Available Languages</div>
    <div class="card card-dark">
        <div class="card-content">
            <table class="data-table">
                <thead><tr><th>Language</th><th>Code</th><th>Audio</th></tr></thead>
                <tbody>
                    <tr><td>English</td><td>en</td><td>✓</td></tr>
                    <tr><td>French</td><td>fr</td><td>✓</td></tr>
                    <tr><td>German</td><td>de</td><td>✓</td></tr>
                    <tr><td>Italian</td><td>it</td><td>✓</td></tr>
                    <tr><td>Spanish</td><td>es</td><td>✓</td></tr>
                    <tr><td>Portuguese (BR)</td><td>pt</td><td>✓</td></tr>
                    <tr><td>Russian</td><td>ru</td><td>✓</td></tr>
                    <tr><td>Polish</td><td>pl</td><td>✓</td></tr>
                    <tr><td>Japanese</td><td>ja</td><td>✓</td></tr>
                    <tr><td>Korean</td><td>ko</td><td>✓</td></tr>
                    <tr><td>Chinese (Simplified)</td><td>zh</td><td>✓</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Installation Methods</div>

    <div class="card card-accent" style="margin-bottom: 14px;">
        <div class="card-header">
            <span class="card-icon">①</span>
            <span class="card-title">Method 1: Launch Parameter (Easiest)</span>
        </div>
        <div class="card-content">
            <p>Add the language parameter to your BOIII launch options:</p>
            <div class="code-block" style="margin-top:8px;">boiii.exe -lang &lt;language_code&gt;</div>
            <p style="margin-top:8px;">Example for French: <span class="code">boiii.exe -lang fr</span></p>
        </div>
    </div>

    <div class="card card-dark" style="margin-bottom: 14px;">
        <div class="card-header">
            <span class="card-icon">②</span>
            <span class="card-title">Method 2: Config File</span>
        </div>
        <div class="card-content">
            <p>Create or edit the file <span class="code">players/default/config.cfg</span> in your game directory and add:</p>
            <div class="code-block" style="margin-top:8px;">seta loc_language "&lt;language_code&gt;"</div>
        </div>
    </div>

    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">③</span>
            <span class="card-title">Method 3: Replace Files</span>
        </div>
        <div class="card-content">
            <p>Copy the language-specific <span class="code">.ff</span> and audio files from the language pack into your game's <span class="code">zone</span> folder, replacing the existing English files.</p>
            <div class="warning-box" style="margin-top: 8px;">
                <div class="warning-title">△ Backup First</div>
                <p>Back up your original zone files before replacing them so you can switch back to English.</p>
            </div>
        </div>
    </div>
</div>

<div class="support-footer">
    <p>Need help with language packs?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
    </div>
</div>
`;

// ─── Enhanced Guide ──────────────────────────────────────────────
Pages.enhanced = () => `
<div class="page-title">
    <span class="page-icon">★</span>
    <h2>BO3 Enhanced</h2>
</div>

<p class="page-intro">
    BO3Enhanced is a modification that provides additional features and improvements for Black Ops III,
    including enhanced graphics options, performance improvements, and quality-of-life features.
</p>

<div class="section">
    <div class="section-title">Download</div>
    <div class="grid-2">
        <div class="card card-glow">
            <div class="card-header">
                <span class="card-icon">↓</span>
                <span class="card-title">BO3Enhanced</span>
            </div>
            <div class="card-content">
                <p>Download the latest version of BO3Enhanced from GitHub.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.call('open_url', {url: 'https://github.com/shiversoftdev/BO3Enhanced/releases/latest'})">Download BO3Enhanced</button>
                </div>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">□</span>
                <span class="card-title">Dump Files</span>
            </div>
            <div class="card-content">
                <p>Required dump files for BO3Enhanced to work properly.</p>
                <div class="button-group">
                    <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://gofile.io/d/91Sveo'})">Download Dump Files</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Features</div>
    <div class="grid-3">
        <div class="feature-card">
            <span class="card-icon">▢</span>
            <span class="card-title">Enhanced Graphics</span>
            <div class="card-content"><p>Additional graphics settings and improvements</p></div>
        </div>
        <div class="feature-card">
            <span class="card-icon">★</span>
            <span class="card-title">Performance</span>
            <div class="card-content"><p>Optimizations for better framerates</p></div>
        </div>
        <div class="feature-card">
            <span class="card-icon">✦</span>
            <span class="card-title">Quality of Life</span>
            <div class="card-content"><p>Various QoL improvements and fixes</p></div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Installation</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Download BO3Enhanced</div>
                <div class="step-content">Download the latest release from the GitHub link above.</div>
            </div>
            <div class="step">
                <div class="step-title">Download Dump Files</div>
                <div class="step-content">Download the dump files from the link above. These are required for BO3Enhanced to work.</div>
            </div>
            <div class="step">
                <div class="step-title">Extract to Game Folder</div>
                <div class="step-content">Extract both the BO3Enhanced files and dump files to your Black Ops III game directory.</div>
            </div>
            <div class="step">
                <div class="step-title">Launch the Game</div>
                <div class="step-content">Launch Black Ops III normally. BO3Enhanced will load automatically.</div>
            </div>
        </div>
    </div>
</div>

<div class="warning-box">
    <div class="warning-title">△ Compatibility Note</div>
    <p>BO3Enhanced may not be compatible with all BOIII versions. Check the GitHub page for compatibility information before installing. Using it with an incompatible version may cause crashes.</p>
</div>

<div class="support-footer">
    <p>Need help with BO3Enhanced?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://github.com/shiversoftdev/BO3Enhanced/issues'})">Report Issue</button>
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
    </div>
</div>
`;

// ─── Guides Hub ──────────────────────────────────────────────────
Pages.guides = () => `
<div class="page-title">
    <span class="page-icon">◈</span>
    <h2>Guides & Resources</h2>
</div>

<p class="page-intro">
    Browse our collection of guides and resources for Black Ops III. Click on any guide below to learn more.
</p>

<div class="grid-2">
    <div class="card card-glow" style="cursor:pointer;" onclick="App.showPage('friends')">
        <div class="card-header">
            <span class="card-icon">◇</span>
            <span class="card-title">Play with Friends</span>
        </div>
        <div class="card-content">
            <p>Learn how to connect with friends using Radmin VPN, Hamachi, or port forwarding.</p>
        </div>
    </div>
    <div class="card card-glow" style="cursor:pointer;" onclick="App.showPage('boiiiwd')">
        <div class="card-header">
            <span class="card-icon">▣</span>
            <span class="card-title">BOIIIWD - Workshop Downloader</span>
        </div>
        <div class="card-content">
            <p>Download custom maps, mods, and workshop content without Steam.</p>
        </div>
    </div>
    <div class="card card-glow" style="cursor:pointer;" onclick="App.showPage('dlcs')">
        <div class="card-header">
            <span class="card-icon">▶</span>
            <span class="card-title">DLC Content</span>
        </div>
        <div class="card-content">
            <p>Download and install DLC map packs and Zombies Chronicles.</p>
        </div>
    </div>
    <div class="card card-glow" style="cursor:pointer;" onclick="App.showPage('languages')">
        <div class="card-header">
            <span class="card-icon">◎</span>
            <span class="card-title">Language Packs</span>
        </div>
        <div class="card-content">
            <p>Download language packs to play in your preferred language.</p>
        </div>
    </div>
    <div class="card card-glow" style="cursor:pointer;" onclick="App.showPage('enhanced')">
        <div class="card-header">
            <span class="card-icon">★</span>
            <span class="card-title">BO3 Enhanced</span>
        </div>
        <div class="card-content">
            <p>Enhanced graphics, performance improvements, and quality-of-life features.</p>
        </div>
    </div>
</div>

<div class="support-footer">
    <p>Can't find what you're looking for?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Forums</button>
    </div>
</div>
`;
