/**
 * FieldBoundaryConstants.ts
 *
 * Named numeric constants for layout and the interface-field model.
 */

import { Range } from "scenerystack/dot";
import FieldBoundaryNamespace from "./FieldBoundaryNamespace.js";

// ── Layout / chrome (screen pixels) ───────────────────────────────────────────

/**
 * ScreenView.DEFAULT_LAYOUT_BOUNDS, duplicated as plain numbers so the model
 * space can be derived from it without importing the (DOM-heavy) joist module
 * into the model layer. `InterfaceScreenView` asserts the two agree.
 * @internal Exported for unit tests; not part of the application API.
 */
export const LAYOUT_WIDTH = 1024;
/** @internal Exported for unit tests; not part of the application API. */
export const LAYOUT_HEIGHT = 618;

/** Margin between the screen edge and edge-anchored controls (e.g. Reset All). */
export const SCREEN_VIEW_MARGIN = 20;

/** Corner radius shared by control panels and dialogs. */
export const PANEL_CORNER_RADIUS = 6;

/** Horizontal gap between the play area and the right-hand control column. */
export const PLAY_AREA_RIGHT_GUTTER = 280;

/** Vertical space reserved above the play area for the equation strip. */
export const PLAY_AREA_TOP_INSET = 48;

/** Play-area size in view pixels (drives the isotropic model-view transform). */
export const PLAY_AREA_WIDTH = LAYOUT_WIDTH - SCREEN_VIEW_MARGIN - PLAY_AREA_RIGHT_GUTTER;
export const PLAY_AREA_HEIGHT = LAYOUT_HEIGHT - 2 * SCREEN_VIEW_MARGIN - PLAY_AREA_TOP_INSET;

// ── Model space (arbitrary field units; ε₀ = μ₀ = 1) ───────────────────────────

/** Model x half-width of the play area. */
export const MODEL_HALF_WIDTH = 5;

/**
 * Model y extent of each medium away from the interface.
 *
 * Derived from the play-area aspect ratio so the model-view transform is
 * ISOTROPIC: px/unit is identical in x and y. Anything else draws every angle
 * compressed toward (or away from) the normal, so the arrows would disagree
 * with the θ readout and with the protractor. Do not hard-code this.
 */
export const MODEL_HALF_HEIGHT = (MODEL_HALF_WIDTH * PLAY_AREA_HEIGHT) / PLAY_AREA_WIDTH;

/** Default primary-field magnitude (E₁ or H₁). */
export const DEFAULT_FIELD_MAGNITUDE = 2.2;

/** Allowed primary-field magnitudes. */
export const FIELD_MAGNITUDE_RANGE = new Range(0.8, 3.5);

/** Default angle of the primary field from the interface normal (rad). */
export const DEFAULT_FIELD_ANGLE = Math.PI / 5;

/**
 * Max |θ| from the normal. Keeps a nonzero normal component so boundary
 * scaling stays well-defined.
 */
export const MAX_FIELD_ANGLE = Math.PI / 2 - 0.12;

/**
 * Relative permittivity εᵣ range. Reaches conductor-like values so the
 * limiting case is inside the slider; the slider itself is logarithmic
 * (see LOG_SLIDER_DECADES) because the interesting behavior is at εᵣ ≲ 10.
 */
export const ELECTRIC_PARAMETER_RANGE = new Range(1, 1000);

/**
 * Relative permeability μᵣ range. Real magnetic materials span four decades
 * (ferrite ≈ 10³, iron ≈ 5×10³, mu-metal ≈ 2×10⁴), which is precisely why μ is
 * the interesting parameter — the range has to reach them.
 */
export const MAGNETIC_PARAMETER_RANGE = new Range(1, 20000);

/** Slider tick decades for the logarithmic εᵣ / μᵣ controls. */
export const LOG_SLIDER_DECADES = [1, 10, 100, 1000, 10000];

/**
 * A material contrast of this factor or more counts as a limiting case and
 * fires the transient callout naming what just happened.
 */
export const LIMITING_CASE_RATIO = 20;

/** How long a limiting-case callout stays on screen (ms). */
export const CALLOUT_DURATION_MS = 6000;

export const DEFAULT_EPS1 = 1;
export const DEFAULT_EPS2 = 4;
export const DEFAULT_MU1 = 1;
export const DEFAULT_MU2 = 4;

