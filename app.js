/* =============================================
   ForestIQ Admin Dashboard - Application Logic
   Map, Charts, Interactivity
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initSidebar();
  initQuickActions();
  initMapToggles();
  initMap();
  initHealthChart();
  initWildlifeChart();
  initAiInsightsSystem();
  initIncidentsSystem();
});

/* ---- Real-time Clock ---- */
function initClock() {
  const dateEl = document.getElementById('headerDate');
  const timeEl = document.getElementById('headerTime');

  function update() {
    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    dateEl.textContent = `${months[now.getMonth()]} ${String(now.getDate()).padStart(2,'0')}, ${now.getFullYear()}`;
    timeEl.textContent = now.toTimeString().slice(0, 8);
  }
  update();
  setInterval(update, 1000);
}


/* ---- Sidebar Navigation ---- */
function initSidebar() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = item.getAttribute('data-page');
      if (pageId) {
        navigateToPage(pageId);
      }
    });
  });
}

/* ---- Map Layer Toggles ---- */
function initMapToggles() {
  const toggles = document.querySelectorAll('.toggle-pill');
  if (!toggles || !toggles.length) return;
  toggles.forEach(t => {
    const checkbox = t.querySelector('input[type="checkbox"]');
    if (checkbox) {
      if (checkbox.checked) t.classList.add('active');
      t.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        t.classList.toggle('active', checkbox.checked);
      });
    }
  });
}

/* ---- Leaflet Map ---- */
function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return; // Embedded in iframe or not present
}

function locateOnGIS(target) {
  const mapFrame = document.querySelector('.map-container iframe') || document.getElementById('nallamalaMapFrame');
  if (mapFrame && mapFrame.contentWindow && mapFrame.contentWindow.locateOnGIS) {
    mapFrame.contentWindow.locateOnGIS({
      coords: target.coords || [16.08, 78.88],
      zoom: 12,
      id: target.zoneId || target.id || 'NLM-04',
      title: target.title || target.text || 'Active Incident',
      zone: target.zone || target.sector || '',
      desc: target.desc || target.detail || '',
      status: target.status || 'Active'
    });
  }
  const mapPanel = document.getElementById('mapPanel') || document.querySelector('.map-panel');
  if (mapPanel) {
    mapPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
window.locateOnGIS = locateOnGIS;


/* ---- Forest Health Donut Chart ---- */
function initHealthChart() {
  const ctx = document.getElementById('healthChart').getContext('2d');

  // External HTML tooltip so it renders above the center label overlay
  function externalTooltipHandler(context) {
    const { chart, tooltip } = context;
    let tooltipEl = document.getElementById('healthChartTooltip');

    // Create tooltip element on first hover
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'healthChartTooltip';
      tooltipEl.style.cssText = `
        position: absolute;
        z-index: 200;
        background: #0f2a1d;
        border: 1px solid #1c4d35;
        border-radius: 8px;
        padding: 8px 12px;
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
        font-family: 'Inter', sans-serif;
        box-shadow: 0 4px 16px rgba(0,0,0,0.5), 0 0 10px rgba(0, 230, 118, 0.2);
        white-space: nowrap;
      `;
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    // Hide if no tooltip should be shown
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    // Build content
    if (tooltip.body) {
      const dataPoint = tooltip.dataPoints[0];
      const color = dataPoint.dataset.backgroundColor[dataPoint.dataIndex];
      tooltipEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="width:10px;height:10px;border-radius:3px;background:${color};flex-shrink:0;"></span>
          <span style="color:#e4ebf5;font-size:12px;font-weight:600;">${dataPoint.label}</span>
          <span style="color:#8899aa;font-size:11px;">${dataPoint.parsed}%</span>
        </div>
      `;
    }

    // Position relative to canvas
    const canvasRect = chart.canvas.getBoundingClientRect();
    const parentRect = chart.canvas.parentNode.getBoundingClientRect();
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = (tooltip.caretX - (tooltipEl.offsetWidth / 2)) + 'px';
    tooltipEl.style.top = (tooltip.caretY - tooltipEl.offsetHeight - 10) + 'px';
  }

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Vegetation', 'Water', 'Wildlife', 'Fire Risk', 'Intrusion', 'Landslide'],
      datasets: [{
        data: [78, 82, 76, 22, 18, 12],
        backgroundColor: [
          '#00e676',
          '#42a5f5',
          '#ff9800',
          '#ff5252',
          '#ffc107',
          '#ab47bc'
        ],
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 4,
        spacing: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          external: externalTooltipHandler
        }
      },
      animation: {
        animateRotate: true,
        duration: 1200,
        easing: 'easeOutQuart'
      }
    }
  });
}

/* ---- Wildlife Movement Line Chart ---- */
let wildlifeChartInstance = null;

const wildlifeData = {
  7: {
    labels: ['Apr 21','Apr 22','Apr 23','Apr 24','Apr 25','Apr 26','Apr 27'],
    elephants: [22, 28, 25, 30, 32, 27, 35],
    tigers:    [8, 12, 10, 14, 11, 15, 13],
    deer:      [30, 25, 28, 22, 26, 24, 29],
    others:    [15, 18, 14, 20, 17, 22, 19]
  },
  30: {
    labels: [
      'Mar 29','Mar 30','Mar 31','Apr 1','Apr 2','Apr 3','Apr 4','Apr 5',
      'Apr 6','Apr 7','Apr 8','Apr 9','Apr 10','Apr 11','Apr 12','Apr 13',
      'Apr 14','Apr 15','Apr 16','Apr 17','Apr 18','Apr 19','Apr 20','Apr 21',
      'Apr 22','Apr 23','Apr 24','Apr 25','Apr 26','Apr 27'
    ],
    elephants: [18, 20, 24, 19, 22, 26, 28, 25, 30, 27, 23, 21, 26, 29, 32, 28,
                24, 27, 31, 33, 29, 26, 24, 22, 28, 25, 30, 32, 27, 35],
    tigers:    [6, 8, 7, 10, 9, 11, 8, 12, 10, 13, 9, 7, 11, 14, 12, 10,
                8, 13, 11, 15, 12, 9, 10, 8, 12, 10, 14, 11, 15, 13],
    deer:      [28, 32, 26, 30, 24, 22, 27, 31, 25, 29, 33, 28, 24, 20, 26, 30,
                34, 27, 23, 21, 28, 32, 26, 30, 25, 28, 22, 26, 24, 29],
    others:    [12, 14, 16, 13, 18, 15, 20, 17, 14, 19, 21, 16, 13, 18, 22, 15,
                20, 17, 14, 23, 19, 16, 21, 15, 18, 14, 20, 17, 22, 19]
  }
};

function buildWildlifeDatasets(period) {
  const d = wildlifeData[period];
  const baseStyle = { fill: true, tension: 0.4, borderWidth: 2 };

  // For 30 days, use smaller points so the chart isn't cluttered
  const pointRadius = period === 30 ? 1.5 : 3;
  const pointHoverRadius = period === 30 ? 4 : 5;

  return [
    {
      label: 'Elephants', data: d.elephants,
      borderColor: '#42a5f5', backgroundColor: 'rgba(66,165,245,0.08)',
      pointBackgroundColor: '#42a5f5', pointRadius, pointHoverRadius, ...baseStyle
    },
    {
      label: 'Tigers', data: d.tigers,
      borderColor: '#ff9800', backgroundColor: 'rgba(255,152,0,0.06)',
      pointBackgroundColor: '#ff9800', pointRadius, pointHoverRadius, ...baseStyle
    },
    {
      label: 'Deer', data: d.deer,
      borderColor: '#00e676', backgroundColor: 'rgba(0,230,118,0.06)',
      pointBackgroundColor: '#00e676', pointRadius, pointHoverRadius, ...baseStyle
    },
    {
      label: 'Others', data: d.others,
      borderColor: '#ab47bc', backgroundColor: 'rgba(171,71,188,0.06)',
      pointBackgroundColor: '#ab47bc', pointRadius, pointHoverRadius, ...baseStyle
    }
  ];
}

function createWildlifeChart(period) {
  const ctx = document.getElementById('wildlifeChart').getContext('2d');
  const d = wildlifeData[period];

  // Destroy existing chart before creating new one
  if (wildlifeChartInstance) {
    wildlifeChartInstance.destroy();
  }

  wildlifeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: buildWildlifeDatasets(period)
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f2a1d',
          titleColor: '#e8f7ee',
          bodyColor: '#8fbca2',
          borderColor: '#1c4d35',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 10,
          titleFont: { family: 'Inter', weight: 600, size: 12 },
          bodyFont: { family: 'Inter', size: 11 }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          ticks: {
            color: '#556677',
            font: { family: 'Inter', size: 10 },
            maxRotation: 0,
            // For 30 days, only show every 5th label to avoid clutter
            callback: function(value, index) {
              if (period === 30) return index % 5 === 0 ? this.getLabelForValue(value) : '';
              return this.getLabelForValue(value);
            }
          },
          border: { display: false }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          ticks: {
            color: '#556677',
            font: { family: 'Inter', size: 10 },
            stepSize: 10
          },
          border: { display: false }
        }
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      }
    }
  });
}

function initWildlifeChart() {
  // Create initial chart with 7-day data
  createWildlifeChart(7);

  // Wire up the dropdown to switch periods
  const periodSelect = document.getElementById('wildlifePeriod');
  periodSelect.addEventListener('change', (e) => {
    const period = parseInt(e.target.value, 10);
    createWildlifeChart(period);
  });
}

/* =============================================
   AI INSIGHTS & REAL-TIME RECOMMENDATIONS SYSTEM
   Full Modal Popups, Filters, Deep-Dives, Telemetry
   ============================================= */

const AI_INSIGHTS_DATABASE = [
  {
    id: "insight-fire-zone4",
    category: "fire",
    categoryLabel: "Fire Risk",
    icon: "local_fire_department",
    severity: "critical",
    severityLabel: "Critical Risk",
    title: "High fire risk & thermal anomaly detected in Zone 4",
    summary: "Weather conditions and dry vegetation increase wildfire propagation risk by 78%.",
    zone: "Zone 4",
    zoneId: "NLM-04",
    zoneDetail: "Zone 4 — Nallamala Core Ridge (Srisailam North)",
    time: "14:12 IST",
    coordinates: "16.074°N, 78.868°E",
    rawCoords: [16.074, 78.868],
    confidence: 96,
    threatScore: "88/100 (Severe)",
    sensorSource: "MODIS VIIRS Thermal Anomaly + IoT Ground Node #4B",
    diagnosticAnalysis: "Multi-spectral infrared satellite passes triangulated intense heat signatures across a 3.4-hectare slope quadrant. Ground sensor station #4B reported rapid relative humidity drops down to 14% paired with sustained 34 km/h south-southwesterly wind gusts. Dry biomass accumulation provides high fuel continuity along the rocky ridge.",
    telemetry: [
      { label: "Ambient Temp", value: "41.2°C" },
      { label: "Rel. Humidity", value: "14%" },
      { label: "Wind Gusts", value: "34 km/h SSW" },
      { label: "Fuel Moisture", value: "6.8% (Crit)" }
    ],
    threatForecast: "High flame propagation probability: Unmitigated fire front is projected to breach Ridge Line 4 within 45 minutes, threatening 120 hectares of dense deciduous forest.",
    protocols: [
      "Immediate alert broadcasted to Camp Dornala Ranger Station.",
      "Deploy Rapid Response Unit 03 equipped with high-pressure foam suppression tender.",
      "Launch Autonomous Drone 02 for real-time infrared plume mapping and wind vector tracking.",
      "Establish a 400-meter cleared firebreak along northern evacuation trail B."
    ]
  },
  {
    id: "insight-wildlife-zone7",
    category: "wildlife",
    categoryLabel: "Wildlife Conflict",
    icon: "crisis_alert",
    severity: "high",
    severityLabel: "High Urgency",
    title: "Elephant herd movement detected near Zone 7 boundary",
    summary: "Increased activity in last 6 hours. Accelerated westward trajectory towards agricultural villages.",
    zone: "Zone 7",
    zoneId: "NLM-07",
    zoneDetail: "Zone 7 — Dornala Agro-Forest Corridor",
    time: "12:46 IST",
    coordinates: "15.820°N, 78.820°E",
    rawCoords: [15.820, 78.820],
    confidence: 94,
    threatScore: "74/100 (Elevated)",
    sensorSource: "Acoustic Bio-Sensors + Camera Trap #CT-714 + Seismic Geophone",
    diagnosticAnalysis: "Seismic ground sensors and AI camera traps detected a herd of 7 adult Asian Elephants and 1 young calf moving at 3.8 km/h. Seasonal drying of water reservoir #9 is driving migration westward across boundary buffer farmland.",
    telemetry: [
      { label: "Herd Size", value: "7 Adults, 1 Calf" },
      { label: "Herd Velocity", value: "3.8 km/h" },
      { label: "Farmland Distance", value: "1.1 km" },
      { label: "Acoustic Rumbles", value: "High Frequency" }
    ],
    threatForecast: "Projected perimeter crossing at Sector 7A within 90 minutes. High probability of crop damage and human-wildlife encounters along rural highway 76.",
    protocols: [
      "Activate solar-powered acoustic deterrent sirens and strobe fences along Sector 7A perimeter.",
      "Deploy Quick Response Ranger Patrol 07 in patrol vehicle with non-lethal flash diversion.",
      "Send automated early-warning SMS broadcast to Dornala Village Sarpanch and farmers."
    ]
  },
  {
    id: "insight-water-zone12",
    category: "water",
    categoryLabel: "Hydrology Stress",
    icon: "water_drop",
    severity: "medium",
    severityLabel: "Moderate Risk",
    title: "Severe hydrological stress & drought condition in Zone 12",
    summary: "River level down by 32%. Perennial watering holes shrinking rapidly.",
    zone: "Zone 12",
    zoneId: "NLM-12",
    zoneDetail: "Zone 12 — Gundlakamma Southern River Basin",
    time: "11:20 IST",
    coordinates: "15.260°N, 78.650°E",
    rawCoords: [15.260, 78.650],
    confidence: 91,
    threatScore: "62/100 (Moderate)",
    sensorSource: "Hydrological River Gauge #HY-12 + Sentinel-2 SWIR",
    diagnosticAnalysis: "Satellite Normalized Difference Water Index (NDWI) indicates a 65% reduction in surface water area across perennial forest pools. High animal concentration around the single remaining mud hole increases predator territorial clash probability.",
    telemetry: [
      { label: "River Discharge", value: "-32% YoY" },
      { label: "Surface Pool Area", value: "4.2 ha (-65%)" },
      { label: "Soil Moisture", value: "11.4%" },
      { label: "Rainless Days", value: "26 Days" }
    ],
    threatForecast: "Existing surface water pools expected to dry completely within 10-12 days without artificial replenishment, forcing fauna to disperse toward human settlements.",
    protocols: [
      "Activate solar-powered submersible pumps at Borewell Station 12-A.",
      "Fill artificial concrete wildlife saucers and earthen troughs.",
      "Schedule daily veterinary health patrol for signs of dehydration in spotted deer and wild boar."
    ]
  },
  {
    id: "insight-botany-zone9",
    category: "botany",
    categoryLabel: "Canopy Health",
    icon: "eco",
    severity: "low",
    severityLabel: "Advisory",
    title: "Canopy health declining & localized defoliation in Zone 9",
    summary: "NDVI dropped by 18% compared to last month. Suspected foliage pest infestation.",
    zone: "Zone 9",
    zoneId: "NLM-09",
    zoneDetail: "Zone 9 — Nandyal Western Buffer Slope",
    time: "09:15 IST",
    coordinates: "15.600°N, 78.580°E",
    rawCoords: [15.600, 78.580],
    confidence: 88,
    threatScore: "45/100 (Advisory)",
    sensorSource: "Landsat-9 Multispectral NDVI + Drone Aerial Orthomosaic",
    diagnosticAnalysis: "Spectral analysis demonstrates an acute drop in chlorophyll absorption across 68 hectares of mixed deciduous canopy (primarily Anogeissus and Terminalia species). High-resolution drone orthophotos reveal early defoliator caterpillar infestations.",
    telemetry: [
      { label: "NDVI Index", value: "0.44 (Prev: 0.62)" },
      { label: "Canopy Loss", value: "22% Defoliated" },
      { label: "Impact Area", value: "68 Hectares" },
      { label: "Pest Signature", value: "Caterpillar Blight" }
    ],
    threatForecast: "Without intervention, pest migration could spread northward into the adjacent 150-hectare commercial teak conservation block within 3 weeks.",
    protocols: [
      "Dispatch Botanical Health Inspection team to collect foliar and soil samples.",
      "Schedule targeted botanical bio-spray application using specialized drone spraying.",
      "Quarantine sector 9B access to prevent cross-contamination by timber haulers."
    ]
  },
  {
    id: "insight-intrusion-zone3",
    category: "intrusion",
    categoryLabel: "Illegal Intrusion",
    icon: "security",
    severity: "critical",
    severityLabel: "Critical Security",
    title: "Illegal chainsaw acoustic signature detected in Zone 3",
    summary: "Acoustic sensor matched 2-stroke combustion engine inside core Tiger Sanctuary.",
    zone: "Zone 3",
    zoneId: "NLM-03",
    zoneDetail: "Zone 3 — Atmakur Deep Core Tiger Sanctuary",
    time: "03:42 IST",
    coordinates: "16.320°N, 78.920°E",
    rawCoords: [16.320, 78.920],
    confidence: 98,
    threatScore: "95/100 (Critical)",
    sensorSource: "Tree-mounted Bio-Acoustic Array #AC-031 + Thermal Recon",
    diagnosticAnalysis: "Acoustic array triangulated characteristic 180 Hz 2-stroke combustion motor acoustic harmonics sustained over an 8-minute duration. Target location is an ecologically sensitive Red Sanders (Pterocarpus santalinus) habitat.",
    telemetry: [
      { label: "Acoustic Match", value: "98.4% Precision" },
      { label: "Audio Duration", value: "8.5 Minutes" },
      { label: "Target Species", value: "Red Sanders" },
      { label: "Thermal Contacts", value: "3 Suspects" }
    ],
    threatForecast: "Suspects likely preparing contraband timber for vehicular extraction along disused logging track 3C before 06:00 sunrise.",
    protocols: [
      "Mobilize Anti-Poaching Strike Force Unit 01 with tactical support.",
      "Deploy night-vision thermal surveillance drone to track extraction vehicle route.",
      "Lock down Forest Outpost Gate 03 and notify State Forest Vigilance Cell."
    ]
  },
  {
    id: "insight-wildlife-zone5",
    category: "wildlife",
    categoryLabel: "Wildlife Monitoring",
    icon: "pets",
    severity: "medium",
    severityLabel: "Monitoring",
    title: "Bengal Tiger mating pair established territory in Zone 5",
    summary: "Camera trap CT-502 confirmed male T-48 and female T-52 actively scent marking.",
    zone: "Zone 5",
    zoneId: "NLM-05",
    zoneDetail: "Zone 5 — Pecheruvu River Valley",
    time: "06:30 IST",
    coordinates: "15.900°N, 78.980°E",
    rawCoords: [15.900, 78.980],
    confidence: 97,
    threatScore: "35/100 (Favorable)",
    sensorSource: "AI Automated Camera Trap #CT-502 + Striped Pattern Recognition",
    diagnosticAnalysis: "Automated computer vision algorithm positively identified male Tiger T-48 and female T-52 through stripe biometric matching. Behavior patterns indicate territorial consolidation and potential seasonal breeding.",
    telemetry: [
      { label: "Tigers Verified", value: "T-48 (M) & T-52 (F)" },
      { label: "Health Index", value: "Optimal (5/5)" },
      { label: "Prey Availability", value: "Abundant (Spotted Deer)" },
      { label: "Range Area", value: "28 sq km" }
    ],
    threatForecast: "High probability of pair remaining within Pecheruvu valley for 3-4 weeks. Heightened territorial sensitivity against intruding carnivores.",
    protocols: [
      "Temporarily reroute eco-tourism vehicle safaris outside Quadrant 5B.",
      "Increase foot patrol sweeping for wire snares and jaw traps in buffer scrubland.",
      "Synchronize camera trap telemetry to 15-minute sync intervals."
    ]
  },
  {
    id: "insight-fire-zone10",
    category: "fire",
    categoryLabel: "Fire Risk",
    icon: "local_fire_department",
    severity: "high",
    severityLabel: "High Risk",
    title: "Dry biomass fuel accumulation & spark risk in Zone 10",
    summary: "Surface fuel load reached 8.2 tons/ha near railway line boundary.",
    zone: "Zone 10",
    zoneId: "NLM-10",
    zoneDetail: "Zone 10 — Giddalur Foothills & Railway Boundary",
    time: "08:05 IST",
    coordinates: "15.520°N, 79.000°E",
    rawCoords: [15.520, 79.000],
    confidence: 92,
    threatScore: "76/100 (High)",
    sensorSource: "LiDAR Biomass Density + Sentinel-3 SLSTR",
    diagnosticAnalysis: "LiDAR canopy penetration reveals dense dried Cymbopogon grass accumulation along a 4-kilometer stretch bordering the railway gradient. High friction wheel sparks from freight trains pose extreme ignition hazard.",
    telemetry: [
      { label: "Biomass Load", value: "8.2 Tons/ha" },
      { label: "Rel. Humidity", value: "19%" },
      { label: "Canopy Density", value: "34% (Open Scrub)" },
      { label: "Wind Velocity", value: "28 km/h East" }
    ],
    threatForecast: "High ignition probability during peak noon heat (12:00–15:30 IST) if trains deploy dynamic brake shoes on the downhill grade.",
    protocols: [
      "Conduct supervised controlled burn of dry grass buffer strip along railway line.",
      "Station mobile water sprinkler patrol unit at Giddalur railway siding.",
      "Issue speed cautionary order to South Central Railway control division."
    ]
  },
  {
    id: "insight-water-zone2",
    category: "water",
    categoryLabel: "Water Quality",
    icon: "water_drop",
    severity: "medium",
    severityLabel: "Moderate Alert",
    title: "Turbidity spike & sediment runoff entering Zone 2 reservoir",
    summary: "Reservoir inlet turbidity increased to 145 NTU following hill slope erosion.",
    zone: "Zone 2",
    zoneId: "NLM-02",
    zoneDetail: "Zone 2 — Sunnipenta Reservoir Catchment",
    time: "07:15 IST",
    coordinates: "16.500°N, 79.100°E",
    rawCoords: [16.500, 79.100],
    confidence: 89,
    threatScore: "58/100 (Moderate)",
    sensorSource: "Autonomous Water Quality Telemetry Buoy #WQ-02",
    diagnosticAnalysis: "Continuous in-situ optic sensors measured sharp increases in suspended sediment particles. Heavy localized cloudburst dislodged unpaved access road slopes along northern Sector 2.",
    telemetry: [
      { label: "Water Turbidity", value: "145 NTU (Normal: 15)" },
      { label: "Dissolved O₂", value: "5.8 mg/L" },
      { label: "pH Reading", value: "7.4" },
      { label: "Flow Velocity", value: "42 m³/s" }
    ],
    threatForecast: "Sediment plume is projected to reach the main Srisailam potable water intake filtration plant within 6 hours.",
    protocols: [
      "Deploy floating geotextile silt curtains across northern inflow channel.",
      "Inspect hillside check-dams and clear clogged spillways in Sector 2A.",
      "Notify Municipal Water Filtration Board for coagulant dosing adjustment."
    ]
  }
];

let currentOpenedInsight = null;
let openedFromAllModal = false;

function initAiInsightsSystem() {
  // 1. Wire up "View All →" button on the AI Insights card
  const viewAllBtn = document.getElementById('aiViewAllBtn') || document.querySelector('.ai-insights-card .view-all-link');
  if (viewAllBtn) {
    viewAllBtn.id = 'aiViewAllBtn';
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAllInsightsModal();
    });
  }

  // 2. Wire up all "View Details" buttons in the main dashboard card
  const cardBtns = document.querySelectorAll('.ai-insights-card .insight-btn');
  const defaultIds = [
    'insight-fire-zone4',
    'insight-wildlife-zone7',
    'insight-water-zone12',
    'insight-botany-zone9'
  ];
  cardBtns.forEach((btn, idx) => {
    const targetId = defaultIds[idx] || 'insight-fire-zone4';
    btn.setAttribute('data-insight-id', targetId);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openInsightDetail(targetId, false);
    });
  });

  // 3. Wire up Close buttons for both modals
  const closeAllBtn = document.getElementById('aiAllModalClose');
  if (closeAllBtn) {
    closeAllBtn.addEventListener('click', closeAllInsightsModal);
  }
  const closeDetailBtn = document.getElementById('aiDetailModalClose');
  if (closeDetailBtn) {
    closeDetailBtn.addEventListener('click', closeInsightDetail);
  }

  // 4. Backdrop clicks to close
  const allBackdrop = document.getElementById('aiAllInsightsBackdrop');
  if (allBackdrop) {
    allBackdrop.addEventListener('click', (e) => {
      if (e.target === allBackdrop) closeAllInsightsModal();
    });
  }
  const detailBackdrop = document.getElementById('aiDetailBackdrop');
  if (detailBackdrop) {
    detailBackdrop.addEventListener('click', (e) => {
      if (e.target === detailBackdrop) closeInsightDetail();
    });
  }

  // 5. Back button from detail modal to all insights modal
  const backBtn = document.getElementById('detailBackToAllBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      closeInsightDetail();
      openAllInsightsModal();
    });
  }

  // 6. Escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (detailBackdrop && detailBackdrop.classList.contains('active')) {
        closeInsightDetail();
      } else if (allBackdrop && allBackdrop.classList.contains('active')) {
        closeAllInsightsModal();
      }
    }
  });

  // 7. Filter tabs in All Insights Modal
  const filterTabs = document.querySelectorAll('.modal-filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter') || 'all';
      const searchVal = document.getElementById('modalSearchInput')?.value || '';
      renderAllInsightsList(cat, searchVal);
    });
  });

  // 8. Search input in All Insights Modal
  const searchInput = document.getElementById('modalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('.modal-filter-tab.active');
      const cat = activeTab ? activeTab.getAttribute('data-filter') : 'all';
      renderAllInsightsList(cat, e.target.value);
    });
  }

  // 9. Dispatch Action button in Detail Modal
  const dispatchBtn = document.getElementById('detailDispatchBtn');
  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', () => {
      if (!currentOpenedInsight) return;
      dispatchBtn.classList.add('dispatched');
      dispatchBtn.innerHTML = '<span class="material-icons-outlined">check_circle</span> Unit Dispatched';
      showToast(
        '🚨 Response Unit Dispatched',
        `Ranger Tactical Patrol Unit dispatched to ${currentOpenedInsight.zone}. High priority response initiated.`,
        'local_police'
      );
    });
  }

    // 10. Locate on Map button in Detail Modal
  const locateBtn = document.getElementById('detailLocateBtn');
  if (locateBtn) {
    locateBtn.addEventListener('click', () => {
      if (!currentOpenedInsight) return;
      const target = currentOpenedInsight;
      closeInsightDetail();
      closeAllInsightsModal();
      const mapPanel = document.getElementById('mapPanel');
      if (mapPanel) {
        mapPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Prepare payload for GIS interactive map
      const payload = {
        type: 'LOCATE_ZONE',
        zoneId: target.zoneId,
        zone: target.zone,
        coordinates: target.rawCoords,
        title: target.title,
        severity: target.severity,
        severityLabel: target.severityLabel,
        confidence: target.confidence,
        summary: target.summary,
        category: target.category
      };

      // Communicate with Leaflet map inside iframe (postMessage + direct window call)
      const mapFrame = document.getElementById('nallamalaMapFrame');
      if (mapFrame && mapFrame.contentWindow) {
        // Method 1: postMessage (standard cross-origin & same-origin)
        mapFrame.contentWindow.postMessage(payload, '*');
        // Method 2: Direct call if same-origin / srcdoc
        try {
          if (typeof mapFrame.contentWindow.locateAndHighlightZone === 'function') {
            mapFrame.contentWindow.locateAndHighlightZone(payload);
          }
        } catch (e) {
          // Handled via postMessage
        }
      }

      showToast(
        '📍 Target Located on Map',
        `Zooming in to ${target.zone} (${target.coordinates}) with live anomaly markup.`,
        'my_location'
      );
    });
  }

  // 11. Export Digest Button
  const exportBtn = document.getElementById('aiExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      showToast(
        '📥 Intelligence Digest Exported',
        'Summary report for 8 active AI detections downloaded as GeoJSON & PDF format.',
        'download_done'
      );
    });
  }
}

function openAllInsightsModal() {
  const allBackdrop = document.getElementById('aiAllInsightsBackdrop');
  if (!allBackdrop) return;
  const filterTabs = document.querySelectorAll('.modal-filter-tab');
  filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-filter') === 'all'));
  const searchInput = document.getElementById('modalSearchInput');
  if (searchInput) searchInput.value = '';
  renderAllInsightsList('all', '');
  allBackdrop.classList.add('active');
}

function closeAllInsightsModal() {
  const allBackdrop = document.getElementById('aiAllInsightsBackdrop');
  if (allBackdrop) allBackdrop.classList.remove('active');
}

function openInsightDetail(id, fromAll = false) {
  const item = AI_INSIGHTS_DATABASE.find(x => x.id === id) || AI_INSIGHTS_DATABASE[0];
  currentOpenedInsight = item;
  openedFromAllModal = fromAll;

  // If opening from All modal, hide All modal
  const allBackdrop = document.getElementById('aiAllInsightsBackdrop');
  if (fromAll && allBackdrop) {
    allBackdrop.classList.remove('active');
  }

  const detailBackdrop = document.getElementById('aiDetailBackdrop');
  if (!detailBackdrop) return;

  // Populate title, category, severity, confidence
  const titleEl = document.getElementById('detailTitle');
  if (titleEl) titleEl.textContent = item.title;

  const catIconEl = document.getElementById('detailCategoryIcon');
  if (catIconEl) catIconEl.textContent = item.icon;

  const sevEl = document.getElementById('detailSeverityPill');
  if (sevEl) {
    sevEl.className = `ai-pill ${item.severity}`;
    sevEl.textContent = item.severityLabel;
  }

  const confEl = document.getElementById('detailConfidencePill');
  if (confEl) confEl.textContent = `${item.confidence}% Neural Confidence`;

  // Back button visibility
  const backBtn = document.getElementById('detailBackToAllBtn');
  if (backBtn) {
    backBtn.style.display = fromAll ? 'flex' : 'none';
  }

  // Meta items
  const metaZone = document.getElementById('detailMetaZone');
  if (metaZone) metaZone.textContent = item.zoneDetail;

  const metaCoords = document.getElementById('detailMetaCoords');
  if (metaCoords) metaCoords.textContent = item.coordinates;

  const metaSensor = document.getElementById('detailMetaSensor');
  if (metaSensor) metaSensor.textContent = item.sensorSource;

  const metaThreat = document.getElementById('detailMetaThreat');
  if (metaThreat) {
    metaThreat.textContent = item.threatScore;
    metaThreat.className = `detail-meta-val ${item.severity === 'critical' ? 'critical' : item.severity === 'high' ? 'high' : 'cyan'}`;
  }

  // Diagnostic description
  const diagEl = document.getElementById('detailDiagnosticText');
  if (diagEl) diagEl.textContent = item.diagnosticAnalysis;

  // Telemetry grid
  const telemetryContainer = document.getElementById('detailTelemetryGrid');
  if (telemetryContainer) {
    telemetryContainer.innerHTML = item.telemetry.map(t => `
      <div class="telemetry-chip">
        <div class="telemetry-label">${t.label}</div>
        <div class="telemetry-value">${t.value}</div>
      </div>
    `).join('');
  }

  // Threat forecast
  const forecastEl = document.getElementById('detailForecastText');
  if (forecastEl) forecastEl.textContent = item.threatForecast;

  // Protocols
  const protocolContainer = document.getElementById('detailProtocolList');
  if (protocolContainer) {
    protocolContainer.innerHTML = item.protocols.map((p, idx) => `
      <div class="protocol-step">
        <div class="protocol-step-num">${idx + 1}</div>
        <div class="protocol-step-text">${p}</div>
      </div>
    `).join('');
  }

  // Reset dispatch button state
  const dispatchBtn = document.getElementById('detailDispatchBtn');
  if (dispatchBtn) {
    dispatchBtn.classList.remove('dispatched');
    dispatchBtn.innerHTML = '<span class="material-icons-outlined">local_police</span> Dispatch Response Unit';
  }

  detailBackdrop.classList.add('active');
}

function closeInsightDetail() {
  const detailBackdrop = document.getElementById('aiDetailBackdrop');
  if (detailBackdrop) detailBackdrop.classList.remove('active');
  currentOpenedInsight = null;
}

function renderAllInsightsList(filterCategory = 'all', searchQuery = '') {
  const container = document.getElementById('aiAllInsightsGrid');
  if (!container) return;

  const q = searchQuery.toLowerCase().trim();
  const filtered = AI_INSIGHTS_DATABASE.filter(item => {
    const matchesCat = (filterCategory === 'all') || (item.category === filterCategory);
    const matchesQuery = !q || 
      item.title.toLowerCase().includes(q) || 
      item.zone.toLowerCase().includes(q) || 
      item.summary.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const countEl = document.getElementById('aiAllCountPill');
  if (countEl) countEl.textContent = `${filtered.length} Active`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <span class="material-icons-outlined" style="font-size: 42px; color: rgba(0,230,118,0.4); margin-bottom: 8px;">search_off</span>
        <p style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px;">No AI Detections Found</p>
        <p style="font-size: 11.5px; margin: 0;">Try adjusting your search query or selecting a different category tab.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="ai-all-card cat-${item.category}">
      <div class="ai-all-card-icon">
        <span class="material-icons-outlined">${item.icon}</span>
      </div>
      <div class="ai-all-card-info">
        <div class="ai-all-card-top">
          <span class="ai-pill ${item.severity}">${item.severityLabel}</span>
          <span class="ai-tag-zone">
            <span class="material-icons-outlined" style="font-size: 13px;">place</span>
            ${item.zone}
          </span>
          <span class="ai-tag-time">Detected ${item.time}</span>
          <span class="ai-confidence-badge">${item.confidence}% Neural Confidence</span>
        </div>
        <div class="ai-all-card-title">${item.title}</div>
        <div class="ai-all-card-desc">${item.summary}</div>
        <div class="ai-all-card-footer">
          <div class="ai-sensor-tag">
            <span class="material-icons-outlined">sensors</span>
            ${item.sensorSource}
          </div>
          <button class="ai-view-deep-btn" onclick="openInsightDetail('${item.id}', true)">
            View Deep Analysis →
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function showToast(title, message, icon = 'check_circle', duration = 4000) {
  let container = document.getElementById('forestiqToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'forestiqToastContainer';
    container.className = 'forestiq-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'forestiq-toast';
  toast.innerHTML = `
    <span class="material-icons-outlined forestiq-toast-icon">${icon}</span>
    <div class="forestiq-toast-content">
      <div class="forestiq-toast-title">${title}</div>
      <div class="forestiq-toast-msg">${message}</div>
    </div>
    <button class="forestiq-toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// Global scope export for inline onclick handlers
window.openInsightDetail = openInsightDetail;
window.openAllInsightsModal = openAllInsightsModal;
window.closeAllInsightsModal = closeAllInsightsModal;
window.closeInsightDetail = closeInsightDetail;



/* ===================================================
   INCIDENT MANAGEMENT & RANGER TACTICAL RADIO COMMS
   =================================================== */

const INCIDENTS_DATABASE = [
  {
    id: "INC-0247",
    type: "Forest Fire",
    category: "fire",
    icon: "local_fire_department",
    title: "Forest Fire — Rapid Thermal Front Breach",
    summary: "Multi-spectral MODIS pass confirmed rapid thermal front expansion along Zone 4 northern ridge. Fuel moisture at critical 6.8% with 34 km/h gusts.",
    zone: "Zone 4",
    zoneId: "NLM-04",
    zoneDetail: "Zone 4 — Nallamala Core Ridge (Srisailam North)",
    rawCoords: [16.074, 78.868],
    coordinates: "16.074°N, 78.868°E",
    severity: "critical",
    severityLabel: "Critical",
    status: "active",
    statusLabel: "Active Response",
    time: "14:12 IST",
    elapsed: "18m ago",
    telemetry: [
      { label: "Ambient Temp", value: "41.2°C" },
      { label: "Rel. Humidity", value: "14%" },
      { label: "Wind Gusts", value: "34 km/h SSW" },
      { label: "Smoke Density", value: "88/100 (High)" }
    ],
    protocols: [
      "Establish primary cleared firebreak along northern evacuation trail B.",
      "Deploy Tactical QRF Unit 03 high-pressure foam suppression tender.",
      "Launch FLIR Thermal Recon Drone D-02 for plume perimeter mapping.",
      "Issue stage-2 caution alert to Srisailam Temple municipal access road."
    ],
    ranger: {
      name: "Inspector Rajesh Kumar",
      rank: "Senior Tactical Warden · QRF Commander",
      badge: "BADGE #FR-4089",
      unit: "Quick Response Force 03 (QRF-03)",
      callSign: "ALPHA-7",
      freq: "154.250 MHz",
      vehicle: "Hilux 4x4 Tender #TJ-04",
      location: "Zone 4 Ridge Trail B (16.074°N, 78.868°E)",
      avatar: "military_tech"
    },
    chat: [
      { sender: "hq", name: "Command HQ Dispatch", time: "14:13", text: "ALPHA-7, we have confirmed severe thermal anomaly at Zone 4 ridge line 4B. Acknowledge transmission." },
      { sender: "ranger", name: "Inspector Rajesh Kumar", time: "14:14", text: "ALPHA-7 copy that HQ. QRF-03 en route in Hilux Tender with 4 crew members. ETA 6 minutes." },
      { sender: "ranger", name: "Inspector Rajesh Kumar", time: "14:20", text: "HQ, we have visual on smoke plume over crest. Launching FLIR Drone D-02 now for perimeter mapping." },
      { sender: "hq", name: "Command HQ Dispatch", time: "14:22", text: "Copy ALPHA-7. Satellite models project front advancing toward Trail B. Establish cleared break immediately." },
      { sender: "ranger", name: "Inspector Rajesh Kumar", time: "14:25", text: "Crews deploying high-pressure foam line now along firebreak B. Standing by for wind vector updates." }
    ]
  },
  {
    id: "INC-0248",
    type: "Wildlife Conflict",
    category: "wildlife",
    icon: "crisis_alert",
    title: "Wildlife Conflict — Elephant Herd Boundary Crossing",
    summary: "Seismic sensors and camera trap CT-714 detected a herd of 8 Asian Elephants (including 1 calf) moving westward toward rural Dornala agricultural lands.",
    zone: "Zone 7",
    zoneId: "NLM-07",
    zoneDetail: "Zone 7 — Dornala Agro-Forest Corridor",
    rawCoords: [15.820, 78.820],
    coordinates: "15.820°N, 78.820°E",
    severity: "high",
    severityLabel: "High",
    status: "investigating",
    statusLabel: "Investigating",
    time: "12:46 IST",
    elapsed: "1h 44m ago",
    telemetry: [
      { label: "Herd Size", value: "7 Adults, 1 Calf" },
      { label: "Herd Velocity", value: "3.8 km/h" },
      { label: "Farmland Dist", value: "1.1 km" },
      { label: "Acoustic Rumbles", value: "High Frequency" }
    ],
    protocols: [
      "Activate solar-powered acoustic deterrent sirens along Sector 7A perimeter.",
      "Deploy Wildlife QRT-07 patrol vehicle with non-lethal flash diversion.",
      "Issue automated SMS advisory to Dornala Village Sarpanch and farmers."
    ],
    ranger: {
      name: "Sub-Inspector Ananya Sharma",
      rank: "Wildlife Biologist · Conflict Response Lead",
      badge: "BADGE #FR-3812",
      unit: "Wildlife Rapid Intervention Team (WRIT-07)",
      callSign: "TUSKER-2",
      freq: "154.400 MHz",
      vehicle: "Heavy Patrol 4x4 #WP-07",
      location: "Sector 7A Buffer Line (15.820°N, 78.820°E)",
      avatar: "nature_people"
    },
    chat: [
      { sender: "hq", name: "Command HQ Dispatch", time: "12:48", text: "TUSKER-2, camera CT-714 flagged matriarch and calf heading west toward Dornala buffer fields. Status?" },
      { sender: "ranger", name: "SI Ananya Sharma", time: "12:50", text: "TUSKER-2 copy. Team on scene at perimeter gate 7A. Acoustic strobe sirens armed." },
      { sender: "ranger", name: "SI Ananya Sharma", time: "13:05", text: "Herd is grazing 800m east of water reservoir #9. We are positioning patrol vehicle for non-lethal diversion." },
      { sender: "hq", name: "Command HQ Dispatch", time: "13:08", text: "Affirmative TUSKER-2. Village sarpanch alerted via automated broadcast. Keep safe buffer." }
    ]
  },
  {
    id: "INC-0246",
    type: "Intrusion",
    category: "intrusion",
    icon: "security",
    title: "Illegal Timber Logging — Chainsaw Acoustic Detection",
    summary: "Acoustic sensor array AC-031 triangulated continuous 2-stroke combustion engine harmonics. Anti-poaching unit intercepted 3 suspects.",
    zone: "Zone 12",
    zoneId: "NLM-12",
    zoneDetail: "Zone 12 — Giddalur Southern Buffer",
    rawCoords: [15.260, 78.650],
    coordinates: "15.260°N, 78.650°E",
    severity: "medium",
    severityLabel: "Medium",
    status: "resolved",
    statusLabel: "Resolved",
    time: "10:32 IST",
    elapsed: "3h 58m ago",
    telemetry: [
      { label: "Acoustic Conf", value: "98.4%" },
      { label: "Suspects Appr", value: "3 Detained" },
      { label: "Timber Recovered", value: "14 Red Sanders Logs" },
      { label: "Perimeter Status", value: "Secure" }
    ],
    protocols: [
      "Lock down Forest Outpost Gate 12 and transfer contraband to Division HQ.",
      "Conduct forensic sweep of logging track for concealed equipment caches."
    ],
    ranger: {
      name: "Forest Officer K. Venkatesh",
      rank: "Vigilance Strike Unit Commander",
      badge: "BADGE #FR-2940",
      unit: "Anti-Poaching Strike Force 12",
      callSign: "VIPER-9",
      freq: "154.125 MHz",
      vehicle: "All-Terrain Patrol Quad #ATV-12",
      location: "Giddalur Outpost 12B (15.260°N, 78.650°E)",
      avatar: "shield"
    },
    chat: [
      { sender: "ranger", name: "FO K. Venkatesh", time: "10:33", text: "VIPER-9 to Command. Intercepted 3 suspects near logging track 12C. Chainsaws and 14 Red Sanders logs secured." },
      { sender: "hq", name: "Command HQ Dispatch", time: "10:35", text: "Outstanding work VIPER-9. Escort van dispatched to transfer contraband to Central Vigilance depot." },
      { sender: "ranger", name: "FO K. Venkatesh", time: "10:55", text: "Transfer complete. Sector 12 secured and perimeter sensors reset." }
    ]
  },
  {
    id: "INC-0245",
    type: "Medical Emergency",
    category: "medical",
    icon: "medical_services",
    title: "Medical Emergency — Field Ranger Heatstroke & Snakebite",
    summary: "Foot patrol guard reported acute heat exhaustion complicated by suspected Russell's Viper envenomation during ridge patrol.",
    zone: "Zone 9",
    zoneId: "NLM-09",
    zoneDetail: "Zone 9 — Nandyal Western Buffer",
    rawCoords: [15.600, 78.580],
    coordinates: "15.600°N, 78.580°E",
    severity: "high",
    severityLabel: "High",
    status: "enroute",
    statusLabel: "En Route",
    time: "09:18 IST",
    elapsed: "5h 12m ago",
    telemetry: [
      { label: "Patient Pulse", value: "118 bpm" },
      { label: "Core Temp", value: "39.8°C" },
      { label: "Antivenom Unit", value: "Polyvalent Ready" },
      { label: "Ambulance ETA", value: "4 Minutes" }
    ],
    protocols: [
      "Mobilize 4x4 Mobile Forest Ambulance with emergency paramedic crew.",
      "Administer IV fluids and prepare antivenom protocol at Nandyal District Hospital."
    ],
    ranger: {
      name: "Dr. Priya Nair & Paramedic Unit",
      rank: "Senior Medical Officer · Emergency Rescue",
      badge: "BADGE #MED-104",
      unit: "Mobile Forest Medical Unit Alpha",
      callSign: "LIFEGUARD-1",
      freq: "155.050 MHz",
      vehicle: "4x4 Field Ambulance #MED-01",
      location: "Access Road 9A (15.600°N, 78.580°E)",
      avatar: "health_and_safety"
    },
    chat: [
      { sender: "hq", name: "Command HQ Dispatch", time: "09:19", text: "LIFEGUARD-1, SOS received from Foot Patrol Guard 09. Heat exhaustion + viper contact. Location 9A." },
      { sender: "ranger", name: "Dr. Priya Nair", time: "09:21", text: "LIFEGUARD-1 en route in 4x4 ambulance. Polyvalent antivenom and cooling packs ready. ETA 8 mins." },
      { sender: "ranger", name: "Dr. Priya Nair", time: "09:29", text: "On scene. Patient stabilized with IV access. Transporting to Nandyal ICU." }
    ]
  },
  {
    id: "INC-0244",
    type: "Forest Fire",
    category: "fire",
    icon: "local_fire_department",
    title: "Forest Fire — Dry Grass Spark Ignition",
    summary: "Railway wheel brake friction sparks ignited dried Cymbopogon grass along railway gradient. Quick containment action initiated.",
    zone: "Zone 3",
    zoneId: "NLM-03",
    zoneDetail: "Zone 3 — Atmakur Deep Core Tiger Sanctuary",
    rawCoords: [16.320, 78.920],
    coordinates: "16.320°N, 78.920°E",
    severity: "critical",
    severityLabel: "Critical",
    status: "active",
    statusLabel: "Active Response",
    time: "08:52 IST",
    elapsed: "5h 38m ago",
    telemetry: [
      { label: "Fire Line Length", value: "420 meters" },
      { label: "Wind Velocity", value: "28 km/h North" },
      { label: "Containment", value: "65% Secured" },
      { label: "Tiger Safety", value: "Buffer Maintained" }
    ],
    protocols: [
      "Station mobile water sprinkler patrol unit along railway siding.",
      "Notify South Central Railway division for train speed restriction orders."
    ],
    ranger: {
      name: "Range Officer Suresh Babu",
      rank: "Deep Core Range Officer",
      badge: "BADGE #FR-5104",
      unit: "Deep Core Protection Detachment",
      callSign: "BRAVO-3",
      freq: "154.300 MHz",
      vehicle: "Medium Water Tender #WT-03",
      location: "Sector 3C Railway Gradient (16.320°N, 78.920°E)",
      avatar: "local_fire_department"
    },
    chat: [
      { sender: "ranger", name: "RO Suresh Babu", time: "08:53", text: "BRAVO-3 to Command: Fast-moving grass fire ignited by freight train near Milepost 44. Suppression underway." },
      { sender: "hq", name: "Command HQ Dispatch", time: "08:55", text: "Copy BRAVO-3. Railway dispatch contacted, speed reduction caution issued for section." },
      { sender: "ranger", name: "RO Suresh Babu", time: "09:12", text: "Fire line 65% controlled. Back-burn line established. Requesting 1 auxiliary water truck." }
    ]
  },
  {
    id: "INC-0243",
    type: "Intrusion",
    category: "intrusion",
    icon: "warning",
    title: "Poaching Threat — Wire Snare Line Discovered",
    summary: "Camera trap CT-502 surveillance sweeps discovered 6 steel wire jaw snares laid in scrubland near Pecheruvu river crossing.",
    zone: "Zone 5",
    zoneId: "NLM-05",
    zoneDetail: "Zone 5 — Pecheruvu River Valley",
    rawCoords: [15.900, 78.980],
    coordinates: "15.900°N, 78.980°E",
    severity: "high",
    severityLabel: "High",
    status: "investigating",
    statusLabel: "Investigating",
    time: "07:40 IST",
    elapsed: "6h 50m ago",
    telemetry: [
      { label: "Snares Neutralized", value: "6 Cable Traps" },
      { label: "Target Fauna", value: "Spotted Deer / Boar" },
      { label: "Footprint Age", value: "~4 Hours" },
      { label: "Tiger T-48 Dist", value: "2.4 km East" }
    ],
    protocols: [
      "Execute intense metal detector foot sweep across a 3 sq km quadrant.",
      "Set automated alarm triggers on all trail camera sensors."
    ],
    ranger: {
      name: "Head Guard Vikram Singh",
      rank: "Anti-Poaching Patrol Leader",
      badge: "BADGE #FR-3291",
      unit: "Carnivore Safety Patrol Squad 05",
      callSign: "TIGER-WATCH",
      freq: "154.175 MHz",
      vehicle: "Rugged Mahindra Thar #PS-05",
      location: "Pecheruvu Scrub Sector 5B (15.900°N, 78.980°E)",
      avatar: "pets"
    },
    chat: [
      { sender: "ranger", name: "HG Vikram Singh", time: "07:42", text: "TIGER-WATCH to HQ: Found 6 wire snares along animal track 5B. All safely dismantled." },
      { sender: "hq", name: "Command HQ Dispatch", time: "07:45", text: "Copy Vikram. Tiger pair T-48 is in quadrant 5B. Expand perimeter sweep immediately." },
      { sender: "ranger", name: "HG Vikram Singh", time: "08:15", text: "Expanded sweep complete. No additional snares found. Setting up 2 covert camera traps." }
    ]
  },
  {
    id: "INC-0242",
    type: "Water Quality",
    category: "water",
    icon: "water_drop",
    title: "Hydrological Silt Runoff & Turbidity Spike",
    summary: "Continuous telemetry buoy #WQ-02 recorded steep turbidity increase to 145 NTU following hill slope soil erosion after localized storm.",
    zone: "Zone 2",
    zoneId: "NLM-02",
    zoneDetail: "Zone 2 — Sunnipenta Reservoir Inflow",
    rawCoords: [16.500, 79.100],
    coordinates: "16.500°N, 79.100°E",
    severity: "medium",
    severityLabel: "Medium",
    status: "active",
    statusLabel: "Active Response",
    time: "07:15 IST",
    elapsed: "7h 15m ago",
    telemetry: [
      { label: "Turbidity", value: "145 NTU (Norm: 15)" },
      { label: "Dissolved O₂", value: "5.8 mg/L" },
      { label: "Flow Velocity", value: "42 m³/s" },
      { label: "Water pH", value: "7.4" }
    ],
    protocols: [
      "Deploy floating geotextile silt barriers across northern inflow canal.",
      "Notify Municipal Water Board for filtration dosing adjustment."
    ],
    ranger: {
      name: "Officer Meera Reddy",
      rank: "Environmental Telemetry Officer",
      badge: "BADGE #ENV-218",
      unit: "Aquatic Telemetry & Basin Monitoring",
      callSign: "HYDRO-2",
      freq: "154.650 MHz",
      vehicle: "Jet Patrol Boat #PB-02",
      location: "Sunnipenta Catchment Pier (16.500°N, 79.100°E)",
      avatar: "water_drop"
    },
    chat: [
      { sender: "hq", name: "Command HQ Dispatch", time: "07:17", text: "HYDRO-2, Buoy WQ-02 turbidity alarm tripped at 145 NTU. Verify inflow silt curtain." },
      { sender: "ranger", name: "Officer Meera Reddy", time: "07:22", text: "HYDRO-2 launching patrol boat now. Cloudburst runoff dislodged unpaved track slope at 2A." },
      { sender: "ranger", name: "Officer Meera Reddy", time: "07:50", text: "Secondary silt curtain deployed. Turbidity settling. Water treatment plant notified." }
    ]
  },
  {
    id: "INC-0241",
    type: "Intrusion",
    category: "intrusion",
    icon: "flight",
    title: "Unauthorized Drone Flight in Core Sanctuary",
    summary: "RF spectrum sensor intercepted 2.4 GHz drone control signal flying unauthorized over core tiger breeding reserve.",
    zone: "Zone 8",
    zoneId: "NLM-08",
    zoneDetail: "Zone 8 — Gundla Brahmeswaram Core",
    rawCoords: [15.660, 78.780],
    coordinates: "15.660°N, 78.780°E",
    severity: "high",
    severityLabel: "High",
    status: "investigating",
    statusLabel: "Investigating",
    time: "06:20 IST",
    elapsed: "8h 10m ago",
    telemetry: [
      { label: "RF Frequency", value: "2.4 GHz Detected" },
      { label: "Drone Altitude", value: "120m AGL" },
      { label: "Pilot Bearing", value: "210° SW Highway" },
      { label: "Airspace", value: "Strict No-Fly Zone" }
    ],
    protocols: [
      "Deploy Counter-UAV Radio Jammer gun to safely force drone landing.",
      "Intercept operator vehicle on peripheral sanctuary bypass road."
    ],
    ranger: {
      name: "Specialist Amit Patel",
      rank: "Aerial Surveillance & Tech Specialist",
      badge: "BADGE #TECH-092",
      unit: "Aerial Counter-UAV Unit",
      callSign: "SKYNET-8",
      freq: "154.800 MHz",
      vehicle: "Radar Scanner Van #RV-08",
      location: "Sanctuary Highway Gate (15.660°N, 78.780°E)",
      avatar: "flight"
    },
    chat: [
      { sender: "ranger", name: "Specialist Amit Patel", time: "06:22", text: "SKYNET-8 to Command: Detected unauthorized DJI drone link at 2.437 GHz. Deploying directional RF jammer." },
      { sender: "hq", name: "Command HQ Dispatch", time: "06:24", text: "Approved SKYNET-8. Force safe landing and locate ground operator." },
      { sender: "ranger", name: "Specialist Amit Patel", time: "06:38", text: "Drone forced down at Sector 8C. Tourist operator intercepted near highway viewpoint. Device confiscated." }
    ]
  },
  {
    id: "INC-0240",
    type: "Wildlife Conflict",
    category: "wildlife",
    icon: "pets",
    title: "Bengal Tiger Territorial Roar near Pilgrim Path",
    summary: "Bio-acoustic sensors registered repeated territorial territorial roars of male Tiger T-61 approximately 800m from ancient foot pilgrimage path.",
    zone: "Zone 10",
    zoneId: "NLM-10",
    zoneDetail: "Zone 10 — Dornala–Yerragondapalem Foothills",
    rawCoords: [15.520, 79.000],
    coordinates: "15.520°N, 79.000°E",
    severity: "medium",
    severityLabel: "Medium",
    status: "investigating",
    statusLabel: "Investigating",
    time: "05:45 IST",
    elapsed: "8h 45m ago",
    telemetry: [
      { label: "Audio Match", value: "Tiger T-61 (100%)" },
      { label: "Trail Distance", value: "820 meters" },
      { label: "Pilgrim Density", value: "Low (Dawn)" },
      { label: "Patrol Escort", value: "Active on Trail" }
    ],
    protocols: [
      "Station escort ranger teams at pilgrim trail entry points 10A and 10B.",
      "Maintain active radio beacon monitoring of collar T-61."
    ],
    ranger: {
      name: "Dr. Farooq Ahmed",
      rank: "Senior Carnivore Biologist",
      badge: "BADGE #BIO-330",
      unit: "Carnivore Conflict Mitigation Cell",
      callSign: "PANTHER-4",
      freq: "154.550 MHz",
      vehicle: "Tracker Safari 4x4 #TR-10",
      location: "Pilgrim Trail Post 10 (15.520°N, 79.000°E)",
      avatar: "biotech"
    },
    chat: [
      { sender: "ranger", name: "Dr. Farooq Ahmed", time: "05:46", text: "PANTHER-4: T-61 VHF collar ping confirmed 820m north of pilgrim trail. Animal is scent marking." },
      { sender: "hq", name: "Command HQ Dispatch", time: "05:48", text: "Understood Doctor. Escort team stationed at gate. Please monitor movement vector." },
      { sender: "ranger", name: "Dr. Farooq Ahmed", time: "06:30", text: "T-61 moving eastward into deep ravine, away from walking trail. All clear." }
    ]
  },
  {
    id: "INC-0239",
    type: "Medical / Road",
    category: "medical",
    icon: "terrain",
    title: "Hill Slope Landslide & Boulder Blockage",
    summary: "Heavy localized cloudburst triggered minor rockslide dislodging boulders across principal patrol track 1A.",
    zone: "Zone 1",
    zoneId: "NLM-01",
    zoneDetail: "Zone 1 — Amrabad Plateau North",
    rawCoords: [16.580, 78.600],
    coordinates: "16.580°N, 78.600°E",
    severity: "low",
    severityLabel: "Low",
    status: "resolved",
    statusLabel: "Resolved",
    time: "04:15 IST",
    elapsed: "10h 15m ago",
    telemetry: [
      { label: "Debris Volume", value: "45 m³" },
      { label: "Road Status", value: "Cleared & Open" },
      { label: "Slope Stability", value: "Monitored / Stable" },
      { label: "Equipment Used", value: "JCB Excavator #01" }
    ],
    protocols: [
      "Deploy forest infrastructure heavy winch and clearing equipment.",
      "Conduct geotechnical stability inspection along ridge cut."
    ],
    ranger: {
      name: "N. Chandrasekhar",
      rank: "Forest Infrastructure Supervisor",
      badge: "BADGE #ENG-405",
      unit: "Emergency Road Detachment",
      callSign: "EARTH-1",
      freq: "154.050 MHz",
      vehicle: "JCB Excavator #HW-01",
      location: "Amrabad Ridge Cut 1A (16.580°N, 78.600°E)",
      avatar: "handyman"
    },
    chat: [
      { sender: "ranger", name: "N. Chandrasekhar", time: "04:17", text: "EARTH-1: Landslide debris blocking track 1A. Heavy excavator moving in." },
      { sender: "ranger", name: "N. Chandrasekhar", time: "06:10", text: "Track 1A completely cleared and stabilized. Vehicle access fully restored." },
      { sender: "hq", name: "Command HQ Dispatch", time: "06:12", text: "Acknowledged EARTH-1. Updating incident record to Resolved." }
    ]
  }
];

let currentOpenedIncident = null;
let openedIncidentFromAll = false;

// Audio Radio Squelch Chirp Synthesizer (Web Audio API)
function playRadioBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch (e) {
    // Audio optional / silenced if user has not interacted
  }
}

function initIncidentsSystem() {
  // 1. Wire "View All →" button on Recent Incidents card
  const incViewAll = document.querySelector('#incidentsCard .view-all-link');
  if (incViewAll) {
    incViewAll.id = 'incidentsViewAllBtn';
    incViewAll.addEventListener('click', (e) => {
      e.preventDefault();
      openAllIncidentsModal();
    });
  }

  // 2. Wire sidebar "Incident Management" link
  const sidebarLinks = document.querySelectorAll('.sidebar .nav-item');
  sidebarLinks.forEach(link => {
    if (link.textContent.includes('Incident Management')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openAllIncidentsModal();
      });
    }
  });

  // 3. Wire table rows on main dashboard
  const tableRows = document.querySelectorAll('#incidentsBody tr');
  const incidentIds = ['INC-0247', 'INC-0248', 'INC-0246', 'INC-0245', 'INC-0244'];
  tableRows.forEach((row, idx) => {
    const incId = incidentIds[idx] || 'INC-0247';
    row.style.cursor = 'pointer';
    row.setAttribute('title', 'Click to open Incident Command & Tactical Comms');
    row.addEventListener('click', () => {
      openIncidentDetail(incId, false);
    });
  });

  // 4. Wire search in All Incidents modal
  const searchInput = document.getElementById('incModalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('#incFilterTabs .modal-filter-tab.active');
      const cat = activeTab ? activeTab.getAttribute('data-filter') : 'all';
      renderAllIncidentsList(cat, e.target.value);
    });
  }

  // 5. Wire filter tabs in All Incidents modal
  const filterTabs = document.querySelectorAll('#incFilterTabs .modal-filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter') || 'all';
      const searchVal = document.getElementById('incModalSearchInput')?.value || '';
      renderAllIncidentsList(cat, searchVal);
    });
  });

  // 6. Wire Locate on GIS Map button in Incident Detail modal
  const locateBtn = document.getElementById('incDetailLocateBtn');
  if (locateBtn) {
    locateBtn.addEventListener('click', () => {
      if (!currentOpenedIncident) return;
      const target = currentOpenedIncident;
      closeIncidentDetailModal();
      closeAllIncidentsModal();

      const mapPanel = document.getElementById('mapPanel');
      if (mapPanel) {
        mapPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const payload = {
        type: 'LOCATE_ZONE',
        zoneId: target.zoneId,
        zone: target.zone,
        coordinates: target.rawCoords,
        title: target.title,
        severity: target.severity,
        severityLabel: target.severityLabel,
        confidence: 95,
        summary: target.summary,
        category: target.category
      };

      const mapFrame = document.getElementById('nallamalaMapFrame');
      if (mapFrame && mapFrame.contentWindow) {
        mapFrame.contentWindow.postMessage(payload, '*');
        try {
          if (typeof mapFrame.contentWindow.locateAndHighlightZone === 'function') {
            mapFrame.contentWindow.locateAndHighlightZone(payload);
          }
        } catch (e) {}
      }

      showToast(
        '📍 Incident Located on GIS Map',
        `Zoomed in to ${target.zone} (${target.coordinates}) with incident telemetry pin.`,
        'my_location'
      );
    });
  }

  // 7. Wire Chat Input Enter Key
  const chatInput = document.getElementById('rangerChatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSendChatMessage();
      }
    });
  }

  // 8. Wire Export Button
  const exportBtn = document.getElementById('incExportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      showToast(
        '📥 Incident Log Exported',
        'Summary report for 10 field incidents downloaded as GeoJSON & PDF format.',
        'download_done'
      );
    });
  }
}

