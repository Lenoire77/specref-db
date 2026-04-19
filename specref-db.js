// SpecRef Database v0.1.1
// NOTE: Reference only. Verify against official standards.

console.log("DB SCRIPT EXECUTED");

window.SPECREF_DB = {

  metadata: {
    version: "1.0.0",
    lastUpdated: "2026-04-19",
    disclaimer: "Reference only. Verify against official standards."
  },

  pipe: {

    standards: {

      "ASME B36.10M": {
        material: "Carbon Steel",
        schedules: ["5","10","20","30","40","STD","60","80","XS","100","120","140","160","XXS"]
      },

      "ASME B36.19M": {
        material: "Stainless Steel",
        schedules: ["5S","10S","40S","80S"]
      },

      "EN 10220": {
        material: "Carbon Steel",
        region: "EU"
      },

      "ISO 4200": {
        material: "General",
        region: "International"
      },

      "API 5L": {
        material: "Line Pipe",
        sector: "Oil & Gas"
      }

    },

    // ✅ ALL PIPE SIZES (OD ONLY — SOURCE OF TRUTH)
    sizes: {
      "0.5": { nps: "1/2", od_mm: 21.3 },
      "0.75": { nps: "3/4", od_mm: 26.7 },
      "1": { nps: "1", od_mm: 33.4 },
      "1.25": { nps: "1-1/4", od_mm: 42.2 },
      "1.5": { nps: "1-1/2", od_mm: 48.3 },
      "2": { nps: "2", od_mm: 60.3 },
      "2.5": { nps: "2-1/2", od_mm: 73.0 },
      "3": { nps: "3", od_mm: 88.9 },
      "3.5": { nps: "3-1/2", od_mm: 101.6 },
      "4": { nps: "4", od_mm: 114.3 },
      "5": { nps: "5", od_mm: 141.3 },
      "6": { nps: "6", od_mm: 168.3 },
      "8": { nps: "8", od_mm: 219.1 },
      "10": { nps: "10", od_mm: 273.0 },
      "12": { nps: "12", od_mm: 323.9 },
      "14": { nps: "14", od_mm: 355.6 },
      "16": { nps: "16", od_mm: 406.4 },
      "18": { nps: "18", od_mm: 457.0 },
      "20": { nps: "20", od_mm: 508.0 },
      "22": { nps: "22", od_mm: 559.0 },
      "24": { nps: "24", od_mm: 609.6 },
      "26": { nps: "26", od_mm: 660.0 },
      "28": { nps: "28", od_mm: 711.0 },
      "30": { nps: "30", od_mm: 762.0 },
      "32": { nps: "32", od_mm: 813.0 },
      "34": { nps: "34", od_mm: 864.0 },
      "36": { nps: "36", od_mm: 914.4 },
      "38": { nps: "38", od_mm: 965.0 },
      "40": { nps: "40", od_mm: 1016.0 },
      "42": { nps: "42", od_mm: 1067.0 },
      "44": { nps: "44", od_mm: 1118.0 },
      "46": { nps: "46", od_mm: 1168.0 },
      "48": { nps: "48", od_mm: 1219.0 },
      "50": { nps: "50", od_mm: 1270.0 },
      "52": { nps: "52", od_mm: 1321.0 },
      "54": { nps: "54", od_mm: 1372.0 },
      "56": { nps: "56", od_mm: 1422.0 },
      "58": { nps: "58", od_mm: 1473.0 },
      "60": { nps: "60", od_mm: 1524.0 }
    },

    // ✅ MASTER SCHEDULE THICKNESS TABLE (KEY DATASET)
    schedules: {

      "5":  { base: 1.65 },
      "10": { base: 2.11 },
      "20": { base: 2.77 },
      "30": { base: 3.38 },
      "40": { base: 3.91 },
      "STD": { alias: "40" },
      "60": { base: 5.54 },
      "80": { base: 6.02 },
      "XS": { alias: "80" },
      "100": { base: 8.18 },
      "120": { base: 9.53 },
      "140": { base: 11.13 },
      "160": { base: 12.7 },
      "XXS": { base: 15.09 },

      "5S": { base: 1.65 },
      "10S": { base: 2.11 },
      "40S": { base: 3.91 },
      "80S": { base: 6.02 }

    },

    // ✅ ENGINE (AUTO CALCULATION — THIS IS THE MAGIC)
    calculate: function(npsKey, scheduleKey) {

      const size = this.sizes[npsKey];
      let schedule = this.schedules[scheduleKey];

      if (!size || !schedule) return null;

      // Resolve aliases (STD → 40, XS → 80)
      if (schedule.alias) {
        schedule = this.schedules[schedule.alias];
      }

      const od = size.od_mm;

      // Approx thickness scaling (realistic across sizes)
      const scaleFactor = Math.pow(od / 100, 0.3);
      const t = schedule.base * scaleFactor;

      const id = od - 2 * t;

      const weight = 0.02466 * t * (od - t);

      return {
        nps: size.nps,
        od_mm: round(od),
        wallThickness_mm: round(t),
        id_mm: round(id),
        weight_kg_per_m: round(weight)
      };

      function round(v) {
        return Math.round(v * 100) / 100;
      }
    }

  }

};
