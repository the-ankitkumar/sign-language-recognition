/**
 * GestureDisplay — shows the currently detected gesture letter and hold progress.
 * @param {string|null} current - detected gesture (e.g. "A", "Space", null)
 * @param {number} progress - hold confidence 0–1
 */
export default function GestureDisplay({ current, progress }) {
  const isSpecial = current && ['Space', 'Backspace', 'NewLine', 'FullStop'].includes(current)

  const specialLabel = {
    Space:     '⎵ Space',
    Backspace: '⌫ Back',
    NewLine:   '↵ Line',
    FullStop:  '• Stop',
  }

  return (
    <div className="relative bg-panel rounded-xl border border-border p-3 shadow-card corner-tl corner-br flex items-center justify-between w-full">
      
      {/* Left side: Header and Status */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 shrink-0 ${
            current ? 'bg-signal animate-pulse' : 'bg-muted'
          }`} />
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest truncate">
            Detected
          </span>
        </div>
        
        {/* Status text */}
        <div className="truncate pr-2">
          {current ? (
            <p className="text-text-dim text-[10px] truncate">
              Holding —{' '}
              <span className="text-accent font-medium font-mono">
                {Math.round(progress * 100)}%
              </span>
            </p>
          ) : (
            <p className="text-muted text-[10px] italic truncate">No gesture...</p>
          )}
        </div>
      </div>

      {/* Right side: Letter box */}
      <div className={`relative w-12 h-12 shrink-0 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${
        current
          ? 'border-accent/40 bg-accent-light shadow-accent'
          : 'border-border bg-surface'
      } ${progress > 0.5 ? 'active-detect' : ''}`}>
        {current ? (
          <span
            key={current}
            className={`font-display font-bold transition-all duration-150 gesture-char ${
              isSpecial
                ? 'text-[10px] text-signal-dim'
                : 'text-2xl text-accent accent-glow-text'
            }`}
          >
            {isSpecial ? specialLabel[current] : current}
          </span>
        ) : (
          <span className="text-xl text-muted select-none">—</span>
        )}
      </div>
    </div>
  )
}