/** Default free surface charge density σ_f (no free charge). */
export const DEFAULT_SURFACE_CHARGE = 0;

/** Default free surface current density K_f (no free current). */
export const DEFAULT_SURFACE_CURRENT = 0;

/**
 * Free surface charge density σ_f slider range. Comparable to typical Dₙ
 * magnitudes so the discontinuity is visible; large positive σ_f can reverse
 * E₂ₙ (the medium-2 field then points away from medium 1).
 */
export const SURFACE_CHARGE_RANGE = new Range(-2, 2);

/**
 * Display scale for bound-source glyph density (|σ_b| or |K_b| mapped onto this
 * ceiling). Typical values for the default presets are O(1).
 */
export const BOUND_CHARGE_DISPLAY_MAX = 3;

/**
 * Free surface current density K_f slider range (K_f along +ẑ, out of page).
 * Comparable to typical Hₜ magnitudes so the tangential H jump is visible.
 */
export const SURFACE_CURRENT_RANGE = new Range(-2, 2);

/** Number of field lines drawn when the lattice toggle is on. */
export const FIELD_LINE_COUNT = 9;

/**
 * Companion (D / B) arrows are drawn no longer than this multiple of the
 * primary arrow, so large εᵣ / μᵣ stay on screen. The applied factor is shown
 * next to the companion label — an invisible rescale invites false
 * length comparisons.
 */
export const COMPANION_SCALE_HEADROOM = 1.15;

/** Polarization / magnetization arrows are scaled against the primary likewise. */
export const BOUND_SCALE_HEADROOM = 0.95;

// ── Gaussian pillbox / Amperian loop ──────────────────────────────────────────

/** Model width of the pillbox / loop (the "w" in σ_f·w and K_f·w). */
export const FLUX_BOX_WIDTH = 2.4;

/** Model half-height of the pillbox / loop; collapsible toward zero. */
export const FLUX_BOX_HALF_HEIGHT_RANGE = new Range(0.05, 1.6);

export const DEFAULT_FLUX_BOX_HALF_HEIGHT = 0.9;
export const DEFAULT_FLUX_BOX_CENTER_X = -1.6;

/** Arrow geometry (view pixels). */
export const ARROW_HEAD_WIDTH = 16;
export const ARROW_HEAD_HEIGHT = 14;
export const ARROW_TAIL_WIDTH = 5;
export const COMPANION_ARROW_TAIL_WIDTH = 3.5;

/**
 * Sideways separation between adjacent vector lanes (view pixels).
 *
 * E, D and P are collinear by construction, so drawn from a common anchor they
 * stack on one ray and the shortest disappears under the longest. Each is given
 * its own lane instead — see `view/vectorLanes.ts`. Wide enough to separate the
 * tails at a glance, narrow enough that the three still read as one direction.
 */
export const VECTOR_LANE_SPACING = 9;

/** Settings for common/FieldBoundaryPanel.ts. */
export const FIELD_BOUNDARY_PANEL_SETTINGS = {
  /** Options x margin (px). */
  OPTIONS_X_MARGIN: 12,
  /** Options y margin (px). */
  OPTIONS_Y_MARGIN: 10,
} as const;

/** Settings for common/FieldBoundaryScreenIcons.ts. */
export const FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS = {
  INTERFACE_LINE_LINE_DASH_DASH: 18, // px
  INTERFACE_BACKDROP_INTERFACE_LINE_LINE_DASH_DASH: 14, // px
  NORMAL_LINE_LINE_DASH_DASH: 10, // px
  INTERFACE_BACKDROP_NORMAL_LINE_LINE_DASH_DASH: 8, // px

  /** Pixels per model field unit — keeps default arrows readable at navbar size. */
  FIELD_SCALE: 95,
  /** Primary head width (px). */
  PRIMARY_HEAD_WIDTH: 36,
  /** Primary head height (px). */
  PRIMARY_HEAD_HEIGHT: 32,
  /** Primary tail width (px). */
  PRIMARY_TAIL_WIDTH: 14,
  /** Companion head width (px). */
  COMPANION_HEAD_WIDTH: 28,
  /** Companion head height (px). */
  COMPANION_HEAD_HEIGHT: 24,
  /** Companion tail width (px). */
  COMPANION_TAIL_WIDTH: 9,
  /** Half-length of the surface-normal reference tick (icon px). */
  NORMAL_HALF: 150,
  /** Interface line start x (px). */
  INTERFACE_LINE_START_X: 40,
  /** Interface line line width (px). */
  INTERFACE_LINE_LINE_WIDTH: 6,
  /** Normal line line width (px). */
  NORMAL_LINE_LINE_WIDTH: 3,
  /** Normal line opacity (dimensionless). */
  NORMAL_LINE_OPACITY: 0.7,
} as const;

