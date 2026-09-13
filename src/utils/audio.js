/**
 * Luxury Web Audio API Engine for VÉLORA
 * Generates bespoke procedural audio: ambient drone, mist spray, glass clink, and harmonic note chimes.
 */

class LuxuryAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientNodes = null;
    this.hasInitialized = false;
  }

  init() {
    if (this.hasInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.hasInitialized = true;
      }
    } catch (e) {
      console.warn('AudioContext not supported', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.resume();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startAmbient();
      this.playGlassClink();
    } else {
      this.stopAmbient();
    }
    return !this.isMuted;
  }

  startAmbient() {
    if (this.isMuted || !this.ctx || this.ambientNodes) return;
    try {
      const now = this.ctx.currentTime;
      // Ambient warm drone with dual oscillators + lowpass filter
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, now); // A1 note (deep warmth)

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, now); // A2 harmonic

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.Q.setValueAtTime(2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 3);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientNodes = { osc1, osc2, filter, gain };
    } catch (e) {
      console.error(e);
    }
  }

  stopAmbient() {
    if (!this.ambientNodes || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientNodes.gain.gain.setValueAtTime(this.ambientNodes.gain.gain.value, now);
      this.ambientNodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        if (this.ambientNodes) {
          try {
            this.ambientNodes.osc1.stop();
            this.ambientNodes.osc2.stop();
          } catch (_) {}
          this.ambientNodes = null;
        }
      }, 1100);
    } catch (e) {
      this.ambientNodes = null;
    }
  }

  playGlassClink() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1244.5, now); // D#6 crystal chime
      osc.frequency.exponentialRampToValueAtTime(1864.6, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (_) {}
  }

  playMistSpray() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const now = this.ctx.currentTime;
      // White noise buffer for perfume mist spray
      const bufferSize = this.ctx.sampleRate * 0.7;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.7);
    } catch (_) {}
  }

  playNoteChord(freq = 440) {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const now = this.ctx.currentTime;
      [freq, freq * 1.25, freq * 1.5].forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.03);

        gain.gain.setValueAtTime(0.06, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.03);
        osc.stop(now + 2.0);
      });
    } catch (_) {}
  }

  playHoverTick() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.02);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch (_) {}
  }
}

export const luxuryAudio = new LuxuryAudioEngine();
