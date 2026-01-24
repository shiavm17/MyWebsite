document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('robot-game-container');
    const toggleBtn = document.getElementById('game-toggle-btn');
    const gameBoard = document.getElementById('game-board');
    const closeBtn = document.querySelector('.close-game');
    const canvasArea = document.getElementById('game-canvas-area');
    const wireLayer = document.getElementById('wire-layer'); // SVG element
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-game-btn');
    const paletteItems = document.querySelectorAll('.palette-item');

    let components = [];
    let wires = [];
    let draggedComponent = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let wiringStart = null; // { componentId, terminalType }
    let componentIdCounter = 0;

    // Toggle Game Visibility
    toggleBtn.addEventListener('click', () => {
        gameBoard.classList.add('open');
        toggleBtn.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        gameBoard.classList.remove('open');
        toggleBtn.style.display = 'flex';
    });

    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        resetGame();
    });

    // Drag from Palette
    paletteItems.forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const type = item.dataset.type;
            createComponent(type, 50, 50); // Spawn at top left
        });
    });

    function createComponent(type, x, y) {
        const id = componentIdCounter++;
        const el = document.createElement('div');
        el.className = 'circuit-component';
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.dataset.id = id;
        el.dataset.type = type;

        // Icon
        let icon = '';
        if (type === 'battery') icon = '🔋';
        if (type === 'led') icon = '💡';
        if (type === 'switch') icon = '<div class="switch-toggle"></div>';

        el.innerHTML = `
            <div class="component-icon">${icon}</div>
            <div class="terminal terminal-left" data-type="left"></div>
            <div class="terminal terminal-right" data-type="right"></div>
        `;

        // Switch Click Logic
        if (type === 'switch') {
            el.querySelector('.switch-toggle').addEventListener('mousedown', (e) => {
                e.stopPropagation(); // Prevent drag
                const comp = components.find(c => c.id === id);
                comp.state.closed = !comp.state.closed;
                el.classList.toggle('closed', comp.state.closed);
                simulateCircuit();
            });
        }

        // Drag Logic
        el.addEventListener('mousedown', startDrag);

        // Wiring Logic (Terminals)
        el.querySelectorAll('.terminal').forEach(term => {
            term.addEventListener('mousedown', (e) => {
                e.stopPropagation(); // Prevent drag
                startWiring(id, term.dataset.type);
            });
            term.addEventListener('mouseup', (e) => {
                e.stopPropagation();
                finishWiring(id, term.dataset.type);
            });
        });

        canvasArea.appendChild(el);

        components.push({
            id,
            type,
            x,
            y,
            el,
            state: { closed: false, on: false } // closed for switch, on for LED
        });
    }

    function startDrag(e) {
        draggedComponent = components.find(c => c.id == e.currentTarget.dataset.id);
        const rect = draggedComponent.el.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
    }

    function onDrag(e) {
        if (!draggedComponent) return;
        const canvasRect = canvasArea.getBoundingClientRect();
        let x = e.clientX - canvasRect.left - dragOffsetX;
        let y = e.clientY - canvasRect.top - dragOffsetY;

        // Constraints
        x = Math.max(0, Math.min(x, canvasRect.width - 60));
        y = Math.max(0, Math.min(y, canvasRect.height - 60));

        draggedComponent.x = x;
        draggedComponent.y = y;
        draggedComponent.el.style.left = `${x}px`;
        draggedComponent.el.style.top = `${y}px`;

        updateWires();
    }

    function stopDrag() {
        draggedComponent = null;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
    }

    function startWiring(compId, termType) {
        wiringStart = { compId, termType };

        // Add visual feedback (temp wire)
        const startComp = components.find(c => c.id === compId);
        const startX = startComp.x + (termType === 'left' ? 0 : 60);
        const startY = startComp.y + 30;

        const tempWire = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempWire.setAttribute('class', 'wire temp-wire');
        tempWire.style.opacity = '0.5';
        tempWire.style.strokeDasharray = '5,5';
        wireLayer.appendChild(tempWire);

        const onMouseMove = (e) => {
            const canvasRect = canvasArea.getBoundingClientRect();
            const mouseX = e.clientX - canvasRect.left;
            const mouseY = e.clientY - canvasRect.top;

            const d = `M ${startX} ${startY} L ${mouseX} ${mouseY}`;
            tempWire.setAttribute('d', d);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            tempWire.remove();
            // If we didn't finish wiring properly, wiringStart will remain set until next click or cleared here?
            // Actually finishWiring clears it. If we click elsewhere, we should probably cancel.
            // For now, let's just let the user click the second terminal.
            // But this temp wire logic implies drag-to-connect. 
            // The current logic is click-start, click-end.
            // Let's stick to click-start, click-end but maybe show a line attached to mouse?
            // If the user expects drag, this might be confusing.
            // Let's support both: if they release mouse over another terminal, it connects.
            // But my finishWiring is on 'mouseup' of terminal.
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function finishWiring(compId, termType) {
        if (!wiringStart) return;
        if (wiringStart.compId === compId) return; // Don't connect to self

        // Check if wire already exists
        const exists = wires.some(w =>
            (w.start.compId === wiringStart.compId && w.end.compId === compId) ||
            (w.start.compId === compId && w.end.compId === wiringStart.compId)
        );

        if (!exists) {
            wires.push({
                start: { ...wiringStart },
                end: { compId, termType },
                active: false
            });
            renderWires();
            simulateCircuit();
        }
        wiringStart = null;
    }

    function updateWires() {
        renderWires();
    }

    function renderWires() {
        wireLayer.innerHTML = '';
        wires.forEach(wire => {
            const startComp = components.find(c => c.id === wire.start.compId);
            const endComp = components.find(c => c.id === wire.end.compId);

            if (!startComp || !endComp) return;

            const startX = startComp.x + (wire.start.termType === 'left' ? 0 : 60);
            const startY = startComp.y + 30;
            const endX = endComp.x + (wire.end.termType === 'left' ? 0 : 60);
            const endY = endComp.y + 30;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            // Bezier curve for wire
            const d = `M ${startX} ${startY} C ${startX + (wire.start.termType === 'left' ? -30 : 30)} ${startY}, ${endX + (wire.end.termType === 'left' ? -30 : 30)} ${endY}, ${endX} ${endY}`;

            line.setAttribute('d', d);
            line.setAttribute('class', `wire ${wire.active ? 'active' : ''}`);
            wireLayer.appendChild(line);
        });
    }

    function simulateCircuit() {
        // Reset states
        components.forEach(c => {
            if (c.type === 'led') {
                c.state.on = false;
                c.el.classList.remove('active');
            }
        });
        wires.forEach(w => w.active = false);

        // Find Batteries
        const batteries = components.filter(c => c.type === 'battery');

        batteries.forEach(battery => {
            // Simple DFS to find closed loops or paths to ground (simplified: just connectivity)
            // Actually, let's just trace flow from Battery + to Battery -
            // Assuming Right is + and Left is - for simplicity

            const visited = new Set();
            const path = [];

            if (tracePath(battery.id, 'right', battery.id, 'left', visited, path)) {
                // Circuit Complete!
                path.forEach(itemId => {
                    // Activate wires and components in path
                    if (typeof itemId === 'object') { // It's a wire
                        itemId.active = true;
                    } else { // It's a component
                        const comp = components.find(c => c.id === itemId);
                        if (comp.type === 'led') {
                            comp.state.on = true;
                            comp.el.classList.add('active');
                        }
                    }
                });
            }
        });

        renderWires();
    }

    function tracePath(currentId, currentTerm, targetId, targetTerm, visited, path) {
        // Find wires connected to currentTerm of currentId
        const connectedWires = wires.filter(w =>
            (w.start.compId === currentId && w.start.termType === currentTerm) ||
            (w.end.compId === currentId && w.end.termType === currentTerm)
        );

        for (const wire of connectedWires) {
            if (visited.has(wire)) continue;

            // Determine next component
            const nextNode = (wire.start.compId === currentId) ? wire.end : wire.start;
            const nextComp = components.find(c => c.id === nextNode.compId);

            // Check Switch State
            if (nextComp.type === 'switch' && !nextComp.state.closed) continue;

            // Found Target?
            if (nextComp.id === targetId && nextNode.termType === targetTerm) {
                path.push(wire);
                return true;
            }

            // Continue traversing through component
            // Enter at nextNode.termType, exit at opposite
            const exitTerm = nextNode.termType === 'left' ? 'right' : 'left';

            visited.add(wire);
            path.push(wire);
            path.push(nextComp.id);

            if (tracePath(nextComp.id, exitTerm, targetId, targetTerm, visited, path)) {
                return true;
            }

            // Backtrack
            path.pop();
            path.pop();
            visited.delete(wire);
        }

        return false;
    }

    function resetGame() {
        // Clear components from DOM
        components.forEach(c => c.el.remove());
        components = [];
        wires = [];

        // Clear wires
        if (wireLayer) wireLayer.innerHTML = '';

        // Create default components
        createComponent('battery', 50, 50);
        createComponent('led', 200, 50);
        createComponent('switch', 125, 150);
    }
});
