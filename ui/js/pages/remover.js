Pages.remover = () => `
<div class="page-title">
    <span class="page-icon">✕</span>
    <h2>BOIII Remover</h2>
</div>

<p class="page-intro">
    Completely remove BOIII files from your Black Ops III installation. This is useful for clean reinstalls
    or switching to a different version. Your base game files will not be affected.
</p>

<div class="warning-box" style="margin-bottom: 20px;">
    <div class="warning-title">△ Data Loss Warning</div>
    <p><strong>This action cannot be undone!</strong> Make sure to back up any important files, custom configurations, or mods before proceeding. 
    Only BOIII-specific files will be removed, your base Call of Duty: Black Ops III game files will remain intact.</p>
</div>

<div class="section">
    <div class="section-title">What Will Be Removed</div>
    <div class="grid-2">
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">□</span>
                <span class="card-title">BOIII Configuration</span>
            </div>
            <div class="card-content">
                <ul style="list-style:none;padding:0;margin:0;">
                    <li style="padding:4px 0;">• BOIII launcher files</li>
                    <li style="padding:4px 0;">• Configuration files</li>
                    <li style="padding:4px 0;">• Cache and temp data</li>
                    <li style="padding:4px 0;">• Update files</li>
                </ul>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">◈</span>
                <span class="card-title">BOIII Data</span>
            </div>
            <div class="card-content">
                <ul style="list-style:none;padding:0;margin:0;">
                    <li style="padding:4px 0;">• Player data directory</li>
                    <li style="padding:4px 0;">• Mod configurations</li>
                    <li style="padding:4px 0;">• Custom scripts</li>
                    <li style="padding:4px 0;">• Local profiles</li>
                </ul>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">▣</span>
                <span class="card-title">Executables</span>
            </div>
            <div class="card-content">
                <ul style="list-style:none;padding:0;margin:0;">
                    <li style="padding:4px 0;">• boiii.exe</li>
                    <li style="padding:4px 0;">• Related DLL files</li>
                    <li style="padding:4px 0;">• Batch/script files</li>
                    <li style="padding:4px 0;">• Shortcut files</li>
                </ul>
            </div>
        </div>
        <div class="card card-dark">
            <div class="card-header">
                <span class="card-icon">◆</span>
                <span class="card-title">What's Kept Safe</span>
            </div>
            <div class="card-content">
                <ul style="list-style:none;padding:0;margin:0;">
                    <li style="padding:4px 0; color: #4ade80;">✓ Base game files</li>
                    <li style="padding:4px 0; color: #4ade80;">✓ Steam/Battle.net files</li>
                    <li style="padding:4px 0; color: #4ade80;">✓ Workshop content</li>
                    <li style="padding:4px 0; color: #4ade80;">✓ Game settings & saves</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Removal Process</div>
    <div class="card card-accent">
        <div class="steps">
            <div class="step">
                <div class="step-title">Set Game Path</div>
                <div class="step-content">
                    Make sure the game path above is set correctly to your Black Ops III installation.
                    <div style="display:flex;gap:8px;align-items:center;margin-top:8px;">
                        <input type="text" class="form-input" id="remover-path" readonly style="flex:1;">
                        <button class="btn btn-small btn-secondary" id="btn-remover-browse">Browse</button>
                    </div>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Confirm Removal</div>
                <div class="step-content">
                    <label class="checkbox-label">
                        <input type="checkbox" id="remover-confirm"> I understand that this action cannot be undone and I want to remove BOIII
                    </label>
                </div>
            </div>
            <div class="step">
                <div class="step-title">Execute Removal</div>
                <div class="step-content">
                    <div class="button-group">
                        <button class="btn btn-danger" id="btn-remove-boiii" disabled>Remove BOIII</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="remover-results" style="margin-top: 16px;"></div>

<div class="section" style="margin-top: 20px;">
    <div class="section-title">What to Do Next</div>
    <div class="grid-2">
        <div class="feature-card">
            <span class="card-icon">↓</span>
            <span class="card-title">Reinstall BOIII</span>
            <div class="card-content">
                <p>Download and install the latest version of BOIII.</p>
                <button class="btn btn-small" onclick="App.showPage('download')">Download Page</button>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◁</span>
            <span class="card-title">Try Legacy Version</span>
            <div class="card-content">
                <p>Install the legacy version if you had problems with the latest.</p>
                <button class="btn btn-small btn-secondary" onclick="App.showPage('legacy')">Legacy Download</button>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">◎</span>
            <span class="card-title">Verify Files</span>
            <div class="card-content">
                <p>Check game file integrity after reinstalling.</p>
                <button class="btn btn-small btn-secondary" onclick="App.showPage('verify')">Verify Files</button>
            </div>
        </div>
        <div class="feature-card">
            <span class="card-icon">✦</span>
            <span class="card-title">Troubleshoot</span>
            <div class="card-content">
                <p>Find solutions to common issues.</p>
                <button class="btn btn-small btn-info" onclick="App.showPage('troubleshoot')">Troubleshoot</button>
            </div>
        </div>
    </div>
</div>

<div class="support-footer">
    <p>Need help after removal?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
    </div>
</div>
`;

