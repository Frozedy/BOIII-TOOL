Pages.server = () => `
<div class="page-title">
    <span class="page-icon">▢</span>
    <h2>Server Setup</h2>
</div>

<p class="page-intro">
    Set up your own Black Ops III server for private matches, LAN parties, or public play.
    Configure your server with the options below or download a pre-configured setup.
</p>

<div class="section">
    <div class="section-title">Quick Setup</div>
    <div class="grid-2">
        <div class="card card-glow">
            <div class="card-header">
                <span class="card-icon">↓</span>
                <span class="card-title">Pre-Configured Server</span>
            </div>
            <div class="card-content">
                <p>Download a pre-configured server ready to use. This is the fastest way to get a server up and running.</p>
                <div class="button-group">
                    <button class="btn" onclick="App.call('open_url', {url: 'https://up.noname.dog/bo_3_server-zxhnzjspue6y.rar'})">Download Server Package</button>
                </div>
            </div>
        </div>
        <div class="card card-accent">
            <div class="card-header">
                <span class="card-icon">✦</span>
                <span class="card-title">PluTools Server Manager</span>
            </div>
            <div class="card-content">
                <p>Use PluTools for a graphical server manager with advanced configuration options, automatic restarts, and more.</p>
                <div class="button-group">
                    <button class="btn btn-info" onclick="App.call('open_url', {url: 'https://getserve.rs/t7'})">Open PluTools</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Manual Server Configuration</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">✧</span>
            <span class="card-title">Server Settings</span>
        </div>
        <div class="card-content" id="server-config-form">
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Server Name</label>
                    <input type="text" class="form-input" id="server-name" value="BOIII Server" placeholder="Server name...">
                </div>
                <div class="form-group">
                    <label class="form-label">Max Players</label>
                    <input type="number" class="form-input" id="server-players" value="18" min="1" max="18">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Map</label>
                    <select class="form-input" id="server-map">
                        <optgroup label="Multiplayer - Base Maps">
                            <option value="mp_biodome">Aquarium</option>
                            <option value="mp_spire">Breach</option>
                            <option value="mp_sector">Combine</option>
                            <option value="mp_apartments">Evac</option>
                            <option value="mp_chinatown">Exodus</option>
                            <option value="mp_veiled">Fringe</option>
                            <option value="mp_havoc">Havoc</option>
                            <option value="mp_ethiopia">Hunted</option>
                            <option value="mp_infection">Infection</option>
                            <option value="mp_metro">Metro</option>
                            <option value="mp_redwood">Redwood</option>
                            <option value="mp_stronghold">Stronghold</option>
                            <option value="mp_nuketown_x">Nuk3town</option>
                        </optgroup>
                        <optgroup label="Multiplayer - Awakening DLC">
                            <option value="mp_crucible">Gauntlet</option>
                            <option value="mp_rise">Rise</option>
                            <option value="mp_skyjacked">Skyjacked</option>
                            <option value="mp_waterpark">Splash</option>
                        </optgroup>
                        <optgroup label="Multiplayer - Eclipse DLC">
                            <option value="mp_kung_fu">Knockout</option>
                            <option value="mp_conduit">Rift</option>
                            <option value="mp_aerospace">Spire</option>
                            <option value="mp_banzai">Verge</option>
                        </optgroup>
                        <optgroup label="Multiplayer - Descent DLC">
                            <option value="mp_shrine">Berserk</option>
                            <option value="mp_cryogen">Cryogen</option>
                            <option value="mp_rome">Empire</option>
                            <option value="mp_arena">Rumble</option>
                        </optgroup>
                        <optgroup label="Multiplayer - Salvation DLC">
                            <option value="mp_ruins">Citadel</option>
                            <option value="mp_miniature">Micro</option>
                            <option value="mp_western">Outlaw</option>
                            <option value="mp_city">Rupture</option>
                        </optgroup>
                        <optgroup label="Multiplayer - Bonus Maps">
                            <option value="mp_veiled_heyday">Fringe Night</option>
                            <option value="mp_redwood_ice">Redwood Snow</option>
                        </optgroup>
                        <optgroup label="Zombies - Base">
                            <option value="zm_zod">Shadows of Evil</option>
                        </optgroup>
                        <optgroup label="Zombies - DLC">
                            <option value="zm_castle">Der Eisendrache</option>
                            <option value="zm_island">Zetsubou No Shima</option>
                            <option value="zm_stalingrad">Gorod Krovi</option>
                            <option value="zm_genesis">Revelations</option>
                        </optgroup>
                        <optgroup label="Zombies Chronicles">
                            <option value="zm_factory">The Giant</option>
                            <option value="zm_prototype">Nacht der Untoten</option>
                            <option value="zm_asylum">Verruckt</option>
                            <option value="zm_sumpf">Shi No Numa</option>
                            <option value="zm_theater">Kino der Toten</option>
                            <option value="zm_cosmodrome">Ascension</option>
                            <option value="zm_temple">Shangri-La</option>
                            <option value="zm_moon">Moon</option>
                            <option value="zm_tomb">Origins</option>
                        </optgroup>
                        <optgroup label="Campaign - Safehouses">
                            <option value="cp_sh_mobile">Mobile</option>
                            <option value="cp_sh_singapore">Singapore</option>
                            <option value="cp_sh_cairo">Cairo</option>
                        </optgroup>
                        <optgroup label="Campaign - Missions">
                            <option value="cp_mi_eth_prologue">Black Ops</option>
                            <option value="cp_mi_zurich_newworld">New World</option>
                            <option value="cp_mi_sing_blackstation">In Darkness</option>
                            <option value="cp_mi_sing_biodomes">Provocation</option>
                            <option value="cp_mi_sing_sgen">Hypocenter</option>
                            <option value="cp_mi_sing_vengeance">Vengeance</option>
                            <option value="cp_mi_cairo_ramses">Rise &amp; Fall</option>
                            <option value="cp_mi_cairo_infection">Demon Within</option>
                            <option value="cp_mi_cairo_aquifer">Sand Castle</option>
                            <option value="cp_mi_cairo_lotus">Lotus Towers</option>
                            <option value="cp_mi_zurich_coalescence">Life</option>
                        </optgroup>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Game Mode</label>
                    <select class="form-input" id="server-mode">
                        <optgroup label="Multiplayer">
                            <option value="tdm">Team Deathmatch</option>
                            <option value="dm">Free-for-All</option>
                            <option value="dom">Domination</option>
                            <option value="sd">Search &amp; Destroy</option>
                            <option value="sr">Search &amp; Rescue</option>
                            <option value="koth">Hardpoint</option>
                            <option value="ctf">Capture the Flag</option>
                            <option value="conf">Kill Confirmed</option>
                            <option value="dem">Demolition</option>
                            <option value="escort">Safeguard</option>
                            <option value="ball">Uplink</option>
                            <option value="clean">Fracture</option>
                        </optgroup>
                        <optgroup label="Party Modes">
                            <option value="gun">Gun Game</option>
                            <option value="shrp">Sharpshooter</option>
                            <option value="sas">Sticks and Stones</option>
                            <option value="prop">Prop Hunt</option>
                            <option value="infect">Infected</option>
                            <option value="sniperonly">Snipers Only</option>
                        </optgroup>
                        <optgroup label="Zombies">
                            <option value="zclassic">Zombies Classic</option>
                            <option value="zstandard">Zombies Standard</option>
                        </optgroup>
                        <optgroup label="Campaign">
                            <option value="coop">Campaign Co-op</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Port</label>
                    <input type="number" class="form-input" id="server-port" value="27017" min="1024" max="65535">
                </div>
                <div class="form-group">
                    <label class="form-label">Password (optional)</label>
                    <input type="text" class="form-input" id="server-password" placeholder="Leave empty for no password">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group" style="flex-direction:row; gap:18px; align-items:center;">
                    <label class="checkbox-label">
                        <input type="checkbox" id="server-hardcore"> Hardcore Mode
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="server-dedicated" checked> Dedicated Server
                    </label>
                </div>
            </div>
            <div class="button-group" style="margin-top: 14px;">
                <button class="btn" id="btn-create-config">Create Server Config</button>
                <button class="btn btn-info" id="btn-check-port">Check Port</button>
                <button class="btn btn-secondary" id="btn-open-firewall">Open Firewall Port</button>
            </div>
            <div id="server-status" style="margin-top: 12px;"></div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Network Configuration</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">◎</span>
            <span class="card-title">Required Ports</span>
        </div>
        <div class="card-content">
            <table class="data-table">
                <thead>
                    <tr><th>Protocol</th><th>Ports</th><th>Purpose</th></tr>
                </thead>
                <tbody>
                    <tr><td>UDP</td><td>3074</td><td>Game traffic (NAT)</td></tr>
                    <tr><td>UDP</td><td>27014-27050</td><td>Steam & game server</td></tr>
                    <tr><td>TCP/UDP</td><td>27017</td><td>Default server port</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Server Commands</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">▢</span>
            <span class="card-title">Useful Commands</span>
        </div>
        <div class="card-content">
            <table class="data-table">
                <thead>
                    <tr><th>Command</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="code">map mp_combine</span></td>
                        <td>Change map to Combine (replace with any map name)</td>
                    </tr>
                    <tr>
                        <td><span class="code">map_restart</span></td>
                        <td>Restart the current map</td>
                    </tr>
                    <tr>
                        <td><span class="code">fast_restart</span></td>
                        <td>Quick restart without reloading assets</td>
                    </tr>
                    <tr>
                        <td><span class="code">kick &lt;player&gt;</span></td>
                        <td>Kick a player from the server</td>
                    </tr>
                    <tr>
                        <td><span class="code">status</span></td>
                        <td>Show connected players and server status</td>
                    </tr>
                    <tr>
                        <td><span class="code">quit</span></td>
                        <td>Shut down the server</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ Server Tips</div>
    <ul>
        <li>Make sure to forward the required ports on your router for external players</li>
        <li>Use a dedicated machine or VPS for the best server performance</li>
        <li>Set a strong password if you want a private server</li>
        <li>Keep your server updated to the latest BOIII version for compatibility</li>
        <li>Monitor your server console for errors or issues</li>
    </ul>
</div>

<div class="warning-box">
    <div class="warning-title">△ Important</div>
    <p>If players can't connect, make sure your firewall allows the server through and that ports are properly forwarded on your router. Use the "Check Port" and "Open Firewall Port" buttons above for quick troubleshooting.</p>
</div>

<div class="support-footer">
    <p>Need help with your server setup?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
        <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://forum.ezz.lol/'})">Forums</button>
    </div>
</div>
`;