function openAllIncidentsModal() {
  const backdrop = document.getElementById('incidentsAllModalBackdrop');
  if (!backdrop) return;
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderAllIncidentsList('all', '');
}

function closeAllIncidentsModal() {
  const backdrop = document.getElementById('incidentsAllModalBackdrop');
  if (!backdrop) return;
  backdrop.classList.remove('active');
  const detailBackdrop = document.getElementById('incidentDetailModalBackdrop');
  if (!detailBackdrop || !detailBackdrop.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

function renderAllIncidentsList(category, searchQuery) {
  const grid = document.getElementById('incAllGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const query = (searchQuery || '').toLowerCase().trim();

  let filtered = INCIDENTS_DATABASE.filter(item => {
    // Category match
    if (category === 'critical') {
      if (item.severity !== 'critical' && item.severity !== 'high') return false;
    } else if (category !== 'all') {
      if (category === 'resolved') {
        if (item.status !== 'resolved') return false;
      } else if (item.category !== category) {
        return false;
      }
    }

    // Search query match
    if (query) {
      const matchText = (item.id + ' ' + item.title + ' ' + item.zone + ' ' + item.ranger.name + ' ' + item.status).toLowerCase();
      if (!matchText.includes(query)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: span 2; text-align: center; padding: 40px; color: var(--text-muted);">
        <span class="material-icons-outlined" style="font-size: 38px; color: var(--text-dim); margin-bottom: 8px;">search_off</span>
        <p style="font-size: 13px; margin: 0;">No incidents match your current search or filter criteria.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(inc => {
    const card = document.createElement('div');
    card.className = `incident-card-item ${inc.severity}`;
    card.innerHTML = `
      <div class="incident-card-header">
        <div class="incident-card-id-wrap">
          <span class="incident-card-id">${inc.id}</span>
          <span class="type-icon ${inc.category}"></span>
          <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary);">${inc.type}</span>
        </div>
        <div style="display: flex; gap: 6px; align-items: center;">
          <span class="severity-badge ${inc.severity}">${inc.severityLabel}</span>
          <span class="status-badge ${inc.status}" style="font-size: 9.5px; padding: 1px 7px;">${inc.statusLabel}</span>
        </div>
      </div>
      <div class="incident-card-title">${inc.title}</div>
      <div class="incident-card-meta">
        <div class="incident-card-meta-item">
          <span class="material-icons-outlined" style="font-size: 13px; color: var(--accent-green);">place</span>
          <span>${inc.zone}</span>
        </div>
        <div class="incident-card-meta-item">
          <span class="material-icons-outlined" style="font-size: 13px; color: var(--text-muted);">schedule</span>
          <span>${inc.time} (${inc.elapsed})</span>
        </div>
      </div>
      <div class="incident-card-ranger-bar">
        <div class="incident-card-ranger">
          <div class="ranger-avatar-mini">
            <span class="material-icons-outlined" style="font-size: 15px;">${inc.ranger.avatar}</span>
          </div>
          <div>
            <span style="font-weight: 600;">${inc.ranger.name}</span>
            <span style="color: var(--text-muted); font-size: 10px;"> · ${inc.ranger.callSign}</span>
          </div>
        </div>
        <button class="incident-card-action-btn">
          View Incident &amp; Comms →
        </button>
      </div>
    `;
    card.addEventListener('click', () => {
      openIncidentDetail(inc.id, true);
    });
    grid.appendChild(card);
  });
}

function openIncidentDetail(incidentId, fromAllModal) {
  const inc = INCIDENTS_DATABASE.find(i => i.id === incidentId);
  if (!inc) return;

  currentOpenedIncident = inc;
  openedIncidentFromAll = !!fromAllModal;

  const detailBackdrop = document.getElementById('incidentDetailModalBackdrop');
  if (!detailBackdrop) return;

  // Set Back Button Visibility
  const backBtn = document.getElementById('incDetailBackToAllBtn');
  if (backBtn) {
    backBtn.style.display = openedIncidentFromAll ? 'inline-flex' : 'none';
  }

  // Populate Header
  document.getElementById('incDetailIdPill').textContent = inc.id;
  document.getElementById('incDetailSeverityPill').className = `ai-pill ${inc.severity}`;
  document.getElementById('incDetailSeverityPill').textContent = inc.severityLabel + ' Risk';
  document.getElementById('incDetailStatusPill').className = `status-badge ${inc.status}`;
  document.getElementById('incDetailStatusPill').textContent = inc.statusLabel;
  document.getElementById('incDetailZonePill').textContent = '📍 ' + inc.zoneDetail;
  document.getElementById('incDetailTitle').textContent = inc.title;

  // Category Icon
  const catIcon = document.getElementById('incDetailCatIcon');
  if (catIcon) {
    catIcon.innerHTML = `<span class="material-icons-outlined" style="font-size: 22px;">${inc.icon}</span>`;
  }

  // Populate Tab 1: Overview
  document.getElementById('incDetailDesc').textContent = inc.summary;

  // Telemetry
  const telemWrap = document.getElementById('incDetailTelemetry');
  if (telemWrap) {
    telemWrap.innerHTML = inc.telemetry.map(t => `
      <div style="background: rgba(3,12,7,0.6); border: 1px solid rgba(0,230,118,0.15); border-radius: 8px; padding: 8px 10px;">
        <div style="font-size: 9.5px; color: var(--text-muted); text-transform: uppercase;">${t.label}</div>
        <div style="font-size: 12px; font-weight: 700; color: var(--accent-green); margin-top: 2px;">${t.value}</div>
      </div>
    `).join('');
  }

  // Protocols
  const protocolsWrap = document.getElementById('incDetailProtocols');
  if (protocolsWrap) {
    protocolsWrap.innerHTML = inc.protocols.map((p, idx) => `
      <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 11.5px; color: var(--text-primary); line-height: 1.4;">
        <span class="material-icons-outlined" style="font-size: 16px; color: var(--accent-green); flex-shrink: 0; margin-top: 1px;">check_circle</span>
        <span>${p}</span>
      </div>
    `).join('');
  }

  // Ranger Profile
  document.getElementById('rangerName').textContent = inc.ranger.name;
  document.getElementById('rangerRank').textContent = inc.ranger.rank;
  document.getElementById('rangerBadge').textContent = inc.ranger.badge;
  document.getElementById('rangerUnit').textContent = inc.ranger.unit;
  document.getElementById('rangerCallSign').textContent = inc.ranger.callSign;
  document.getElementById('rangerFreq').textContent = inc.ranger.freq;
  document.getElementById('rangerVehicle').textContent = inc.ranger.vehicle;
  document.getElementById('rangerLocation').textContent = inc.ranger.location;
  document.getElementById('rangerAvatarIcon').textContent = inc.ranger.avatar;

  // Chatbox Header
  document.getElementById('chatHeaderCallsign').textContent = `SECURE ENCRYPTED VHF · ${inc.ranger.callSign} (${inc.ranger.freq})`;

  // Render Chat Messages
  renderRangerChat(inc);

  // Switch to Overview tab by default
  switchIncidentTab('overview');

  // Show Modal
  detailBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeIncidentDetailModal() {
  const detailBackdrop = document.getElementById('incidentDetailModalBackdrop');
  if (!detailBackdrop) return;
  detailBackdrop.classList.remove('active');
  if (!openedIncidentFromAll) {
    document.body.style.overflow = '';
  }
}

function backToAllIncidents() {
  closeIncidentDetailModal();
  openAllIncidentsModal();
}

function switchIncidentTab(tabName) {
  const overviewTab = document.getElementById('incTabOverview');
  const commsTab = document.getElementById('incTabComms');
  const tabOverviewBtn = document.getElementById('tabIncOverviewBtn');
  const tabCommsBtn = document.getElementById('tabIncCommsBtn');

  if (tabName === 'overview') {
    if (overviewTab) overviewTab.style.display = 'block';
    if (commsTab) commsTab.style.display = 'none';
    if (tabOverviewBtn) tabOverviewBtn.classList.add('active');
    if (tabCommsBtn) tabCommsBtn.classList.remove('active');
  } else {
    if (overviewTab) overviewTab.style.display = 'none';
    if (commsTab) commsTab.style.display = 'block';
    if (tabOverviewBtn) tabOverviewBtn.classList.remove('active');
    if (tabCommsBtn) tabCommsBtn.classList.add('active');
    // Scroll chat to bottom
    const messagesWrap = document.getElementById('rangerChatMessages');
    if (messagesWrap) {
      setTimeout(() => { messagesWrap.scrollTop = messagesWrap.scrollHeight; }, 50);
    }
  }
}

function renderRangerChat(incident) {
  const messagesWrap = document.getElementById('rangerChatMessages');
  if (!messagesWrap) return;
  messagesWrap.innerHTML = '';

  incident.chat.forEach(msg => {
    const bubble = document.createElement('div');
    bubble.className = `chat-msg ${msg.sender}`;
    bubble.innerHTML = `
      <div class="chat-msg-header">
        <span>${msg.name}</span>
        <span>·</span>
        <span>${msg.time}</span>
      </div>
      <div class="chat-bubble">${msg.text}</div>
    `;
    messagesWrap.appendChild(bubble);
  });

  setTimeout(() => {
    messagesWrap.scrollTop = messagesWrap.scrollHeight;
  }, 50);
}

function handleSendChatMessage() {
  const input = document.getElementById('rangerChatInput');
  if (!input || !input.value.trim() || !currentOpenedIncident) return;
  const text = input.value.trim();
  input.value = '';
  sendUserChatMessage(text);
}

function sendQuickChatMessage(text) {
  if (!currentOpenedIncident) return;
  sendUserChatMessage(text);
}

function sendUserChatMessage(text) {
  const inc = currentOpenedIncident;
  if (!inc) return;

  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  // Push user message
  const userMsg = {
    sender: "hq",
    name: "Command HQ Dispatch (You)",
    time: timeStr,
    text: text
  };
  inc.chat.push(userMsg);
  renderRangerChat(inc);
  playRadioBeep();

  // Show typing indicator
  const indicator = document.getElementById('rangerTypingIndicator');
  const typingText = document.getElementById('rangerTypingText');
  if (indicator) {
    if (typingText) typingText.textContent = `${inc.ranger.name} (${inc.ranger.callSign}) transmitting via VHF radio...`;
    indicator.style.display = 'flex';
  }

  // Simulate contextual Ranger Response
  setTimeout(() => {
    if (indicator) indicator.style.display = 'none';
    const responseText = generateRangerTacticalReply(text, inc);
    const rangerMsg = {
      sender: "ranger",
      name: inc.ranger.name,
      time: timeStr,
      text: responseText
    };
    inc.chat.push(rangerMsg);
    renderRangerChat(inc);
    playRadioBeep();

    showToast(
      `📻 Radio Transmission from ${inc.ranger.callSign}`,
      `"${responseText.length > 70 ? responseText.substring(0, 70) + '...' : responseText}"`,
      'cell_tower'
    );
  }, 1500);
}

function generateRangerTacticalReply(userText, inc) {
  const lower = userText.toLowerCase();
  const callsign = inc.ranger.callSign;

  if (lower.includes('sitrep') || lower.includes('status')) {
    return `${callsign} to Command: Current sector status is stabilized. Ground team holding containment perimeter at ${inc.zone}. All telemetry parameters being tracked.`;
  }
  if (lower.includes('gps') || lower.includes('coordinate')) {
    return `Coordinates acknowledged on tactical HUD. Target confirmed at ${inc.coordinates}. Rerouting team to exact coordinates now.`;
  }
  if (lower.includes('drone')) {
    return `FLIR Drone airborne. Altitude 100m. Transmitting thermal streaming link to Command Console. Plume boundary verified.`;
  }
  if (lower.includes('backup') || lower.includes('tender') || lower.includes('reinforce')) {
    return `Copy HQ, backup arrival noted on GPS tracker. Coordinating rendezvous at Waypoint 2.`;
  }
  if (lower.includes('hold') || lower.includes('perimeter')) {
    return `Understood Command HQ. Halting advance and establishing tactical defense line along current coordinates.`;
  }
  // Default smart responses
  const replies = [
    `${callsign} copy that loud and clear Command HQ. Message received. Executing directive immediately.`,
    `Acknowledge HQ. Sector conditions in ${inc.zone} are steady. Proceeding as instructed.`,
    `${callsign} confirming transmission. Radio link active on ${inc.ranger.freq}. Standing by for next vector.`
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}



/* =============================================
   GIS & Mapping Screen - Interactive Logic
   ============================================= */

let gisMap = null;
let gisLayerGroups = {};

const ZONE_DATA = {
  '1': {
    id: 'NLM-01',
    name: 'Zone 1 (NLM-01) — Amrabad Plateau (N)',
    rating: 'Good',
    center: [16.58, 78.58],
    miniPercent: '78%',
    gaugeOffset: 58,
    vegHealth: '78%',
    fireRiskTop: '38%',
    water: '64%',
    wildlife: '81%',
    fire: '38%',
    intrusion: '29%',
    landslide: '22%',
    priority: 'High',
    area: 410,
    elev: 520
  },
  '2': {
    id: 'NLM-02',
    name: 'Zone 2 (NLM-02) — Nagarjunasagar Approach',
    rating: 'Regulated',
    center: [16.48, 79.08],
    miniPercent: '68%',
    gaugeOffset: 84,
    vegHealth: '55%',
    fireRiskTop: '44%',
    water: '58%',
    wildlife: '47%',
    fire: '44%',
    intrusion: '41%',
    landslide: '15%',
    priority: 'Medium',
    area: 365,
    elev: 340
  },
  '3': {
    id: 'NLM-03',
    name: 'Zone 3 (NLM-03) — Manuguru–Farhabad Ridge',
    rating: 'Optimal',
    center: [16.32, 78.88],
    miniPercent: '91%',
    gaugeOffset: 24,
    vegHealth: '70%',
    fireRiskTop: '52%',
    water: '47%',
    wildlife: '69%',
    fire: '52%',
    intrusion: '33%',
    landslide: '47%',
    priority: 'High',
    area: 398,
    elev: 610
  },
  '4': {
    id: 'NLM-04',
    name: 'Zone 4 (NLM-04) — Srisailam Plateau (Core)',
    rating: 'Optimal',
    center: [16.08, 78.98],
    miniPercent: '94%',
    gaugeOffset: 16,
    vegHealth: '85%',
    fireRiskTop: '22%',
    water: '68%',
    wildlife: '75%',
    fire: '22%',
    intrusion: '18%',
    landslide: '42%',
    priority: 'Critical',
    area: 342,
    elev: 612
  },
  '5': {
    id: 'NLM-05',
    name: 'Zone 5 (NLM-05) — Peddacheruvu–Sivapuram',
    rating: 'Moderate',
    center: [15.89, 79.02],
    miniPercent: '64%',
    gaugeOffset: 95,
    vegHealth: '75%',
    fireRiskTop: '49%',
    water: '52%',
    wildlife: '64%',
    fire: '49%',
    intrusion: '27%',
    landslide: '34%',
    priority: 'High',
    area: 355,
    elev: 560
  },
  '6': {
    id: 'NLM-06',
    name: 'Zone 6 (NLM-06) — Rajiv Gandhi WLS (E)',
    rating: 'Moderate',
    center: [15.71, 79.14],
    miniPercent: '58%',
    gaugeOffset: 110,
    vegHealth: '60%',
    fireRiskTop: '55%',
    water: '45%',
    wildlife: '58%',
    fire: '55%',
    intrusion: '46%',
    landslide: '18%',
    priority: 'Medium',
    area: 298,
    elev: 430
  },
  '7': {
    id: 'NLM-07',
    name: 'Zone 7 (NLM-07) — Atmakur Bamboo Circle',
    rating: 'Sustainable',
    center: [15.79, 78.80],
    miniPercent: '82%',
    gaugeOffset: 48,
    vegHealth: '82%',
    fireRiskTop: '31%',
    water: '56%',
    wildlife: '61%',
    fire: '31%',
    intrusion: '31%',
    landslide: '29%',
    priority: 'High',
    area: 312,
    elev: 498
  },
  '8': {
    id: 'NLM-08',
    name: 'Zone 8 (NLM-08) — Gundla Brahmeswaram WLS',
    rating: 'Optimal',
    center: [15.66, 78.78],
    miniPercent: '71%',
    gaugeOffset: 76,
    vegHealth: '81%',
    fireRiskTop: '41%',
    water: '49%',
    wildlife: '79%',
    fire: '41%',
    intrusion: '22%',
    landslide: '39%',
    priority: 'High',
    area: 388,
    elev: 590
  },
  '9': {
    id: 'NLM-09',
    name: 'Zone 9 (NLM-09) — Bhairani Konda Ridge',
    rating: 'Optimal',
    center: [15.58, 78.57],
    miniPercent: '77%',
    gaugeOffset: 60,
    vegHealth: '74%',
    fireRiskTop: '36%',
    water: '38%',
    wildlife: '66%',
    fire: '36%',
    intrusion: '19%',
    landslide: '56%',
    priority: 'High',
    area: 276,
    elev: 735
  },
  '10': {
    id: 'NLM-10',
    name: 'Zone 10 (NLM-10) — Dornala Sandalwood',
    rating: 'High Risk',
    center: [15.53, 79.01],
    miniPercent: '52%',
    gaugeOffset: 126,
    vegHealth: '63%',
    fireRiskTop: '57%',
    water: '41%',
    wildlife: '52%',
    fire: '57%',
    intrusion: '72%',
    landslide: '24%',
    priority: 'Critical',
    area: 330,
    elev: 465
  },
  '11': {
    id: 'NLM-11',
    name: 'Zone 11 (NLM-11) — Markapur Foothills',
    rating: 'Good',
    center: [15.40, 78.84],
    miniPercent: '85%',
    gaugeOffset: 40,
    vegHealth: '54%',
    fireRiskTop: '62%',
    water: '33%',
    wildlife: '39%',
    fire: '62%',
    intrusion: '51%',
    landslide: '14%',
    priority: 'Medium',
    area: 305,
    elev: 380
  },
  '12': {
    id: 'NLM-12',
    name: 'Zone 12 (NLM-12) — Giddalur Southern Extension',
    rating: 'High Priority',
    center: [15.25, 78.60],
    miniPercent: '45%',
    gaugeOffset: 145,
    vegHealth: '45%',
    fireRiskTop: '66%',
    water: '29%',
    wildlife: '33%',
    fire: '66%',
    intrusion: '79%',
    landslide: '12%',
    priority: 'Critical',
    area: 266,
    elev: 340
  }
};

function navigateToPage(pageId) {
  const pageDashboard = document.getElementById('pageDashboard') || document.getElementById('dashboardScroll');
  const pageGis = document.getElementById('pageGis');
  const pageIntelligence = document.getElementById('pageIntelligence');
  const pageAnalytics = document.getElementById('pageAnalytics');
  const pageRangers = document.getElementById('pageRangers');
  const pageResources = document.getElementById('pageResources');
  const headerTitle = document.querySelector('.header-title');
  const headerSubtitle = document.querySelector('.header-subtitle');
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    if (item.getAttribute('data-page') === pageId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Hide all pages first
  if (pageDashboard) pageDashboard.style.display = 'none';
  if (pageGis) pageGis.style.display = 'none';
  if (pageIntelligence) pageIntelligence.style.display = 'none';
  if (pageAnalytics) pageAnalytics.style.display = 'none';
  if (pageRangers) pageRangers.style.display = 'none';
  if (pageResources) pageResources.style.display = 'none';
  
  const pageSettings = document.getElementById('pageSettings');
  if (pageSettings) pageSettings.style.display = 'none';

  if (pageId === 'settings' || pageId === 'health') {
    if (pageSettings) pageSettings.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'System Settings';
    if (headerSubtitle) headerSubtitle.textContent = 'Configure System, Security, Notifications & Application Settings';

    const userNameEl = document.querySelector('.user-name');
    if (userNameEl) userNameEl.textContent = 'Ranger';

    // Highlight the clicked nav item
    navItems.forEach(item => {
      const p = item.getAttribute('data-page');
      if (p === pageId || (pageId === 'settings' && p === 'settings') || (pageId === 'health' && p === 'health')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    showToast('Switched to System Settings & Configuration', 'info');
    return;
  }


  
  if (pageId === 'resources') {
    if (pageResources) pageResources.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'Resource Management';
    if (headerSubtitle) headerSubtitle.textContent = 'Resource Inventory, Allocation & Operational Logistics';

    setTimeout(() => {
      initResourceMap();
      if (resAllocMap) {
        resAllocMap.invalidateSize();
      }
      initResourceSubnav();
    }, 60);

    setTimeout(() => {
      if (resAllocMap) {
        resAllocMap.invalidateSize();
      }
    }, 250);

    return;
  }

  if (pageId === 'rangers') {
    if (pageRangers) pageRangers.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'Ranger Management';
    if (headerSubtitle) headerSubtitle.textContent = 'Personnel, Patrols, Tracking & Field Operations';

    setTimeout(() => {
      initRangerMap();
      if (rangerMap) {
        rangerMap.invalidateSize();
      }
    }, 60);

    setTimeout(() => {
      if (rangerMap) {
        rangerMap.invalidateSize();
      }
    }, 250);

    showToast('Switched to Ranger Management & Field Operations', 'info');
  } else if (pageId === 'analytics') {
    if (pageAnalytics) pageAnalytics.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'Analytics & Reports';
    if (headerSubtitle) headerSubtitle.textContent = 'Historical Intelligence, Performance Analytics & Decision Reports';

    setTimeout(() => {
      initAnalyticsCharts();
    }, 60);

    showToast('Switched to Historical Analytics & Decision Reports', 'info');
  } else if (pageId === 'intelligence') {
    if (pageIntelligence) pageIntelligence.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'Forest Intelligence';
    if (headerSubtitle) headerSubtitle.textContent = 'AI-Powered Insights for Smarter Forest Management';

    setTimeout(() => {
      initIntelMap();
      initFraChart();
      initCzRadarChart();
      if (intelMap) {
        intelMap.invalidateSize();
      }
    }, 60);

    setTimeout(() => {
      if (intelMap) {
        intelMap.invalidateSize();
      }
    }, 250);

    showToast('Switched to Forest Intelligence AI Command', 'info');
  } else if (pageId === 'gis') {
    if (pageGis) pageGis.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'GIS & Mapping';
    if (headerSubtitle) headerSubtitle.textContent = 'Interactive Forest Map & Spatial Intelligence';

    setTimeout(() => {
      initGisMap();
      if (gisMap) {
        gisMap.invalidateSize();
      }
    }, 60);

    setTimeout(() => {
      if (gisMap) {
        gisMap.invalidateSize();
      }
    }, 250);

    showToast('Switched to GIS & Mapping Spatial Command', 'info');
  } else if (pageId === 'dashboard') {
    if (pageDashboard) pageDashboard.style.display = 'block';

    if (headerTitle) headerTitle.textContent = 'Admin Dashboard';
    if (headerSubtitle) headerSubtitle.textContent = 'Forest Intelligence & Command Overview';

    showToast('Switched to ForestIQ Overview Dashboard', 'info');
  } else {
    showToast('Navigating to ' + pageId.charAt(0).toUpperCase() + pageId.slice(1), 'info');
  }
}

let gisZonePolys = {};
let gisHighlightPoly = null;
let gisMeasureActive = false;
let gisMeasurePts = [];
let gisMeasureLine = null;
let gisMeasureMarkers = [];
let gisSosActive = false;
let gisSosMarker = null;

function initGisMap() {
  const mapContainer = document.getElementById('gisLeafletMap');
  if (!mapContainer || gisMap) return;

  // Center on Nallamala Forest Reserve (Eastern Ghats)
  gisMap = L.map('gisLeafletMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([15.95, 78.85], 9);

  // Satellite Imagery Layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    errorTileUrl: 'sidebar-forest.jpg'
  }).addTo(gisMap);

  // Fallback dark canvas backdrop centered on Nallamala (non-interactive so clicks pass through)
  L.circle([15.95, 78.85], {
    radius: 95000,
    color: 'transparent',
    fillColor: '#07170f',
    fillOpacity: 0.1,
    interactive: false
  }).addTo(gisMap);

  // Layer Groups
  gisLayerGroups = {
    boundary: L.layerGroup().addTo(gisMap),
    zones: L.layerGroup().addTo(gisMap),
    rivers: L.layerGroup().addTo(gisMap),
    roads: L.layerGroup(),
    settlements: L.layerGroup(),
    rangerStations: L.layerGroup(),
    watchTowers: L.layerGroup(),
    forestGuards: L.layerGroup(),
    vehicles: L.layerGroup(),
    wildlife: L.layerGroup(),
    heatmap: L.layerGroup(),
    riskZones: L.layerGroup()
  };

  // Helper for tactical pins
  function createPin(iconName, cls) {
    return L.divIcon({
      className: '',
      html: '<div class="gis-tactical-pin ' + cls + '"><span class="material-icons-outlined">' + iconName + '</span></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
  }

  // 1. Forest Boundary Polygon (Approximate Nallamala Notified Outer Bounds)
  const nallamalaBoundary = [
    [16.72, 78.55], [16.68, 78.72], [16.62, 78.95], [16.58, 79.15], [16.50, 79.30],
    [16.38, 79.28], [16.28, 79.20], [16.18, 79.30], [16.05, 79.35], [15.92, 79.30],
    [15.80, 79.34], [15.68, 79.28], [15.58, 79.20], [15.50, 79.10], [15.40, 78.98],
    [15.32, 78.88], [15.20, 78.80], [15.12, 78.65], [15.18, 78.50], [15.30, 78.42],
    [15.45, 78.38], [15.60, 78.35], [15.72, 78.42], [15.80, 78.35], [15.90, 78.30],
    [16.00, 78.28], [16.10, 78.32], [16.18, 78.28], [16.28, 78.35], [16.36, 78.40],
    [16.44, 78.42], [16.52, 78.38], [16.60, 78.42], [16.68, 78.48], [16.72, 78.55]
  ];
  const boundaryPoly = L.polygon(nallamalaBoundary, {
    color: '#e0b04c',
    weight: 2.2,
    dashArray: '6, 5',
    fillColor: '#e0b04c',
    fillOpacity: 0.04
  }).addTo(gisLayerGroups.boundary);

  boundaryPoly.bindPopup('<b>Nallamala Forest Sanctuary — Outer Boundary</b><br>Eastern Ghats &bull; Nagarjunsagar–Srisailam Tiger Reserve (~140 km N–S span)');
  boundaryPoly.on('click', (e) => {
    if (gisMeasureActive) {
      if (e && e.originalEvent) e.originalEvent.stopPropagation();
      handleGisMeasureClick(e.latlng);
      return;
    }
    if (gisSosActive) {
      if (e && e.originalEvent) e.originalEvent.stopPropagation();
      handleGisSosClick(e.latlng);
      return;
    }
  });

  // 2. All 12 Nallamala Forest Ecological Zones
  const nallamalaZones = [
    { num: 1, id: 'NLM-01', name: 'Amrabad Plateau (N)', ring: [[16.72,78.55],[16.68,78.72],[16.55,78.78],[16.45,78.68],[16.42,78.52],[16.52,78.42],[16.62,78.42],[16.68,78.48]], center: [16.58, 78.58], color: '#00f5c4' },
    { num: 2, id: 'NLM-02', name: 'Nagarjunasagar Approach', ring: [[16.62,78.95],[16.58,79.15],[16.50,79.30],[16.38,79.28],[16.35,79.05],[16.42,78.88],[16.55,78.85]], center: [16.48, 79.08], color: '#a78bfa' },
    { num: 3, id: 'NLM-03', name: 'Manuguru–Farhabad Ridge', ring: [[16.45,78.68],[16.55,78.78],[16.42,78.88],[16.35,79.05],[16.28,79.20],[16.18,79.15],[16.12,78.95],[16.20,78.78],[16.30,78.68]], center: [16.32, 78.88], color: '#10b981' },
    { num: 4, id: 'NLM-04', name: 'Srisailam Plateau (core)', ring: [[16.18,78.78],[16.18,79.30],[16.05,79.35],[15.98,79.10],[15.95,78.90],[16.00,78.75],[16.08,78.72]], center: [16.08, 78.98], color: '#00e676' },
    { num: 5, id: 'NLM-05', name: 'Peddacheruvu–Sivapuram', ring: [[15.98,78.75],[16.00,78.75],[15.95,78.90],[15.98,79.10],[15.92,79.30],[15.80,79.34],[15.78,79.05],[15.82,78.85],[15.90,78.78]], center: [15.89, 79.02], color: '#0284c7' },
    { num: 6, id: 'NLM-06', name: 'Rajiv Gandhi WLS (E)', ring: [[15.80,79.34],[15.68,79.28],[15.62,79.10],[15.68,78.95],[15.78,79.05]], center: [15.71, 79.14], color: '#fbbf24' },
    { num: 7, id: 'NLM-07', name: 'Atmakur Bamboo Circle', ring: [[15.90,78.78],[15.82,78.85],[15.78,79.05],[15.68,78.95],[15.70,78.72],[15.80,78.62],[15.87,78.65]], center: [15.79, 78.80], color: '#22c55e' },
    { num: 8, id: 'NLM-08', name: 'Gundla Brahmeswaram WLS', ring: [[15.80,78.62],[15.70,78.72],[15.68,78.95],[15.62,79.10],[15.58,79.00],[15.55,78.78],[15.60,78.60],[15.70,78.55]], center: [15.66, 78.78], color: '#84cc16' },
    { num: 9, id: 'NLM-09', name: 'Bhairani Konda Ridge', ring: [[15.70,78.55],[15.60,78.60],[15.55,78.78],[15.50,78.70],[15.48,78.50],[15.58,78.42],[15.68,78.42]], center: [15.58, 78.57], color: '#eab308' },
    { num: 10, id: 'NLM-10', name: 'Dornala–Yerragondapalem', ring: [[15.58,79.00],[15.62,79.10],[15.58,79.20],[15.50,79.10],[15.40,78.98],[15.45,78.85],[15.55,78.78]], center: [15.53, 79.01], color: '#f97316' },
    { num: 11, id: 'NLM-11', name: 'Markapur Foothills', ring: [[15.50,79.10],[15.40,78.98],[15.32,78.88],[15.28,78.72],[15.38,78.62],[15.48,78.70],[15.45,78.85]], center: [15.40, 78.84], color: '#06b6d4' },
    { num: 12, id: 'NLM-12', name: 'Giddalur Southern Extension', ring: [[15.28,78.72],[15.20,78.80],[15.12,78.65],[15.18,78.50],[15.30,78.42],[15.38,78.55],[15.38,78.62]], center: [15.25, 78.60], color: '#ef4444' }
  ];

  gisZonePolys = {};

  nallamalaZones.forEach(z => {
    const isPriority = (z.num === 10 || z.num === 12);
    const poly = L.polygon(z.ring, {
      color: z.color,
      weight: 1.8,
      fillColor: z.color,
      fillOpacity: isPriority ? 0.22 : 0.12
    });

    poly.on('mouseover', () => {
      poly.setStyle({ fillOpacity: isPriority ? 0.40 : 0.30, weight: 2.8 });
    });
    poly.on('mouseout', () => {
      if (gisHighlightPoly !== poly) {
        poly.setStyle({ fillOpacity: isPriority ? 0.22 : 0.12, weight: 1.8 });
      }
    });

    // Handle clicks for both normal inspection and measurement inside forest
    poly.on('click', (e) => {
      if (gisMeasureActive) {
        if (e && e.originalEvent) e.originalEvent.stopPropagation();
        handleGisMeasureClick(e.latlng);
        return;
      }
      if (gisSosActive) {
        if (e && e.originalEvent) e.originalEvent.stopPropagation();
        handleGisSosClick(e.latlng);
        return;
      }
      panGisZone(z.num);
    });

    poly.bindPopup(`
      <div style="font-family: Inter, sans-serif; font-size: 11.5px; color: #e8f7ee; min-width: 190px;">
        <div style="font-weight: 800; color: ${z.color}; font-size: 12.5px; margin-bottom: 4px;">Zone ${z.num} (${z.id})</div>
        <div style="color: #fff; font-weight: 600; margin-bottom: 4px;">${z.name}</div>
        <div style="color: #8fbca2; font-size: 10px; margin-bottom: 6px;">Nallamala Tiger Reserve Working Circle</div>
        <div style="background: rgba(20,56,38,0.7); border-radius: 4px; padding: 4px 6px; font-size: 9.5px; display: flex; justify-content: space-between;">
          <span>Telemetry Status:</span> <b style="color:${z.color};">ACTIVE</b>
        </div>
      </div>
    `);

    poly.addTo(gisLayerGroups.zones);
    gisZonePolys[String(z.num)] = poly;
    gisZonePolys[z.id] = poly;

    // Permanent thematic zone badge marker
    const icon = L.divIcon({
      className: 'gis-zone-label',
      html: z.id,
      iconSize: [54, 18],
      iconAnchor: [27, 9]
    });
    L.marker(z.center, { icon: icon, interactive: false }).addTo(gisLayerGroups.zones);
  });

  // 3. Rivers / Water Bodies (Krishna River gorge, Srisailam & Nagarjunasagar reservoirs)
  const krishnaRiver = L.polyline([
    [16.66, 78.50], [16.58, 78.68], [16.48, 78.80], [16.35, 78.85], [16.22, 78.88],
    [16.14, 78.90], [16.089, 78.898], [16.02, 78.95], [15.95, 79.05], [15.90, 79.20], [15.85, 79.34]
  ], { color: '#38bdf8', weight: 3.5, opacity: 0.92 }).addTo(gisLayerGroups.rivers).bindPopup('<b>Krishna River Gorge</b><br>Deepest canyon in Nallamala range (~200 m depth)');

  const srisailamRes = L.circle([16.0897, 78.8983], {
    radius: 9000,
    color: '#38bdf8',
    fillColor: '#38bdf8',
    fillOpacity: 0.32,
    weight: 1.5
  }).addTo(gisLayerGroups.rivers).bindPopup('<b>Srisailam Reservoir</b><br>Surface area: ~616 km² at full reservoir level');

  const nagarjunaRes = L.circle([16.5620, 79.3130], {
    radius: 5000,
    color: '#38bdf8',
    fillColor: '#38bdf8',
    fillOpacity: 0.30,
    weight: 1.5
  }).addTo(gisLayerGroups.rivers).bindPopup('<b>Nagarjuna Sagar Reservoir (Approach)</b>');

  const gundlakammaRiver = L.polyline([[15.55, 79.05], [15.42, 79.10], [15.30, 79.05]], {
    color: '#00f5c4', weight: 2.2, opacity: 0.85
  }).addTo(gisLayerGroups.rivers).bindPopup('<b>Gundlakamma River Headwaters</b><br>Originates within Nallamala range');

  [krishnaRiver, srisailamRes, nagarjunaRes, gundlakammaRiver].forEach(item => {
    item.on('click', (e) => {
      if (gisMeasureActive) {
        if (e && e.originalEvent) e.originalEvent.stopPropagation();
        handleGisMeasureClick(e.latlng);
      }
    });
  });

  // 4. Fire / Thermal Hotspots
  function createFireMarker(lat, lng, label) {
    return L.marker([lat, lng], {
      icon: L.divIcon({
        className: '',
        html: '<div class="gis-pulsing-fire"><span class="material-icons-outlined">local_fire_department</span></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).bindPopup(`<b>${label}</b><br>Coordinates: ${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E`);
  }

  createFireMarker(16.074, 78.868, 'Zone 4 Incident · Active Core Fire Front (34 Ha)').addTo(gisLayerGroups.zones);
  createFireMarker(15.790, 78.800, 'Zone 7 Anomaly · Bamboo Extraction Disturbance').addTo(gisLayerGroups.zones);
  createFireMarker(15.250, 78.600, 'Zone 12 Alert · Botanical Extraction Risk Area').addTo(gisLayerGroups.zones);

  // 5. Major Roads & Forest Tracks
  const roadAlignments = [
    { pts: [[15.8779, 78.5884], [15.95, 78.72], [16.0833, 78.8667]], label: 'State Highway (Atmakur–Srisailam Ghat Road)' },
    { pts: [[16.0833, 78.8667], [16.05, 79.05], [16.10, 79.20], [15.7333, 79.2667]], label: 'State Highway (Srisailam–Markapur Link)' },
    { pts: [[15.4787, 78.4831], [15.65, 78.53], [15.8779, 78.5884]], label: 'State Highway (Nandyal–Atmakur)' },
    { pts: [[16.0833, 78.8667], [16.25, 78.95], [16.42, 79.05], [16.5620, 79.3130]], label: 'Forest Road (Srisailam–Nagarjunasagar)' },
    { pts: [[15.7333, 79.2667], [15.60, 79.15], [15.5760, 79.1350]], label: 'State Highway (Markapur–Cumbum)' },
    { pts: [[15.9440, 79.2560], [15.85, 79.10], [15.75, 79.00], [15.6612, 78.7452]], label: 'Forest Track (Dornala–Gundla Brahmeswaram)' }
  ];

  roadAlignments.forEach(r => {
    L.polyline(r.pts, {
      color: '#ffab40',
      weight: 2.2,
      dashArray: '5, 4',
      opacity: 0.85
    }).addTo(gisLayerGroups.roads).bindPopup('<b>' + r.label + '</b>');
  });

  // 6. Settlements
  const settlementsData = [
    { name: 'Srisailam (Temple & NSTR HQ)', coords: [16.0833, 78.8667], note: 'Key command post and tourism gate' },
    { name: 'Atmakur (Division HQ)', coords: [15.8779, 78.5884], note: 'Southern reserve access transit gateway' },
    { name: 'Markapur (Rail Transit Station)', coords: [15.7333, 79.2667], note: 'Eastern approach hub' },
    { name: 'Nandyal (Regional Base)', coords: [15.4787, 78.4831], note: 'Southwestern support center' },
    { name: 'Dornala (Foothills Town)', coords: [15.9440, 79.2560], note: 'Sandalwood corridor checkpoint' }
  ];

  settlementsData.forEach(s => {
    L.marker(s.coords, { icon: createPin('holiday_village', 'settlement') })
      .addTo(gisLayerGroups.settlements)
      .bindPopup(`<b>${s.name}</b><br>${s.note}`);
  });

  // 7. Ranger Stations & Watchtowers
  const stationsData = [
    { name: 'Srisailam Range HQ', coords: [16.0833, 78.8667], type: 'Range Office' },
    { name: 'Atmakur Forest Station', coords: [15.8779, 78.5884], type: 'Station HQ' },
    { name: 'Bairluty Eco-camp Post', coords: [15.80, 78.68], type: 'Field Outpost' },
    { name: 'Gundla Brahmeswaram Post', coords: [15.6612, 78.7452], type: 'Sanctuary HQ' },
    { name: 'Dornala Checkpoint', coords: [15.9440, 79.2560], type: 'Checkpoint' },
    { name: 'Nagarjunasagar Approach Post', coords: [16.45, 79.05], type: 'Approach Station' }
  ];

  stationsData.forEach(st => {
    L.marker(st.coords, { icon: createPin('cell_tower', 'tower') })
      .addTo(gisLayerGroups.rangerStations)
      .bindPopup(`<b>${st.name}</b><br>Classification: ${st.type}`);
  });

  const towersData = [
    { name: 'Peddacheruvu Watchtower', coords: [15.98, 79.00] },
    { name: 'Nekkanti Ridge Watchtower', coords: [15.82, 78.75] },
    { name: 'Markapur Liaison Post', coords: [15.7333, 79.2667] }
  ];

  towersData.forEach(tw => {
    L.marker(tw.coords, { icon: createPin('visibility', 'camera') })
      .addTo(gisLayerGroups.watchTowers)
      .bindPopup(`<b>${tw.name}</b><br>Optical 360° Forest Surveillance`);
  });

  // 8. Forest Guards
  L.marker([16.0833, 78.8667], { icon: createPin('shield', 'guard') })
    .addTo(gisLayerGroups.forestGuards)
    .bindPopup('<b>Forest Guard Rajesh (Unit 04)</b><br>Nallamala Core Ridge Patrol &bull; Live Telemetry');
  L.marker([15.79, 78.80], { icon: createPin('shield', 'guard') })
    .addTo(gisLayerGroups.forestGuards)
    .bindPopup('<b>Patrol Unit 07</b><br>Atmakur Bamboo Working Circle &bull; On Beat');
  L.marker([15.25, 78.60], { icon: createPin('shield', 'guard') })
    .addTo(gisLayerGroups.forestGuards)
    .bindPopup('<b>Patrol Unit 12</b><br>Giddalur Southern Sector &bull; High Priority Watch');

  // 9. Vehicles
  L.marker([16.075, 78.875], { icon: createPin('directions_car', 'vehicle') })
    .addTo(gisLayerGroups.vehicles)
    .bindPopup('<b>Rapid Response Jeep RR-01</b><br>Srisailam HQ &bull; Ready for Dispatch');
  L.marker([15.882, 78.595], { icon: createPin('directions_car', 'vehicle') })
    .addTo(gisLayerGroups.vehicles)
    .bindPopup('<b>Forest Patrol Jeep PJ-03</b><br>Atmakur Patrol Unit &bull; In Transit');

  // 10. Wildlife Movement Corridors
  const tigerCorridor = [
    [15.70, 78.60], [15.66, 78.70], [15.72, 78.80], [15.68, 78.90], [15.75, 78.95]
  ];
  L.polyline(tigerCorridor, { color: '#ff5252', weight: 2.5, dashArray: '2, 6', opacity: 0.9 })
    .addTo(gisLayerGroups.wildlife)
    .bindPopup('<b>Royal Bengal Tiger #T-104 Movement Corridor</b><br>Active sensor collar transit route');
  L.marker([15.75, 78.95], { icon: createPin('pets', 'wildlife') })
    .addTo(gisLayerGroups.wildlife)
    .bindPopup('<b>Bengal Tiger #T-104</b><br>Last sensor ping: 22m ago in Atmakur Bamboo Circle');

  const elephantCorridor = [
    [16.40, 78.75], [16.35, 78.85], [16.28, 78.92], [16.32, 79.00]
  ];
  L.polyline(elephantCorridor, { color: '#eab308', weight: 2.2, dashArray: '3, 6', opacity: 0.85 })
    .addTo(gisLayerGroups.wildlife)
    .bindPopup('<b>Asian Elephant Migration Corridor</b><br>Amrabad to Farhabad escarpment');

  // 11. Heatmap (Multi-Spectral Thermal & Ecological Density)
  L.circle([16.074, 78.868], { radius: 4500, color: 'transparent', fillColor: '#ff5252', fillOpacity: 0.35 }).addTo(gisLayerGroups.heatmap);
  L.circle([15.790, 78.800], { radius: 3800, color: 'transparent', fillColor: '#ff9800', fillOpacity: 0.32 }).addTo(gisLayerGroups.heatmap);
  L.circle([15.250, 78.600], { radius: 4200, color: 'transparent', fillColor: '#ef4444', fillOpacity: 0.38 }).addTo(gisLayerGroups.heatmap);

  // 12. Risk Zones
  L.polygon([[15.58, 79.00], [15.62, 79.10], [15.58, 79.20], [15.50, 79.10]], {
    color: '#ff5252', weight: 1.8, fillColor: '#ff5252', fillOpacity: 0.24, dashArray: '4, 4'
  }).addTo(gisLayerGroups.riskZones).bindPopup('<b>Dornala High-Risk Logging Corridor</b><br>Surveillance drone pass recommended');

  L.polygon([[16.12, 78.85], [16.15, 78.95], [16.08, 79.02], [16.04, 78.90]], {
    color: '#ff9800', weight: 1.8, fillColor: '#ff9800', fillOpacity: 0.22, dashArray: '4, 4'
  }).addTo(gisLayerGroups.riskZones).bindPopup('<b>Srisailam Dry Ridge High Fire Risk Zone</b>');

  // Connect Toolbar Buttons
  document.getElementById('gisZoomIn')?.addEventListener('click', () => gisMap.zoomIn());
  document.getElementById('gisZoomOut')?.addEventListener('click', () => gisMap.zoomOut());
  document.getElementById('gisLocateMe')?.addEventListener('click', () => {
    gisMap.flyTo([15.95, 78.85], 9, { duration: 1.2 });
    showToast('Re-centered map on Nallamala Forest Sanctuary', 'success');
  });

  const layersPanel = document.getElementById('gisLayersPanel');
  document.getElementById('gisToggleLayers')?.addEventListener('click', () => {
    if (layersPanel) {
      const isHidden = layersPanel.style.display === 'none';
      layersPanel.style.display = isHidden ? 'flex' : 'none';
    }
  });

  document.getElementById('gisCrosshair')?.addEventListener('click', () => {
    const sel = document.getElementById('gisZoneSelect');
    if (sel) panGisZone(sel.value);
  });

  // Connect Checklist Checkboxes
  const layerCheckboxes = {
    boundary: 'layerChkBoundary',
    zones: 'layerChkZones',
    rivers: 'layerChkRivers',
    roads: 'layerChkRoads',
    settlements: 'layerChkSettlements',
    rangerStations: 'layerChkRangerStations',
    watchTowers: 'layerChkWatchTowers',
    forestGuards: 'layerChkForestGuards',
    vehicles: 'layerChkVehicles',
    wildlife: 'layerChkWildlife',
    heatmap: 'layerChkHeatmap',
    riskZones: 'layerChkRiskZones'
  };

  Object.entries(layerCheckboxes).forEach(([key, elemId]) => {
    const chk = document.getElementById(elemId);
    if (!chk) return;
    chk.addEventListener('change', () => {
      const grp = gisLayerGroups[key];
      if (!grp) return;
      if (chk.checked) {
        gisMap.addLayer(grp);
        showToast('Enabled layer: ' + key, 'info');
      } else {
        gisMap.removeLayer(grp);
        showToast('Disabled layer: ' + key, 'info');
      }
    });
  });

  // Reset all layers
  document.getElementById('gisResetLayers')?.addEventListener('click', () => {
    Object.keys(layerCheckboxes).forEach(k => {
      const chk = document.getElementById(layerCheckboxes[k]);
      if (chk) {
        chk.checked = (k === 'boundary' || k === 'zones' || k === 'rivers');
        chk.dispatchEvent(new Event('change'));
      }
    });
    showToast('Reset map layers to defaults', 'success');
  });

  // Top pill toggles
  document.querySelectorAll('.gis-pill[data-filter]').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      const filter = pill.getAttribute('data-filter');
      const chk = document.getElementById(layerCheckboxes[filter]);
      if (chk) {
        chk.checked = pill.classList.contains('active');
        chk.dispatchEvent(new Event('change'));
      }
    });
  });

  // Mousemove coordinates update
  gisMap.on('mousemove', (e) => {
    const coordsBadge = document.getElementById('gisCoordsBadge');
    if (coordsBadge) {
      coordsBadge.textContent = e.latlng.lat.toFixed(4) + '°N ' + e.latlng.lng.toFixed(4) + '°E';
    }
  });

  // Interactive map click for Measurement and SOS simulation (fires anywhere outside or inside)
  gisMap.on('click', (e) => {
    if (gisMeasureActive) {
      handleGisMeasureClick(e.latlng);
    } else if (gisSosActive) {
      handleGisSosClick(e.latlng);
    }
  });

  // Fullscreen button
  document.getElementById('gisFullscreenBtn')?.addEventListener('click', () => {
    const container = document.getElementById('gisMapContainer');
    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  });
}

function panGisZone(zoneNum) {
  const zKey = String(zoneNum);
  const z = ZONE_DATA[zKey] || ZONE_DATA['4'];
  if (!z) return;

  const sel = document.getElementById('gisZoneSelect');
  if (sel) sel.value = zKey;

  updateZoneInformationUI(zKey);

  if (gisMap) {
    gisMap.flyTo(z.center, 11.5, { duration: 1.2 });

    // Reset previous polygon style
    if (gisHighlightPoly) {
      gisHighlightPoly.setStyle({ weight: 1.8, fillOpacity: 0.15 });
      gisHighlightPoly = null;
    }

    const poly = gisZonePolys[zKey] || (z.id ? gisZonePolys[z.id] : null);
    if (poly) {
      gisHighlightPoly = poly;
      poly.setStyle({ weight: 3.2, fillOpacity: 0.35 });
      setTimeout(() => {
        poly.openPopup();
      }, 1250);
    }
  }
}

function updateZoneInformationUI(zoneKey) {
  const data = ZONE_DATA[zoneKey] || ZONE_DATA['4'];

  const ratingEl = document.getElementById('zoneGaugeRating');
  const subEl = document.getElementById('zoneGaugeSub');
  const fillEl = document.getElementById('zoneGaugeFill');
  const miniBar = document.getElementById('zoneMiniBar');
  const miniVal = document.getElementById('zoneMiniVal');

  if (ratingEl) ratingEl.textContent = data.rating;
  if (subEl) subEl.textContent = (data.id ? data.id + ' · ' : '') + 'Zone ' + zoneKey;
  if (fillEl) fillEl.style.strokeDashoffset = data.gaugeOffset;
  if (miniBar) miniBar.style.width = data.miniPercent;
  if (miniVal) miniVal.textContent = data.miniPercent;

  const vegHealthEl = document.getElementById('zoneVegHealthVal');
  const fireRiskTopEl = document.getElementById('zoneFireRiskTopVal');
  const waterEl = document.getElementById('zoneWaterVal');
  const wildlifeEl = document.getElementById('zoneWildlifeVal');
  const fireEl = document.getElementById('zoneFireVal');
  const intrusionEl = document.getElementById('zoneIntrusionVal');
  const landslideEl = document.getElementById('zoneLandslideVal');
  const priorityEl = document.getElementById('zonePriorityVal');

  if (vegHealthEl) vegHealthEl.textContent = data.vegHealth;
  if (fireRiskTopEl) fireRiskTopEl.textContent = data.fireRiskTop;
  if (waterEl) waterEl.textContent = data.water;
  if (wildlifeEl) wildlifeEl.textContent = data.wildlife;
  if (fireEl) fireEl.textContent = data.fire;
  if (intrusionEl) intrusionEl.textContent = data.intrusion;
  if (landslideEl) landslideEl.textContent = data.landslide;
  if (priorityEl) {
    priorityEl.textContent = data.priority;
    priorityEl.className = 'z-val ' + (data.priority === 'Critical' ? 'highlight-red' : 'highlight-green');
  }
}

function clearGisMeasurement() {
  gisMeasurePts = [];
  if (gisMeasureLine) {
    gisMap?.removeLayer(gisMeasureLine);
    gisMeasureLine = null;
  }
  gisMeasureMarkers.forEach(m => {
    if (m && m.remove) m.remove();
    else if (gisMap) gisMap.removeLayer(m);
  });
  gisMeasureMarkers = [];
  const infoText = document.getElementById('qaMeasureText');
  if (infoText) {
    infoText.innerHTML = `<span class="material-icons-outlined" style="font-size:14px; color:#00e676;">straighten</span> Click 2 points (inside / outside forest)`;
  }
}

function handleGisMeasureClick(latlng) {
  gisMeasurePts.push([latlng.lat, latlng.lng]);
  const ptLetter = gisMeasurePts.length === 1 ? 'A' : 'B';
  const ptColor = gisMeasurePts.length === 1 ? '#00e676' : '#38bdf8';

  const marker = L.marker(latlng, {
    icon: L.divIcon({
      className: '',
      html: `<div style="width:26px; height:26px; border-radius:50%; background:${ptColor}; color:#0b0f10; font-weight:900; font-size:12px; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 0 12px ${ptColor};">${ptLetter}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    })
  }).addTo(gisMap);
  gisMeasureMarkers.push(marker);

  const infoText = document.getElementById('qaMeasureText');

  if (gisMeasurePts.length === 1) {
    if (infoText) {
      infoText.innerHTML = `<span class="material-icons-outlined" style="font-size:14px; color:#00e676;">location_on</span> Point A set (${latlng.lat.toFixed(3)}°, ${latlng.lng.toFixed(3)}°). Click Point B (inside or outside forest).`;
    }
    showToast(`Point A placed (${latlng.lat.toFixed(3)}°N, ${latlng.lng.toFixed(3)}°E). Now click Point B.`, 'info');
  } else if (gisMeasurePts.length === 2) {
    if (gisMeasureLine) gisMap.removeLayer(gisMeasureLine);
    gisMeasureLine = L.polyline(gisMeasurePts, {
      color: '#00e676',
      weight: 3.5,
      dashArray: '6, 6',
      opacity: 0.95
    }).addTo(gisMap);

    const R = 6371;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(gisMeasurePts[1][0] - gisMeasurePts[0][0]);
    const dLng = toRad(gisMeasurePts[1][1] - gisMeasurePts[0][1]);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(gisMeasurePts[0][0])) * Math.cos(toRad(gisMeasurePts[1][0])) * Math.sin(dLng/2)**2;
    const distKm = 2 * R * Math.asin(Math.sqrt(a));
    const distMi = distKm * 0.621371;

    const midLat = (gisMeasurePts[0][0] + gisMeasurePts[1][0]) / 2;
    const midLng = (gisMeasurePts[0][1] + gisMeasurePts[1][1]) / 2;

    const measurePopup = L.popup({
      closeButton: true,
      autoClose: false,
      closeOnClick: false,
      className: 'gis-measure-result-popup'
    })
      .setLatLng([midLat, midLng])
      .setContent(`
        <div style="font-family: Inter, sans-serif; min-width: 180px; text-align: center; padding: 4px;">
          <div style="font-size: 10px; color: #00f5c4; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Distance Measured</div>
          <div style="font-size: 17px; font-weight: 900; color: #fff; margin: 3px 0;">${distKm.toFixed(2)} km</div>
          <div style="font-size: 11px; color: #8fbca2; margin-bottom: 4px;">≈ ${distMi.toFixed(2)} miles</div>
          <div style="font-size: 9px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">
            Pt A (${gisMeasurePts[0][0].toFixed(3)}°, ${gisMeasurePts[0][1].toFixed(3)}°) &rarr; Pt B (${gisMeasurePts[1][0].toFixed(3)}°, ${gisMeasurePts[1][1].toFixed(3)}°)
          </div>
        </div>
      `)
      .openOn(gisMap);

    gisMeasureMarkers.push(measurePopup);

    if (infoText) {
      infoText.innerHTML = `<span class="material-icons-outlined" style="font-size:14px; color:#00f5c4;">check_circle</span> <b>${distKm.toFixed(2)} km</b> (${distMi.toFixed(2)} mi) measured.`;
    }
    showToast(`Distance: ${distKm.toFixed(2)} km (${distMi.toFixed(2)} miles)`, 'success');

    // Reset points so next click starts a fresh measurement line
    gisMeasurePts = [];
  }
}

function handleGisSosClick(latlng) {
  if (gisSosMarker) gisMap.removeLayer(gisSosMarker);

  gisSosMarker = L.marker(latlng, {
    icon: L.divIcon({
      className: '',
      html: '<div class="gis-pulsing-fire" style="background:rgba(239,68,68,0.3); border-color:#ef4444;"><span class="material-icons-outlined" style="color:#ff1744;">crisis_alert</span></div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    })
  }).addTo(gisMap).bindPopup(`
    <div style="font-family: Inter, sans-serif; min-width: 180px;">
      <b style="color: #ef4444;">EMERGENCY SOS BEACON</b><br>
      GPS: ${latlng.lat.toFixed(4)}°N, ${latlng.lng.toFixed(4)}°E<br>
      <span style="color:#00e676;font-size:10px;">Nearest: Srisailam Range HQ &bull; ETA: ~18 min</span>
    </div>
  `).openPopup();

  showToast(`EMERGENCY SOS: Beacon deployed at ${latlng.lat.toFixed(3)}°N, ${latlng.lng.toFixed(3)}°E`, 'critical');
  gisSosActive = false;
  gisMap.getContainer().style.cursor = '';
}

function initQuickActions() {
  document.getElementById('qaMeasureBtn')?.addEventListener('click', () => {
    gisMeasureActive = !gisMeasureActive;
    const btn = document.getElementById('qaMeasureBtn');
    const infoBar = document.getElementById('qaMeasureInfoBar');

    if (gisMeasureActive) {
      btn?.classList.add('active');
      if (infoBar) infoBar.style.display = 'flex';
      clearGisMeasurement();
      if (gisMap) gisMap.getContainer().style.cursor = 'crosshair';
      showToast('Distance Tool ON: Click any 2 points (inside or outside forest)', 'info');
    } else {
      btn?.classList.remove('active');
      if (infoBar) infoBar.style.display = 'none';
      clearGisMeasurement();
      if (gisMap) gisMap.getContainer().style.cursor = '';
      showToast('Distance Tool disabled', 'info');
    }
  });

  document.getElementById('qaClearMeasureBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearGisMeasurement();
    showToast('Cleared distance measurement', 'info');
  });

  document.getElementById('qaSosBtn')?.addEventListener('click', () => {
    gisSosActive = true;
    if (gisMap) {
      gisMap.getContainer().style.cursor = 'crosshair';
    }
    showToast('🚨 SOS Mode: Click anywhere on map to drop emergency beacon!', 'critical');
  });

  document.getElementById('gisZoneSelect')?.addEventListener('change', (e) => {
    panGisZone(e.target.value);
  });
}


/* =============================================
   Forest Intelligence Screen - Interactive Logic
   ============================================= */

let intelMap = null;
let fraChartInstance = null;
let czRadarInstance = null;

function initIntelMap() {
  const mapContainer = document.getElementById('intelLeafletMap');
  if (!mapContainer || intelMap) return;

  // Center on Nallamala Forest reserve
  intelMap = L.map('intelLeafletMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([15.95, 78.85], 9);

  // Satellite tile layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    errorTileUrl: 'sidebar-forest.jpg'
  }).addTo(intelMap);

  // Nallamala Forest Sanctuary Outer Boundary (Approximate Notified Bounds)
  const nallamalaForestBoundary = [
    [16.72, 78.55], [16.68, 78.72], [16.62, 78.95], [16.58, 79.15], [16.50, 79.30],
    [16.38, 79.28], [16.28, 79.20], [16.18, 79.30], [16.05, 79.35], [15.92, 79.30],
    [15.80, 79.34], [15.68, 79.28], [15.58, 79.20], [15.50, 79.10], [15.40, 78.98],
    [15.32, 78.88], [15.20, 78.80], [15.12, 78.65], [15.18, 78.50], [15.30, 78.42],
    [15.45, 78.38], [15.60, 78.35], [15.72, 78.42], [15.80, 78.35], [15.90, 78.30],
    [16.00, 78.28], [16.10, 78.32], [16.18, 78.28], [16.28, 78.35], [16.36, 78.40],
    [16.44, 78.42], [16.52, 78.38], [16.60, 78.42], [16.68, 78.48], [16.72, 78.55]
  ];

  L.polygon(nallamalaForestBoundary, {
    color: '#e0b04c',
    weight: 2.2,
    fill: false,
    dashArray: '6, 5',
    opacity: 0.95
  }).addTo(intelMap).bindPopup('<b>Nallamala Forest Sanctuary Outer Extent</b><br>Eastern Ghats &bull; Nagarjunsagar–Srisailam Tiger Reserve');

  // Krishna River
  L.polyline([
    [16.66, 78.50], [16.58, 78.68], [16.48, 78.80], [16.35, 78.85], [16.22, 78.88],
    [16.14, 78.90], [16.089, 78.898], [16.02, 78.95], [15.95, 79.05], [15.90, 79.20], [15.85, 79.34]
  ], { color: '#38bdf8', weight: 3.5, opacity: 0.92 }).addTo(intelMap).bindPopup('<b>Krishna River Gorge</b>');

  // 12 Thematic Ecological Zones with Full Resource Intelligence
  const appZones = [
    { num: 1, name: 'Zone 1 (NLM-01) — Amrabad Plateau (N)', resource: 'Teak & Native Hardwood', avail: '78%', regen: '84%', press: '22%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#00f5c4', center: [16.58, 78.58], coords: [[16.72, 78.55], [16.68, 78.72], [16.55, 78.78], [16.45, 78.68], [16.42, 78.52], [16.52, 78.42], [16.62, 78.42], [16.68, 78.48]] },
    { num: 2, name: 'Zone 2 (NLM-02) — Nagarjunasagar Approach', resource: 'Wild Honey & Resins', avail: '68%', regen: '62%', press: '45%', trend: '→ stable', verdict: '⚠️ Regulated Harvest', color: '#a78bfa', center: [16.48, 79.08], coords: [[16.62, 78.95], [16.58, 79.15], [16.50, 79.30], [16.38, 79.28], [16.35, 79.05], [16.42, 78.88], [16.55, 78.85]] },
    { num: 3, name: 'Zone 3 (NLM-03) — Manuguru Ridge', resource: 'Endemic Hardwood', avail: '91%', regen: '75%', press: '12%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#10b981', center: [16.32, 78.88], coords: [[16.45, 78.68], [16.55, 78.78], [16.42, 78.88], [16.35, 79.05], [16.28, 79.20], [16.18, 79.15], [16.12, 78.95], [16.20, 78.78], [16.30, 78.68]] },
    { num: 4, name: 'Zone 4 (NLM-04) — Srisailam Core Plateau', resource: 'Dense Old-Growth Canopy', avail: '94%', regen: '88%', press: '8%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#00e676', center: [16.08, 78.98], coords: [[16.18, 78.78], [16.18, 79.30], [16.05, 79.35], [15.98, 79.10], [15.95, 78.90], [16.00, 78.75], [16.08, 78.72]] },
    { num: 5, name: 'Zone 5 (NLM-05) — Peddacheruvu Basin', resource: 'Aquatic & Riverbank Flora', avail: '64%', regen: '58%', press: '48%', trend: '→ stable', verdict: '💧 Hydrological Buffer', color: '#0284c7', center: [15.89, 79.02], coords: [[15.98, 78.75], [16.00, 78.75], [15.95, 78.90], [15.98, 79.10], [15.92, 79.30], [15.80, 79.34], [15.78, 79.05], [15.82, 78.85], [15.90, 78.78]] },
    { num: 6, name: 'Zone 6 (NLM-06) — Rajiv Gandhi WLS', resource: 'Fodder Grass & Shrubland', avail: '58%', regen: '49%', press: '63%', trend: '↘ seasonal stress', verdict: '⚠️ Grazing Buffer', color: '#fbbf24', center: [15.71, 79.14], coords: [[15.80, 79.34], [15.68, 79.28], [15.62, 79.10], [15.68, 78.95], [15.78, 79.05]] },
    { num: 7, name: 'Zone 7 (NLM-07) — Atmakur Bamboo Circle', resource: 'Bamboo', avail: '82%', regen: '76%', press: '31%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#22c55e', center: [15.79, 78.80], coords: [[15.90, 78.78], [15.82, 78.85], [15.78, 79.05], [15.68, 78.95], [15.70, 78.72], [15.80, 78.62], [15.87, 78.65]] },
    { num: 8, name: 'Zone 8 (NLM-08) — Gundla Brahmeswaram', resource: 'Shorea (Sal) & Resins', avail: '71%', regen: '65%', press: '36%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#84cc16', center: [15.66, 78.78], coords: [[15.80, 78.62], [15.70, 78.72], [15.68, 78.95], [15.62, 79.10], [15.58, 79.00], [15.55, 78.78], [15.60, 78.60], [15.70, 78.55]] },
    { num: 9, name: 'Zone 9 (NLM-09) — Bhairani Konda Ridge', resource: 'Fodder Trees & Canopy', avail: '77%', regen: '70%', press: '22%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#eab308', center: [15.58, 78.57], coords: [[15.70, 78.55], [15.60, 78.60], [15.55, 78.78], [15.50, 78.70], [15.48, 78.50], [15.58, 78.42], [15.68, 78.42]], dash: '6, 6' },
    { num: 10, name: 'Zone 10 (NLM-10) — Dornala Sandalwood', resource: 'Red Sandalwood & Agarwood', avail: '52%', regen: '38%', press: '72%', trend: '↓ declining', verdict: '🔴 High conservation priority', color: '#f97316', center: [15.53, 79.01], coords: [[15.58, 79.00], [15.62, 79.10], [15.58, 79.20], [15.50, 79.10], [15.40, 78.98], [15.45, 78.85], [15.55, 78.78]] },
    { num: 11, name: 'Zone 11 (NLM-11) — Markapur Foothills', resource: 'Peatlands & Rare Ferns', avail: '85%', regen: '79%', press: '15%', trend: '↗ healthy', verdict: '🪵 Sustainable', color: '#06b6d4', center: [15.40, 78.84], coords: [[15.50, 79.10], [15.40, 78.98], [15.32, 78.88], [15.28, 78.72], [15.38, 78.62], [15.48, 78.70], [15.45, 78.85]] },
    { num: 12, name: 'Zone 12 (NLM-12) — Giddalur Basin', resource: 'Medicinal plants', avail: '45%', regen: '28%', press: '79%', trend: '↓ declining', verdict: '🔴 High conservation priority', color: '#ef4444', center: [15.25, 78.60], coords: [[15.28, 78.72], [15.20, 78.80], [15.12, 78.65], [15.18, 78.50], [15.30, 78.42], [15.38, 78.55], [15.38, 78.62]] }
  ];

  appZones.forEach(z => {
    L.polygon(z.coords, {
      color: z.color,
      weight: 2.0,
      dashArray: z.dash || null,
      fillColor: z.color,
      fillOpacity: (z.num === 10 || z.num === 12) ? 0.40 : 0.28
    }).addTo(intelMap).bindPopup(`
      <div style="min-width: 200px; font-family: Inter, sans-serif;">
        <div style="font-weight: 800; font-size: 12px; color: ${z.color}; margin-bottom: 4px;">${z.name} — ${z.resource}</div>
        <div style="font-size: 9.5px; color: #cce8d7; line-height: 1.45;">
          <div>Availability: <b>${z.avail}</b> &bull; Regeneration: <b>${z.regen}</b></div>
          <div>Extraction pressure: <b style="color:${parseInt(z.press) > 60 ? '#ef4444' : '#ffab40'};">${z.press}</b></div>
          <div style="margin-top: 3px;">Trend: <b>${z.trend}</b> &rarr; <b>${z.verdict}</b></div>
        </div>
      </div>
    `);

    addThematicLabel(z.center[0], z.center[1], 'NLM-' + (z.num < 10 ? '0' + z.num : z.num) + ': ' + z.resource.split(' ')[0], 'zone' + z.num);
  });
}

function addThematicLabel(lat, lng, text, type) {
  if (!intelMap) return;
  const icon = L.divIcon({
    className: '',
    html: '<div class="intel-zone-pill-label ' + type + '">' + text + '</div>',
    iconSize: [110, 22],
    iconAnchor: [55, 11]
  });
  L.marker([lat, lng], { icon: icon, interactive: false }).addTo(intelMap);
}

/* ---------- Forest Resource Analytics – per-tab data ---------- */
const fraTabData = {
  Trees: {
    label: 'Forest Cover Trend \u00b7 Last six months',
    stat: 'Current: <b class="fra-stat-badge">284K ha</b> (Change: +2.3%)',
    data: [272, 274, 276, 279, 281, 284],
    color: '#00e676',
    gradientTop: 'rgba(0, 230, 118, 0.45)',
    gradientBottom: 'rgba(0, 230, 118, 0.0)'
  },
  Water: {
    label: 'Water Resource Level \u00b7 Last six months',
    stat: 'Current: <b class="fra-stat-badge" style="color:#38bdf8">78.4%</b> (Change: <span style="color:#ff5252">\u22121.8%</span>)',
    data: [82.5, 81.2, 80.6, 79.8, 79.1, 78.4],
    color: '#38bdf8',
    gradientTop: 'rgba(56, 189, 248, 0.45)',
    gradientBottom: 'rgba(56, 189, 248, 0.0)'
  },
  Soil: {
    label: 'Soil Health Index \u00b7 Last six months',
    stat: 'Current: <b class="fra-stat-badge" style="color:#ff9800">72.1 SHI</b> (Change: +3.5%)',
    data: [65.2, 66.8, 68.1, 69.7, 71.0, 72.1],
    color: '#ff9800',
    gradientTop: 'rgba(255, 152, 0, 0.45)',
    gradientBottom: 'rgba(255, 152, 0, 0.0)'
  },
  Biodiversity: {
    label: 'Species Diversity Index \u00b7 Last six months',
    stat: 'Current: <b class="fra-stat-badge" style="color:#ab47bc">8.6 SDI</b> (Change: +4.1%)',
    data: [7.8, 8.0, 8.1, 8.3, 8.4, 8.6],
    color: '#ab47bc',
    gradientTop: 'rgba(171, 71, 188, 0.45)',
    gradientBottom: 'rgba(171, 71, 188, 0.0)'
  }
};

function initFraChart(tabName) {
  const canvas = document.getElementById('fraChartCanvas');
  if (!canvas || typeof Chart === 'undefined') return;

  if (fraChartInstance) fraChartInstance.destroy();

  const tab = tabName || 'Trees';
  const cfg = fraTabData[tab];
  if (!cfg) return;

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.parentElement.offsetHeight || 110);
  gradient.addColorStop(0, cfg.gradientTop);
  gradient.addColorStop(1, cfg.gradientBottom);

  fraChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [{
        data: cfg.data,
        borderColor: cfg.color,
        borderWidth: 2,
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: cfg.color,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: cfg.color,
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(5,16,10,0.92)',
          titleColor: '#e8f7ee',
          bodyColor: cfg.color,
          borderColor: cfg.color,
          borderWidth: 1,
          cornerRadius: 6,
          padding: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#8fbca2', font: { size: 8 } }
        },
        y: {
          grid: { color: 'rgba(20, 56, 38, 0.4)' },
          ticks: { color: '#8fbca2', font: { size: 8 }, maxTicksLimit: 4 }
        }
      }
    }
  });

  /* Update the meta row text */
  const metaLabel = document.getElementById('fraMetaLabel');
  const metaStat  = document.getElementById('fraMetaStat');
  if (metaLabel) metaLabel.textContent = cfg.label;
  if (metaStat)  metaStat.innerHTML   = cfg.stat;
}

function initCzRadarChart() {
  const canvas = document.getElementById('czRadarCanvas');
  if (!canvas || typeof Chart === 'undefined') return;

  if (czRadarInstance) czRadarInstance.destroy();

  const ctx = canvas.getContext('2d');
  czRadarInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Vegetation', 'Water', 'Carbon', 'Biodiversity', 'Forest cover', 'Soil', 'Stability'],
      datasets: [
        {
          label: 'Zone 4',
          data: [85, 78, 92, 88, 86, 80, 90],
          borderColor: '#00e676',
          backgroundColor: 'rgba(0, 230, 118, 0.25)',
          borderWidth: 1.5,
          pointRadius: 1.5
        },
        {
          label: 'Zone 7',
          data: [70, 88, 65, 80, 72, 75, 78],
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.25)',
          borderWidth: 1.5,
          pointRadius: 1.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          angleLines: { color: 'rgba(20, 56, 38, 0.6)' },
          grid: { color: 'rgba(20, 56, 38, 0.6)' },
          pointLabels: { color: '#8fbca2', font: { size: 6.5 } },
          ticks: { display: false, maxTicksLimit: 3 }
        }
      }
    }
  });
}

function switchIntelSubNav(el, tabName) {
  document.querySelectorAll('.intel-nav-link').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
  showToast('Switched intelligence sub-view: ' + tabName, 'info');
}

function switchAiInsightTab(btn, tab) {
  btn.parentElement.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showToast('Displaying ' + tab + ' stream', 'info');
}

function switchFraTab(el) {
  el.parentElement.querySelectorAll('.fra-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const tabName = el.textContent.trim();
  initFraChart(tabName);
  showToast('Resource trend updated: ' + tabName, 'info');
}


/* =============================================
   Analytics & Reports Screen - Interactive Logic
   ============================================= */

let fpotChartInstance = null;
let resTrendChartInstance = null;
let etChartInstance = null;

function initAnalyticsCharts() {
  initFpotChart();
  initResTrendChart();
  initEtChart();
}

function initFpotChart() {
  const canvas = document.getElementById('fpotChartCanvas');
  if (!canvas || typeof Chart === 'undefined') return;

  if (fpotChartInstance) fpotChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  fpotChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Forest Cover',
          data: [74, 76, 75, 82],
          borderColor: '#00f5c4',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#00f5c4'
        },
        {
          label: 'Vegetation Health',
          data: [80, 82, 81, 88],
          borderColor: '#00e676',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#00e676'
        },
        {
          label: 'Water Availability',
          data: [68, 72, 70, 78],
          borderColor: '#38bdf8',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#38bdf8'
        },
        {
          label: 'Biodiversity',
          data: [65, 68, 71, 79],
          borderColor: '#ff9800',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#ff9800'
        },
        {
          label: 'Ecosystem Stability',
          data: [62, 65, 66, 74],
          borderColor: '#00bfa5',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: '#00bfa5'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#8fbca2', font: { size: 9 } }
        },
        y: {
          min: 50,
          max: 100,
          grid: { color: 'rgba(20, 56, 38, 0.4)' },
          ticks: { color: '#8fbca2', font: { size: 8.5 }, stepSize: 10 }
        }
      }
    }
  });
}

function initResTrendChart() {
  const canvas = document.getElementById('resTrendCanvas');
  if (!canvas || typeof Chart === 'undefined') return;

  if (resTrendChartInstance) resTrendChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  resTrendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Utilization',
          data: [72, 75, 78, 84],
          borderColor: '#00f5c4',
          borderWidth: 1.5,
          pointRadius: 2,
          tension: 0.3
        },
        {
          label: 'Maintenance',
          data: [25, 20, 18, 15],
          borderColor: '#ff9800',
          borderWidth: 1.5,
          pointRadius: 2,
          tension: 0.3
        },
        {
          label: 'Availability',
          data: [85, 88, 86, 92],
          borderColor: '#00e676',
          borderWidth: 1.5,
          pointRadius: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8fbca2', font: { size: 7.5 } } },
        y: { grid: { color: 'rgba(20, 56, 38, 0.4)' }, ticks: { color: '#8fbca2', font: { size: 7.5 }, maxTicksLimit: 3 } }
      }
    }
  });
}

function initEtChart() {
  const canvas = document.getElementById('etChartCanvas');
  if (!canvas || typeof Chart === 'undefined') return;

  if (etChartInstance) etChartInstance.destroy();

  const ctx = canvas.getContext('2d');
  etChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          data: [55, 62, 70, 68, 75, 82],
          borderColor: '#00e676',
          borderWidth: 1.5,
          pointRadius: 2,
          tension: 0.3
        },
        {
          data: [45, 52, 58, 65, 62, 70],
          borderColor: '#38bdf8',
          borderWidth: 1.5,
          pointRadius: 2,
          tension: 0.3
        },
        {
          data: [35, 40, 48, 52, 58, 60],
          borderColor: '#ff9800',
          borderWidth: 1.5,
          pointRadius: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8fbca2', font: { size: 7.5 } } },
        y: { grid: { color: 'rgba(20, 56, 38, 0.4)' }, ticks: { color: '#8fbca2', font: { size: 7.5 }, maxTicksLimit: 3 } }
      }
    }
  });
}

function switchAnaSubNav(el, tab) {
  document.querySelectorAll('.ana-nav-link').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
  showToast('Switched Analytics report view: ' + tab, 'info');
}
/* =============================================
   Ranger Management Screen - Application Logic
   ============================================= */

let rangerMap = null;
let rangerMarkers = {};

const RANGER_DB = {
  'RG-001': {
    id: 'RG-001',
    name: 'Arjun Kumar',
    rank: 'Forest Guard',
    zone: 'Zone 4 (North)',
    status: 'On Duty',
    statusClass: 'status-pill-duty',
    phone: '+91 98765 43210',
    email: 'arjun.k@forest.gov.in',
    patrols: 12,
    incidents: 1,
    exp: '3 yrs',
    avatar: 'assets/ranger.jpg',
    coords: [10.56, 76.96]
  },
  'RG-002': {
    id: 'RG-002',
    name: 'Priya Sharma',
    rank: 'Forest Guard',
    zone: 'Zone 7 (East)',
    status: 'On Duty',
    statusClass: 'status-pill-duty',
    phone: '+91 87654 32109',
    email: 'priya.s@forest.gov.in',
    patrols: 14,
    incidents: 2,
    exp: '4 yrs',
    avatar: 'assets/ranger.jpg',
    coords: [10.51, 77.02]
  },
  'RG-003': {
    id: 'RG-003',
    name: 'Suresh Babu',
    rank: 'Ranger',
    zone: 'Zone 9 (South)',
    status: 'On Duty',
    statusClass: 'status-pill-duty',
    phone: '+91 93456 78901',
    email: 'suresh.b@forest.gov.in',
    patrols: 19,
    incidents: 3,
    exp: '6 yrs',
    avatar: 'assets/ranger.jpg',
    coords: [10.37, 76.96]
  },
  'RG-004': {
    id: 'RG-004',
    name: 'Lakshmi Devi',
    rank: 'Forest Guard',
    zone: 'Zone 12 (Central)',
    status: 'On Leave',
    statusClass: 'status-pill-leave',
    phone: '+91 91234 56789',
    email: 'lakshmi.d@forest.gov.in',
    patrols: 8,
    incidents: 0,
    exp: '2 yrs',
    avatar: 'assets/ranger.jpg',
    coords: [10.45, 76.87]
  },
  'RG-005': {
    id: 'RG-005',
    name: 'Karthik Raj',
    rank: 'Ranger',
    zone: 'Zone 3 (West)',
    status: 'On Duty',
    statusClass: 'status-pill-duty',
    phone: '+91 99876 54321',
    email: 'karthik.r@forest.gov.in',
    patrols: 16,
    incidents: 1,
    exp: '5 yrs',
    avatar: 'assets/ranger.jpg',
    coords: [10.43, 77.05]
  },
  'RG-006': {
    id: 'RG-006',
    name: 'Mohammed Ali',
    rank: 'Forest Guard',
    zone: 'Training Center',
    status: 'In Training',
    statusClass: 'status-pill-training',
    phone: '+91 90123 45678',
    email: 'mohammed.a@forest.gov.in',
    patrols: 4,
    incidents: 0,
    exp: '1 yr',
    avatar: 'assets/ranger.jpg',
    coords: [10.58, 76.91]
  }
};

function selectRangerProfile(rangerId) {
  const r = RANGER_DB[rangerId];
  if (!r) return;

  // Update right-side profile card
  const nameEl = document.getElementById('rpName');
  const rankEl = document.getElementById('rpRank');
  const idEl = document.getElementById('rpId');
  const statusEl = document.getElementById('rpStatus');
  const locEl = document.getElementById('rpLocation');
  const phoneEl = document.getElementById('rpPhone');
  const emailEl = document.getElementById('rpEmail');
  const patrolsEl = document.getElementById('rpPatrols');
  const incidentsEl = document.getElementById('rpIncidents');
  const expEl = document.getElementById('rpExp');

  if (nameEl) nameEl.textContent = r.name;
  if (rankEl) rankEl.textContent = r.rank;
  if (idEl) idEl.textContent = r.id;
  if (statusEl) {
    statusEl.textContent = r.status;
    statusEl.className = r.statusClass;
  }
  if (locEl) locEl.textContent = r.zone;
  if (phoneEl) phoneEl.textContent = r.phone;
  if (emailEl) emailEl.textContent = r.email;
  if (patrolsEl) patrolsEl.textContent = r.patrols;
  if (incidentsEl) incidentsEl.textContent = r.incidents;
  if (expEl) expEl.textContent = r.exp;

  // Highlight selected row
  const rows = document.querySelectorAll('#rangerPersonnelTable tbody tr');
  rows.forEach(tr => {
    if (tr.getAttribute('data-id') === rangerId) {
      tr.classList.add('selected-row');
    } else {
      tr.classList.remove('selected-row');
    }
  });

  // Pan map to ranger if available
  if (rangerMap && r.coords) {
    rangerMap.panTo(r.coords, { animate: true, duration: 0.8 });
    if (rangerMarkers[rangerId]) {
      rangerMarkers[rangerId].openPopup();
    }
  }

  showToast(`Loaded details for ${r.name} (${r.id})`, 'info');
}

function filterRangerPersonnel() {
  const searchVal = (document.getElementById('rangerSearchInput')?.value || '').toLowerCase().trim();
  const zoneVal = document.getElementById('rangerFilterZone')?.value || 'all';
  const statusVal = document.getElementById('rangerFilterStatus')?.value || 'all';
  const rankVal = document.getElementById('rangerFilterRank')?.value || 'all';

  const rows = document.querySelectorAll('#rangerPersonnelTable tbody tr');
  rows.forEach(tr => {
    const text = tr.innerText.toLowerCase();
    const matchesSearch = !searchVal || text.includes(searchVal);
    const matchesZone = zoneVal === 'all' || text.includes(zoneVal.toLowerCase());
    const matchesStatus = statusVal === 'all' || text.includes(statusVal.toLowerCase());
    const matchesRank = rankVal === 'all' || text.includes(rankVal.toLowerCase());

    if (matchesSearch && matchesZone && matchesStatus && matchesRank) {
      tr.style.display = '';
    } else {
      tr.style.display = 'none';
    }
  });
}

function initRangerMap() {
  const mapContainer = document.getElementById('rangerLeafletMap');
  if (!mapContainer || rangerMap) return;

  rangerMap = L.map('rangerLeafletMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([10.49, 76.97], 11);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    errorTileUrl: 'sidebar-forest.jpg'
  }).addTo(rangerMap);

  // Define tactical zones
  // 1. Zone 4 (Blue boundary)
  L.polygon([
    [10.52, 76.92], [10.59, 76.94], [10.60, 77.01], [10.53, 76.99]
  ], {
    color: '#38bdf8',
    weight: 2,
    fillColor: '#38bdf8',
    fillOpacity: 0.18
  }).addTo(rangerMap).bindPopup('<b>Zone 4 Sector</b><br>North Reserve &middot; 2 Rangers Active');

  // Label: Zone 4
  const z4Label = L.divIcon({
    className: 'zone-label-clean',
    html: '<span style="color:#38bdf8; font-weight:800; font-size:11px; text-shadow:0 0 4px #000;">Zone 4</span>',
    iconSize: [50, 16]
  });
  L.marker([10.56, 76.96], { icon: z4Label, interactive: false }).addTo(rangerMap);

  // 2. Zone 7 (Green boundary)
  L.polygon([
    [10.46, 76.98], [10.53, 77.01], [10.52, 77.08], [10.45, 77.06]
  ], {
    color: '#00e676',
    weight: 2,
    fillColor: '#00e676',
    fillOpacity: 0.22
  }).addTo(rangerMap).bindPopup('<b>Zone 7 Sector</b><br>East Sector &middot; High Canopy');

  const z7Label = L.divIcon({
    className: 'zone-label-clean',
    html: '<span style="color:#00e676; font-weight:800; font-size:11px; text-shadow:0 0 4px #000;">Zone 7</span>',
    iconSize: [50, 16]
  });
  L.marker([10.49, 77.03], { icon: z7Label, interactive: false }).addTo(rangerMap);

  // 3. Zone 12 (Red boundary - Emergency Alert)
  L.polygon([
    [10.41, 76.84], [10.48, 76.85], [10.47, 76.92], [10.40, 76.90]
  ], {
    color: '#ff5252',
    weight: 2,
    fillColor: '#ff5252',
    fillOpacity: 0.24
  }).addTo(rangerMap).bindPopup('<b>Zone 12 Sector (Alert)</b><br>Incident Active &middot; Critical monitoring');

  const z12Label = L.divIcon({
    className: 'zone-label-clean',
    html: '<span style="color:#ff5252; font-weight:800; font-size:11px; text-shadow:0 0 4px #000;">Zone 12</span>',
    iconSize: [50, 16]
  });
  L.marker([10.445, 76.88], { icon: z12Label, interactive: false }).addTo(rangerMap);

  // 4. Zone 3 (Amber boundary)
  L.polygon([
    [10.38, 77.01], [10.45, 77.03], [10.44, 77.10], [10.37, 77.08]
  ], {
    color: '#ff9800',
    weight: 2,
    fillColor: '#ff9800',
    fillOpacity: 0.18
  }).addTo(rangerMap).bindPopup('<b>Zone 3 Sector</b><br>West Ridgeline');

  const z3Label = L.divIcon({
    className: 'zone-label-clean',
    html: '<span style="color:#ff9800; font-weight:800; font-size:11px; text-shadow:0 0 4px #000;">Zone 3</span>',
    iconSize: [50, 16]
  });
  L.marker([10.41, 77.05], { icon: z3Label, interactive: false }).addTo(rangerMap);

  // Ranger Markers
  // On Duty Marker Icon
  function createRangerMarkerIcon(type) {
    let color = '#00e676';
    let iconName = 'person';
    if (type === 'patrol') { color = '#38bdf8'; }
    if (type === 'alert') { color = '#ff5252'; iconName = 'warning'; }

    return L.divIcon({
      className: 'rm-icon-wrapper',
      html: `<div style="width:20px;height:20px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 8px ${color};display:flex;align-items:center;justify-content:center;color:#05100a;font-size:11px;font-weight:900;">
        <span class="material-icons-outlined" style="font-size:12px;">${iconName}</span>
      </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }

  // Arjun Kumar in Zone 4
  const m1 = L.marker([10.56, 76.96], { icon: createRangerMarkerIcon('duty') })
    .addTo(rangerMap)
    .bindPopup('<b>RG-001 Arjun Kumar</b><br>Zone 4 (North) &middot; On Duty')
    .on('click', () => selectRangerProfile('RG-001'));
  rangerMarkers['RG-001'] = m1;

  // Priya Sharma in Zone 7
  const m2 = L.marker([10.51, 77.02], { icon: createRangerMarkerIcon('patrol') })
    .addTo(rangerMap)
    .bindPopup('<b>RG-002 Priya Sharma</b><br>Zone 7 (East) &middot; In Patrol')
    .on('click', () => selectRangerProfile('RG-002'));
  rangerMarkers['RG-002'] = m2;

  // Emergency Alert Marker in Zone 12
  const mAlert = L.marker([10.44, 76.87], { icon: createRangerMarkerIcon('alert') })
    .addTo(rangerMap)
    .bindPopup('<b>EMERGENCY ALERT (Zone 12)</b><br>Dispatched: Rapid Response Unit')
    .on('click', () => selectRangerProfile('RG-004'));

  // Suresh Babu in Zone 9
  const m3 = L.marker([10.37, 76.96], { icon: createRangerMarkerIcon('duty') })
    .addTo(rangerMap)
    .bindPopup('<b>RG-003 Suresh Babu</b><br>Zone 9 (South) &middot; On Duty')
    .on('click', () => selectRangerProfile('RG-003'));
  rangerMarkers['RG-003'] = m3;

  // Karthik Raj in Zone 3
  const m5 = L.marker([10.43, 77.05], { icon: createRangerMarkerIcon('duty') })
    .addTo(rangerMap)
    .bindPopup('<b>RG-005 Karthik Raj</b><br>Zone 3 (West) &middot; On Duty')
    .on('click', () => selectRangerProfile('RG-005'));
  rangerMarkers['RG-005'] = m5;
}

function resetRangerMapView() {
  if (rangerMap) {
    rangerMap.setView([10.49, 76.97], 11, { animate: true });
    showToast('Reset Ranger Map View', 'info');
  }
}

function toggleRangerMapLayers() {
  showToast('Toggled Ranger GIS Map Overlays', 'info');
}

function viewRangerDetails(rangerId) {
  selectRangerProfile(rangerId);
  const r = RANGER_DB[rangerId];
  if (r) {
    showToast(`Displaying telemetry & logs for ${r.name} (${r.id})`, 'info');
  }
}

function viewPatrolDetails(patrolId) {
  showToast(`Patrol ${patrolId} active telemetry: GPS live stream synced.`, 'info');
}

function viewReportDetails(reportId) {
  showToast(`Opening field report ${reportId} details...`, 'info');
}

function callContact(name, phone) {
  showToast(`Initiating priority dispatch radio link to ${name} (${phone})`, 'info');
}

function openAddRangerModal() {
  showToast('Opening Ranger Onboarding & Deployment Console...', 'info');
}

function viewRangerProfileModal() {
  const name = document.getElementById('rpName')?.textContent || 'Ranger';
  showToast(`Opening complete service record & credentials for ${name}...`, 'info');
}

function openRangerChatModal() {
  const name = document.getElementById('rpName')?.textContent || 'Ranger';
  showToast(`Opening direct tactical field intercom with ${name}...`, 'info');
}

function openAssignPatrolModal() {
  showToast('Opening Patrol Route & Sector Assignment Dispatch...', 'info');
}

function openCreatePatrolModal() {
  showToast('Creating new tactical patrol route...', 'info');
}

function openBulkAssignmentModal() {
  showToast('Opening Sector Bulk Ranger Deployment Manager...', 'info');
}

function generateRangerReport() {
  showToast('Generating Field Readiness & Ranger Audit PDF report...', 'info');
}

function openTrainingModal() {
  showToast('Opening Ranger Certifications & Academy Training Matrix...', 'info');
}

// Sub-nav tab switching
document.addEventListener('DOMContentLoaded', () => {
  const subnavBtns = document.querySelectorAll('.rng-nav-link');
  subnavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subnavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Switched to Ranger ${btn.textContent} view`, 'info');
    });
  });

  const ptabBtns = document.querySelectorAll('.ptab-btn');
  ptabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ptabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Filter patrols: ${btn.textContent}`, 'info');
    });
  });

  const radTabs = document.querySelectorAll('.rad-tab');
  radTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      radTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Showing Ranger activity for: ${btn.textContent}`, 'info');
    });
  });

  const rdeployPills = document.querySelectorAll('.rdeploy-pill');
  rdeployPills.forEach(btn => {
    btn.addEventListener('click', () => {
      rdeployPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Deployment filter: ${btn.textContent}`, 'info');
    });
  });
});



/* =============================================
   RESOURCE MANAGEMENT LOGIC & MAP INITIALIZATION
   ============================================= */
let resAllocMap = null;

const resourceItemDb = {
  'RES-001': {
    title: 'RES-001',
    name: 'Fire Tender',
    cat: 'Fire Equipment',
    catIcon: 'fire_truck',
    location: 'Station A',
    condition: 'Excellent',
    condClass: 'res-badge-success',
    status: 'Operational',
    fuel: '94%',
    fuelPct: 94,
    battery: '98%',
    batteryPct: 98,
    team: 'Fire Unit Alpha',
    service: 'Apr 02, 2025',
    usage: '84 hours',
    trail: 'Station A &rarr; Zone 4 (Standby)',
    img: 'assets/extinguisher.jpg'
  },
  'RES-014': {
    title: 'RES-014',
    name: 'Forest Patrol Vehicle',
    cat: 'Vehicle',
    catIcon: 'directions_car',
    location: 'Zone 9',
    condition: 'Good Condition',
    condClass: 'res-badge-success',
    status: 'Operational',
    fuel: '86%',
    fuelPct: 86,
    battery: '87%',
    batteryPct: 87,
    team: 'None',
    service: 'Apr 18, 2025',
    usage: '126 hours',
    trail: 'Zone 7 &rarr; Zone 9',
    img: 'assets/jeep.jpg'
  },
  'RES-027': {
    title: 'RES-027',
    name: 'Drone Unit',
    cat: 'Drone',
    catIcon: 'flight',
    location: 'HQ',
    condition: 'Excellent',
    condClass: 'res-badge-success',
    status: 'Operational',
    fuel: 'N/A',
    fuelPct: 100,
    battery: '92%',
    batteryPct: 92,
    team: 'Surveillance Flight Alpha',
    service: 'Apr 12, 2025',
    usage: '42 hours',
    trail: 'HQ &rarr; Perimeter Patrol',
    img: 'assets/drone.jpg'
  },
  'RES-041': {
    title: 'RES-041',
    name: 'First Aid Kit',
    cat: 'Medical',
    catIcon: 'medical_services',
    location: 'Station B',
    condition: 'Good Condition',
    condClass: 'res-badge-success',
    status: 'Low Stock Alert',
    fuel: 'N/A',
    fuelPct: 47,
    battery: 'N/A',
    batteryPct: 100,
    team: 'Medical Staging',
    service: 'Mar 28, 2025',
    usage: '18 deployments',
    trail: 'Central Depot &rarr; Station B',
    img: 'assets/medkit.jpg'
  },
  'RES-052': {
    title: 'RES-052',
    name: 'Satellite Radio',
    cat: 'Communication',
    catIcon: 'sensors',
    location: 'Zone 9',
    condition: 'Good Condition',
    condClass: 'res-badge-success',
    status: 'Field Deployment',
    fuel: 'N/A',
    fuelPct: 100,
    battery: '96%',
    batteryPct: 96,
    team: 'Ranger Team 04',
    service: 'Apr 10, 2025',
    usage: '310 hours',
    trail: 'Station B &rarr; Ranger Team 04',
    img: 'assets/pin.jpg'
  },
  'RES-063': {
    title: 'RES-063',
    name: 'Water Tank',
    cat: 'Water Supply',
    catIcon: 'water_drop',
    location: 'Zone 12',
    condition: 'Fair (Maintenance Required)',
    condClass: 'res-badge-warning',
    status: 'Under Maintenance',
    fuel: 'N/A',
    fuelPct: 40,
    battery: 'N/A',
    batteryPct: 100,
    team: 'Logistics Division',
    service: 'Jan 22, 2025',
    usage: '450 hours',
    trail: 'Depot &rarr; Zone 12',
    img: 'assets/tree.jpg'
  }
};

function initResourceMap() {
  const mapContainer = document.getElementById('resAllocMap');
  if (!mapContainer || resAllocMap) return;

  resAllocMap = L.map('resAllocMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([10.51, 76.99], 11);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    errorTileUrl: 'sidebar-forest.jpg'
  }).addTo(resAllocMap);

  // 1. Zone 4 (Red Pin - High Demand)
  const z4Icon = L.divIcon({
    className: 'res-zone-pin pin-red',
    html: '<div style="background:#ff5252; color:#fff; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:12px; border:1px solid #fff; box-shadow:0 0 8px #ff5252; white-space:nowrap;">📍 Zone 4</div>',
    iconSize: [60, 20]
  });
  L.marker([10.56, 76.95], { icon: z4Icon }).addTo(resAllocMap)
    .bindPopup('<b>Zone 4 Demand: CRITICAL</b><br>Active Fire Response &bull; Shortage of 1 Fire Tender, 2 Water Tanks');

  // 2. Zone 7 (Green Pin - Normal)
  const z7Icon = L.divIcon({
    className: 'res-zone-pin pin-green',
    html: '<div style="background:#00e676; color:#051910; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:12px; border:1px solid #fff; box-shadow:0 0 8px #00e676; white-space:nowrap;">📍 Zone 7</div>',
    iconSize: [60, 20]
  });
  L.marker([10.52, 77.05], { icon: z7Icon }).addTo(resAllocMap)
    .bindPopup('<b>Zone 7 Demand: NORMAL</b><br>Wildlife Conflict Monitoring &bull; 28 Assets Stationed');

  // 3. Zone 9 (Blue Pin - Available Surplus)
  const z9Icon = L.divIcon({
    className: 'res-zone-pin pin-blue',
    html: '<div style="background:#38bdf8; color:#051910; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:12px; border:1px solid #fff; box-shadow:0 0 8px #38bdf8; white-space:nowrap;">📍 Zone 9</div>',
    iconSize: [60, 20]
  });
  L.marker([10.49, 76.99], { icon: z9Icon }).addTo(resAllocMap)
    .bindPopup('<b>Zone 9 Status: AVAILABLE</b><br>Vehicle RES-014 idle &bull; Ready for redeployment');

  // 4. Zone 12 (Yellow Pin - Low Resources)
  const z12Icon = L.divIcon({
    className: 'res-zone-pin pin-yellow',
    html: '<div style="background:#ffb300; color:#051910; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:12px; border:1px solid #fff; box-shadow:0 0 8px #ffb300; white-space:nowrap;">📍 Zone 12</div>',
    iconSize: [65, 20]
  });
  L.marker([10.44, 76.92], { icon: z12Icon }).addTo(resAllocMap)
    .bindPopup('<b>Zone 12 Status: LOW RESOURCES</b><br>Water Tank WT-003 in repair &bull; Refill pipeline queued');
}

function selectResourceItem(resId) {
  const item = resourceItemDb[resId];
  if (!item) return;

  // Highlight row in table
  const rows = document.querySelectorAll('#resInventoryTable tbody tr');
  rows.forEach(r => {
    if (r.getAttribute('data-id') === resId) {
      r.classList.add('selected');
      const pill = r.querySelector('.res-view-pill');
      if (pill) pill.classList.add('active');
    } else {
      r.classList.remove('selected');
      const pill = r.querySelector('.res-view-pill');
      if (pill) pill.classList.remove('active');
    }
  });

  // Update Detail Card
  const titleEl = document.getElementById('rdDetailTitle');
  const subEl = document.getElementById('rdDetailSub');
  const catEl = document.getElementById('rdDetailCat');
  const locEl = document.getElementById('rdDetailLoc');
  const statusEl = document.getElementById('rdDetailStatus');
  const condEl = document.getElementById('rdDetailCond');
  const fuelEl = document.getElementById('rdDetailFuel');
  const fuelFill = document.getElementById('rdDetailFuelFill');
  const battEl = document.getElementById('rdDetailBatt');
  const battFill = document.getElementById('rdDetailBattFill');
  const teamEl = document.getElementById('rdDetailTeam');
  const servEl = document.getElementById('rdDetailService');
  const usageEl = document.getElementById('rdDetailUsage');
  const trailEl = document.getElementById('rdDetailTrail');
  const imgEl = document.getElementById('rdDetailImg');

  if (titleEl) titleEl.textContent = item.title;
  if (subEl) subEl.textContent = item.name;
  if (catEl) catEl.innerHTML = '<span class="material-icons-outlined sm-ico">' + item.catIcon + '</span> ' + item.cat;
  if (locEl) locEl.innerHTML = '<span class="material-icons-outlined sm-ico text-green">place</span> ' + item.location;
  if (statusEl) statusEl.innerHTML = '<span class="material-icons-outlined sm-ico">battery_charging_full</span> ' + item.status;
  if (condEl) {
    condEl.textContent = item.condition;
    condEl.className = item.condClass || 'res-badge-success';
  }
  if (fuelEl) fuelEl.textContent = item.fuel;
  if (fuelFill) fuelFill.style.width = item.fuelPct + '%';
  if (battEl) battEl.textContent = item.battery;
  if (battFill) battFill.style.width = item.batteryPct + '%';
  if (teamEl) teamEl.textContent = item.team;
  if (servEl) servEl.textContent = item.service;
  if (usageEl) usageEl.textContent = item.usage;
  if (trailEl) trailEl.innerHTML = '<span class="material-icons-outlined sm-ico">near_me</span> ' + item.trail;
  if (imgEl && item.img) imgEl.src = item.img;
}

function handleResourceSearch(val) {
  val = (val || '').toLowerCase().trim();
  const rows = document.querySelectorAll('#resInventoryTable tbody tr');
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(val) ? '' : 'none';
  });
}

function initResourceSubnav() {
  const pills = document.querySelectorAll('.res-nav-pill');
  if (!pills.length) return;

  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      const cat = p.getAttribute('data-cat');
      const rows = document.querySelectorAll('#resInventoryTable tbody tr');
      rows.forEach(r => {
        if (cat === 'all' || r.getAttribute('data-cat') === cat) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
      });
      showResourceToast('Filtering category: ' + p.textContent.trim());
    });
  });
}