PageInit.remover = () => {
    const pathInput = document.getElementById('remover-path');
    pathInput.value = App.getGamePath();

    document.getElementById('btn-remover-browse').addEventListener('click', async () => {
        const path = await App.call('browse_folder', { title: 'Select BO3 Game Directory' });
        if (path) {
            pathInput.value = path;
            document.getElementById('game-path').value = path;
        }
    });

    const confirmChk = document.getElementById('remover-confirm');
    const removeBtn = document.getElementById('btn-remove-boiii');

    confirmChk.addEventListener('change', () => {
        removeBtn.disabled = !confirmChk.checked;
    });

    removeBtn.addEventListener('click', async () => {
        if (!confirmChk.checked) return;

        const gamePath = pathInput.value;
        if (!gamePath) {
            alert('Please select a game path first.');
            return;
        }

        removeBtn.disabled = true;
        removeBtn.textContent = 'Removing...';
        const resultsEl = document.getElementById('remover-results');
        resultsEl.innerHTML = '<div class="info-box"><p>Removing BOIII files... Please wait.</p></div>';

        try {
            const result = await App.call('remove_boiii', { game_path: gamePath });

            let html = '';
            if (result.success) {
                html += `
                    <div class="info-box">
                        <p style="font-size: 16px; text-align: center;">
                            <strong>BOIII removed successfully!</strong>
                        </p>
                    </div>
                `;
            } else {
                html += `
                    <div class="warning-box">
                        <div class="warning-title">Partial Removal</div>
                        <p>Some files could not be removed. They may be in use by another program.</p>
                    </div>
                `;
            }

            if (result.deleted_files && result.deleted_files.length > 0) {
                html += `
                    <div class="card card-dark" style="margin-top: 12px;">
                        <div class="card-header">
                            <span class="card-icon">□</span>
                            <span class="card-title">Deleted Files (${result.deleted_files.length})</span>
                        </div>
                        <div class="card-content" style="max-height: 200px; overflow-y: auto; font-size: 12px;">
                            ${result.deleted_files.map(f => '<div style="padding:2px 0;color:#4ade80;">✓ ' + App.escapeHtml(f) + '</div>').join('')}
                        </div>
                    </div>
                `;
            }

            if (result.deleted_dirs && result.deleted_dirs.length > 0) {
                html += `
                    <div class="card card-dark" style="margin-top: 12px;">
                        <div class="card-header">
                            <span class="card-icon">□</span>
                            <span class="card-title">Deleted Directories (${result.deleted_dirs.length})</span>
                        </div>
                        <div class="card-content" style="max-height: 200px; overflow-y: auto; font-size: 12px;">
                            ${result.deleted_dirs.map(f => '<div style="padding:2px 0;color:#4ade80;">✓ ' + App.escapeHtml(f) + '</div>').join('')}
                        </div>
                    </div>
                `;
            }

            if (result.failed && result.failed.length > 0) {
                html += `
                    <div class="card card-dark" style="margin-top: 12px;">
                        <div class="card-header">
                            <span class="card-icon">△</span>
                            <span class="card-title">Failed (${result.failed.length})</span>
                        </div>
                        <div class="card-content" style="max-height: 200px; overflow-y: auto; font-size: 12px;">
                            ${result.failed.map(f => '<div style="padding:2px 0;color:#ef4444;">✗ ' + App.escapeHtml(f) + '</div>').join('')}
                        </div>
                    </div>
                `;
            }

            resultsEl.innerHTML = html;
        } catch (e) {
            resultsEl.innerHTML = '<div class="warning-box"><div class="warning-title">Error</div><p>' + App.escapeHtml(e.message) + '</p></div>';
        } finally {
            removeBtn.textContent = 'Remove BOIII';
            confirmChk.checked = false;
            removeBtn.disabled = true;
        }
    });
};
