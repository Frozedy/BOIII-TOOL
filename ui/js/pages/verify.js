Pages.verify = () => `
<div class="page-title">
    <span class="page-icon">◎</span>
    <h2>Verify Game Files</h2>
</div>

<p class="page-intro">
    Verify the integrity of your Black Ops III game files. This tool checks for missing, corrupted, or
    modified files and can help identify issues that may cause crashes or other problems.
</p>

<div class="section">
    <div class="section-title">Verification Settings</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">✧</span>
            <span class="card-title">Configuration</span>
        </div>
        <div class="card-content">
            <div class="form-row">
                <div class="form-group" style="flex:2;">
                    <label class="form-label">Game Path</label>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <input type="text" class="form-input" id="verify-path" readonly style="flex:1;">
                        <button class="btn btn-small btn-secondary" id="btn-verify-browse">Browse</button>
                    </div>
                </div>
            </div>

            <div style="margin-top: 14px;">
                <label class="form-label">Quick Select</label>
                <div class="button-group" style="margin-top: 6px;">
                    <button class="btn btn-small" id="btn-select-all">All</button>
                    <button class="btn btn-small btn-secondary" id="btn-select-mp">Multiplayer</button>
                    <button class="btn btn-small btn-secondary" id="btn-select-zm">Zombies</button>
                    <button class="btn btn-small btn-secondary" id="btn-select-cp">Campaign</button>
                </div>
            </div>

            <div id="verify-components" style="margin-top: 14px;">
                <label class="form-label">Components to Verify</label>
                <div id="component-checkboxes" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px;">
                    <span style="color: var(--text-muted);">Loading manifest...</span>
                </div>
            </div>

            <div class="form-row" style="margin-top: 14px;">
                <div class="form-group" style="flex-direction:row; gap:18px; align-items:center;">
                    <label class="checkbox-label">
                        <input type="checkbox" id="verify-hash"> Deep Verification (XXH3 hash check, slower but detects corrupted files)
                    </label>
                </div>
            </div>

            <div class="button-group" style="margin-top: 14px;">
                <button class="btn" id="btn-start-verify">Start Verification</button>
                <button class="btn btn-secondary" id="btn-pause-verify" disabled>Pause</button>
                <button class="btn btn-danger" id="btn-cancel-verify" disabled>Cancel</button>
            </div>
        </div>
    </div>
</div>

<div class="section" id="verify-progress-section" style="display:none;">
    <div class="section-title">Progress</div>
    <div class="card card-dark">
        <div class="card-header">
            <span class="card-icon">◧</span>
            <span class="card-title">Verification Progress</span>
        </div>
        <div class="card-content">
            <div class="progress-bar-container" style="background: var(--bg-card); border-radius: 6px; height: 28px; overflow: hidden; margin-bottom: 10px; border: 1px solid var(--border-color);">
                <div id="verify-progress-bar" style="height: 100%; width: 0%; background: var(--accent); transition: width 0.2s; border-radius: 5px;"></div>
            </div>
            <div id="verify-progress-text" style="display:flex;justify-content:space-between;color:var(--text-muted);font-size:13px;">
                <span id="verify-progress-count">0 / 0 files</span>
                <span id="verify-progress-percent">0%</span>
            </div>
            <div id="verify-current-file" style="margin-top: 8px; color: var(--text-muted); font-size: 12px; word-break: break-all;"></div>
        </div>
    </div>
</div>

<div class="section" id="verify-results-section" style="display:none;">
    <div class="section-title">Results</div>
    <div id="verify-results"></div>
</div>

<div class="accent-box">
    <div class="accent-box-title">▸ Verification Info</div>
    <ul>
        <li><strong>Quick verification</strong> checks if files exist and match the expected size</li>
        <li><strong>Deep verification</strong> computes XXH3 file hashes to detect corrupted files (takes longer for large files)</li>
        <li>Missing or corrupted files can cause crashes, black screens, or other issues</li>
        <li>If you have missing files, use <strong>qBittorrent</strong> with the game torrent to re-download only the missing files</li>
    </ul>
</div>

<div class="support-footer">
    <p>Issues with verification or need help fixing files?</p>
    <div class="button-group" style="justify-content: center;">
        <button class="btn btn-discord" onclick="App.call('open_url', {url: 'https://dc.ezz.lol/'})">Discord Support</button>
        <button class="btn btn-secondary" onclick="App.showPage('download')">Download Page</button>
    </div>
</div>
`;