/** Settings for common/view/AngleArcsNode.ts. */
export const ANGLE_ARCS_NODE_SETTINGS = {
  /** View-pixel radius of each θ arc. */
  ARC_RADIUS: 52,
  /** Arc options line width (px). */
  ARC_OPTIONS_LINE_WIDTH: 1.5,
  /** Label font size (px). */
  LABEL_FONT_SIZE: 14,
} as const;

/** Settings for common/view/AngleReadoutNode.ts. */
export const ANGLE_READOUT_NODE_SETTINGS = {
  /** Below this |tanθ₁| the ratio is numerically meaningless. */
  MIN_TAN: 1e-3,
  /** Relative agreement counted as "matches the prediction". */
  MATCH_TOLERANCE: 0.02,
  /** Font font size (px). */
  FONT_FONT_SIZE: 14,
  /** Predicted text font size (px). */
  PREDICTED_TEXT_FONT_SIZE: 12,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 4,
} as const;

/** Settings for common/view/BoundSourceNode.ts. */
export const BOUND_SOURCE_NODE_SETTINGS = {
  ARROW_OPTIONS_HEAD_WIDTH_OFFSET: 4, // px
  ARROW_OPTIONS_HEAD_HEIGHT_OFFSET: 4, // px
  ARROW_OPTIONS_LINE_DASH_DASH: 6, // px
  CONSTRUCTOR_ARROW_OPTIONS_LINE_DASH_DASH: 4, // px

  LABEL1_X_OFFSET: -10, // px
  LABEL1_Y_OFFSET: -4, // px
  LABEL2_X_OFFSET: -10, // px
  LABEL2_Y_OFFSET: 4, // px

  /** Max markers (px). */
  MAX_MARKERS: 9,
  /** View-pixel offset of bound glyphs above the interface (away from the free source). */
  BOUND_GLYPH_Y_OFFSET: 16,
  /** Arrow options line width (px). */
  ARROW_OPTIONS_LINE_WIDTH: 1.5,
  /** Label font size (px). */
  LABEL_FONT_SIZE: 14,
  /** Scale badge font size (dimensionless). */
  SCALE_BADGE_FONT_SIZE: 11,
  /** Source label font size (px). */
  SOURCE_LABEL_FONT_SIZE: 13,
} as const;

/** Settings for common/view/BoundaryVectorsNode.ts. */
export const BOUNDARY_VECTORS_NODE_SETTINGS = {
  P1_LABEL_X_OFFSET: 12, // px
  P1_LABEL_Y_OFFSET: -4, // px
  C1_LABEL_X_OFFSET: 12, // px
  C1_LABEL_Y_OFFSET: 4, // px
  P2_LABEL_X_OFFSET: 12, // px
  P2_LABEL_Y_OFFSET: 4, // px
  C2_LABEL_X_OFFSET: 12, // px
  C2_LABEL_Y_OFFSET: -4, // px

  /** Radius of the field-tip drag knob, and how far its touch and mouse areas reach past it, px. */
  KNOB_RADIUS: 10,
  /** Knob touch dilation (px). */
  KNOB_TOUCH_DILATION: 10,
  /** Knob mouse dilation (px). */
  KNOB_MOUSE_DILATION: 4,
  /** Companion arrow options line width (px). */
  COMPANION_ARROW_OPTIONS_LINE_WIDTH: 1.8,
  /** Label font size (px). */
  LABEL_FONT_SIZE: 16,
  /** Badge font size (px). */
  BADGE_FONT_SIZE: 11,
} as const;