function applyAiRecommendation() {
  showResourceToast('Recommendation Applied: Vehicle RES-014 en route from Zone 9 to Zone 4');
  selectResourceItem('RES-014');
}

function viewAiReasoning() {
  alert('AI Optimizer Reasoning:\n\n• REQ-0247 in Zone 4 requires high mobility fire response.\n• RES-014 in Zone 9 has 86% fuel, 87% battery, and zero active tasks.\n• Rerouting distance: 8.4 km along North Access Highway.\n• Expected response time: 9.2 minutes (31% faster than Station A reserve).');
}

function optimizeAllocation(reqId) {
  showResourceToast('Optimization calculated for ' + reqId + ': Auto-filling 1 Fire Tender from Zone 9');
}

function assignAllocation(reqId) {
  showResourceToast('Assigned resources to ' + reqId + ' &bull; Patrol dispatched');
}

function allocateDirect(reqId) {
  showResourceToast('Direct allocation initiated for ' + reqId + ' (Zone 7)');
}

function openAddResourceModal() {
  const name = prompt('Enter new Resource Name:', 'All-Terrain ATV');
  if (name) {
    showResourceToast('New resource registered: ' + name + ' (#RES-088)');
  }
}

function handleResourceAction(action) {
  const cur = document.getElementById('rdDetailTitle')?.textContent || 'Resource';
  if (action === 'assign') {
    showResourceToast(cur + ' assigned to Active Operations');
  } else if (action === 'transfer') {
    showResourceToast('Transfer order created for ' + cur + ' &rarr; Zone 4');
  } else if (action === 'maintenance') {
    showResourceToast('Maintenance ticket scheduled for ' + cur);
  } else if (action === 'history') {
    showResourceToast('Opening telemetry & dispatch log for ' + cur);
  }
}