PageInit.server = () => {
    document.getElementById('btn-create-config').addEventListener('click', async () => {
        const gamePath = App.getGamePath();
        const statusEl = document.getElementById('server-status');

        try {
            const result = await App.call('create_server_config', {
                game_path: gamePath,
                server_name: document.getElementById('server-name').value,
                map: document.getElementById('server-map').value,
                mode: document.getElementById('server-mode').value,
                max_players: parseInt(document.getElementById('server-players').value) || 18,
                port: parseInt(document.getElementById('server-port').value) || 27017,
                password: document.getElementById('server-password').value,
                hardcore: document.getElementById('server-hardcore').checked,
                dedicated: document.getElementById('server-dedicated').checked
            });
            statusEl.innerHTML = '<div class="info-box"><p>Server config created successfully at:<br><span class="code">' + App.escapeHtml(result) + '</span></p></div>';
        } catch (e) {
            statusEl.innerHTML = '<div class="warning-box"><div class="warning-title">Error</div><p>' + App.escapeHtml(e.message) + '</p></div>';
        }
    });

    document.getElementById('btn-check-port').addEventListener('click', async () => {
        const port = parseInt(document.getElementById('server-port').value) || 27017;
        const statusEl = document.getElementById('server-status');

        try {
            const available = await App.call('check_port', { port });
            if (available) {
                statusEl.innerHTML = '<div class="info-box"><p>Port <strong>' + port + '</strong> is available and ready to use.</p></div>';
            } else {
                statusEl.innerHTML = '<div class="warning-box"><div class="warning-title">Port In Use</div><p>Port <strong>' + port + '</strong> is already in use. Choose a different port.</p></div>';
            }
        } catch (e) {
            statusEl.innerHTML = '<div class="warning-box"><div class="warning-title">Error</div><p>' + App.escapeHtml(e.message) + '</p></div>';
        }
    });

    document.getElementById('btn-open-firewall').addEventListener('click', async () => {
        const port = parseInt(document.getElementById('server-port').value) || 27017;
        const statusEl = document.getElementById('server-status');

        try {
            const success = await App.call('open_firewall_port', { port, name: 'BOIII Server' });
            if (success) {
                statusEl.innerHTML = '<div class="info-box"><p>Firewall rule created for port <strong>' + port + '</strong>.</p></div>';
            } else {
                statusEl.innerHTML = '<div class="warning-box"><div class="warning-title">Failed</div><p>Could not create firewall rule. Try running as Administrator.</p></div>';
            }
        } catch (e) {
            statusEl.innerHTML = '<div class="warning-box"><div class="warning-title">Error</div><p>' + App.escapeHtml(e.message) + '</p></div>';
        }
    });
};