/** Settings for common/view/ComponentOverlayNode.ts. */
export const COMPONENT_OVERLAY_NODE_SETTINGS = {
  MAKE_LINE_LINE_DASH_DASH: 7, // px
  CONSTRUCTOR_MAKE_LINE_LINE_DASH_DASH: 5, // px
  APPLY_HIGHLIGHT_LINE_WIDTH: 2.5, // px
  CONSTRUCTOR_APPLY_HIGHLIGHT_LINE_WIDTH: 1.5, // px

  ET_LABEL_Y_OFFSET: -5, // px
  DN_LABEL_X_OFFSET: 7, // px

  /** Font font size (px). */
  FONT_FONT_SIZE: 13,
  /** Make line line width (px). */
  MAKE_LINE_LINE_WIDTH: 1.5,
} as const;

/** Settings for common/view/EquationStripNode.ts. */
export const EQUATION_STRIP_NODE_SETTINGS = {
  CONTENT_ITEM_1_SPACING: 18, // px

  /** Font font size (px). */
  FONT_FONT_SIZE: 15,
  /** Highlight font size (px). */
  HIGHLIGHT_FONT_SIZE: 15,
  /** Title font size (px). */
  TITLE_FONT_SIZE: 14,
  /** Row spacing (px). */
  ROW_SPACING: 14,
  /** Duality text font size (px). */
  DUALITY_TEXT_FONT_SIZE: 11,
  /** Content spacing (px). */
  CONTENT_SPACING: 3,
  /** Background width (px). */
  BACKGROUND_WIDTH: 10,
  /** Background height (px). */
  BACKGROUND_HEIGHT: 10,
  /** Background corner radius (px). */
  BACKGROUND_CORNER_RADIUS: 6,
  /** Left left (px). */
  LEFT_LEFT: 12,
} as const;

/** Settings for common/view/FieldLinesNode.ts. */
export const FIELD_LINES_NODE_SETTINGS = {
  /** Line width line width (px). */
  LINE_WIDTH_LINE_WIDTH: 1.5,
} as const;

/** Settings for common/view/FluxBoxNode.ts. */
export const FLUX_BOX_NODE_SETTINGS = {
  OUTLINE_LINE_DASH_DASH: 6, // px
  CONSTRUCTOR_OUTLINE_LINE_DASH_DASH: 4, // px

  HEIGHT_HANDLE_DILATION: 8, // px
  HEIGHT_HANDLE_DILATION_SEGMENT_2: 4, // px

  /** Outline line width (px). */
  OUTLINE_LINE_WIDTH: 2,
  /** Height handle radius (px). */
  HEIGHT_HANDLE_RADIUS: 7,
  /** Value font size (px). */
  VALUE_FONT_SIZE: 12,
  /** Right value font size (px). */
  RIGHT_VALUE_FONT_SIZE: 11,
  /** Left value font size (px). */
  LEFT_VALUE_FONT_SIZE: 11,
} as const;

/** Settings for common/view/FluxTallyPanel.ts. */
export const FLUX_TALLY_PANEL_SETTINGS = {
  /** Label font size (px). */
  LABEL_FONT_SIZE: 12,
  /** Value font size (px). */
  VALUE_FONT_SIZE: 12,
  /** Title font size (px). */
  TITLE_FONT_SIZE: 13,
  /** Grid x spacing (px). */
  GRID_X_SPACING: 12,
  /** Grid y spacing (px). */
  GRID_Y_SPACING: 3,
  /** Hint font size (px). */
  HINT_FONT_SIZE: 10,
  /** Hint max width (px). */
  HINT_MAX_WIDTH: 200,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 6,
} as const;

