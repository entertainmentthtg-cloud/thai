import React from 'react';
import { Product } from '../types';

interface HardwareSchematicProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export const HardwareSchematic: React.FC<HardwareSchematicProps> = ({ product, size = 'md' }) => {
  const isHighPower = product.powerVA >= 10000;
  const isModular = product.topology === 'Modular';

  const containerHeights = {
    sm: 'h-36',
    md: 'h-48',
    lg: 'h-72'
  };

  const brandColors: Record<string, { bg: string; accent: string; text: string }> = {
    'Up Selec': { bg: '#0b1320', accent: '#dc2626', text: '#ef4444' },
    APC: { bg: '#0b192c', accent: '#00D084', text: '#38bdf8' },
    Eaton: { bg: '#0e1726', accent: '#3b82f6', text: '#60a5fa' },
    Vertiv: { bg: '#111827', accent: '#f59e0b', text: '#fbbf24' },
    Santak: { bg: '#0f172a', accent: '#06b6d4', text: '#38bdf8' },
    Delta: { bg: '#091522', accent: '#10b981', text: '#34d399' },
    CyberPower: { bg: '#18181b', accent: '#f97316', text: '#fb923c' }
  };

  const brandStyle = brandColors[product.brand] || brandColors.APC;

  return (
    <div className={`relative w-full ${containerHeights[size]} rounded-md overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-4 select-none group`}>
      {/* Subtle blueprint grid background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Industrial Chassis Drawing */}
      {isHighPower || isModular ? (
        // Large Floor Cabinet / Modular UPS (Tower / Industrial)
        <div className="relative w-36 h-full max-h-56 bg-slate-800 rounded border border-slate-700 p-2 flex flex-col justify-between shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
          {/* Top Header Panel */}
          <div className="border-b border-slate-700 pb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-200 tracking-wider uppercase font-mono">{product.brand}</span>
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-[9px] font-mono text-emerald-400">{product.powerVA >= 1000 ? `${product.powerVA / 1000}kVA` : `${product.powerVA}VA`}</span>
            </div>
          </div>

          {/* LCD Graphic Panel */}
          <div className="bg-slate-950 rounded border border-slate-700/80 p-1.5 my-1 font-mono">
            <div className="flex justify-between items-center text-[9px] text-slate-300 border-b border-slate-800 pb-0.5">
              <span>OUTPUT 380V</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>
            <div className="flex justify-between text-[8px] text-slate-400 pt-0.5">
              <span>LOAD: 68%</span>
              <span>PF: {product.powerFactor}</span>
            </div>
          </div>

          {/* Power Modules / Air Intake Slots */}
          <div className="flex-1 flex flex-col justify-around py-1 space-y-1">
            {[1, 2, 3].map((slot) => (
              <div key={slot} className="bg-slate-900/90 border border-slate-700/60 rounded px-1.5 py-0.5 flex items-center justify-between">
                <span className="text-[7px] text-slate-400 font-mono">MOD 0{slot}</span>
                <div className="flex gap-0.5">
                  <div className="w-4 h-1 bg-slate-700 rounded-sm"></div>
                  <div className="w-1 h-1 bg-emerald-500 rounded-sm"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Ventilation Grille */}
          <div className="pt-1 border-t border-slate-700/60 flex flex-col gap-0.5">
            <div className="h-0.5 bg-slate-700 w-full rounded"></div>
            <div className="h-0.5 bg-slate-700 w-full rounded"></div>
            <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-0.5">
              <span>{product.phase}</span>
              <span>3-PHASE</span>
            </div>
          </div>
        </div>
      ) : (
        // Standard Rackmount 2U / Tower Chassis (APC SRT, Santak C3K, Eaton 9SX)
        <div className="relative w-full max-w-[280px] bg-slate-800 rounded border border-slate-700 p-3 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
          {/* Rack mount ears */}
          <div className="absolute -left-1 top-2 bottom-2 w-1.5 bg-slate-600 rounded-l flex flex-col justify-between py-1">
            <div className="w-1 h-1 bg-slate-400 rounded-full mx-auto"></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full mx-auto"></div>
          </div>
          <div className="absolute -right-1 top-2 bottom-2 w-1.5 bg-slate-600 rounded-r flex flex-col justify-between py-1">
            <div className="w-1 h-1 bg-slate-400 rounded-full mx-auto"></div>
            <div className="w-1 h-1 bg-slate-400 rounded-full mx-auto"></div>
          </div>

          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono tracking-tight text-white">{product.brand}</span>
              <span className="text-[10px] text-slate-400 font-mono">[{product.model}]</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-400">{product.topology.split(' ')[0]}</span>
            </div>
          </div>

          {/* Front Bezel Layout */}
          <div className="grid grid-cols-12 gap-2 items-center">
            {/* LCD Screen Display */}
            <div className="col-span-7 bg-slate-950 border border-slate-700 rounded p-1.5 font-mono text-[9px]">
              <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-0.5">
                <span className="text-slate-400">OUT:</span>
                <span className="text-sky-400 font-semibold">{product.voltageOut.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between pt-0.5 text-[8px]">
                <span className="text-slate-400">CAP:</span>
                <span className="text-emerald-400 font-semibold">{product.powerVA}VA/{product.powerWatts}W</span>
              </div>
              <div className="flex justify-between pt-0.5 text-[7px] text-slate-400">
                <span>TRANSFER: {product.transferTimeMs}ms</span>
                <span>PF: {product.powerFactor}</span>
              </div>
            </div>

            {/* Vent Grille & Controls */}
            <div className="col-span-5 flex flex-col justify-between h-full space-y-1">
              <div className="flex items-center gap-1 justify-end">
                <div className="w-2 h-2 rounded-full border border-slate-600 bg-slate-700 flex items-center justify-center">
                  <div className="w-1 h-1 bg-sky-400 rounded-full"></div>
                </div>
                <span className="text-[7px] text-slate-400 font-mono">PWR</span>
              </div>
              <div className="flex flex-col gap-0.5 py-1">
                <div className="h-0.5 bg-slate-600 w-full rounded"></div>
                <div className="h-0.5 bg-slate-600 w-full rounded"></div>
                <div className="h-0.5 bg-slate-600 w-full rounded"></div>
                <div className="h-0.5 bg-slate-600 w-full rounded"></div>
              </div>
              <span className="text-[7px] font-mono text-slate-400 text-right block">{product.waveform === 'Pure Sine Wave' ? 'PURE SINE' : 'STEPPED'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Category Badge */}
      <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
        {product.powerVA >= 1000 ? `${(product.powerVA / 1000).toFixed(1)} kVA` : `${product.powerVA} VA`} · {product.topology}
      </div>

      {product.expandableBattery && (
        <div className="absolute top-2 right-2 text-[9px] text-sky-400 font-mono bg-sky-950/70 border border-sky-800/80 px-1.5 py-0.5 rounded">
          +EBM Pin Ngoài
        </div>
      )}
    </div>
  );
};
