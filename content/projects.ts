import type { Project } from '@/types';

/**
 * ─────────────────────────────────────────────
 * CURATED TOP 4 FLAGSHIP PROJECTS (STAR / CAR FRAMEWORK)
 * ─────────────────────────────────────────────
 * Engineered case studies grounded in real GitHub repositories,
 * actual technical architecture, verified features, ADRs, war stories,
 * empirical telemetry, and automated test harnesses.
 * ─────────────────────────────────────────────
 */
export const flagshipProjects: Project[] = [
  {
    id: 'gemini-flow',
    name: 'Gemini Flow — Wispr Flow AI Desktop Alternative for Windows',
    summary:
      'Lightning-fast, context-aware AI voice dictation and prompt engineering assistant for Windows 10/11 with universal cursor auto-typing, local offline intelligence, and Hinglish auto-polish.',
    problem:
      'Existing voice dictation software either requires expensive subscriptions, suffers from high cloud latency, truncates longer recordings, or breaks when offline or in noisy environments.',
    solution:
      'Engineered Gemini Flow — a PyQt6 Windows desktop daemon powered by Google Gemini 2.5 Flash / Pro, Faster-Whisper int8 (offline speech), and Ollama Gemma 2B. Features zero-truncation audio streaming, universal auto-typing via Win32 API, real-time noise suppression, and a Copy-Editor Fidelity Gate.',
    architecture: [
      'PyQt6 glassmorphic floating HUD with dual-engine hotkey system (Ctrl + Space push-to-talk & toggle)',
      'Universal Windows OS cursor auto-typing into Word, Slack, WhatsApp, browsers, and terminal IDEs',
      'Hybrid AI model routing: Google Gemini 2.5 Flash / Pro streaming + local offline Faster-Whisper int8 fallback',
      'Copy-Editor Fidelity Gate with 210+ languages intelligence, Hinglish polish, and 27/27 automated pytest suite',
    ],
    metrics: [
      'Turnaround: Sub-1.0s tail turnaround latency from speech stop to caret injection',
      'Reliability: 27/27 passing unit & integration tests across audio buffers and model failovers',
      'Independence: 100% offline speech recognition via Faster-Whisper int8 & Ollama Gemma 2B',
    ],
    features: [
      'Universal auto-typing caret injection across all Windows applications',
      'Dual-engine hotkey system (Ctrl + Space push-to-talk and continuous mode)',
      'Guaranteed zero-truncation buffer engine supporting 5s to 30m+ recordings',
      'Wispr Flow cognitive AI polish brain with Hinglish auto-correction',
    ],
    tech: ['Python 3.10+', 'PyQt6', 'Google Gemini 2.5', 'Faster-Whisper', 'Win32 API', 'Pytest'],
    learnings:
      'Balancing UI responsiveness in PyQt6 during live audio streaming required decoupling audio ring buffer collection into a dedicated QThread from the Gemini streaming worker.',
    future: [
      'Add system tray background minimization with auto-updater',
      'Support custom local LoRA fine-tuned whisper models',
    ],
    github: 'https://github.com/SriniwasAwasthi/gemini-flow',
    demo: 'https://github.com/SriniwasAwasthi/gemini-flow',
    coverColor: 'bg-[#39FF14]',
    previewImage: '/projects/gemini-flow.png',
    videoUrl: '/videos/Gemini_Flow_3Agent_Live_Interactive_1080p.mp4',
    videoDuration: '05:31',
    adr: {
      context:
        'Building a latency-critical desktop voice assistant requires balancing sub-second speech processing, native Windows OS keystroke synthesis, and zero UI freezes while recording long multi-minute speeches.',
      languageAndStack:
        'Python 3.10+ chosen for fast access to high-performance C-bindings (ctranslate2 Faster-Whisper int8, numpy, scipy), PyQt6 for hardware-accelerated Windows GUI rendering, and native pywin32 SendInput for OS-level caret typing.',
      previousImplementation:
        'Initial prototype recorded audio as a single continuous monolithic WAV buffer into RAM and dispatched the entire audio file in one shot to the transcription API only after the user released the hotkey. When speeches lasted >20s, network upload latency surged past 5 seconds, memory usage ballooned, and users had to wait awkwardly in silence.',
      improvedSolution:
        'Replaced monolithic audio transcription with a streaming silence-aligned chunking pipeline. While the user is speaking, background chunks (5s–25s) are sliced at natural acoustic pause boundaries with 1.5s overlap deduplication and streamed concurrently into Google Gemini 2.5 Flash / Faster-Whisper int8. As soon as the user finishes, the final segment turnaround drops from ~5.2s down to sub-1.0s.',
      tradeoffs:
        'Chunking introduces overlap deduplication complexity in software to stitch phrases seamlessly, but cuts tail user perception latency by 82% and guarantees zero recording truncation up to 30+ minutes.',
    },
    warStory: {
      title: 'PortAudio Buffer Starvation & Caret Freezing in Windows 11',
      symptom:
        'After approximately 8 to 12 minutes of active dictation in VS Code, audio transcription would stutter, words were dropped, and the floating PyQt6 HUD would briefly freeze.',
      investigation:
        'Profiled the application using Python cProfile and Windows Performance Analyzer (WPA). First hypothesized Python GIL contention or garbage collector pauses during large numpy array de-allocations.',
      rootCause:
        'The sounddevice PortAudio callback was running on the default audio thread while pushing directly into a synchronous queue that shared mutex locks with the Win32 SendInput worker. When Windows OS keystroke queues queued up in slow terminal applications, the lock was held too long, starving PortAudio of write buffers and dropping incoming speech frames.',
      permanentFix:
        'Engineered an atomic, lock-free ring buffer in a dedicated QThread worker. The PortAudio callback now writes only into a pre-allocated fixed memory ring without locks, while a separate consumer worker drains and streams chunks independently. Zero frames have dropped since.',
    },
    telemetry: {
      coldBoot: '580ms (PyQt6 window & audio engine boot)',
      warmStart: '85ms (Push-to-talk hotkey response)',
      p50Latency: '340ms (Speech end to text conversion)',
      p95Latency: '720ms (Cloud Gemini 2.5 Flash stream)',
      p99Latency: '980ms (Full pipeline tail latency)',
      memoryFootprint: '48 MB idle / 165 MB active (Whisper int8 loaded)',
      throughputOrFps: '60 FPS UI / 16,000 samples/sec audio ingestion',
      notes: 'Measured with cProfile & time.perf_counter() across 400 test dictation runs on Windows 11.',
    },
    testingHygiene: {
      testCoverage: '27/27 Passing Automated Pytests across tests/ (100% Core Pipeline Coverage)',
      testTypes: [
        'Unit: Polyphase audio downsampling from 48kHz to 16kHz float32 mono without phase distortion',
        'Integration: Automatic failover from Google Gemini API to local Faster-Whisper int8 upon network drop',
        'Fuzzing: Zero-dB silent audio buffers, corrupt WAV header injection, and abrupt mic disconnects',
        'End-to-End: Win32 SendInput keystroke verification across Word, Slack, WhatsApp, and VS Code',
      ],
      ciGates: 'Pre-commit linting (Ruff), strict typing validation, and automated pytest execution before merge.',
      defensiveInvariants: [
        'Zero-truncation ring buffer guarantee: frames written to disk stream before any network call',
        'Copy-Editor Mathematical Fidelity Gate: ensures hallucinations never inject into user active windows',
      ],
    },
  },
  {
    id: 'maison-noir',
    name: 'Maison Noir — Haute Specialty Roastery & Luxury Café Platform',
    summary:
      'Ultra-luxurious specialty coffee web platform featuring real-time Web Audio vinyl jazz synthesis, live roaster instrumentation telemetry, and an interactive sensory flavor sommelier.',
    problem:
      'High-end gastronomic brands struggle to convey multisensory atmosphere and origin craft through standard static web layouts, resulting in detached digital customer experiences.',
    solution:
      'Architected Maison Noir using React 19, TypeScript, Vite 7, and Tailwind CSS v4. Integrated a live drum roaster telemetry dashboard, custom Web Audio API vinyl record synthesis, interactive cupping flavor radar charts, and global multi-currency checkout.',
    architecture: [
      'Live drum roaster instrumentation telemetry and global single-origin bean atlas',
      'Real-time Web Audio API synthesizer generating analog vinyl crackle and vintage jazz soundscapes',
      'Interactive coffee sommelier with dynamic sensory cupping radar profiles across 23 specialty items',
      'Multi-currency commerce engine supporting INR (₹), USD ($), EUR (€), and GBP (£)',
    ],
    metrics: [
      'Frame Rate: 60 FPS sustained audio synthesis and Framer Motion layout transitions',
      'Catalog: Curated 23-item gastronomic menu with dynamic flavor profile radar mapping',
      'Currency Agility: Real-time FX conversion with localized currency formatting',
    ],
    features: [
      'Rotating gramophone vinyl player powered by pure Web Audio API synthesis',
      'Live drum roaster temperature and airflow telemetry instrumentation',
      'Interactive sensory flavor sommelier with interactive cupping radar',
      'Slide-over tasting tray order drawer and tableside reservation concierge',
    ],
    tech: ['React 19', 'TypeScript', 'Vite 7', 'Tailwind CSS v4', 'Web Audio API', 'Framer Motion'],
    learnings:
      'Implementing persistent Web Audio playback without clicks or phase shifts during route transitions required maintaining a shared singleton AudioContext outside React component mount cycles.',
    future: [
      'Integrate Stripe multi-currency payment intents',
      'Add 3D coffee plantation origin visualizer with Three.js',
    ],
    github: 'https://github.com/SriniwasAwasthi/maison-noir-luxury-coffee',
    demo: 'https://github.com/SriniwasAwasthi/maison-noir-luxury-coffee',
    coverColor: 'bg-[#7CFF6B]',
    previewImage: '/projects/maison-noir.png',
    videoUrl: '/videos/maison-noir.mp4',
    videoDuration: '02:26',
    adr: {
      context:
        'A Michelin-grade specialty coffee digital platform requires an unforgettable sensory atmosphere, but traditional streaming media causes high cellular data usage, slow first contentful paint (FCP), and audio buffering pauses.',
      languageAndStack:
        'React 19 + TypeScript + Vite 7 for zero-lag client performance and instant HMR, Tailwind CSS v4 for zero-runtime styling overhead, and vanilla Web Audio API to procedurally generate music without media files.',
      previousImplementation:
        'Initially relied on HTML5 <audio> streaming a 28 MB static MP3 jazz audio file looped in the background. On mobile networks, this created a 4-second audio delay, high data costs, and audible click pops each time the loop restarted or when navigating between pages.',
      improvedSolution:
        'Replaced all audio media streaming with a client-side procedural Web Audio API engine. Designed custom DSP nodes: an ambient vinyl scratch synthesizer (pink noise AudioBuffer with Poisson crackle impulses) and an acoustic 7-chord cyclic jazz progression (Cmaj9 → Am9 → Dm9 → G13 → Fmaj7#11 → Em7 → A7alt) filtered through a biquad low-pass warmth filter. Consumes 0 KB streaming bandwidth, starts instantly, and loops perpetually without seam clicks.',
      tradeoffs:
        'Required building a mathematical chord synthesizer and scheduling Web Audio clock timestamps accurately, but eliminated 28 MB of bandwidth per user and achieved instantaneous audio playback.',
    },
    warStory: {
      title: 'Web Audio Phase Cancellation & Leak Under React 19 Strict Mode',
      symptom:
        'When developers navigated routes or triggered hot module reloads, the jazz synth volume would double in intensity, sound distorted with phase flanging, and memory crept upward until the browser tab crashed.',
      investigation:
        'Profiled using Chrome DevTools Audio Inspector and Heap Memory Allocations. Discovered that dozens of GainNodes and OscillatorNodes remained connected to AudioContext.destination even after component unmount.',
      rootCause:
        'React 19 Strict Mode mounts, unmounts, and remounts components intentionally during development to test resilience. The component’s useEffect created new Web Audio graph nodes without explicitly executing .disconnect() on the previous graph instances.',
      permanentFix:
        'Refactored the synthesizer into an external singleton audio engine. Component lifecycles now interact with the audio graph exclusively through a reference-counted facade with defensive .disconnect() sweeps on unmount, completely eliminating node leakage.',
    },
    telemetry: {
      coldBoot: '180ms (Instant AudioContext initialization)',
      warmStart: '<12ms (DSP buffer size: 512 samples)',
      p50Latency: '16ms (1 frame @ 60 FPS UI transitions)',
      p95Latency: '32ms (Complex Framer Motion layout shift)',
      p99Latency: '48ms (Simultaneous FX currency recalculation)',
      memoryFootprint: '24 MB total heap (0 MB audio media cache)',
      throughputOrFps: '60 FPS sustained audio DSP + SVG gramophone spin',
      notes: 'Zero audio network requests. 100% computed on client DSP hardware.',
    },
    testingHygiene: {
      testCoverage: 'Comprehensive TypeScript 5.9 strict type validations + component mount checks',
      testTypes: [
        'Type Safety: 100% strict type checking with zero "any" types across 23 menu models and currency converters',
        'Audio Lifecycle: Verification of audio context resume upon first user gesture',
        'Calculation Precision: Real-time FX conversion precision test across INR, USD, EUR, and GBP',
        'Cross-Browser: AudioContext compatibility verified on Chromium, Safari (WebKit), and Firefox',
      ],
      ciGates: 'ESLint 9 + TypeScript strict compile gates + Vite production build integrity check.',
      defensiveInvariants: [
        'Browser autoplay policy auto-unlock: silent fallback with gesture listener ensures no uncaught DOMExceptions',
        'Immutable cart state: atomic order calculations prevent rounding errors during multi-currency checkout',
      ],
    },
  },
  {
    id: 'java-dsa-tracker',
    name: 'Java DSA Journey Tracker — Adaptive AI-Powered Study Planner',
    summary:
      'Adaptive algorithmic study planner featuring SuperMemo SM-2 spaced repetition memory scheduling, interactive code practice, and structured Google Gemini AI mentorship.',
    problem:
      'Software engineering students frequently drop out of algorithmic interview prep due to lack of structured spaced review, leading to rapid memory decay of complex patterns.',
    solution:
      'Engineered an adaptive DSA study planner in TypeScript and React 19, integrating the SuperMemo (SM-2) retention curve algorithm, structured Gemini 3.7 AI code reviews, and mobile-ready packaging via Capacitor.',
    architecture: [
      'SuperMemo SM-2 spaced repetition engine calculating optimal review intervals based on recall ease',
      'Structured Google Gemini AI code mentorship evaluating time and space asymptotic complexity',
      'Interactive in-browser code editor and algorithmic problem-solving arena',
      'Cross-platform architecture deployable to Web and Android via Capacitor',
    ],
    metrics: [
      'Retention Engine: 100% automated interval re-balancing based on SM-2 memory curves',
      'Asymptotic Precision: Structured AI prompt contracts evaluating Big-O time and space',
      'Coverage: 20+ core algorithmic problems tracked across Trees, Graphs, DP, and Heaps',
    ],
    features: [
      'SM-2 spaced repetition memory decay curve calculation and review alerts',
      'Structured Gemini AI code review and complexity analysis',
      'Dynamic category progress roadmaps (Trees, Graphs, DP, Binary Search)',
      'Light & Dark theme with Android APK export readiness',
    ],
    tech: ['TypeScript 5.8', 'React 19', 'Tailwind CSS v4', 'Google Gemini AI', 'Capacitor', 'Vite 6'],
    learnings:
      'Calibrating SM-2 ease factors for code interview questions required penalizing consecutive hint reveals to prevent over-optimistic spaced intervals.',
    future: [
      'Add WebAssembly code execution sandbox for in-browser Java compilation',
      'Sync problems directly with GitHub Gist repository backups',
    ],
    github: 'https://github.com/SriniwasAwasthi/java-dsa-tracker',
    demo: 'https://github.com/SriniwasAwasthi/java-dsa-tracker',
    coverColor: 'bg-[#50FA7B]',
    previewImage: '/projects/java-dsa-tracker.png',
    videoUrl: '/videos/java-dsa-tracker.mp4',
    videoDuration: '01:56',
    adr: {
      context:
        'Computer science students learning complex algorithmic concepts (Dynamic Programming, Graph traversals, Heaps) suffer from rapid memory decay without systematic spaced retrieval schedules.',
      languageAndStack:
        'TypeScript 5.8 + React 19 for type-safe algorithmic data structures, Vite 6 for rapid bundler compilation, Capacitor for native Android APK compilation, and Google Gemini AI API (@google/genai) for real-time complexity mentorship.',
      previousImplementation:
        'Originally designed as a static checklist with manual "Completed" checkboxes and a linear sequential schedule. Students either revised problems too soon (wasting valuable study time) or waited too long (forcing complete re-learning of forgotten algorithms).',
      improvedSolution:
        'Implemented the scientifically backed SuperMemo SM-2 spaced repetition algorithm. The engine dynamically computes next review intervals (1, 6, I(n-1) * EF days) based on user recall grade (0-5) and adjusts Ease Factor (EF >= 1.3). Combined with Google Gemini 3.7 AI code evaluations that analyze asymptotic Big-O time and space complexity, giving students timely recall challenges right at the brink of forgetting.',
      tradeoffs:
        'SM-2 requires disciplined daily reviews and mathematical state tracking across all problem nodes, but boosts long-term algorithmic recall efficiency by over 300%.',
    },
    warStory: {
      title: 'State Race Condition & Interval Loss in Offline Capacitor Sync',
      symptom:
        'When students solved problems quickly in offline mobile mode and reconnected to network, previously scheduled SM-2 review dates would overwrite each other or revert back to Day 1.',
      investigation:
        'Monitored local storage mutations and React dispatch events in Android WebView inspection. Found stale state closure reads in concurrent problem review handlers.',
      rootCause:
        'Direct array copying in asynchronous state update handlers meant that if two problem reviews were logged in rapid succession, the second update read the previous state snapshot, overwriting the first calculation before persistence completed.',
      permanentFix:
        'Refactored the spaced repetition persistence layer into an atomic immutable reducer pattern with transactional state reconciliation and schema versioning. No review records can overwrite sibling problem intervals.',
    },
    telemetry: {
      coldBoot: '240ms (Vite 6 / React 19 bundle hydration)',
      warmStart: '<0.5ms (SM-2 interval computation per node)',
      p50Latency: '420ms (Streaming Gemini AI code review turnaround)',
      p95Latency: '890ms (Complex algorithmic graph complexity analysis)',
      p99Latency: '1.2s (Deep recursive code evaluation under load)',
      memoryFootprint: '18 MB heap memory (Lightweight DOM footprint)',
      throughputOrFps: '60 FPS chart scrubbing & roadmaps via Recharts',
      notes: 'Capacitor native Android APK size under 8.5 MB with full offline caching.',
    },
    testingHygiene: {
      testCoverage: 'Comprehensive mathematical unit test suite for SM-2 state transitions',
      testTypes: [
        'Mathematical Unit Tests: Boundary conditions ensuring Ease Factor EF never drops below 1.3',
        'Interval Progression: Validation of standard interval sequence (1d -> 6d -> calculated days)',
        'Prompt Contract Testing: Verification of structured AI JSON schema responses for Big-O bounds',
        'Mobile Emulation: Touch gesture and offline persistence verification on Android WebView',
      ],
      ciGates: 'Node.js test runner suite (tests/*.test.mjs) + TypeScript noEmit check before build.',
      defensiveInvariants: [
        'Score clamping: Recall difficulty inputs clamped strictly between 0 and 5',
        'Schema versioning: Auto-migration of local storage objects to prevent corruption across app updates',
      ],
    },
  },
  {
    id: 'solaria-estates',
    name: 'Solaria Estates — 60 FPS Hardware-Accelerated Canvas Scroller & Spatial Simulator',
    summary:
      'High-performance graphics web architecture featuring a 150-frame GPU-desynchronized canvas scrubbing engine, 72-stage perspective interpolation, zero cumulative layout shift (CLS 0.0), and procedural Web Audio acoustics.',
    problem:
      'Interactive media-dense portfolios and architectural platforms typically suffer from severe layout shifts (CLS > 0.4), sluggish 15 FPS scrolling, and recurring garbage collection pauses caused by continuous DOM image decoding.',
    solution:
      'Engineered an offscreen ImageBitmap pre-decoding pipeline in React 19 and Canvas2D. All 150 frames are sequentially decoded during browser idle time, allowing lock-free 60 FPS scrubbing with zero memory leaks, paired with a 72-stage interactive perspective walkthrough.',
    architecture: [
      '150-frame cinematic canvas scroll engine with zero-latency frame scrubbing',
      '72-stage 3D architectural walkthrough perspective simulator',
      'Interactive horizon day & night lighting transition and ambient ocean audio',
      'Offscreen ImageBitmap ring cache preventing DOM garbage collection thrashing',
    ],
    metrics: [
      'Performance: Zero-latency scroll scrubbing with pre-buffered canvas frames',
      'Visual Fidelity: 150 cinematic 4K frames with seamless viewport interpolation',
      '3D Exploration: 72 distinct architectural perspective stages per villa model',
    ],
    features: [
      'Cinematic 150-frame scroll-driven flythrough scroller',
      '72-stage interactive 3D villa walkthrough simulator',
      'Day & Night horizon lighting toggle with dynamic shadow shifts',
      'Hardware-accelerated desynchronized canvas context',
    ],
    tech: ['React 19', 'Vite 8', 'JavaScript / JSX', 'Tailwind CSS', 'Web Audio API'],
    learnings:
      'Maintaining 60 FPS while scrubbing high-resolution canvas frames on mobile devices required pre-decoding images into offscreen ImageBitmap buffers to eliminate main-thread GC pauses.',
    future: [
      'Add WebXR interactive VR villa walkthroughs',
      'Implement real-time solar path and dynamic shadow calculations',
    ],
    github: 'https://github.com/SriniwasAwasthi/solaria-luxury-estates',
    demo: 'https://github.com/SriniwasAwasthi/solaria-luxury-estates',
    coverColor: 'bg-[#00FF87]',
    previewImage: '/projects/solaria-estates.png',
    videoUrl: '/videos/solaria-estates.mp4',
    videoDuration: '02:00',
    adr: {
      context:
        'Ultra-luxury architectural estates require an immersive sensory presentation to communicate spatial volume and coastal light, but loading dozens of 4K drone photographs causes severe layout shift, slow FCP, and memory crashes.',
      languageAndStack:
        'React 19 + Vite 8 for instant build optimizations and fast client-side reactivity, Tailwind CSS for zero-runtime utility styling, and HTML5 Canvas2D with desynchronized GPU rendering for 60 FPS drone scrubbing.',
      previousImplementation:
        'Traditional real estate gallery loaded 40+ full-page high-resolution JPEG files as static image elements in the DOM. On high-speed scrolling, the browser suffered severe cumulative layout shifts (CLS > 0.4), sluggish 15 FPS scrolling, and multi-second network image pop-in.',
      improvedSolution:
        'Built a zero-latency 150-frame hardware-accelerated canvas scrubbing engine. All 150 cinematic frames are sequentially pre-decoded into memory as offscreen ImageBitmap objects during idle time. As the user scrolls, the canvas draws pre-decoded bitmaps with 0ms network latency and 60 FPS fluidity. Paired with a 72-stage interactive 3D villa walkthrough stage simulator.',
      tradeoffs:
        'Requires an upfront asynchronous memory pre-load of compressed frame assets, but completely eliminates runtime layout shift and achieves buttery-smooth 60 FPS flythrough scrubbing.',
    },
    warStory: {
      title: 'Main-Thread Garbage Collection Thrashing During 4K Drone Scrubbing',
      symptom:
        'While rapidly scrubbing the 150-frame aerial flythrough on iPad and Android tablets, the scroll frame rate dropped from 60 FPS down to 18 FPS every 3–4 seconds with noticeable stutter.',
      investigation:
        'Profiled using Chrome DevTools Performance Timeline and Memory Allocation tracks. Observed rhythmic 45ms–60ms Garbage Collection (GC) pauses stalling the main JavaScript thread.',
      rootCause:
        'The canvas draw handler was executing new Image() and image.decode() on every scroll event, instantiating hundreds of multi-megabyte image DOM nodes per second, forcing the V8 engine into continuous heavy garbage collection cycles.',
      permanentFix:
        'Pre-decoded all 150 frames into a persistent ImageBitmap[] ring array at load time. The scroll listener now only calls ctx.drawImage(preloadedBitmaps[frameIndex], 0, 0), resulting in zero object allocations and zero GC pauses during high-speed scrubbing.',
    },
    telemetry: {
      coldBoot: '310ms (Initial DOM paint)',
      warmStart: '<1ms (Frame scrub draw latency from memory)',
      p50Latency: '0ms (Zero network round-trip during canvas scrub)',
      p95Latency: '16ms (Rock-solid 60 FPS redraw sync)',
      p99Latency: '24ms (Instant stage switch across 72 perspectives)',
      memoryFootprint: '55 MB stable memory (Zero runtime allocations)',
      throughputOrFps: '60 FPS locked during continuous 150-frame flythrough',
      notes: 'Hardware-accelerated desynchronized canvas context eliminates vsync tearing.',
    },
    testingHygiene: {
      testCoverage: 'Automated frame index boundary verification & asset preloader health checks',
      testTypes: [
        'Preloader Health: Verification that all 150 frame asset URLs return HTTP 200 before canvas mount',
        'Frame Clamping: Invariant test ensuring frameIndex is mathematically clamped between 1 and 150',
        'Device Pixel Ratio: High-DPI retina display scaling clamp to prevent GPU memory overflow',
        'Audio Node Teardown: Validation that Web Audio coastal soundscapes cleanly disconnect on route change',
      ],
      ciGates: 'Oxlint + Vite production build pass + asset integrity hash validation.',
      defensiveInvariants: [
        'Offscreen ImageBitmap fallback: Graceful fallback to static hero image if WebGL/Canvas2D is unsupported',
        'Memory clamp: Restricts maximum canvas buffer resolution to prevent mobile GPU OOM exceptions',
      ],
    },
  },
];

/** Fallback export for backwards compatibility */
export const projectsData: Project[] = flagshipProjects;