PageInit.verify = () => {
    // Set game path from header
    const pathInput = document.getElementById('verify-path');
    pathInput.value = App.getGamePath();

    let isPaused = false;
    let isRunning = false;

    // Browse button
    document.getElementById('btn-verify-browse').addEventListener('click', async () => {
        const path = await App.call('browse_folder', { title: 'Select BO3 Game Directory' });
        if (path) {
            pathInput.value = path;
            document.getElementById('game-path').value = path;
        }
    });

    // Quick select buttons
    function setComponents(keys) {
        document.querySelectorAll('.comp-checkbox').forEach(cb => {
            if (cb.disabled) return; // skip required
            cb.checked = keys.includes(cb.dataset.component);
        });
    }

    document.getElementById('btn-select-all').addEventListener('click', () => {
        document.querySelectorAll('.comp-checkbox').forEach(cb => { cb.checked = true; });
    });
    document.getElementById('btn-select-mp').addEventListener('click', () => {
        setComponents(['base', 'redist', 'dlc']);
    });
    document.getElementById('btn-select-zm').addEventListener('click', () => {
        setComponents(['base', 'redist', 'zc', 'dlc']);
    });
    document.getElementById('btn-select-cp').addEventListener('click', () => {
        setComponents(['base', 'redist', 'sp']);
    });

    // Load manifest
    loadManifest();

    async function loadManifest() {
        try {
            const manifest = await App.call('load_verification_manifest');
            const container = document.getElementById('component-checkboxes');
            container.innerHTML = '';

            if (manifest && manifest.components) {
                for (const [key, comp] of Object.entries(manifest.components)) {
                    const checked = comp.defaultEnabled ? 'checked' : '';
                    const required = comp.required ? 'disabled checked' : '';
                    const sizeStr = App.formatSize(comp.totalSize);
                    const hidden = comp.show === false ? ' style="display:none;"' : '';
                    container.innerHTML += `
                        <label class="checkbox-label" style="min-width: 160px;"${hidden}>
                            <input type="checkbox" class="comp-checkbox" data-component="${key}" ${checked} ${required}>
                            ${App.escapeHtml(comp.displayName)} <span style="color: var(--text-muted); font-size: 11px;">(${sizeStr})</span>
                        </label>
                    `;
                }
                // Also add hidden checkboxes for non-show components that are required
                container.innerHTML += '<span id="manifest-file-count" style="color: var(--text-muted); font-size: 11px; margin-left: 8px;">' + manifest.totalFiles + ' files in manifest</span>';
            }
        } catch (e) {
            document.getElementById('component-checkboxes').innerHTML = 
                '<span style="color: var(--accent);">Failed to load manifest: ' + App.escapeHtml(e.message) + '</span>';
        }
    }

    // Start verification
    document.getElementById('btn-start-verify').addEventListener('click', async () => {
        if (isRunning) return;

        const gamePath = pathInput.value;
        if (!gamePath) {
            alert('Please select a game path first.');
            return;
        }

        const checkHash = document.getElementById('verify-hash').checked;
        
        // Get selected components
        const components = [];
        document.querySelectorAll('.comp-checkbox:checked').forEach(cb => {
            components.push(cb.dataset.component);
        });

        if (components.length === 0) {
            alert('Please select at least one component to verify.');
            return;
        }

        isRunning = true;
        isPaused = false;
        document.getElementById('btn-start-verify').disabled = true;
        document.getElementById('btn-pause-verify').disabled = false;
        document.getElementById('btn-cancel-verify').disabled = false;
        document.getElementById('verify-progress-section').style.display = '';
        document.getElementById('verify-results-section').style.display = 'none';

        try {
            const result = await App.call('verify_files', {
                game_path: gamePath,
                check_hash: checkHash,
                components: components
            }, (progress) => {
                // Progress callback
                const pct = progress.total > 0 ? Math.round((progress.verified / progress.total) * 100) : 0;
                document.getElementById('verify-progress-bar').style.width = pct + '%';
                document.getElementById('verify-progress-count').textContent = progress.verified + ' / ' + progress.total + ' files';
                document.getElementById('verify-progress-percent').textContent = pct + '%';
                document.getElementById('verify-current-file').textContent = progress.current || '';
            });

            showResults(result);
        } catch (e) {
            document.getElementById('verify-results-section').style.display = '';
            document.getElementById('verify-results').innerHTML = 
                '<div class="warning-box"><div class="warning-title">Verification Error</div><p>' + App.escapeHtml(e.message) + '</p></div>';
        } finally {
            isRunning = false;
            isPaused = false;
            document.getElementById('btn-start-verify').disabled = false;
            document.getElementById('btn-pause-verify').disabled = true;
            document.getElementById('btn-cancel-verify').disabled = true;
            document.getElementById('btn-pause-verify').textContent = 'Pause';
        }
    });

    // Pause/Resume
    document.getElementById('btn-pause-verify').addEventListener('click', async () => {
        if (!isRunning) return;
        if (isPaused) {
            await App.call('resume_verification');
            isPaused = false;
            document.getElementById('btn-pause-verify').textContent = 'Pause';
        } else {
            await App.call('pause_verification');
            isPaused = true;
            document.getElementById('btn-pause-verify').textContent = 'Resume';
        }
    });

    // Cancel
    document.getElementById('btn-cancel-verify').addEventListener('click', async () => {
        if (!isRunning) return;
        await App.call('cancel_verification');
    });

    function showResults(result) {
        const section = document.getElementById('verify-results-section');
        const container = document.getElementById('verify-results');
        section.style.display = '';

        if (!result) {
            container.innerHTML = '<div class="warning-box"><p>Verification was cancelled or returned no results.</p></div>';
            return;
        }

        const missingCount = result.missing ? result.missing.length : 0;
        const corruptedCount = result.corrupted ? result.corrupted.length : 0;
        const okCount = result.verified - missingCount - corruptedCount;
        const allGood = missingCount === 0 && corruptedCount === 0;

        let html = '';

        // Summary
        if (allGood) {
            html += `
                <div class="info-box">
                    <p style="font-size: 16px; text-align: center;">
                        <strong>All ${result.verified} files verified successfully!</strong><br>
                        <span style="color: var(--text-muted);">Your game files are intact.</span>
                    </p>
                </div>
            `;
        } else {
            html += `
                <div class="card card-dark" style="margin-bottom: 14px;">
                    <div class="card-header">
                        <span class="card-icon">≡</span>
                        <span class="card-title">Verification Summary</span>
                    </div>
                    <div class="card-content">
                        <div class="grid-3" style="text-align:center;">
                            <div>
                                <div style="font-size: 28px; font-weight: 700; color: #4ade80;">${okCount}</div>
                                <div style="color: var(--text-muted);">OK Files</div>
                            </div>
                            <div>
                                <div style="font-size: 28px; font-weight: 700; color: #f59e0b;">${missingCount}</div>
                                <div style="color: var(--text-muted);">Missing</div>
                            </div>
                            <div>
                                <div style="font-size: 28px; font-weight: 700; color: #ef4444;">${corruptedCount}</div>
                                <div style="color: var(--text-muted);">Corrupted</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Missing files
            if (missingCount > 0) {
                html += `
                    <div class="card card-dark" style="margin-bottom: 14px;">
                        <div class="card-header">
                            <span class="card-icon">✕</span>
                            <span class="card-title">Missing Files (${missingCount})</span>
                        </div>
                        <div class="card-content" style="max-height: 250px; overflow-y: auto;">
                            <table class="data-table">
                                <thead><tr><th>Path</th><th>Size</th><th>Component</th></tr></thead>
                                <tbody>
                `;
                for (const f of result.missing) {
                    html += `<tr><td style="word-break:break-all;font-size:12px;">${App.escapeHtml(f.path)}</td><td>${App.formatSize(f.size)}</td><td>${App.escapeHtml(f.component)}</td></tr>`;
                }
                html += `</tbody></table></div></div>`;
            }

            // Corrupted files
            if (corruptedCount > 0) {
                const hasHashInfo = result.corrupted.some(f => f.actual_hash);
                html += `
                    <div class="card card-dark" style="margin-bottom: 14px;">
                        <div class="card-header">
                            <span class="card-icon">△</span>
                            <span class="card-title">Corrupted Files (${corruptedCount})</span>
                        </div>
                        <div class="card-content" style="max-height: 350px; overflow-y: auto;">
                            <table class="data-table">
                                <thead><tr>
                                    <th>Path</th>
                                    <th>Reason</th>
                                    <th>Expected</th>
                                    <th>Actual</th>
                                    <th>Component</th>
                                </tr></thead>
                                <tbody>
                `;
                for (const f of result.corrupted) {
                    let reasonText = f.reason || 'unknown';
                    if (reasonText === 'size_mismatch') reasonText = 'Size mismatch';
                    else if (reasonText === 'hash_mismatch') reasonText = 'Hash mismatch';
                    else if (reasonText === 'unreadable') reasonText = 'Unreadable';
                    else if (reasonText === 'error') reasonText = 'Error';

                    let expected = App.formatSize(f.size);
                    let actual = App.formatSize(f.actual_size);
                    if (f.reason === 'hash_mismatch' && f.hash && f.actual_hash) {
                        expected = '<span style="font-family:monospace;font-size:11px;">' + App.escapeHtml(f.hash.substring(0, 12)) + '...</span>';
                        actual = '<span style="font-family:monospace;font-size:11px;">' + App.escapeHtml(f.actual_hash.substring(0, 12)) + '...</span>';
                    }

                    html += `<tr>
                        <td style="word-break:break-all;font-size:12px;">${App.escapeHtml(f.path)}</td>
                        <td style="white-space:nowrap;">${reasonText}</td>
                        <td style="white-space:nowrap;">${expected}</td>
                        <td style="white-space:nowrap;">${actual}</td>
                        <td>${App.escapeHtml(f.component)}</td>
                    </tr>`;
                }
                html += `</tbody></table></div></div>`;
            }

            // Action buttons
            html += `
                <div class="card card-accent" style="margin-bottom: 14px;">
                    <div class="card-header">
                        <span class="card-icon">✦</span>
                        <span class="card-title">Fix Issues</span>
                    </div>
                    <div class="card-content">
                        <p style="margin-bottom: 10px;">Automatic re-download is <strong style="color: var(--accent);">not available</strong> at this time. To fix missing or corrupted files, use <strong>qBittorrent</strong> with the full game torrent, it will detect and re-download only the missing files.</p>
                        <div class="button-group" style="margin-bottom: 12px;">
                            <button class="btn" onclick="App.call('open_url', {url: 'https://www.qbittorrent.org/download'})">Get qBittorrent</button>
                            <button class="btn btn-secondary" onclick="App.call('open_url', {url: 'https://rentry.org/boiiidownloads'})">Download Guide</button>
                        </div>
                        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 8px;">Copy the list of problem files below for reference:</p>
                        <button class="btn btn-small btn-secondary" id="btn-copy-file-list">Copy File List</button>
                    </div>
                </div>
            `;

            let fileListText = '';
            if (missingCount > 0) {
                fileListText += 'MISSING FILES (' + missingCount + '):\\n';
                for (const f of result.missing) {
                    fileListText += '  ' + f.path + ' (' + App.formatSize(f.size) + ')\\n';
                }
            }
            if (corruptedCount > 0) {
                if (fileListText) fileListText += '\\n';
                fileListText += 'CORRUPTED FILES (' + corruptedCount + '):\\n';
                for (const f of result.corrupted) {
                    let detail = f.reason || 'unknown';
                    if (f.reason === 'size_mismatch') {
                        detail = 'Size mismatch: expected ' + App.formatSize(f.size) + ', got ' + App.formatSize(f.actual_size);
                    } else if (f.reason === 'hash_mismatch') {
                        detail = 'Hash mismatch: expected ' + (f.hash || '?') + ', got ' + (f.actual_hash || '?');
                    } else if (f.reason === 'unreadable') {
                        detail = 'File could not be read';
                    }
                    fileListText += '  ' + f.path + ' [' + detail + ']\\n';
                }
            }
            window.__verifyFileList = fileListText;
        }

        container.innerHTML = html;

        const copyBtn = document.getElementById('btn-copy-file-list');
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                try {
                    const text = window.__verifyFileList || '';
                    await App.call('copy_to_clipboard', { text });
                    copyBtn.textContent = 'Copied!';
                    copyBtn.disabled = true;
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy File List';
                        copyBtn.disabled = false;
                    }, 2000);
                } catch (e) {
                    copyBtn.textContent = 'Copy failed';
                }
            });
        }
    }
};
