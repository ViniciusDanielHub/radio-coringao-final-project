"use client";

import { motion } from "framer-motion";

interface StandingsTableProps {
  modality?: "FOOTBALL" | "FUTSAL" | "BASKETBALL";
  standings: {
    pos: number;
    time: string;
    pts?: number;
    j?: number;
    pj?: number;
    v?: number;
    vit?: number;
    e?: number;
    der?: number;
    d?: number;
    gm?: number;
    gc?: number;
    ppro?: number;
    pcon?: number;
    sld?: number;
    sg?: number;
  }[];
}

function TeamLogo({ name }: { name?: string }) {
  const initials = (name || "?").slice(0, 2).toUpperCase();
  return (
    <div className="h-7 w-7 shrink-0 rounded-full bg-primary flex items-center justify-center">
      <span className="text-[10px] font-bold text-on-primary">{initials}</span>
    </div>
  );
}

export function StandingsTable({ standings, modality = "FOOTBALL" }: StandingsTableProps) {
  const isBasketball = modality === "BASKETBALL";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-[#222]">
              <th className="w-10 px-3 py-3 font-label-sm text-[11px] font-bold uppercase text-on-primary">#</th>
              <th className="px-3 py-3 font-label-sm text-[11px] font-bold uppercase text-on-primary">Clube</th>
              {isBasketball ? (
                <>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">J</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">V</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">D</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">PPRO</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">PCON</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">SLD</th>
                </>
              ) : (
                <>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">Pts</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">PJ</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">VIT</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">E</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">DER</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">GM</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">GC</th>
                  <th className="px-3 py-3 text-center font-label-sm text-[11px] font-bold uppercase text-on-primary">SG</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => {
              const posColor =
                row.pos <= 4 ? "#1565C0" :
                row.pos === 5 ? "#E65100" :
                row.pos <= 11 ? "#6A1B9A" :
                row.pos >= 18 ? "#b71c1c" :
                "transparent";
              return (
                <tr
                  key={`${row.time}-${row.pos}-${index}`}
                  className={`relative border-b border-outline-variant/50 transition-colors hover:bg-surface-container-low ${
                    row.time === "Corinthians"
                      ? "bg-gradient-to-r from-primary/5 to-transparent font-bold"
                      : index % 2 === 0
                      ? "bg-surface"
                      : "bg-surface-container-lowest"
                  }`}
                >
                  <td className="relative px-3 py-3 text-center text-[13px] text-on-surface-variant">
                    <div
                      className="absolute left-0 top-0 h-full w-1"
                      style={{ backgroundColor: posColor }}
                    />
                    {row.pos}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <TeamLogo name={row.time} />
                      <span className={`text-[13px] ${row.time === "Corinthians" ? "font-bold text-primary" : "text-on-surface"}`}>
                        {row.time}
                      </span>
                    </div>
                  </td>
                  {isBasketball ? (
                    <>
                      <td className="px-3 py-3 text-center text-[13px] text-on-surface-variant">{row.j}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-blue-100 px-2 text-[12px] font-bold text-blue-700">
                          {row.v}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-100 px-2 text-[12px] font-bold text-red-700">
                          {row.d}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center text-[13px] text-on-surface-variant">{row.ppro}</td>
                      <td className="px-3 py-3 text-center text-[13px] text-on-surface-variant">{row.pcon}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-[12px] font-bold ${
                          (row.sld || 0) > 0 ? "bg-blue-100 text-blue-700" : (row.sld || 0) < 0 ? "bg-red-100 text-red-700" : "bg-surface-container text-on-surface-variant"
                        }`}>
                          {(row.sld || 0) > 0 ? `+${row.sld}` : row.sld}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-3 text-center text-[13px] font-bold text-on-surface">{row.pts}</td>
                      <td className="px-3 py-3 text-center text-[13px] text-on-surface-variant">{row.pj}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-blue-100 px-2 text-[12px] font-bold text-blue-700">
                          {row.vit}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gray-100 px-2 text-[12px] font-bold text-gray-600">
                          {row.e}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-100 px-2 text-[12px] font-bold text-red-700">
                          {row.der}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center text-[13px] text-on-surface-variant">{row.gm}</td>
                      <td className="px-3 py-3 text-center text-[13px] text-on-surface-variant">{row.gc}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-[12px] font-bold ${
                          (row.sg || 0) > 0 ? "bg-blue-100 text-blue-700" : (row.sg || 0) < 0 ? "bg-red-100 text-red-700" : "bg-surface-container text-on-surface-variant"
                        }`}>
                          {(row.sg || 0) > 0 ? `+${row.sg}` : row.sg}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