function showResourceToast(msg) {
  const existing = document.querySelector('.res-toast-msg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'res-toast-msg';
  toast.innerHTML = '<span class="material-icons-outlined text-green">check_circle</span> ' + msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}



/* =============================================
   SYSTEM SETTINGS LOGIC & EVENT HANDLERS
   ============================================= */

function handleSettingsTabClick(btn, tabId) {
  document.querySelectorAll('.settings-tab-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  showSettingsToast('Switched to ' + btn.textContent.trim() + ' Settings', 'info');

  // Smooth scroll or highlight corresponding card
  if (tabId === 'general') {
    document.getElementById('secGeneralConfig')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'notifications') {
    document.getElementById('secNotifConfig')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'integrations') {
    document.getElementById('secApiConfig')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'backup') {
    document.getElementById('secBackupRestore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'logs') {
    document.getElementById('secSysLogs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'database') {
    document.getElementById('secSysInfo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'security') {
    document.getElementById('secApiConfig')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tabId === 'users') {
    showSettingsToast('User Permissions: 14 Active Administrators & Field Officers', 'info');
  }
}

function saveGeneralConfig() {
  const name = document.getElementById('cfgSystemName')?.value || 'ForestIQ';
  const org = document.getElementById('cfgOrganization')?.value || 'Forest Department';
  const env = document.getElementById('cfgEnvironment')?.value || 'Production';
  
  showSettingsToast('Configuration Saved: ' + name + ' (' + org + ') updated in [' + env + '] mode', 'success');
}

function handleFeatureToggle(featureName, isEnabled) {
  const state = isEnabled ? 'Enabled' : 'Disabled';
  showSettingsToast(featureName + ' ' + state, isEnabled ? 'success' : 'warning');
}

function handleChannelToggle(channelName, isEnabled) {
  const state = isEnabled ? 'activated' : 'muted';
  showSettingsToast(channelName + ' channel ' + state, isEnabled ? 'success' : 'info');
}

function handleCategoryCheck(catName, isChecked) {
  const state = isChecked ? 'subscribed' : 'unsubscribed';
  showSettingsToast(catName + ' ' + state, isChecked ? 'info' : 'warning');
}

function testSmtpConnection() {
  const server = document.getElementById('cfgSmtpServer')?.value || 'smtp.gmail.com';
  const port = document.getElementById('cfgSmtpPort')?.value || '587';
  
  showSettingsToast('Connecting to ' + server + ':' + port + '...', 'info');
  setTimeout(() => {
    showSettingsToast('SMTP Connection Successful &bull; TLS Handshake Verified (200 OK)', 'success');
  }, 900);
}

function toggleApiKeyVisibility() {
  const input = document.getElementById('cfgApiKey');
  const icon = document.getElementById('keyVisIcon');
  if (!input || !icon) return;

  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = 'visibility_off';
    showSettingsToast('API Key Revealed', 'warning');
  } else {
    input.type = 'password';
    icon.textContent = 'visibility';
    showSettingsToast('API Key Hidden', 'info');
  }
}

function regenerateApiKey() {
  if (confirm('Are you sure you want to regenerate the API Key? Existing integrations will need to be updated with the new token.')) {
    const randomHex = Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const newKey = 'fiq_live_' + randomHex;
    const input = document.getElementById('cfgApiKey');
    if (input) input.value = newKey;
    showSettingsToast('New API Key Generated: ' + newKey.slice(0, 16) + '...', 'success');
  }
}

function performBackupNow() {
  showSettingsToast('Initiating Database & Snapshot Backup...', 'info');
  setTimeout(() => {
    showSettingsToast('Backup Completed Successfully: 2.41 GB written to secure vault', 'success');
  }, 1200);
}

function performRestore() {
  if (confirm('Restore database from snapshot (Apr 27, 2025 02:14:22)? This will synchronize all records.')) {
    showSettingsToast('Restoring snapshot... verification passed', 'success');
  }
}

function viewAllBackups() {
  alert('Backup History Archives:\n\n1. Apr 27, 2025 02:14:22 - 2.4 GB (Automated Daily) - Status: Healthy\n2. Apr 26, 2025 02:10:05 - 2.38 GB (Automated Daily) - Status: Healthy\n3. Apr 25, 2025 02:12:44 - 2.35 GB (Automated Daily) - Status: Healthy\n4. Apr 20, 2025 00:00:00 - 2.29 GB (Weekly Milestone) - Status: Verified');
}

function handleViewAllLogs(type) {
  if (type === 'integration') {
    showSettingsToast('Opening Full Integration Audit Logs (248 records)', 'info');
  } else {
    showSettingsToast('Opening Full System Audit Logs (1,420 records)', 'info');
  }
}

function handleChangeLogo() {
  const newName = prompt('Enter Logo Brand Name or URL:', 'ForestIQ');
  if (newName) {
    const el = document.querySelector('.logo-preview-text');
    if (el) el.textContent = newName;
    showSettingsToast('Logo Brand updated to ' + newName, 'success');
  }
}

function showSettingsToast(msg, type = 'info') {
  if (typeof showToast === 'function') {
    showToast(msg, type);
  } else if (typeof showResourceToast === 'function') {
    showResourceToast(msg);
  } else {
    console.log('[Toast] ' + msg);
  }
}



/* =============================================
   186-RESOURCE INVENTORY LOGIC (SEARCH, FILTER, SORT, ADD)
   ============================================= */

window.fullResourceInventory = [
  {
    "id": "RES-001",
    "name": "Fire Tender",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Station A",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:28",
    "fuel": "94%",
    "fuelPct": 94,
    "battery": "98%",
    "batteryPct": 98,
    "team": "Fire Unit Alpha",
    "service": "Apr 02, 2025",
    "usage": "84 hours",
    "trail": "Station A &rarr; Zone 4 (Standby)",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-002",
    "name": "Forest Patrol Vehicle",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 11",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:22",
    "fuel": "74%",
    "fuelPct": 74,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "37 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-003",
    "name": "Drone Unit",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Station B",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 81,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "48 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-004",
    "name": "First Aid Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 6",
    "quantity": 9,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 88,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 05, 2025",
    "usage": "59 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-005",
    "name": "Satellite Radio",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "South Base",
    "quantity": 7,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 95,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "70 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-006",
    "name": "Water Tank",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 1",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 63,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "81 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-007",
    "name": "Trail Camera Trap HD Infrared",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 10",
    "quantity": 9,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "N/A",
    "fuelPct": 70,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 08, 2025",
    "usage": "92 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-008",
    "name": "High-Pressure Backpack Pump",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "HQ",
    "quantity": 3,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "09:12",
    "fuel": "77%",
    "fuelPct": 77,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 09, 2025",
    "usage": "103 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-009",
    "name": "All-Terrain ATV",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 5",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "84%",
    "fuelPct": 84,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "114 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-010",
    "name": "Thermal Surveillance UAV",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "East Outpost",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 91,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "125 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-011",
    "name": "Trauma Emergency Bag",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 12",
    "quantity": 16,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "N/A",
    "fuelPct": 98,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "136 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-012",
    "name": "VHF High-Gain Transceiver",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 8",
    "quantity": 14,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "09:55",
    "fuel": "N/A",
    "fuelPct": 66,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 13, 2025",
    "usage": "147 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-013",
    "name": "High-Volume Water Bowzer",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 4",
    "quantity": 4,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Fair",
    "condClass": "text-fair",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "N/A",
    "fuelPct": 73,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 14, 2025",
    "usage": "158 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-014",
    "name": "Forest Patrol Vehicle",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 4",
    "quantity": 4,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 07",
    "lastUpdated": "14:21",
    "fuel": "86%",
    "fuelPct": 86,
    "battery": "87%",
    "batteryPct": 87,
    "team": "Ranger Team 07",
    "service": "Apr 18, 2025",
    "usage": "126 hours",
    "trail": "Zone 7 &rarr; Zone 4",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-015",
    "name": "Wildfire Smoke Blower",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "North Ridge",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "87%",
    "fuelPct": 87,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "180 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-016",
    "name": "4x4 Heavy Tactical Truck",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 9",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "10:48",
    "fuel": "94%",
    "fuelPct": 94,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 17, 2025",
    "usage": "191 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-017",
    "name": "Long-Range Scout Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 7",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "N/A",
    "fuelPct": 62,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 18, 2025",
    "usage": "22 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-018",
    "name": "Portable Medical Oxygen Unit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Station A",
    "quantity": 23,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 69,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "33 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-019",
    "name": "Mobile Mesh Radio Repeater",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 2",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:15",
    "fuel": "N/A",
    "fuelPct": 76,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 20, 2025",
    "usage": "44 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-020",
    "name": "Portable Water Bladder 5000L",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 11",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "11:34",
    "fuel": "N/A",
    "fuelPct": 83,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 21, 2025",
    "usage": "55 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-021",
    "name": "Heavy Duty Chainsaw Clearing Kit",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Station B",
    "quantity": 7,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "N/A",
    "fuelPct": 90,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 22, 2025",
    "usage": "66 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-022",
    "name": "Fire Hose Rapid Unit",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 6",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:28",
    "fuel": "97%",
    "fuelPct": 97,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 23, 2025",
    "usage": "77 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-023",
    "name": "Quick Response Forest SUV",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "South Base",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "65%",
    "fuelPct": 65,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 24, 2025",
    "usage": "88 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-024",
    "name": "Heavy-Lift Payload Drop Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 1",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "12:22",
    "fuel": "N/A",
    "fuelPct": 72,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 25, 2025",
    "usage": "99 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-025",
    "name": "Viper & Cobra Antivenom Pack",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 10",
    "quantity": 10,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 79,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 26, 2025",
    "usage": "110 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-026",
    "name": "GPS Emergency Distress Beacon",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "HQ",
    "quantity": 13,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 86,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 27, 2025",
    "usage": "121 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-027",
    "name": "Drone Unit",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "HQ",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 100,
    "battery": "92%",
    "batteryPct": 92,
    "team": "Surveillance Flight Alpha",
    "service": "Apr 12, 2025",
    "usage": "42 hours",
    "trail": "HQ &rarr; Perimeter Patrol",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-028",
    "name": "Search & Rescue Climbing Rigging Set",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "East Outpost",
    "quantity": 6,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 61,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 01, 2025",
    "usage": "143 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-029",
    "name": "Fire Suppression Trailer",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 12",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "68%",
    "fuelPct": 68,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 02, 2025",
    "usage": "154 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-030",
    "name": "Electric Recon Buggy",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 8",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:12",
    "fuel": "75%",
    "fuelPct": 75,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "165 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-031",
    "name": "AI Canopy Mapper Quadcopter",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 4",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "N/A",
    "fuelPct": 82,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "176 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-032",
    "name": "Tactical Folding Rescue Stretcher",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 3",
    "quantity": 17,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 89,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 05, 2025",
    "usage": "187 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-033",
    "name": "Tactical Satellite Terminal",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "North Ridge",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "N/A",
    "fuelPct": 96,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "18 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-034",
    "name": "River Water Fast Filtration System",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 9",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:55",
    "fuel": "N/A",
    "fuelPct": 64,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "29 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-035",
    "name": "High-Lumen Portable Floodlight Array",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 7",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "N/A",
    "fuelPct": 71,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 08, 2025",
    "usage": "40 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-036",
    "name": "Fire Shelter Survival Pack",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Station A",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "13:52",
    "fuel": "78%",
    "fuelPct": 78,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 09, 2025",
    "usage": "51 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-037",
    "name": "Amphibious River Rescue Buggy",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 2",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "85%",
    "fuelPct": 85,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "62 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-038",
    "name": "Night Vision Recon Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 11",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:48",
    "fuel": "N/A",
    "fuelPct": 92,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "73 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-039",
    "name": "Defibrillator AED Emergency Pack",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Station B",
    "quantity": 24,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Poor",
    "condClass": "text-poor",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "N/A",
    "fuelPct": 60,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "84 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-040",
    "name": "Solar Backpack Radio Charger",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 6",
    "quantity": 12,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 67,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 13, 2025",
    "usage": "95 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-041",
    "name": "First Aid Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Station B",
    "quantity": 18,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 47,
    "battery": "N/A",
    "batteryPct": 100,
    "team": "Medical Staging",
    "service": "Mar 28, 2025",
    "usage": "18 deployments",
    "trail": "Central Depot &rarr; Station B",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-042",
    "name": "Laser Rangefinder Forest Scope",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 1",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:34",
    "fuel": "N/A",
    "fuelPct": 81,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 15, 2025",
    "usage": "117 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-043",
    "name": "Flame Swatter Rapid Batch",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 10",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "88%",
    "fuelPct": 88,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "128 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-044",
    "name": "Patrol Motorbike Heavy",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "HQ",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "14:28",
    "fuel": "95%",
    "fuelPct": 95,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 17, 2025",
    "usage": "139 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-045",
    "name": "Wildfire Perimeter Monitoring Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 5",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "N/A",
    "fuelPct": 63,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 18, 2025",
    "usage": "150 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-046",
    "name": "Field Surgical Suture Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "East Outpost",
    "quantity": 11,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:22",
    "fuel": "N/A",
    "fuelPct": 70,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "161 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-047",
    "name": "Encrypted Ranger Intercom Set",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 12",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 77,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 20, 2025",
    "usage": "172 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-048",
    "name": "Emergency Drinking Water Purifier",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 8",
    "quantity": 4,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 84,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 21, 2025",
    "usage": "183 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-049",
    "name": "Handheld Night Vision Binoculars",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 4",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 91,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 22, 2025",
    "usage": "194 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-050",
    "name": "Portable Forest Fire Pump",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 3",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:55",
    "fuel": "98%",
    "fuelPct": 98,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 23, 2025",
    "usage": "25 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-051",
    "name": "Tracked Mud Carrier",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "North Ridge",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "66%",
    "fuelPct": 66,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 24, 2025",
    "usage": "36 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-052",
    "name": "Satellite Radio",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 9",
    "quantity": 12,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 04",
    "lastUpdated": "13:52",
    "fuel": "N/A",
    "fuelPct": 100,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Ranger Team 04",
    "service": "Apr 05, 2025",
    "usage": "140 hours",
    "trail": "HQ &rarr; Zone 9 Comms Node",
    "img": "assets/radio.jpg"
  },
  {
    "id": "RES-053",
    "name": "Severe Burn Emergency Treatment Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 7",
    "quantity": 18,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "N/A",
    "fuelPct": 80,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 26, 2025",
    "usage": "58 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-054",
    "name": "Long-Range Base Station Radio",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Station A",
    "quantity": 11,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 87,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 27, 2025",
    "usage": "69 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-055",
    "name": "Gravity Feed Wildfire Water Station",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 2",
    "quantity": 1,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "N/A",
    "fuelPct": 94,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 28, 2025",
    "usage": "80 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-056",
    "name": "Bushcraft Wilderness Machete Set",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 11",
    "quantity": 2,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "09:55",
    "fuel": "N/A",
    "fuelPct": 62,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 01, 2025",
    "usage": "91 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-057",
    "name": "Class-A Foam Induction Unit",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Station B",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "69%",
    "fuelPct": 69,
    "battery": "N/A",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 02, 2025",
    "usage": "102 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-058",
    "name": "Mobile Tactical Command Van",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 6",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:52",
    "fuel": "76%",
    "fuelPct": 76,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "113 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-059",
    "name": "Multispectral Forest Health Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "South Base",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "N/A",
    "fuelPct": 83,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "124 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-060",
    "name": "Wilderness Hypothermia Blanket Set",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 1",
    "quantity": 5,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "10:48",
    "fuel": "N/A",
    "fuelPct": 90,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 05, 2025",
    "usage": "135 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-061",
    "name": "Directional Antenna Mast",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 10",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "N/A",
    "fuelPct": 97,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "146 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-062",
    "name": "Submersible Heavy Slurry Pump",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "HQ",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 65,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "157 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-063",
    "name": "Water Tank",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 12",
    "quantity": 3,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Fair",
    "condClass": "text-fair",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "N/A",
    "fuelPct": 100,
    "battery": "N/A",
    "batteryPct": 100,
    "team": "Water Ops Depot",
    "service": "Feb 15, 2025",
    "usage": "412 hours",
    "trail": "Zone 12 Sump",
    "img": "assets/watertank.jpg"
  },
  {
    "id": "RES-064",
    "name": "Thermal Spark Arrester Kit",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "East Outpost",
    "quantity": 5,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "11:34",
    "fuel": "79%",
    "fuelPct": 79,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 09, 2025",
    "usage": "179 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-065",
    "name": "Forestry Heavy Transport Hauler",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 12",
    "quantity": 2,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "86%",
    "fuelPct": 86,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "190 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-066",
    "name": "Forest Boundary Sentry Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 8",
    "quantity": 1,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:28",
    "fuel": "N/A",
    "fuelPct": 93,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "21 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-067",
    "name": "Emergency Splint & Cervical Collar Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 4",
    "quantity": 12,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "N/A",
    "fuelPct": 61,
    "battery": "N/A",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "32 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-068",
    "name": "Wildlife Collar Radio Receiver",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 3",
    "quantity": 10,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "12:22",
    "fuel": "N/A",
    "fuelPct": 68,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 13, 2025",
    "usage": "43 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-069",
    "name": "Helicopter Water Bambi Bucket 2000L",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "North Ridge",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 75,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 14, 2025",
    "usage": "54 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-070",
    "name": "Tree Climbing Safety Harness Kit",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 9",
    "quantity": 8,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 82,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 15, 2025",
    "usage": "65 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-071",
    "name": "Heavy Forest Water Cannon",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 7",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "89%",
    "fuelPct": 89,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "76 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-072",
    "name": "Autonomous Scout Patrol Rover",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Station A",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "12:55",
    "fuel": "96%",
    "fuelPct": 96,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 17, 2025",
    "usage": "87 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-073",
    "name": "Tethered High-Mast Camera Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 2",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "N/A",
    "fuelPct": 64,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 18, 2025",
    "usage": "98 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-074",
    "name": "Field Blood Transfusion Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 11",
    "quantity": 19,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:12",
    "fuel": "N/A",
    "fuelPct": 71,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "109 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-075",
    "name": "Acoustic Gunshot Detection Sensor",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Station B",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "N/A",
    "fuelPct": 78,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 20, 2025",
    "usage": "120 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-076",
    "name": "Rapid Reservoir Fill Pump Unit",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 6",
    "quantity": 2,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 85,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 21, 2025",
    "usage": "131 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-077",
    "name": "Forest Canopy Aerial Rope Rig",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "South Base",
    "quantity": 7,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "N/A",
    "fuelPct": 92,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 22, 2025",
    "usage": "142 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-078",
    "name": "Wildfire Perimeter Drip Torch",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 1",
    "quantity": 1,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Poor",
    "condClass": "text-poor",
    "assignedTo": "--",
    "lastUpdated": "09:55",
    "fuel": "60%",
    "fuelPct": 60,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 23, 2025",
    "usage": "153 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-079",
    "name": "Heavy Duty Winch Recovery Truck",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 10",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "67%",
    "fuelPct": 67,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 24, 2025",
    "usage": "164 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-080",
    "name": "Emergency Medical Airdrop Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "HQ",
    "quantity": 3,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "13:52",
    "fuel": "N/A",
    "fuelPct": 74,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 25, 2025",
    "usage": "175 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-081",
    "name": "Sterile Burn Dressing Station",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 5",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "N/A",
    "fuelPct": 81,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 26, 2025",
    "usage": "186 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-082",
    "name": "Emergency Flare Distress Kit",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "East Outpost",
    "quantity": 9,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:48",
    "fuel": "N/A",
    "fuelPct": 88,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 27, 2025",
    "usage": "17 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-083",
    "name": "Mobile Reverse Osmosis Purifier",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 12",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "N/A",
    "fuelPct": 95,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 28, 2025",
    "usage": "28 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-084",
    "name": "Portable Metal & Snare Detector",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 8",
    "quantity": 6,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 63,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 01, 2025",
    "usage": "39 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-085",
    "name": "Emergency Fire Resistant Blanket Kit",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 4",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:15",
    "fuel": "70%",
    "fuelPct": 70,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 02, 2025",
    "usage": "50 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-086",
    "name": "Rough Terrain Personnel Carrier",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 3",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:34",
    "fuel": "77%",
    "fuelPct": 77,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "61 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-087",
    "name": "Seed Spraying Reforestation Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "North Ridge",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "N/A",
    "fuelPct": 84,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "72 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-088",
    "name": "Helicopter Winch Extraction Basket",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 9",
    "quantity": 13,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "14:28",
    "fuel": "N/A",
    "fuelPct": 91,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 05, 2025",
    "usage": "83 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-089",
    "name": "Satellite Phone Iridium Array",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 7",
    "quantity": 16,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "N/A",
    "fuelPct": 98,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "94 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-090",
    "name": "Folding Canvas Water Tank 3000L",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Station A",
    "quantity": 1,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:22",
    "fuel": "N/A",
    "fuelPct": 66,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "105 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-091",
    "name": "Deep Forest GPS Mapping Compass Kit",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 2",
    "quantity": 5,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 73,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 08, 2025",
    "usage": "116 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-092",
    "name": "Forest Fire Hose Reel Cart",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 11",
    "quantity": 3,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "08:15",
    "fuel": "80%",
    "fuelPct": 80,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 09, 2025",
    "usage": "127 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-093",
    "name": "Forest Ranger Quad Bike",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Station B",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "87%",
    "fuelPct": 87,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "138 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-094",
    "name": "Radio Relay Repeater Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 6",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 94,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "149 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-095",
    "name": "Dehydration Electrolyte Field Pack",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "South Base",
    "quantity": 20,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "N/A",
    "fuelPct": 62,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "160 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-096",
    "name": "Field Incident Dispatch Tablet",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 1",
    "quantity": 8,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "09:12",
    "fuel": "N/A",
    "fuelPct": 69,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 13, 2025",
    "usage": "171 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-097",
    "name": "Water Hose Booster In-line Pump",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 10",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "N/A",
    "fuelPct": 76,
    "battery": "N/A",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 14, 2025",
    "usage": "182 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-098",
    "name": "Hazardous Wildlife Capture Pole Set",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "HQ",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 83,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 15, 2025",
    "usage": "193 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-099",
    "name": "Controlled Burn Flare Launcher",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 5",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "90%",
    "fuelPct": 90,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "24 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-100",
    "name": "Off-Road Emergency Ambulance",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "East Outpost",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "09:55",
    "fuel": "97%",
    "fuelPct": 97,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 17, 2025",
    "usage": "35 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-101",
    "name": "Wildlife Tracking Tag Scanner Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 12",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "N/A",
    "fuelPct": 65,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 18, 2025",
    "usage": "46 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-102",
    "name": "Mobile Field Clinic Tent",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 8",
    "quantity": 7,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:52",
    "fuel": "N/A",
    "fuelPct": 72,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "57 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-103",
    "name": "LoRaWAN Long-Range Gate Station",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 4",
    "quantity": 15,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "N/A",
    "fuelPct": 79,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 20, 2025",
    "usage": "68 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-104",
    "name": "Forest Stream Extraction Dam Kit",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 3",
    "quantity": 5,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "10:48",
    "fuel": "N/A",
    "fuelPct": 86,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 21, 2025",
    "usage": "79 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-105",
    "name": "Carbon Monoxide Thermal Sniffer",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "North Ridge",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "N/A",
    "fuelPct": 93,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 22, 2025",
    "usage": "90 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-106",
    "name": "Wildfire Breathing Apparatus",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 9",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:16",
    "fuel": "61%",
    "fuelPct": 61,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 23, 2025",
    "usage": "101 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-107",
    "name": "Heavy Timber Transport Truck",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 7",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:15",
    "fuel": "68%",
    "fuelPct": 68,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 24, 2025",
    "usage": "112 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-108",
    "name": "Forest Fire Spotter Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Station A",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "11:34",
    "fuel": "N/A",
    "fuelPct": 75,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 25, 2025",
    "usage": "123 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-109",
    "name": "Emergency Tourniquet Trauma Set",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 2",
    "quantity": 14,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "N/A",
    "fuelPct": 82,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 26, 2025",
    "usage": "134 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-110",
    "name": "Portable Cellular Tower Node",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 11",
    "quantity": 7,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:28",
    "fuel": "N/A",
    "fuelPct": 89,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 27, 2025",
    "usage": "145 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-111",
    "name": "Deep Aquifer Solar Well Pump",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Station B",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "N/A",
    "fuelPct": 96,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 28, 2025",
    "usage": "156 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-112",
    "name": "Wildlife Tranquilizer Dart Projector",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 6",
    "quantity": 2,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "12:22",
    "fuel": "N/A",
    "fuelPct": 64,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 01, 2025",
    "usage": "167 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-113",
    "name": "High-Output Mist Blower",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "South Base",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "71%",
    "fuelPct": 71,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 02, 2025",
    "usage": "178 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-114",
    "name": "Low-Emission Solar Patrol Cart",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 1",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:15",
    "fuel": "78%",
    "fuelPct": 78,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "189 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-115",
    "name": "LIDAR Topographic Mapping Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 10",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 85,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "20 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-116",
    "name": "Compact Biological Hazard Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "HQ",
    "quantity": 21,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 92,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 05, 2025",
    "usage": "31 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-117",
    "name": "Underwater Acoustic Sonar Beacon",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 5",
    "quantity": 14,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Poor",
    "condClass": "text-poor",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "N/A",
    "fuelPct": 60,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "42 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-118",
    "name": "Emergency Water Purification Tablets Box",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "East Outpost",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:12",
    "fuel": "N/A",
    "fuelPct": 67,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "53 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-119",
    "name": "Heavy Duty Hydraulic Log Splitter",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 12",
    "quantity": 9,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "N/A",
    "fuelPct": 74,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 08, 2025",
    "usage": "64 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-120",
    "name": "Fire Retardant Mix Station",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 8",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "13:30",
    "fuel": "81%",
    "fuelPct": 81,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 09, 2025",
    "usage": "75 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-121",
    "name": "Swamp Buggy Rescue Craft",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 4",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "88%",
    "fuelPct": 88,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "86 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-122",
    "name": "River Basin Flood Patrol Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 3",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:55",
    "fuel": "N/A",
    "fuelPct": 95,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "97 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-123",
    "name": "Snakebite Compression Bandage Set",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "North Ridge",
    "quantity": 8,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "N/A",
    "fuelPct": 63,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "108 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-124",
    "name": "Forest Weather Telemetry Node",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 9",
    "quantity": 6,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "13:52",
    "fuel": "N/A",
    "fuelPct": 70,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 13, 2025",
    "usage": "119 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-125",
    "name": "Trailer Mounted Water Tank 8000L",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 7",
    "quantity": 1,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "N/A",
    "fuelPct": 77,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 14, 2025",
    "usage": "130 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-126",
    "name": "Portable Weather Anemometer Station",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Station A",
    "quantity": 8,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:48",
    "fuel": "N/A",
    "fuelPct": 84,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 15, 2025",
    "usage": "141 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-127",
    "name": "Thermal Fire Spotting Drone Link",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 2",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "91%",
    "fuelPct": 91,
    "battery": "N/A",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "152 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-128",
    "name": "Rapid Deployment Troop Hauler",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 11",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "14:16",
    "fuel": "98%",
    "fuelPct": 98,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 17, 2025",
    "usage": "163 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-129",
    "name": "Search & Rescue Infrared Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Station B",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:15",
    "fuel": "N/A",
    "fuelPct": 66,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 18, 2025",
    "usage": "174 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-130",
    "name": "Waterborne Disease Testing Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 6",
    "quantity": 15,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:34",
    "fuel": "N/A",
    "fuelPct": 73,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "185 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-131",
    "name": "Seismic Ground Vibration Sensor",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "South Base",
    "quantity": 13,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "N/A",
    "fuelPct": 80,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 20, 2025",
    "usage": "16 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-132",
    "name": "Chemical Fire Retardant Water Mixer",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 1",
    "quantity": 3,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "14:28",
    "fuel": "N/A",
    "fuelPct": 87,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 21, 2025",
    "usage": "27 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-133",
    "name": "Forest Ranger Camouflage Blind Kit",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 10",
    "quantity": 7,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "N/A",
    "fuelPct": 94,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 22, 2025",
    "usage": "38 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-134",
    "name": "Wildfire Ground Trench Excavator",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "HQ",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:22",
    "fuel": "62%",
    "fuelPct": 62,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 23, 2025",
    "usage": "49 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-135",
    "name": "Tactical Forest Evacuation Vehicle",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 5",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "69%",
    "fuelPct": 69,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 24, 2025",
    "usage": "60 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-136",
    "name": "Canopy Flora Inspection Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "East Outpost",
    "quantity": 5,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 76,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 25, 2025",
    "usage": "71 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-137",
    "name": "Compact Poison Plant Antidote Pack",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 12",
    "quantity": 22,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 83,
    "battery": "N/A",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 26, 2025",
    "usage": "82 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-138",
    "name": "Solar Powered Repeater Tower",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 8",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 90,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 27, 2025",
    "usage": "93 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-139",
    "name": "Backpack Gravity Water Bag 20L",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 4",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "N/A",
    "fuelPct": 97,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 28, 2025",
    "usage": "104 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-140",
    "name": "Heavy Extraction Tow Cable Winch Set",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 3",
    "quantity": 6,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "09:12",
    "fuel": "N/A",
    "fuelPct": 65,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 01, 2025",
    "usage": "115 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-141",
    "name": "Smoke Ejector Ventilation Fan",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "North Ridge",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "72%",
    "fuelPct": 72,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 02, 2025",
    "usage": "126 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-142",
    "name": "Light Utility Recon UTV",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 9",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:30",
    "fuel": "79%",
    "fuelPct": 79,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "137 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-143",
    "name": "Acoustic Poacher Detection Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 7",
    "quantity": 6,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Fair",
    "condClass": "text-fair",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "N/A",
    "fuelPct": 86,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "148 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-144",
    "name": "Wilderness Resuscitation Mask Set",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Station A",
    "quantity": 9,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "09:55",
    "fuel": "N/A",
    "fuelPct": 93,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 05, 2025",
    "usage": "159 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-145",
    "name": "Handheld Dual-Band Walkie Talkie",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 2",
    "quantity": 12,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "N/A",
    "fuelPct": 61,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "170 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-146",
    "name": "Floating River Intake Strainer Pump",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 11",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:52",
    "fuel": "N/A",
    "fuelPct": 68,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "181 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-147",
    "name": "Sub-Zero Thermal Sleeping Pod",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Station B",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "N/A",
    "fuelPct": 75,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 08, 2025",
    "usage": "192 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-148",
    "name": "Fire Line Explosive Trencher",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 6",
    "quantity": 5,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "10:48",
    "fuel": "82%",
    "fuelPct": 82,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 09, 2025",
    "usage": "23 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-149",
    "name": "Mobile Workshop Repair Van",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "South Base",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "89%",
    "fuelPct": 89,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "34 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-150",
    "name": "Tactical Micro Recon Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 1",
    "quantity": 1,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 96,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "45 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-151",
    "name": "Portable Vital Signs Monitor",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 10",
    "quantity": 16,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:15",
    "fuel": "N/A",
    "fuelPct": 64,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "56 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-152",
    "name": "Ranger GPS Patrol Tracker Set",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "HQ",
    "quantity": 4,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "11:34",
    "fuel": "N/A",
    "fuelPct": 71,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 13, 2025",
    "usage": "67 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-153",
    "name": "Forest Fire Hydrant Valve Assembly",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 5",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "N/A",
    "fuelPct": 78,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 14, 2025",
    "usage": "78 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-154",
    "name": "Tactical Flood Rescue Inflatable Raft",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "East Outpost",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:28",
    "fuel": "N/A",
    "fuelPct": 85,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 15, 2025",
    "usage": "89 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-155",
    "name": "Backfire Torches Crate",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 12",
    "quantity": 6,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "92%",
    "fuelPct": 92,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "100 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-156",
    "name": "High-Clearance Patrol Cruiser",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 8",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "12:22",
    "fuel": "60%",
    "fuelPct": 60,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 17, 2025",
    "usage": "111 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-157",
    "name": "Heavy Weather Storm Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 4",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 67,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 18, 2025",
    "usage": "122 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-158",
    "name": "Field Dental Emergency Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 3",
    "quantity": 23,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 74,
    "battery": "N/A",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "133 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-159",
    "name": "Broadband Global Area Network BGAN",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "North Ridge",
    "quantity": 11,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 81,
    "battery": "91%",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 20, 2025",
    "usage": "144 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-160",
    "name": "Potable Water Distribution Manifold",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 9",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 88,
    "battery": "N/A",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 21, 2025",
    "usage": "155 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-161",
    "name": "Searchlight Generator Portable 5kW",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 7",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "N/A",
    "fuelPct": 95,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 22, 2025",
    "usage": "166 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-162",
    "name": "Wildfire Hazard Gas Detector",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Station A",
    "quantity": 1,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:12",
    "fuel": "63%",
    "fuelPct": 63,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 23, 2025",
    "usage": "177 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-163",
    "name": "Forest Boundary Patrol Buggy",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 2",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:21",
    "fuel": "70%",
    "fuelPct": 70,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 24, 2025",
    "usage": "188 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-164",
    "name": "Forest Boundary Perimeter Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 11",
    "quantity": 3,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 77,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 25, 2025",
    "usage": "19 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-165",
    "name": "Ranger High-Altitude Medicine Pack",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Station B",
    "quantity": 10,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:58",
    "fuel": "N/A",
    "fuelPct": 84,
    "battery": "N/A",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 26, 2025",
    "usage": "30 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-166",
    "name": "Emergency Siren Alert Station",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 6",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:55",
    "fuel": "N/A",
    "fuelPct": 91,
    "battery": "94%",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 27, 2025",
    "usage": "41 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-167",
    "name": "Emergency Water Storage Pod",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "South Base",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "07:30",
    "fuel": "N/A",
    "fuelPct": 98,
    "battery": "N/A",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 28, 2025",
    "usage": "52 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-168",
    "name": "High-Impact Ballistic Protective Vest",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 1",
    "quantity": 2,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 05",
    "lastUpdated": "13:52",
    "fuel": "N/A",
    "fuelPct": 66,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Ranger Team 05",
    "service": "Apr 01, 2025",
    "usage": "63 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-169",
    "name": "Hydraulic Spreader Cutter Set",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 10",
    "quantity": 2,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:40",
    "fuel": "73%",
    "fuelPct": 73,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 02, 2025",
    "usage": "74 hours",
    "trail": "Zone 10 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-170",
    "name": "Heavy Duty Logistics Flatbed",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "HQ",
    "quantity": 3,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:48",
    "fuel": "80%",
    "fuelPct": 80,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Reserve Pool",
    "service": "Apr 03, 2025",
    "usage": "85 hours",
    "trail": "HQ &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-171",
    "name": "Continuous Patrol Hybrid Drone",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 5",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "08:45",
    "fuel": "N/A",
    "fuelPct": 87,
    "battery": "79%",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 04, 2025",
    "usage": "96 hours",
    "trail": "Zone 5 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-172",
    "name": "Paramedic Rapid Response Backpack",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "East Outpost",
    "quantity": 17,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Recon Squad 1",
    "lastUpdated": "14:16",
    "fuel": "N/A",
    "fuelPct": 94,
    "battery": "N/A",
    "batteryPct": 88,
    "team": "Recon Squad 1",
    "service": "Apr 05, 2025",
    "usage": "107 hours",
    "trail": "East Outpost &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-173",
    "name": "Multi-Agency Patch Radio Bridge",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Zone 12",
    "quantity": 10,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:15",
    "fuel": "N/A",
    "fuelPct": 62,
    "battery": "97%",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 06, 2025",
    "usage": "118 hours",
    "trail": "Zone 12 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-174",
    "name": "Rapid Deployment Hose Line Spool",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 8",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:34",
    "fuel": "N/A",
    "fuelPct": 69,
    "battery": "N/A",
    "batteryPct": 76,
    "team": "Reserve Pool",
    "service": "Apr 07, 2025",
    "usage": "129 hours",
    "trail": "Zone 8 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-175",
    "name": "Forest Ranger Field Survival Gear",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 4",
    "quantity": 9,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "09:30",
    "fuel": "N/A",
    "fuelPct": 76,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Reserve Pool",
    "service": "Apr 08, 2025",
    "usage": "140 hours",
    "trail": "Zone 4 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-176",
    "name": "Fire Tender",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Zone 3",
    "quantity": 3,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 09",
    "lastUpdated": "14:28",
    "fuel": "83%",
    "fuelPct": 83,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Ranger Team 09",
    "service": "Apr 09, 2025",
    "usage": "151 hours",
    "trail": "Zone 3 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-177",
    "name": "Forest Patrol Vehicle",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "North Ridge",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:41",
    "fuel": "90%",
    "fuelPct": 90,
    "battery": "73%",
    "batteryPct": 73,
    "team": "Reserve Pool",
    "service": "Apr 10, 2025",
    "usage": "162 hours",
    "trail": "North Ridge &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-178",
    "name": "Drone Unit",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "Zone 9",
    "quantity": 5,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "12:22",
    "fuel": "N/A",
    "fuelPct": 97,
    "battery": "82%",
    "batteryPct": 82,
    "team": "Reserve Pool",
    "service": "Apr 11, 2025",
    "usage": "173 hours",
    "trail": "Zone 9 &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-179",
    "name": "First Aid Kit",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 7",
    "quantity": 24,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "10:20",
    "fuel": "N/A",
    "fuelPct": 65,
    "battery": "N/A",
    "batteryPct": 91,
    "team": "Reserve Pool",
    "service": "Apr 12, 2025",
    "usage": "184 hours",
    "trail": "Zone 7 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  },
  {
    "id": "RES-180",
    "name": "Satellite Radio",
    "category": "communication",
    "categoryLabel": "Communication",
    "icon": "sensors",
    "iconClass": "icon-comm",
    "catClass": "badge-comm",
    "location": "Station A",
    "quantity": 2,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 01",
    "lastUpdated": "08:15",
    "fuel": "N/A",
    "fuelPct": 72,
    "battery": "70%",
    "batteryPct": 70,
    "team": "Ranger Team 01",
    "service": "Apr 13, 2025",
    "usage": "15 hours",
    "trail": "Station A &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-181",
    "name": "Water Tank",
    "category": "water",
    "categoryLabel": "Water Supply",
    "icon": "water_drop",
    "iconClass": "icon-water",
    "catClass": "badge-water",
    "location": "Zone 2",
    "quantity": 2,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "14:08",
    "fuel": "N/A",
    "fuelPct": 79,
    "battery": "N/A",
    "batteryPct": 79,
    "team": "Reserve Pool",
    "service": "Apr 14, 2025",
    "usage": "26 hours",
    "trail": "Zone 2 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-182",
    "name": "Trail Camera Trap HD Infrared",
    "category": "gear",
    "categoryLabel": "Surveillance & Gear",
    "icon": "camera_alt",
    "iconClass": "icon-gear",
    "catClass": "badge-vehicle",
    "location": "Zone 11",
    "quantity": 8,
    "status": "maint",
    "statusLabel": "Maintenance",
    "statusBadgeClass": "badge-maint",
    "condition": "Fair",
    "condClass": "text-fair",
    "assignedTo": "--",
    "lastUpdated": "12:55",
    "fuel": "N/A",
    "fuelPct": 86,
    "battery": "88%",
    "batteryPct": 88,
    "team": "Reserve Pool",
    "service": "Apr 15, 2025",
    "usage": "37 hours",
    "trail": "Zone 11 &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-183",
    "name": "High-Pressure Backpack Pump",
    "category": "fire",
    "categoryLabel": "Fire Equipment",
    "icon": "fire_truck",
    "iconClass": "icon-fire",
    "catClass": "badge-fire",
    "location": "Station B",
    "quantity": 4,
    "status": "available",
    "statusLabel": "Available",
    "statusBadgeClass": "badge-available",
    "condition": "Excellent",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "11:15",
    "fuel": "93%",
    "fuelPct": 93,
    "battery": "N/A",
    "batteryPct": 97,
    "team": "Reserve Pool",
    "service": "Apr 16, 2025",
    "usage": "48 hours",
    "trail": "Station B &bull; Active Standby",
    "img": "assets/extinguisher.jpg"
  },
  {
    "id": "RES-184",
    "name": "All-Terrain ATV",
    "category": "vehicle",
    "categoryLabel": "Vehicle",
    "icon": "directions_car",
    "iconClass": "icon-vehicle",
    "catClass": "badge-vehicle",
    "location": "Zone 6",
    "quantity": 1,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Ranger Team 13",
    "lastUpdated": "09:12",
    "fuel": "61%",
    "fuelPct": 61,
    "battery": "76%",
    "batteryPct": 76,
    "team": "Ranger Team 13",
    "service": "Apr 17, 2025",
    "usage": "59 hours",
    "trail": "Zone 6 &bull; Active Standby",
    "img": "assets/jeep.jpg"
  },
  {
    "id": "RES-185",
    "name": "Thermal Surveillance UAV",
    "category": "drone",
    "categoryLabel": "Drone",
    "icon": "flight",
    "iconClass": "icon-drone",
    "catClass": "badge-drone",
    "location": "South Base",
    "quantity": 6,
    "status": "inuse",
    "statusLabel": "In Use",
    "statusBadgeClass": "badge-inuse",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "Fire Crew Bravo",
    "lastUpdated": "14:21",
    "fuel": "N/A",
    "fuelPct": 68,
    "battery": "85%",
    "batteryPct": 85,
    "team": "Fire Crew Bravo",
    "service": "Apr 18, 2025",
    "usage": "70 hours",
    "trail": "South Base &bull; Active Standby",
    "img": "assets/drone.jpg"
  },
  {
    "id": "RES-186",
    "name": "Trauma Emergency Bag",
    "category": "medical",
    "categoryLabel": "Medical",
    "icon": "medical_services",
    "iconClass": "icon-medical",
    "catClass": "badge-medical",
    "location": "Zone 1",
    "quantity": 11,
    "status": "lowstock",
    "statusLabel": "Low Stock",
    "statusBadgeClass": "badge-lowstock",
    "condition": "Good",
    "condClass": "text-good",
    "assignedTo": "--",
    "lastUpdated": "13:30",
    "fuel": "N/A",
    "fuelPct": 75,
    "battery": "N/A",
    "batteryPct": 94,
    "team": "Reserve Pool",
    "service": "Apr 19, 2025",
    "usage": "81 hours",
    "trail": "Zone 1 &bull; Active Standby",
    "img": "assets/medkit.jpg"
  }
];

// Synchronization with resourceItemDb so clicking any item updates the right-hand card
window.fullResourceInventory.forEach(item => {
  if (!resourceItemDb[item.id]) {
    resourceItemDb[item.id] = {
      title: item.id,
      name: item.name,
      cat: item.categoryLabel,
      catIcon: item.icon,
      location: item.location,
      condition: item.condition + ' Condition',
      condClass: 'res-badge-success',
      status: item.statusLabel,
      fuel: item.fuel,
      fuelPct: item.fuelPct,
      battery: item.battery,
      batteryPct: item.batteryPct,
      team: item.assignedTo !== '--' ? item.assignedTo : 'Unassigned',
      service: item.service,
      usage: item.usage,
      trail: item.trail,
      img: item.img
    };
  }
});

let resInventoryState = {
  searchQuery: '',
  catFilter: 'all',
  statusFilter: 'all',
  condFilter: 'all',
  locationFilter: 'all',
  sortBy: 'id-asc',
  currentPage: 1,
  pageSize: 15,
  selectedId: 'RES-014',
  activeActionId: null
};

// Render Inventory Table
function renderResourceInventoryTable() {
  const tbody = document.getElementById('resInventoryTableBody');
  if (!tbody) return;

  let list = [...window.fullResourceInventory];

  // 1. Search filter
  if (resInventoryState.searchQuery.trim()) {
    const q = resInventoryState.searchQuery.toLowerCase().trim();
    list = list.filter(r => 
      r.id.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.categoryLabel.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.statusLabel.toLowerCase().includes(q) ||
      r.condition.toLowerCase().includes(q) ||
      r.assignedTo.toLowerCase().includes(q)
    );
  }

  // 2. Category filter
  if (resInventoryState.catFilter !== 'all') {
    list = list.filter(r => r.category === resInventoryState.catFilter);
  }

  // 3. Status filter
  if (resInventoryState.statusFilter !== 'all') {
    list = list.filter(r => r.status === resInventoryState.statusFilter);
  }

  // 4. Condition filter
  if (resInventoryState.condFilter !== 'all') {
    list = list.filter(r => r.condition.toLowerCase() === resInventoryState.condFilter.toLowerCase());
  }

  // 5. Location filter
  if (resInventoryState.locationFilter !== 'all') {
    list = list.filter(r => r.location === resInventoryState.locationFilter);
  }

  // 6. Sorting
  list.sort((a, b) => {
    switch (resInventoryState.sortBy) {
      case 'id-asc':
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      case 'id-desc':
        return b.id.localeCompare(a.id, undefined, { numeric: true });
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'qty-desc':
        return b.quantity - a.quantity;
      case 'qty-asc':
        return a.quantity - b.quantity;
      case 'status-asc':
        return a.statusLabel.localeCompare(b.statusLabel);
      case 'time-desc':
        return b.lastUpdated.localeCompare(a.lastUpdated);
      default:
        return 0;
    }
  });

  const totalFiltered = list.length;
  const pageSize = resInventoryState.pageSize === 'all' ? totalFiltered : parseInt(resInventoryState.pageSize, 10);
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

  if (resInventoryState.currentPage > totalPages) {
    resInventoryState.currentPage = totalPages;
  }
  if (resInventoryState.currentPage < 1) {
    resInventoryState.currentPage = 1;
  }

  const startIdx = (resInventoryState.currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalFiltered);
  const pagedItems = list.slice(startIdx, endIdx);

  // Render Rows
  if (pagedItems.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 36px 12px; color: #8fbca2;">
          <span class="material-icons-outlined" style="font-size: 32px; color: #5b8a70; display: block; margin-bottom: 8px;">search_off</span>
          No resources found matching your search or filters.
          <div style="margin-top: 10px;">
            <button class="rf-pill" onclick="resetAllResourceFilters()" style="padding: 6px 14px; font-weight: 600;">Clear All Filters</button>
          </div>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = pagedItems.map(item => {
      const isSelected = item.id === resInventoryState.selectedId;
      return `
        <tr class="res-row ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-cat="${item.category}" onclick="selectResourceItem('${item.id}')">
          <td class="res-mono font-bold">${item.id}</td>
          <td>
            <div class="res-item-cell">
              <span class="material-icons-outlined res-type-icon ${item.iconClass}">${item.icon}</span>
              <span>${item.name}</span>
            </div>
          </td>
          <td><span class="res-cat-badge ${item.catClass}">${item.categoryLabel}</span></td>
          <td class="res-loc-cell">${item.location}</td>
          <td class="font-bold">${item.quantity}</td>
          <td><span class="res-status-badge ${item.statusBadgeClass}">${item.statusLabel}</span></td>
          <td><span class="res-cond-text ${item.condClass}">${item.condition}</span></td>
          <td class="${item.assignedTo !== '--' ? 'text-white font-medium' : 'res-muted'}">${item.assignedTo}</td>
          <td class="res-mono text-muted">${item.lastUpdated}</td>
          <td style="text-align: right;">
            <div class="res-actions-cell" style="justify-content: flex-end;">
              <button class="res-view-pill ${isSelected ? 'active' : ''}" onclick="event.stopPropagation(); selectResourceItem('${item.id}');">View</button>
              <button class="res-more-btn" onclick="event.stopPropagation(); openRowActionMenu(event, '${item.id}')">&bull;&bull;&bull;</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Update Pagination Bar Text & Buttons
  const infoEl = document.getElementById('resPaginationInfo');
  if (infoEl) {
    if (totalFiltered === 0) {
      infoEl.textContent = 'Showing 0 of 0 resources';
    } else {
      infoEl.textContent = `Showing ${startIdx + 1}–${endIdx} of ${totalFiltered} resources (Total Database: ${window.fullResourceInventory.length})`;
    }
  }

  renderPaginationButtons(totalPages, resInventoryState.currentPage);
  updateActiveFilterBadge();
  updateSortIndicators();
}

// Render Pagination Buttons
function renderPaginationButtons(totalPages, currentPage) {
  const container = document.getElementById('resPaginationPages');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <button class="res-page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToResourcePage(${currentPage - 1})">
      &laquo; Prev
    </button>
  `;

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    html += `<button class="res-page-btn" onclick="goToResourcePage(1)">1</button>`;
    if (startPage > 2) html += `<span style="color: #5b8a70; padding: 0 4px;">...</span>`;
  }

  for (let p = startPage; p <= endPage; p++) {
    html += `
      <button class="res-page-btn ${p === currentPage ? 'active' : ''}" onclick="goToResourcePage(${p})">
        ${p}
      </button>
    `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span style="color: #5b8a70; padding: 0 4px;">...</span>`;
    html += `<button class="res-page-btn" onclick="goToResourcePage(${totalPages})">${totalPages}</button>`;
  }

  html += `
    <button class="res-page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToResourcePage(${currentPage + 1})">
      Next &raquo;
    </button>
  `;

  container.innerHTML = html;
}

function goToResourcePage(page) {
  resInventoryState.currentPage = page;
  renderResourceInventoryTable();
}

function setResourcePageSize(val) {
  resInventoryState.pageSize = val;
  resInventoryState.currentPage = 1;
  renderResourceInventoryTable();
}

// Search
function handleResourceSearch(val) {
  resInventoryState.searchQuery = val;
  resInventoryState.currentPage = 1;
  const clearBtn = document.getElementById('resSearchClear');
  if (clearBtn) clearBtn.style.display = val ? 'inline-block' : 'none';
  renderResourceInventoryTable();
}

function clearResourceSearch() {
  const input = document.getElementById('resSearchInput');
  if (input) input.value = '';
  handleResourceSearch('');
}

// Filter Popover
function toggleResourceFilterPopover(e) {
  e.stopPropagation();
  const popover = document.getElementById('resFilterPopover');
  const sortMenu = document.getElementById('resSortMenu');
  if (sortMenu) sortMenu.style.display = 'none';
  if (!popover) return;
  popover.style.display = (popover.style.display === 'none' || !popover.style.display) ? 'flex' : 'none';
}

function setRfCat(btn, cat) {
  document.querySelectorAll('#rfCategoryPills .rf-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  resInventoryState.catFilter = cat;
  if (typeof syncCategoryNavPills === 'function') {
    syncCategoryNavPills(cat);
  }
}

function setRfStatus(btn, status) {
  document.querySelectorAll('#rfStatusPills .rf-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  resInventoryState.statusFilter = status;
}

function setRfCond(btn, cond) {
  document.querySelectorAll('#rfConditionPills .rf-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  resInventoryState.condFilter = cond;
}

function applyResourceFilters(close = false) {
  const locSelect = document.getElementById('rfLocationSelect');
  if (locSelect) resInventoryState.locationFilter = locSelect.value;
  resInventoryState.currentPage = 1;
  renderResourceInventoryTable();
  if (close) {
    const popover = document.getElementById('resFilterPopover');
    if (popover) popover.style.display = 'none';
    showResourceToast('Filters applied');
  }
}

function resetAllResourceFilters() {
  resInventoryState.catFilter = 'all';
  resInventoryState.statusFilter = 'all';
  resInventoryState.condFilter = 'all';
  resInventoryState.locationFilter = 'all';
  resInventoryState.searchQuery = '';
  resInventoryState.currentPage = 1;

  if (typeof syncCategoryNavPills === 'function') {
    syncCategoryNavPills('all');
  }
  document.querySelectorAll('#rfCategoryPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === 'all'));
  document.querySelectorAll('#rfStatusPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-status') === 'all'));
  document.querySelectorAll('#rfConditionPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-cond') === 'all'));
  const locSelect = document.getElementById('rfLocationSelect');
  if (locSelect) locSelect.value = 'all';
  const searchInput = document.getElementById('resSearchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('resSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';

  updateActiveFilterBadge();
  renderResourceInventoryTable();
  const popover = document.getElementById('resFilterPopover');
  if (popover) popover.style.display = 'none';
  showResourceToast('Resource filters reset (All 186 resources)');
}

function updateActiveFilterBadge() {
  let count = 0;
  if (resInventoryState.catFilter !== 'all') count++;
  if (resInventoryState.statusFilter !== 'all') count++;
  if (resInventoryState.condFilter !== 'all') count++;
  if (resInventoryState.locationFilter !== 'all') count++;
  if (resInventoryState.searchQuery.trim()) count++;

  const badge = document.getElementById('resFilterBadge');
  const btn = document.getElementById('resFilterBtn');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
  if (btn) {
    btn.classList.toggle('active', count > 0);
  }
}

// Sort
function toggleResourceSortMenu(e) {
  e.stopPropagation();
  const sortMenu = document.getElementById('resSortMenu');
  const popover = document.getElementById('resFilterPopover');
  if (popover) popover.style.display = 'none';
  if (!sortMenu) return;
  sortMenu.style.display = (sortMenu.style.display === 'none' || !sortMenu.style.display) ? 'flex' : 'none';
}

function setResourceSort(sortBy) {
  resInventoryState.sortBy = sortBy;
  document.querySelectorAll('.res-sort-menu .sort-option').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-sort') === sortBy);
  });
  const sortMenu = document.getElementById('resSortMenu');
  if (sortMenu) sortMenu.style.display = 'none';
  renderResourceInventoryTable();
  showResourceToast('Sorted by: ' + sortBy);
}

function toggleColumnSort(col) {
  if (col === 'id') {
    setResourceSort(resInventoryState.sortBy === 'id-asc' ? 'id-desc' : 'id-asc');
  } else if (col === 'name') {
    setResourceSort(resInventoryState.sortBy === 'name-asc' ? 'name-desc' : 'name-asc');
  } else if (col === 'quantity') {
    setResourceSort(resInventoryState.sortBy === 'qty-desc' ? 'qty-asc' : 'qty-desc');
  } else if (col === 'status') {
    setResourceSort(resInventoryState.sortBy === 'status-asc' ? 'id-asc' : 'status-asc');
  } else if (col === 'time') {
    setResourceSort(resInventoryState.sortBy === 'time-desc' ? 'id-asc' : 'time-desc');
  }
}

function updateSortIndicators() {
  ['id', 'name', 'category', 'location', 'quantity', 'status', 'condition', 'time'].forEach(c => {
    const el = document.getElementById('sortIcon-' + c);
    if (el) el.textContent = '';
  });
  if (resInventoryState.sortBy === 'id-asc') document.getElementById('sortIcon-id')?.replaceChildren(document.createTextNode(' ▲'));
  if (resInventoryState.sortBy === 'id-desc') document.getElementById('sortIcon-id')?.replaceChildren(document.createTextNode(' ▼'));
  if (resInventoryState.sortBy === 'name-asc') document.getElementById('sortIcon-name')?.replaceChildren(document.createTextNode(' ▲'));
  if (resInventoryState.sortBy === 'name-desc') document.getElementById('sortIcon-name')?.replaceChildren(document.createTextNode(' ▼'));
  if (resInventoryState.sortBy === 'qty-desc') document.getElementById('sortIcon-quantity')?.replaceChildren(document.createTextNode(' ▼'));
  if (resInventoryState.sortBy === 'qty-asc') document.getElementById('sortIcon-quantity')?.replaceChildren(document.createTextNode(' ▲'));
}

// Add Resource Modal
function openAddResourceModal() {
  const modal = document.getElementById('addResourceModal');
  if (!modal) return;
  const nextNum = window.fullResourceInventory.length + 1;
  const nextId = 'RES-' + String(nextNum).padStart(3, '0');
  const idInput = document.getElementById('addResId');
  if (idInput) idInput.value = nextId;

  const nameInput = document.getElementById('addResName');
  if (nameInput) {
    nameInput.value = '';
    setTimeout(() => nameInput.focus(), 50);
  }
  modal.style.display = 'flex';
}

function closeAddResourceModal() {
  const modal = document.getElementById('addResourceModal');
  if (modal) modal.style.display = 'none';
}

function submitAddResource(e) {
  e.preventDefault();
  const id = document.getElementById('addResId')?.value || ('RES-' + String(window.fullResourceInventory.length + 1).padStart(3, '0'));
  const name = document.getElementById('addResName')?.value.trim();
  const cat = document.getElementById('addResCategory')?.value || 'vehicle';
  const loc = document.getElementById('addResLocation')?.value || 'Zone 4';
  const qty = parseInt(document.getElementById('addResQuantity')?.value || '1', 10);
  const status = document.getElementById('addResStatus')?.value || 'available';
  const cond = document.getElementById('addResCondition')?.value || 'Good';
  const assigned = document.getElementById('addResAssigned')?.value.trim() || '--';

  if (!name) return;

  const catMap = {
    fire: { label: 'Fire Equipment', icon: 'fire_truck', iconClass: 'icon-fire', catClass: 'badge-fire' },
    vehicle: { label: 'Vehicle', icon: 'directions_car', iconClass: 'icon-vehicle', catClass: 'badge-vehicle' },
    drone: { label: 'Drone', icon: 'flight', iconClass: 'icon-drone', catClass: 'badge-drone' },
    medical: { label: 'Medical', icon: 'medical_services', iconClass: 'icon-medical', catClass: 'badge-medical' },
    communication: { label: 'Communication', icon: 'sensors', iconClass: 'icon-comm', catClass: 'badge-comm' },
    water: { label: 'Water Supply', icon: 'water_drop', iconClass: 'icon-water', catClass: 'badge-water' },
    gear: { label: 'Surveillance & Gear', icon: 'camera_alt', iconClass: 'icon-gear', catClass: 'badge-vehicle' }
  };

  const cInfo = catMap[cat] || catMap.vehicle;
  const statusMap = {
    available: { label: 'Available', badge: 'badge-available' },
    inuse: { label: 'In Use', badge: 'badge-inuse' },
    lowstock: { label: 'Low Stock', badge: 'badge-lowstock' },
    maint: { label: 'Maintenance', badge: 'badge-maint' }
  };
  const sInfo = statusMap[status] || statusMap.available;
  const condClass = (cond === 'Poor') ? 'text-poor' : ((cond === 'Fair') ? 'text-fair' : 'text-good');

  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  const newRes = {
    id: id,
    name: name,
    category: cat,
    categoryLabel: cInfo.label,
    icon: cInfo.icon,
    iconClass: cInfo.iconClass,
    catClass: cInfo.catClass,
    location: loc,
    quantity: qty,
    status: status,
    statusLabel: sInfo.label,
    statusBadgeClass: sInfo.badge,
    condition: cond,
    condClass: condClass,
    assignedTo: assigned,
    lastUpdated: timeStr,
    fuel: cat === 'vehicle' || cat === 'fire' ? '95%' : 'N/A',
    fuelPct: 95,
    battery: '98%',
    batteryPct: 98,
    team: assigned !== '--' ? assigned : 'Reserve Pool',
    service: 'Today',
    usage: '0 hours',
    trail: loc + ' &bull; Newly Registered',
    img: cat === 'vehicle' ? 'assets/jeep.jpg' : (cat === 'drone' ? 'assets/drone.jpg' : 'assets/extinguisher.jpg')
  };

  // Add to top of list
  window.fullResourceInventory.unshift(newRes);

  // Add to resourceItemDb
  resourceItemDb[id] = {
    title: id,
    name: name,
    cat: cInfo.label,
    catIcon: cInfo.icon,
    location: loc,
    condition: cond + ' Condition',
    condClass: 'res-badge-success',
    status: sInfo.label,
    fuel: newRes.fuel,
    fuelPct: newRes.fuelPct,
    battery: newRes.battery,
    batteryPct: newRes.batteryPct,
    team: newRes.team,
    service: 'Today',
    usage: '0 hours',
    trail: newRes.trail,
    img: newRes.img
  };

  // Update KPI card count
  const kpiTotalEl = document.querySelector('.res-kpi-val');
  if (kpiTotalEl) {
    kpiTotalEl.textContent = window.fullResourceInventory.length;
  }

  // Reset to page 1 and select the newly added item
  resInventoryState.currentPage = 1;
  resInventoryState.selectedId = id;
  renderResourceInventoryTable();
  selectResourceItem(id);
  closeAddResourceModal();
  showResourceToast(`New resource ${id} (${name}) registered in ${loc}`);
}

// Row Actions Popover (•••)
function openRowActionMenu(e, resId) {
  e.stopPropagation();
  resInventoryState.activeActionId = resId;
  const popover = document.getElementById('resActionPopover');
  if (!popover) return;
  const rect = e.target.getBoundingClientRect();
  popover.style.top = (rect.bottom + 4) + 'px';
  popover.style.left = (rect.right - 170) + 'px';
  popover.style.display = 'flex';
}

function handleRowAction(action) {
  const id = resInventoryState.activeActionId;
  const popover = document.getElementById('resActionPopover');
  if (popover) popover.style.display = 'none';
  if (!id) return;

  const item = window.fullResourceInventory.find(r => r.id === id);
  if (!item) return;

  if (action === 'view') {
    selectResourceItem(id);
    document.getElementById('rdDetailCard')?.scrollIntoView({ behavior: 'smooth' });
  } else if (action === 'assign') {
    const team = prompt(`Assign ${id} (${item.name}) to Ranger Team:`, item.assignedTo !== '--' ? item.assignedTo : 'Ranger Team 07');
    if (team) {
      item.assignedTo = team;
      item.status = 'inuse';
      item.statusLabel = 'In Use';
      item.statusBadgeClass = 'badge-inuse';
      renderResourceInventoryTable();
      selectResourceItem(id);
      showResourceToast(`${id} assigned to ${team}`);
    }
  } else if (action === 'qty') {
    const q = prompt(`Update stock quantity for ${id} (${item.name}):`, item.quantity);
    if (q && !isNaN(q)) {
      item.quantity = parseInt(q, 10);
      renderResourceInventoryTable();
      showResourceToast(`${id} quantity updated to ${q}`);
    }
  } else if (action === 'status') {
    if (item.status === 'available') {
      item.status = 'maint';
      item.statusLabel = 'Maintenance';
      item.statusBadgeClass = 'badge-maint';
      item.condition = 'Fair';
      item.condClass = 'text-fair';
      showResourceToast(`${id} marked for Maintenance`);
    } else {
      item.status = 'available';
      item.statusLabel = 'Available';
      item.statusBadgeClass = 'badge-available';
      item.condition = 'Good';
      item.condClass = 'text-good';
      item.assignedTo = '--';
      showResourceToast(`${id} marked Available for dispatch`);
    }
    renderResourceInventoryTable();
    selectResourceItem(id);
  } else if (action === 'delete') {
    if (confirm(`Delete resource ${id} (${item.name}) from inventory?`)) {
      const idx = window.fullResourceInventory.findIndex(r => r.id === id);
      if (idx !== -1) {
        window.fullResourceInventory.splice(idx, 1);
        const kpiTotalEl = document.querySelector('.res-kpi-val');
        if (kpiTotalEl) kpiTotalEl.textContent = window.fullResourceInventory.length;
        renderResourceInventoryTable();
        showResourceToast(`Resource ${id} removed from inventory`);
      }
    }
  }
}

// Global click to close popovers
document.addEventListener('click', (e) => {
  if (!e.target.closest('#resFilterPopover') && !e.target.closest('#resFilterBtn')) {
    const pop = document.getElementById('resFilterPopover');
    if (pop) pop.style.display = 'none';
  }
  if (!e.target.closest('#resSortMenu') && !e.target.closest('#resSortBtn')) {
    const sort = document.getElementById('resSortMenu');
    if (sort) sort.style.display = 'none';
  }
  if (!e.target.closest('#resActionPopover') && !e.target.closest('.res-more-btn')) {
    const act = document.getElementById('resActionPopover');
    if (act) act.style.display = 'none';
  }
});

// Category filter pills click handler (Top subnav buttons above Resource Inventory)
function handleCategoryPillClick(btn, cat) {
  if (typeof btn === 'string') {
    cat = btn;
    btn = document.querySelector(`.res-nav-pill[data-cat="${cat}"]`);
  }
  if (!cat) cat = 'all';

  // Normalize category: 'field' -> 'gear'
  const normalizedCat = (cat === 'field') ? 'gear' : cat;

  // Update .active class on all .res-nav-pill buttons
  document.querySelectorAll('.res-nav-pill').forEach(b => {
    const bCat = b.getAttribute('data-cat');
    const isMatch = (bCat === cat) || (bCat === normalizedCat) || (normalizedCat === 'gear' && (bCat === 'field' || bCat === 'gear'));
    b.classList.toggle('active', isMatch);
  });

  // Update inventory state
  resInventoryState.catFilter = normalizedCat;
  resInventoryState.currentPage = 1;

  // Update filter popover pills if present
  document.querySelectorAll('#rfCategoryPills .rf-pill').forEach(b => {
    const bCat = b.getAttribute('data-cat');
    b.classList.toggle('active', bCat === normalizedCat);
  });

  updateActiveFilterBadge();
  renderResourceInventoryTable();

  // Toast notification with count
  const label = btn?.querySelector('span:last-child')?.textContent?.trim() || cat;
  const filteredCount = window.fullResourceInventory.filter(r => normalizedCat === 'all' || r.category === normalizedCat).length;
  showResourceToast(`Category: ${label} (${filteredCount} resources)`);
}

function syncCategoryNavPills(activeCat) {
  if (!activeCat) activeCat = 'all';
  const normalized = (activeCat === 'field') ? 'gear' : activeCat;
  document.querySelectorAll('.res-nav-pill').forEach(b => {
    const bCat = b.getAttribute('data-cat');
    const isMatch = (bCat === activeCat) || (bCat === normalized) || (normalized === 'gear' && (bCat === 'field' || bCat === 'gear'));
    b.classList.toggle('active', isMatch);
  });
}

function initResourceSubnavSync() {
  const pills = document.querySelectorAll('.res-nav-pill');
  if (!pills || !pills.length) return;

  pills.forEach(p => {
    p.onclick = function(e) {
      e.preventDefault();
      const cat = p.getAttribute('data-cat') || 'all';
      handleCategoryPillClick(p, cat);
    };
  });
}

function initResourceKpiClicks() {
  const kpiCards = document.querySelectorAll('.resource-kpi-row .res-kpi-card');
  if (!kpiCards.length) return;

  // 1. Total Resources -> Reset all filters
  if (kpiCards[0]) {
    kpiCards[0].style.cursor = 'pointer';
    kpiCards[0].setAttribute('title', 'Click to view all 186 resources');
    kpiCards[0].onclick = () => resetAllResourceFilters();
  }
  // 2. Available Now
  if (kpiCards[1]) {
    kpiCards[1].style.cursor = 'pointer';
    kpiCards[1].setAttribute('title', 'Click to filter available resources');
    kpiCards[1].onclick = () => {
      resInventoryState.statusFilter = 'available';
      resInventoryState.currentPage = 1;
      document.querySelectorAll('#rfStatusPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-status') === 'available'));
      updateActiveFilterBadge();
      renderResourceInventoryTable();
      showResourceToast('Filtered by status: Available Now');
    };
  }
  // 3. Allocated
  if (kpiCards[2]) {
    kpiCards[2].style.cursor = 'pointer';
    kpiCards[2].setAttribute('title', 'Click to filter allocated / in use resources');
    kpiCards[2].onclick = () => {
      resInventoryState.statusFilter = 'in_use';
      resInventoryState.currentPage = 1;
      document.querySelectorAll('#rfStatusPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-status') === 'in_use'));
      updateActiveFilterBadge();
      renderResourceInventoryTable();
      showResourceToast('Filtered by status: Allocated / In Use');
    };
  }
  // 4. Under Maintenance
  if (kpiCards[3]) {
    kpiCards[3].style.cursor = 'pointer';
    kpiCards[3].setAttribute('title', 'Click to filter resources under maintenance');
    kpiCards[3].onclick = () => {
      resInventoryState.statusFilter = 'maintenance';
      resInventoryState.currentPage = 1;
      document.querySelectorAll('#rfStatusPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-status') === 'maintenance'));
      updateActiveFilterBadge();
      renderResourceInventoryTable();
      showResourceToast('Filtered by status: Under Maintenance');
    };
  }
  // 5. Low Stock Items
  if (kpiCards[4]) {
    kpiCards[4].style.cursor = 'pointer';
    kpiCards[4].setAttribute('title', 'Click to filter low stock items');
    kpiCards[4].onclick = () => {
      resInventoryState.statusFilter = 'low_stock';
      resInventoryState.currentPage = 1;
      document.querySelectorAll('#rfStatusPills .rf-pill').forEach(b => b.classList.toggle('active', b.getAttribute('data-status') === 'low_stock'));
      updateActiveFilterBadge();
      renderResourceInventoryTable();
      showResourceToast('Filtered by status: Low Stock Items');
    };
  }
}

// Run render on load
document.addEventListener('DOMContentLoaded', () => {
  renderResourceInventoryTable();
  initResourceSubnavSync();
  initResourceKpiClicks();
  if (typeof renderResourceAllocations === 'function') {
    renderResourceAllocations();
  }
});

/* =============================================
   RESOURCE ALLOCATION CENTER LOGIC & POPUP MODALS
   ============================================= */

window.resourceAllocations = [
  {
    id: 'REQ-0247',
    purpose: 'Forest Fire Response',
    purposeIcon: 'local_fire_department',
    purposeColor: 'text-red',
    zone: 'Zone 4',
    zoneCoords: '10.56° N, 76.95° E',
    priority: 'Critical',
    priorityClass: 'prio-critical',
    status: 'Partially Allocated',
    statusClass: 'status-partial',
    progressPct: 65,
    leadOfficer: 'Inspector K. Ramanathan',
    assignedTeam: 'Ranger Unit 07 & Delta Squad',
    eta: '9.2 mins',
    createdAt: '14:15 Today',
    summary: 'Active thermal hotspot detected near North Ridge Sector. High flame spread potential requiring heavy suppression.',
    requiredItems: [
      { name: 'Class A Fire Tender', icon: 'fire_truck', req: 2, current: 1, unit: 'units', source: 'Station A (1 sent, 1 pending from Zone 9)' },
      { name: 'Thermal Recon UAV', icon: 'flight', req: 1, current: 1, unit: 'unit', source: 'DR-007 deployed from HQ' },
      { name: 'Firefighting Backpack Kits', icon: 'backpack', req: 6, current: 4, unit: 'kits', source: 'Station B reserve' },
      { name: 'High-Volume Water Tank 5000L', icon: 'water_drop', req: 2, current: 1, unit: 'units', source: 'WT-003 en route' }
    ],
    aiRecommendation: 'Auto-reroute 1 Fire Tender (RES-001) from Station A + 1 Water Tank from Zone 12 to reach 100% capacity in 9.2 mins.'
  },
  {
    id: 'REQ-0248',
    purpose: 'Wildlife Conflict Monitoring',
    purposeIcon: 'warning_amber',
    purposeColor: 'text-amber',
    zone: 'Zone 7',
    zoneCoords: '10.52° N, 77.05° E',
    priority: 'High',
    priorityClass: 'prio-high',
    status: 'Awaiting Allocation',
    statusClass: 'status-awaiting',
    progressPct: 0,
    leadOfficer: 'Senior Ranger Priya Nair',
    assignedTeam: 'Tactical Team 03',
    eta: '18 mins',
    createdAt: '14:02 Today',
    summary: 'Elephant herd movement observed near border agriculture fences. Non-lethal deterrent and visual tracking required.',
    requiredItems: [
      { name: 'Forest Patrol 4x4', icon: 'directions_car', req: 2, current: 0, unit: 'vehicles', source: 'Awaiting dispatch from Station B' },
      { name: 'Infrared Camera Traps', icon: 'camera_alt', req: 2, current: 0, unit: 'traps', source: 'HQ Equipment Depot' },
      { name: 'Encrypted Satellite Radio', icon: 'sensors', req: 1, current: 0, unit: 'radio', source: 'Comms Relay Station' }
    ],
    aiRecommendation: 'Assign Patrol Vehicles RES-002 and RES-014 currently idle at South Base. Estimated response: 14 mins.'
  },
  {
    id: 'REQ-0249',
    purpose: 'Night Anti-Poaching Patrol',
    purposeIcon: 'shield',
    purposeColor: 'text-cyan',
    zone: 'Zone 9',
    zoneCoords: '10.49° N, 76.99° E',
    priority: 'High',
    priorityClass: 'prio-high',
    status: 'Partially Allocated',
    statusClass: 'status-partial',
    progressPct: 50,
    leadOfficer: 'Captain Arvind Swamy',
    assignedTeam: 'Special Operations Team 01',
    eta: '25 mins',
    createdAt: '13:45 Today',
    summary: 'Acoustic sensor grid alerted gunfire/chainsaw anomaly in dense teak corridor. Tactical sweep initiated.',
    requiredItems: [
      { name: 'All-Terrain Recon Buggy', icon: 'directions_car', req: 1, current: 1, unit: 'vehicle', source: 'RES-009 stationed at Zone 5' },
      { name: 'Night Vision Drone Unit', icon: 'flight', req: 1, current: 0, unit: 'drone', source: 'HQ Airwing Standby' },
      { name: 'Mesh Radios & GPS Beacons', icon: 'sensors', req: 4, current: 2, unit: 'units', source: 'Station A Comms Locker' }
    ],
    aiRecommendation: 'Deploy UAV Unit DR-010 from East Outpost for continuous thermal aerial coverage.'
  },
  {
    id: 'REQ-0250',
    purpose: 'Hydration Pod Supply Refill',
    purposeIcon: 'water_drop',
    purposeColor: 'text-blue',
    zone: 'Zone 12',
    zoneCoords: '10.44° N, 76.92° E',
    priority: 'Normal',
    priorityClass: 'prio-normal',
    status: 'Fully Allocated',
    statusClass: 'status-allocated',
    progressPct: 100,
    leadOfficer: 'Logistics Head M. Selvam',
    assignedTeam: 'Supply Corps Team 04',
    eta: '35 mins',
    createdAt: '13:20 Today',
    summary: 'Scheduled replenishment of 10,000L wildlife water bladders during dry season drought cycle.',
    requiredItems: [
      { name: '5,000L Water Bowser Tank', icon: 'water_drop', req: 2, current: 2, unit: 'tanks', source: 'Depot WT-003 & WT-004' },
      { name: 'Heavy Logistics Transporter', icon: 'local_shipping', req: 1, current: 1, unit: 'truck', source: 'Base Logistics Fleet' }
    ],
    aiRecommendation: 'All required assets successfully mobilized. En route along Southern Forestry Corridor.'
  },
  {
    id: 'REQ-0251',
    purpose: 'Tourist Medical Evacuation',
    purposeIcon: 'medical_services',
    purposeColor: 'text-red',
    zone: 'Zone 2',
    zoneCoords: '10.60° N, 76.88° E',
    priority: 'Critical',
    priorityClass: 'prio-critical',
    status: 'Dispatched & En Route',
    statusClass: 'status-dispatched',
    progressPct: 100,
    leadOfficer: 'Paramedic Ranger Anita Roy',
    assignedTeam: 'Rapid Evac Squad 02',
    eta: '6.5 mins',
    createdAt: '14:22 Today',
    summary: 'Hiker sustained severe snakebite & fractured tibia near Silver Falls Trail. Antivenom required urgently.',
    requiredItems: [
      { name: '4x4 Rescue Ambulance', icon: 'emergency', req: 1, current: 1, unit: 'vehicle', source: 'Zone 2 Outpost Med Unit' },
      { name: 'Comprehensive Trauma & Antivenom Kit', icon: 'medication', req: 1, current: 1, unit: 'kit', source: 'Station A Medical Vault' },
      { name: 'All-Terrain Folding Stretcher', icon: 'airline_seat_flat', req: 1, current: 1, unit: 'stretcher', source: 'Dispatched with Squad' }
    ],
    aiRecommendation: 'Direct medical route cleared via West Ranger Track. Local hospital emergency team notified.'
  },
  {
    id: 'REQ-0252',
    purpose: 'Border Sensor Maintenance Run',
    purposeIcon: 'build',
    purposeColor: 'text-cyan',
    zone: 'Zone 15',
    zoneCoords: '10.40° N, 77.12° E',
    priority: 'Low',
    priorityClass: 'prio-low',
    status: 'Awaiting Allocation',
    statusClass: 'status-awaiting',
    progressPct: 0,
    leadOfficer: 'Telecom Officer V. Anand',
    assignedTeam: 'Technical Maintenance Unit',
    eta: '60 mins',
    createdAt: '12:50 Today',
    summary: 'Routine battery replacement and solar panel calibration for 6 acoustic listening posts along eastern ridge.',
    requiredItems: [
      { name: 'Light Patrol ATV', icon: 'directions_car', req: 1, current: 0, unit: 'vehicle', source: 'Station B pool' },
      { name: 'Field Technician Tool Pack', icon: 'handyman', req: 1, current: 0, unit: 'pack', source: 'HQ Workshop' }
    ],
    aiRecommendation: 'Queue for afternoon dispatch after high-priority operations conclude.'
  }
];

window.currentAllocFilter = 'all';
window.currentViewingAllocId = null;

function renderResourceAllocations(filter) {
  if (filter) window.currentAllocFilter = filter;
  const tbody = document.getElementById('resAllocTableBody');
  if (!tbody) return;

  let list = [...window.resourceAllocations];
  if (window.currentAllocFilter === 'critical') {
    list = list.filter(r => r.priority.toLowerCase() === 'critical');
  } else if (window.currentAllocFilter === 'partial') {
    list = list.filter(r => r.status.toLowerCase().includes('partial') || r.status.toLowerCase().includes('awaiting'));
  } else if (window.currentAllocFilter === 'completed') {
    list = list.filter(r => r.status.toLowerCase().includes('fully') || r.status.toLowerCase().includes('dispatched') || r.status.toLowerCase().includes('optimized'));
  }

  const badgeEl = document.getElementById('allocActiveBadge');
  if (badgeEl) badgeEl.textContent = window.resourceAllocations.length + ' Active Requests';

  tbody.innerHTML = list.map(req => {
    const reqListHtml = req.requiredItems.map(i => `<div>${i.req} ${i.name.split('(')[0]}</div>`).join('');
    const curListHtml = req.requiredItems.every(i => i.current === 0) 
      ? `<span class="res-muted">--</span>`
      : req.requiredItems.map(i => `<div>${i.current} ${i.name.split('(')[0]}</div>`).join('');

    const isDone = req.progressPct === 100 || req.status.includes('Dispatched');

    return `
      <tr onclick="viewAllocationDetail('${req.id}')" title="Click to view full allocation details">
        <td class="res-mono font-bold" style="color: #00f5c4;">${req.id}</td>
        <td>
          <div class="res-purpose-cell" style="display: flex; align-items: center; gap: 6px;">
            <span class="material-icons-outlined ${req.purposeColor}" style="font-size: 16px;">${req.purposeIcon}</span>
            <span class="font-medium" style="color: #fff;">${req.purpose}</span>
          </div>
        </td>
        <td class="text-white font-medium">${req.zone}</td>
        <td><span class="res-prio-badge ${req.priorityClass}">${req.priority}</span></td>
        <td class="res-multiline-text">${reqListHtml}</td>
        <td class="res-multiline-text">${curListHtml}</td>
        <td>
          <span class="res-alloc-status-badge ${req.statusClass}">${req.status}</span>
          <div style="width: 100px; height: 4px; background: rgba(3,12,8,0.8); border-radius: 2px; margin-top: 5px; overflow: hidden;">
            <div style="width: ${req.progressPct}%; height: 100%; background: ${req.progressPct===100?'#00e676':'#00bfa5'};"></div>
          </div>
        </td>
        <td style="text-align: right;">
          <div class="res-btn-group" style="justify-content: flex-end;">
            <button class="res-btn-action-view" onclick="event.stopPropagation(); viewAllocationDetail('${req.id}')" title="View Allocation Modal">
              <span class="material-icons-outlined" style="font-size: 13px;">visibility</span> View
            </button>
            <button class="res-btn-action-outline" onclick="event.stopPropagation(); optimizeAllocation('${req.id}')" title="Run AI Optimization">
              ${isDone ? 'Re-check' : 'Optimize'}
            </button>
            <button class="res-btn-action-solid" onclick="event.stopPropagation(); assignAllocation('${req.id}')" title="Dispatch and Assign Assets">
              ${isDone ? 'Dispatched ✓' : 'Assign'}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAllocTable(type, btn) {
  document.querySelectorAll('#allocFilterTabs .alloc-tab-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderResourceAllocations(type);
  showResourceToast('Filtering allocation requests: ' + type.toUpperCase());
}

// 1. VIEW ALLOCATION DETAIL POPUP MODAL
function viewAllocationDetail(reqId) {
  const req = window.resourceAllocations.find(r => r.id === reqId);
  if (!req) return;

  window.currentViewingAllocId = reqId;

  document.getElementById('admReqId').textContent = req.id;
  document.getElementById('admPurpose').textContent = req.purpose;
  document.getElementById('admZone').textContent = `${req.zone} (${req.zoneCoords})`;
  document.getElementById('admTime').textContent = req.createdAt;
  document.getElementById('admCoords').textContent = req.zoneCoords;

  const prioBadge = document.getElementById('admPriorityBadge');
  prioBadge.textContent = req.priority + ' Priority';
  prioBadge.className = 'res-prio-badge ' + req.priorityClass;

  const statusBadge = document.getElementById('admStatusBadge');
  statusBadge.textContent = req.status;
  statusBadge.className = 'res-alloc-status-badge ' + req.statusClass;

  const totalReq = req.requiredItems.reduce((acc, x) => acc + x.req, 0);
  const totalCur = req.requiredItems.reduce((acc, x) => acc + x.current, 0);
  document.getElementById('admProgStats').textContent = `${totalCur} / ${totalReq} Units (${req.progressPct}%) Allocated`;
  document.getElementById('admProgFill').style.width = req.progressPct + '%';

  document.getElementById('admLead').textContent = req.leadOfficer;
  document.getElementById('admTeam').textContent = req.assignedTeam;
  document.getElementById('admEta').textContent = req.eta;
  document.getElementById('admSubStatus').textContent = req.summary;
  document.getElementById('admAiDesc').textContent = req.aiRecommendation;

  // Render items table
  const tbody = document.getElementById('admItemsTableBody');
  tbody.innerHTML = req.requiredItems.map(i => {
    const isFull = i.current >= i.req;
    const diff = i.req - i.current;
    const badgeHtml = isFull 
      ? `<span class="res-alloc-status-badge status-dispatched" style="font-size: 0.7rem;">Fulfilled (100%)</span>`
      : `<span class="res-alloc-status-badge status-partial" style="font-size: 0.7rem;">Deficit: ${diff} ${i.unit}</span>`;

    return `
      <tr>
        <td>
          <div class="adm-item-name-cell">
            <span class="material-icons-outlined text-green" style="font-size: 16px;">${i.icon}</span>
            <span>${i.name}</span>
          </div>
        </td>
        <td style="font-weight: 700; color: #fff;">${i.req} ${i.unit}</td>
        <td style="font-weight: 700; color: ${isFull?'#00e676':'#fbbf24'};">${i.current} ${i.unit}</td>
        <td>${badgeHtml}</td>
        <td style="font-size: 0.75rem; color: #8fbca2;">${i.source}</td>
      </tr>
    `;
  }).join('');

  // Update modal buttons
  const isDone = req.progressPct === 100 || req.status.includes('Dispatched');
  const btnDisp = document.getElementById('admBtnDispatchModal');
  if (btnDisp) {
    btnDisp.innerHTML = isDone 
      ? `<span class="material-icons-outlined" style="font-size: 16px;">check_circle</span> Dispatched &amp; En Route`
      : `<span class="material-icons-outlined" style="font-size: 16px;">local_shipping</span> Complete Dispatch`;
  }

  const backdrop = document.getElementById('allocDetailModalBackdrop');
  if (backdrop) {
    backdrop.style.display = 'flex';
    setTimeout(() => backdrop.classList.add('active'), 10);
  }
}

function closeAllocDetailModal() {
  const backdrop = document.getElementById('allocDetailModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    setTimeout(() => { backdrop.style.display = 'none'; }, 250);
  }
}

// 2. OPTIMIZE ALLOCATION (AI Auto-Fill)
function optimizeAllocation(reqId) {
  const req = window.resourceAllocations.find(r => r.id === reqId);
  if (!req) return;

  req.requiredItems.forEach(i => {
    i.current = i.req;
    i.source = 'AI Optimized &bull; Auto-dispatched from nearest depot';
  });
  req.progressPct = 100;
  req.status = 'Optimized & Ready';
  req.statusClass = 'status-optimized';

  renderResourceAllocations();
  if (window.currentViewingAllocId === reqId) {
    viewAllocationDetail(reqId);
  }
  showResourceToast('⚡ AI Optimization Applied to ' + reqId + ': All required assets fulfilled (100%)');
}

function optimizeCurrentModalAlloc() {
  if (window.currentViewingAllocId) {
    optimizeAllocation(window.currentViewingAllocId);
  }
}

function applyAiOptimizationToCurrent() {
  optimizeCurrentModalAlloc();
}

// 3. ASSIGN ALLOCATION (Dispatch)
function assignAllocation(reqId) {
  const req = window.resourceAllocations.find(r => r.id === reqId);
  if (!req) return;

  req.requiredItems.forEach(i => {
    i.current = i.req;
  });
  req.progressPct = 100;
  req.status = 'Dispatched & En Route';
  req.statusClass = 'status-dispatched';

  renderResourceAllocations();
  if (window.currentViewingAllocId === reqId) {
    viewAllocationDetail(reqId);
  }
  showResourceToast('🚀 Assets Dispatched for ' + reqId + ' &bull; En Route to ' + req.zone);
}

function dispatchCurrentModalAlloc() {
  if (window.currentViewingAllocId) {
    assignAllocation(window.currentViewingAllocId);
  }
}

function allocateDirect(reqId) {
  optimizeAllocation(reqId);
}

function locateAllocZoneOnMap() {
  closeAllocDetailModal();
  const mapEl = document.getElementById('resAllocMap');
  if (mapEl) {
    mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  showResourceToast('Centered map on target operational zone');
}

// 4. VIEW ALL ALLOCATIONS MODAL
function openAllAllocationsModal() {
  const grid = document.getElementById('allocAllCardsGrid');
  if (!grid) return;

  renderAllAllocCardsGrid(window.resourceAllocations);

  const backdrop = document.getElementById('allocAllModalBackdrop');
  if (backdrop) {
    backdrop.style.display = 'flex';
    setTimeout(() => backdrop.classList.add('active'), 10);
  }
}

function closeAllAllocationsModal() {
  const backdrop = document.getElementById('allocAllModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    setTimeout(() => { backdrop.style.display = 'none'; }, 250);
  }
}

function renderAllAllocCardsGrid(items) {
  const grid = document.getElementById('allocAllCardsGrid');
  if (!grid) return;

  grid.innerHTML = items.map(req => {
    const isDone = req.progressPct === 100;
    return `
      <div style="background: rgba(7, 23, 15, 0.85); border: 1px solid rgba(0,230,118,0.22); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-icons-outlined ${req.purposeColor}" style="font-size: 18px;">${req.purposeIcon}</span>
            <span style="font-weight: 700; color: #fff; font-size: 0.9rem;">${req.purpose}</span>
          </div>
          <span class="res-prio-badge ${req.priorityClass}">${req.priority}</span>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: #8fbca2;">
          <span>ID: <strong style="color: #00f5c4;">${req.id}</strong></span>
          <span>Target: <strong style="color: #fff;">${req.zone}</strong></span>
          <span>Lead: <strong style="color: #e8f7ee;">${req.leadOfficer.split(' ')[1] || req.leadOfficer}</strong></span>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-bottom: 4px;">
            <span style="color: #5b8a70;">Allocation Progress</span>
            <span style="color: #00f5c4; font-weight: 700;">${req.progressPct}%</span>
          </div>
          <div style="height: 6px; background: #030c08; border-radius: 3px; overflow: hidden;">
            <div style="width: ${req.progressPct}%; height: 100%; background: linear-gradient(90deg, #00e676, #00bfa5);"></div>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 6px; border-top: 1px solid rgba(24,72,48,0.4);">
          <span class="res-alloc-status-badge ${req.statusClass}">${req.status}</span>
          <div style="display: flex; gap: 6px;">
            <button class="res-btn-action-view" onclick="closeAllAllocationsModal(); viewAllocationDetail('${req.id}')">
              <span class="material-icons-outlined" style="font-size: 13px;">visibility</span> View
            </button>
            <button class="res-btn-action-outline" onclick="optimizeAllocation('${req.id}'); renderAllAllocCardsGrid(window.resourceAllocations);">
              Optimize
            </button>
            <button class="res-btn-action-solid" onclick="assignAllocation('${req.id}'); renderAllAllocCardsGrid(window.resourceAllocations);">
              ${isDone ? 'Dispatched' : 'Dispatch'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function handleAllocSearch(val) {
  val = (val || '').toLowerCase().trim();
  const filtered = window.resourceAllocations.filter(r => 
    r.id.toLowerCase().includes(val) ||
    r.purpose.toLowerCase().includes(val) ||
    r.zone.toLowerCase().includes(val) ||
    r.leadOfficer.toLowerCase().includes(val) ||
    r.priority.toLowerCase().includes(val)
  );
  renderAllAllocCardsGrid(filtered);
}

function filterModalAllocCards(type, btn) {
  document.querySelectorAll('#allocAllModalBackdrop .modal-tab-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  let list = [...window.resourceAllocations];
  if (type === 'critical') list = list.filter(r => r.priority.toLowerCase() === 'critical');
  else if (type === 'partial') list = list.filter(r => r.status.toLowerCase().includes('partial') || r.status.toLowerCase().includes('awaiting'));
  else if (type === 'completed') list = list.filter(r => r.status.toLowerCase().includes('fully') || r.status.toLowerCase().includes('dispatched'));

  renderAllAllocCardsGrid(list);
}

// 5. NEW ALLOCATION REQUEST MODAL
function openNewAllocModal() {
  const backdrop = document.getElementById('newAllocModalBackdrop');
  if (backdrop) {
    backdrop.style.display = 'flex';
    setTimeout(() => backdrop.classList.add('active'), 10);
  }
}

function closeNewAllocModal() {
  const backdrop = document.getElementById('newAllocModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    setTimeout(() => { backdrop.style.display = 'none'; }, 250);
  }
}

function submitNewAllocRequest(e) {
  e.preventDefault();
  const purpose = document.getElementById('narPurpose')?.value || 'Emergency Logistics Mission';
  const zone = document.getElementById('narZone')?.value || 'Zone 4';
  const priority = document.getElementById('narPriority')?.value || 'High';
  const lead = document.getElementById('narOfficer')?.value || 'Ranger Quick Dispatch';

  const nextIdNum = window.resourceAllocations.length + 247;
  const newId = 'REQ-0' + nextIdNum;

  const prioClassMap = {
    'Critical': 'prio-critical',
    'High': 'prio-high',
    'Normal': 'prio-normal',
    'Low': 'prio-low'
  };

  const newReq = {
    id: newId,
    purpose: purpose,
    purposeIcon: 'assignment_turned_in',
    purposeColor: 'text-cyan',
    zone: zone,
    zoneCoords: '10.51° N, 76.97° E',
    priority: priority,
    priorityClass: prioClassMap[priority] || 'prio-high',
    status: 'Partially Allocated',
    statusClass: 'status-partial',
    progressPct: 60,
    leadOfficer: lead,
    assignedTeam: 'Tactical Team 09',
    eta: '12 mins',
    createdAt: 'Just now',
    summary: 'Direct field operational request created from Central Allocation Console.',
    requiredItems: [
      { name: 'Forest Patrol 4x4', icon: 'directions_car', req: 1, current: 1, unit: 'vehicle', source: 'HQ Fleet Standby' },
      { name: 'Aerial Surveillance UAV', icon: 'flight', req: 1, current: 0, unit: 'drone', source: 'Air Wing Depot' },
      { name: 'Field Emergency Pack', icon: 'handyman', req: 2, current: 1, unit: 'packs', source: 'Station A Reserve' }
    ],
    aiRecommendation: 'Immediate auto-allocation queued. Assets assigned from Station A.'
  };

  window.resourceAllocations.unshift(newReq);
  renderResourceAllocations();
  closeNewAllocModal();
  showResourceToast('New Allocation Request ' + newId + ' registered & partially dispatched');
  
  // Open view popup for the newly created request
  setTimeout(() => {
    viewAllocationDetail(newId);
  }, 350);
}