/** Settings for common/view/FreeSourceControlPanel.ts. */
export const FREE_SOURCE_CONTROL_PANEL_SETTINGS = {
  NUMBER_CONTROL_WIDTH_SEGMENT_2: 14, // px
  NUMBER_CONTROL_HEIGHT_SEGMENT_2: 24, // px

  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Number control delta (control/model units). */
  NUMBER_CONTROL_DELTA: 0.1,
  /** Number control vertical spacing (px). */
  NUMBER_CONTROL_VERTICAL_SPACING: 4,
  /** Number control font size (px). */
  NUMBER_CONTROL_FONT_SIZE: 13,
  /** Number control width (px). */
  NUMBER_CONTROL_WIDTH: 120,
  /** Number control height (px). */
  NUMBER_CONTROL_HEIGHT: 4,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for common/view/FreeSourceOverlayNode.ts. */
export const FREE_SOURCE_OVERLAY_NODE_SETTINGS = {
  /** Max markers (px). */
  MAX_MARKERS: 9,
} as const;

/** Settings for common/view/InterfaceBackgroundNode.ts. */
export const INTERFACE_BACKGROUND_NODE_SETTINGS = {
  INTERFACE_LINE_LINE_DASH_DASH: 10, // px
  CONSTRUCTOR_INTERFACE_LINE_LINE_DASH_DASH: 8, // px
  NORMAL_LINE_LINE_DASH_DASH: 6, // px
  CONSTRUCTOR_NORMAL_LINE_LINE_DASH_DASH: 5, // px

  /** Interface line line width (px). */
  INTERFACE_LINE_LINE_WIDTH: 3,
  /** Normal line line width (px). */
  NORMAL_LINE_LINE_WIDTH: 1.5,
} as const;

/** Settings for common/view/InterfaceScreenView.ts. */
export const INTERFACE_SCREEN_VIEW_SETTINGS = {
  UNITS_NOTE_MAX_WIDTH_OFFSET: 32, // px

  /** Inset of tags, readouts and panels from the play-area edges, px. */
  PLAY_AREA_INSET: 8,
  /** Top of the angle readout, below the medium 1 tag, px from the play-area top. */
  ANGLE_READOUT_TOP: 36,
  /** How far above the interface the limiting-case callout is anchored, px. */
  LIMITING_CALLOUT_OFFSET_Y: 92,
  /** Gap between the play area and the control column, px. */
  CONTROLS_GAP: 12,
  /** Vertical gap between stacked control panels, px. */
  PANEL_SPACING: 10,
  /** Medium1 tag font size (px). */
  MEDIUM1_TAG_FONT_SIZE: 14,
  /** Medium2 tag font size (px). */
  MEDIUM2_TAG_FONT_SIZE: 14,
  /** Protractor scale (dimensionless). */
  PROTRACTOR_SCALE: 0.55,
  /** Units note font size (px). */
  UNITS_NOTE_FONT_SIZE: 11,
} as const;

/** Settings for common/view/LimitingCaseCalloutNode.ts. */
export const LIMITING_CASE_CALLOUT_NODE_SETTINGS = {
  TEXT_LINE_WRAP: 320, // px

  /** Text font size (px). */
  TEXT_FONT_SIZE: 13,
  /** Background width (px). */
  BACKGROUND_WIDTH: 10,
  /** Background height (px). */
  BACKGROUND_HEIGHT: 10,
  /** Background corner radius (px). */
  BACKGROUND_CORNER_RADIUS: 6,
  /** Background line width (px). */
  BACKGROUND_LINE_WIDTH: 1.5,
} as const;

/** Settings for common/view/MagnitudeControlPanel.ts. */
export const MAGNITUDE_CONTROL_PANEL_SETTINGS = {
  NUMBER_CONTROL_WIDTH_SEGMENT_2: 14, // px
  NUMBER_CONTROL_HEIGHT_SEGMENT_2: 24, // px

  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Number control delta (control/model units). */
  NUMBER_CONTROL_DELTA: 0.1,
  /** Number control vertical spacing (px). */
  NUMBER_CONTROL_VERTICAL_SPACING: 4,
  /** Number control font size (px). */
  NUMBER_CONTROL_FONT_SIZE: 13,
  /** Number control width (px). */
  NUMBER_CONTROL_WIDTH: 120,
  /** Number control height (px). */
  NUMBER_CONTROL_HEIGHT: 4,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for common/view/MediaControlPanel.ts. */
export const MEDIA_CONTROL_PANEL_SETTINGS = {
  SLIDER_WIDTH_SEGMENT_2: 14, // px
  SLIDER_HEIGHT_SEGMENT_2: 24, // px

  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Item font size (px). */
  ITEM_FONT_SIZE: 14,
  /** Readout font size (px). */
  READOUT_FONT_SIZE: 13,
  /** Slider width (px). */
  SLIDER_WIDTH: 140,
  /** Slider height (px). */
  SLIDER_HEIGHT: 4,
  /** Constructor font size (px). */
  CONSTRUCTOR_FONT_SIZE: 10,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 8,
} as const;

/** Settings for common/view/ToolsControlPanel.ts. */
export const TOOLS_CONTROL_PANEL_SETTINGS = {
  /** Title font size (px). */
  TITLE_FONT_SIZE: 15,
  /** Label font size (px). */
  LABEL_FONT_SIZE: 14,
  /** Symbol font size (px). */
  SYMBOL_FONT_SIZE: 15,
  /** Vectors heading font size (px). */
  VECTORS_HEADING_FONT_SIZE: 14,
  /** Vectors row spacing (px). */
  VECTORS_ROW_SPACING: 14,
  /** Group spacing (px). */
  GROUP_SPACING: 8,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 10,
} as const;

/** Settings for common/view/currentDetails.ts. */
export const CURRENT_DETAILS_SETTINGS = {
  /** Below this a source or bound density counts as zero for description purposes. */
  NEGLIGIBLE: 5e-3,
} as const;

/** Settings for common/view/interfaceMarkers.ts. */
export const INTERFACE_MARKERS_SETTINGS = {
  BACKDROP_LINE_DASH_DASH: 4, // px
  TEXT_SIZE: 22, // px
  CREATE_CHARGE_MARKER_TEXT_SIZE: 18, // px
  RING_LINE_DASH_DASH: 4, // px
  CREATE_CURRENT_MARKER_RING_LINE_DASH_DASH: 3, // px

  /** Marker radius (px). */
  MARKER_RADIUS: 11,
  /** Backdrop line width (px). */
  BACKDROP_LINE_WIDTH: 2.5,
  /** Ring line width (px). */
  RING_LINE_WIDTH: 2.5,
  /** Create current marker radius (px). */
  CREATE_CURRENT_MARKER_RADIUS: 2.6,
  /** Create current marker line width (px). */
  CREATE_CURRENT_MARKER_LINE_WIDTH: 2.5,
} as const;

/** Settings for preferences/FieldBoundaryPreferencesNode.ts. */
export const FIELD_BOUNDARY_PREFERENCES_NODE_SETTINGS = {
  /** Header font size (px). */
  HEADER_FONT_SIZE: 18,
  /** Constructor spacing (px). */
  CONSTRUCTOR_SPACING: 12,
} as const;

/** Settings for common/model/DualMediaInterfaceModel.ts; units are documented per value. */
export const DUAL_MEDIA_INTERFACE_SETTINGS = {
  /** Minimum primary-field normal component while dragging (simulation field units). */
  MIN_PRIMARY_TIP_Y: 0.2,
} as const;

FieldBoundaryNamespace.register("FieldBoundaryConstants", {
  LAYOUT_WIDTH,
  LAYOUT_HEIGHT,
  SCREEN_VIEW_MARGIN,
  PANEL_CORNER_RADIUS,
  PLAY_AREA_RIGHT_GUTTER,
  PLAY_AREA_TOP_INSET,
  PLAY_AREA_WIDTH,
  PLAY_AREA_HEIGHT,
  MODEL_HALF_WIDTH,
  MODEL_HALF_HEIGHT,
  DEFAULT_FIELD_MAGNITUDE,
  FIELD_MAGNITUDE_RANGE,
  DEFAULT_FIELD_ANGLE,
  MAX_FIELD_ANGLE,
  ELECTRIC_PARAMETER_RANGE,
  MAGNETIC_PARAMETER_RANGE,
  LOG_SLIDER_DECADES,
  LIMITING_CASE_RATIO,
  CALLOUT_DURATION_MS,
  DEFAULT_EPS1,
  DEFAULT_EPS2,
  DEFAULT_MU1,
  DEFAULT_MU2,
  DEFAULT_SURFACE_CHARGE,
  DEFAULT_SURFACE_CURRENT,
  SURFACE_CHARGE_RANGE,
  SURFACE_CURRENT_RANGE,
  BOUND_CHARGE_DISPLAY_MAX,
  FIELD_LINE_COUNT,
  COMPANION_SCALE_HEADROOM,
  BOUND_SCALE_HEADROOM,
  VECTOR_LANE_SPACING,
  FLUX_BOX_WIDTH,
  FLUX_BOX_HALF_HEIGHT_RANGE,
  DEFAULT_FLUX_BOX_HALF_HEIGHT,
  DEFAULT_FLUX_BOX_CENTER_X,
});
