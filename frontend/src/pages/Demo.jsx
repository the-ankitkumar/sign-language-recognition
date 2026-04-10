import { useGesture } from '../hooks/useGesture'
import CameraFeed from '../components/CameraFeed'
import GestureDisplay from '../components/GestureDisplay'
import TextDisplay from '../components/TextDisplay'
import ProgressBar from '../components/ProgressBar'

/**
 * Demo page — the core real-time gesture recognition interface.
 * Composes all components and connects them to the useGesture hook.
 */
export default function Demo() {
  const {
    videoRef,
    text,
    currentGesture,
    progress,
    isConnected,
    isStreaming,
    startCamera,
    stopCamera,
    clearText,
  } = useGesture()

  return (
    <main className="pt-16 min-h-screen bg-ink grid-bg">
      <div className="w-full px-8 lg:px-12 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-text">
              Live <span className="text-accent">Demo</span>
            </h1>
            <p className="text-text-dim text-sm mt-1">
              Point your camera at your hand and hold a gesture for 2 seconds
            </p>
          </div>

          {/* Connection status pill */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-300 ${isConnected
            ? 'border-signal-border bg-signal-bg text-signal-dim'
            : 'border-border bg-surface text-muted'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-signal animate-pulse' : 'bg-muted'
              }`} />
            {isConnected ? 'BACKEND CONNECTED' : 'NOT CONNECTED'}
          </div>
        </div>

        {/* Main grid: 3/4 left + 1/4 right layout (narrower right panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* ── LEFT: Camera + Controls ── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Camera and text side by side */}
            <div className="flex flex-col md:flex-row gap-4">

              {/* Camera + Controls */}
              <div className="flex-1 flex flex-col gap-3">
                <CameraFeed
                  ref={videoRef}
                  isConnected={isConnected}
                  isStreaming={isStreaming}
                  onStart={startCamera}
                />
                <div className="flex items-center gap-2">
                  {!isStreaming ? (
                    <button
                      onClick={startCamera}
                      className="flex-1 py-2.5 bg-accent text-white rounded-xl font-display font-bold hover:bg-accent-dim transition-colors shadow-sm text-sm"
                    >
                      ▶ Start Camera
                    </button>
                  ) : (
                    <button
                      onClick={stopCamera}
                      className="flex-1 py-2.5 bg-panel border border-danger/40 text-danger rounded-xl font-display font-semibold hover:bg-danger-bg transition-colors text-sm"
                    >
                      ■ Stop Camera
                    </button>
                  )}
                  <button
                    onClick={clearText}
                    disabled={!text}
                    className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-200 ${text
                        ? 'border-border text-text-dim hover:border-accent/30 hover:text-accent bg-panel'
                        : 'border-border text-muted opacity-40 cursor-not-allowed bg-panel'
                      }`}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Text Output Column */}
              <div className="flex-1 flex flex-col min-h-[300px] gap-4">
                <TextDisplay text={text} onClear={clearText} />

                {/* Gesture display & Progress below Live Output */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                  <GestureDisplay current={currentGesture} progress={progress} />

                  {/* Progress bar card */}
                  <div className="bg-panel border border-border rounded-xl p-3 shadow-card flex flex-col justify-center w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest">
                        Hold Progress
                      </h3>
                      <span className="text-muted text-[10px] font-mono whitespace-nowrap ml-2">
                        {progress >= 1
                          ? '✓ Confirmed!'
                          : progress > 0
                            ? 'Holding...'
                            : 'Waiting'}
                      </span>
                    </div>
                    <ProgressBar progress={progress} active={!!currentGesture} />
                  </div>
                </div>

                {/* Session stats */}
                <div className="bg-panel border border-border rounded-2xl p-5 shadow-card space-y-3">
                  <h3 className="text-xs font-mono text-muted uppercase tracking-widest">
                    Session Stats
                  </h3>
                  <div className="space-y-3">
                    <StatRow label="Characters typed" value={text.replace(/\s/g, '').length} />
                    <StatRow
                      label="Words typed"
                      value={text.trim() ? text.trim().split(/\s+/).length : 0}
                    />
                    <StatRow
                      label="Camera status"
                      value={isStreaming ? 'Active' : 'Inactive'}
                      accent={isStreaming}
                    />
                    <StatRow
                      label="Backend"
                      value={isConnected ? 'ws://localhost:8000' : 'Offline'}
                      accent={isConnected}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Quick Reference + Stats ── */}
          <div className="space-y-4 lg:-mr-8">

            {/* Quick reference */}
            <div className="bg-panel border border-border rounded-2xl p-5 shadow-card">
              <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-3">
                Quick Reference
              </h3>
              <div className="mb-3 rounded-xl overflow-hidden border border-border bg-surface">
                <img
                  src="/quick-reference.jpeg"
                  alt="Sign language alphabet quick reference"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => (
                  <div key={l} className="h-9 rounded-lg border border-border bg-surface flex items-center justify-center font-display font-bold text-sm text-text-dim">
                    {l}
                  </div>
                ))}
                {['⎵', '⌫', '•', '↵'].map((s) => (
                  <div key={s} className="h-9 rounded-lg border border-signal-border bg-signal-bg flex items-center justify-center font-display font-bold text-xs text-signal-dim">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatRow({ label, value, accent = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-dim text-xs">{label}</span>
      <span className={`font-mono text-sm font-medium ${accent ? 'text-signal-dim' : 'text-text'}`}>
        {value}
      </span>
    </div>
  )
}
