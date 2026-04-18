// SpecRef Database v0.1.0
// NOTE: Reference only. Verify against official standards.

window.SPECREF_DB = {
  metadata: {
    version: "0.1.0",
    lastUpdated: "2026-04-18",
    disclaimer: "Reference only. Verify against official standards."
  },

  pipe: {
    "ASME B36.10M": {
      material: "Carbon Steel",
      explanation: {
        what: "Dimensional standard for carbon steel pipe",
        why: "Selected material is carbon steel",
        limits: "Does not define pressure ratings"
      },

      sizes: {
        "1": {
          schedules: {
            "40": {
              od_mm: 33.4,
              wallThickness_mm: 3.38,
              id_mm: 26.64,
              weight_kg_per_m: 2.5
            },
            "80": {
              od_mm: 33.4,
              wallThickness_mm: 4.55,
              id_mm: 24.3,
              weight_kg_per_m: 3.24
            }
          }
        },

        "2": {
          schedules: {
            "40": {
              od_mm: 60.3,
              wallThickness_mm: 3.91,
              id_mm: 52.48,
              weight_kg_per_m: 5.44
            },
            "80": {
              od_mm: 60.3,
              wallThickness_mm: 5.54,
              id_mm: 49.22,
              weight_kg_per_m: 7.48
            }
          }
        },

        "6": {
          schedules: {
            "40": {
              od_mm: 168.3,
              wallThickness_mm: 7.11,
              id_mm: 154.1,
              weight_kg_per_m: 28.26
            },
            "80": {
              od_mm: 168.3,
              wallThickness_mm: 10.97,
              id_mm: 146.36,
              weight_kg_per_m: 42.56
            }
          }
        }
      }
    }
  }
};
