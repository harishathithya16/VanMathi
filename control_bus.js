/**
 * =========================================================================
 * VANMATHI Control Bus — Bidirectional Real-Time Inter-Dashboard Messaging
 * Synchronizes events between:
 *  - ForestIQ Ranger Command Dashboard (index.html)
 *  - VANMATHI Control Help Centre Dashboard (control_centre.html & #pageControlCentre)
 *  - Forest Guard Mobile Android Application (via forest_sync_server.js WebSocket)
 * =========================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ControlBus = factory();
    root.controlBus = root.ControlBus.getInstance();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const CHANNEL_NAME = 'vaanmathi_control_bus';
  const STORAGE_KEY = 'vaanmathi_control_event';
  const WS_DEFAULT_URL = (typeof window !== 'undefined' && window.location && window.location.hostname)
    ? `ws://${window.location.hostname}:5050`
    : 'ws://localhost:5050';

  class ControlBusEngine {
    constructor() {
      this.listeners = new Map();
      this.senderId = 'node_' + Math.random().toString(36).substring(2, 9);
      this.ws = null;
      this.wsConnected = false;
      this.reconnectTimer = null;
      this.hasAudioPermission = false;
      this.audioCtx = null;

      // 1. Initialize BroadcastChannel (Zero-lag modern inter-tab/inter-window)
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          this.bc = new BroadcastChannel(CHANNEL_NAME);
          this.bc.onmessage = (event) => {
            if (event.data && event.data.senderId !== this.senderId) {
              this._dispatchLocal(event.data.type, event.data.payload, 'broadcast_channel');
            }
          };
        } catch (err) {
          console.warn('[ControlBus] BroadcastChannel not available:', err);
          this.bc = null;
        }
      }

      // 2. Storage event fallback (Cross-tab/Cross-origin window fallback)
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('storage', (event) => {
          if (event.key === STORAGE_KEY && event.newValue) {
            try {
              const data = JSON.parse(event.newValue);
              if (data && data.senderId !== this.senderId) {
                this._dispatchLocal(data.type, data.payload, 'storage_fallback');
              }
            } catch (e) {}
          }
        });
      }

      // 3. Connect to WebSocket Sync Server if available
      this.connectWebSocket();

      // Enable audio context on first user interaction
      if (typeof window !== 'undefined') {
        const unlockAudio = () => {
          if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
              this.audioCtx = new AudioContext();
              this.hasAudioPermission = true;
            }
          }
          ['click', 'keydown', 'touchstart'].forEach(ev => window.removeEventListener(ev, unlockAudio));
        };
        ['click', 'keydown', 'touchstart'].forEach(ev => window.addEventListener(ev, unlockAudio, { once: true }));
      }
    }

    static getInstance() {
      if (!ControlBusEngine.instance) {
        ControlBusEngine.instance = new ControlBusEngine();
      }
      return ControlBusEngine.instance;
    }

    /**
     * Connect to WebSocket server for cross-device & mobile sync
     */
    connectWebSocket(wsUrl = WS_DEFAULT_URL) {
      if (typeof WebSocket === 'undefined') return;
      clearTimeout(this.reconnectTimer);

      try {
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.wsConnected = true;
          // Send handshake
          this.ws.send(JSON.stringify({
            type: 'IDENTIFY',
            role: 'control_centre',
            senderId: this.senderId
          }));
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.senderId !== this.senderId) {
              // Standardized control event routing
              if (data.type && data.type.startsWith('CONTROL_')) {
                this._dispatchLocal(data.type, data.payload || data, 'websocket');
              } else if (data.type === 'NEW_INCIDENT') {
                this._dispatchLocal('CONTROL_SOS_NEW', data.incident || data, 'websocket');
              } else if (data.type === 'CHAT_MESSAGE') {
                this._dispatchLocal('CONTROL_CHAT_MESSAGE', data.message || data, 'websocket');
              }
            }
          } catch (e) {
            console.error('[ControlBus] WS message error:', e);
          }
        };

        this.ws.onclose = () => {
          this.wsConnected = false;
          this.reconnectTimer = setTimeout(() => this.connectWebSocket(wsUrl), 5000);
        };

        this.ws.onerror = () => {
          this.wsConnected = false;
        };
      } catch (err) {
        this.wsConnected = false;
        this.reconnectTimer = setTimeout(() => this.connectWebSocket(wsUrl), 6000);
      }
    }

    /**
     * Subscribe to a control event or all events ('*')
     */
    subscribe(eventType, callback) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Set());
      }
      this.listeners.get(eventType).add(callback);

      // Return unsubscribe function
      return () => {
        const set = this.listeners.get(eventType);
        if (set) {
          set.delete(callback);
          if (set.size === 0) this.listeners.delete(eventType);
        }
      };
    }

    /**
     * Publish an event across all channels (BroadcastChannel, localStorage, WebSocket)
     */
    publish(eventType, payload = {}) {
      const packet = {
        type: eventType,
        payload: payload,
        senderId: this.senderId,
        timestamp: Date.now(),
        eventId: 'evt_' + Math.random().toString(36).substring(2, 9)
      };

      // 1. Dispatch locally in current window
      this._dispatchLocal(eventType, payload, 'local');

      // 2. BroadcastChannel
      if (this.bc) {
        try {
          this.bc.postMessage(packet);
        } catch (e) {
          console.warn('[ControlBus] BC send error:', e);
        }
      }

      // 3. localStorage fallback
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(packet));
        } catch (e) {}
      }

      // 4. WebSocket
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(JSON.stringify(packet));
        } catch (e) {}
      }

      return packet;
    }

    /**
     * Internal event dispatcher to registered subscribers
     */
    _dispatchLocal(eventType, payload, source = 'unknown') {
      // Execute specific listeners
      if (this.listeners.has(eventType)) {
        this.listeners.get(eventType).forEach(cb => {
          try {
            cb(payload, source, eventType);
          } catch (e) {
            console.error(`[ControlBus] Error in subscriber for ${eventType}:`, e);
          }
        });
      }

      // Execute wildcard listeners
      if (this.listeners.has('*')) {
        this.listeners.get('*').forEach(cb => {
          try {
            cb(payload, source, eventType);
          } catch (e) {
            console.error('[ControlBus] Error in wildcard subscriber:', e);
          }
        });
      }

      // Tactical alert sounds for high severity events
      if (eventType === 'CONTROL_SOS_NEW' || (payload && payload.severity === 'critical')) {
        this.playTacticalChime('alarm');
      } else if (eventType === 'CONTROL_TEAM_DISPATCH' || eventType === 'CONTROL_SOS_ESCALATE') {
        this.playTacticalChime('dispatch');
      }
    }

    /**
     * Synthesize clean procedural tactical audio alerts without external files
     */
    playTacticalChime(type = 'alarm') {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!this.audioCtx) this.audioCtx = new AudioContext();
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        if (type === 'alarm') {
          // Double warble beep
          [0, 0.16].forEach(offset => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now + offset);
            osc.frequency.exponentialRampToValueAtTime(1480, now + offset + 0.12);
            gain.gain.setValueAtTime(0.2, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.14);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + offset);
            osc.stop(now + offset + 0.15);
          });
        } else if (type === 'dispatch') {
          // High-tech ascending arpeggio chime
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + (i * 0.08);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.18, start);
            gain.gain.exponentialRampToValueAtTime(0.01, start + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + 0.25);
          });
        }
      } catch (e) {
        // Audio policy or context unavailable
      }
    }
  }

  return ControlBusEngine;
}));
