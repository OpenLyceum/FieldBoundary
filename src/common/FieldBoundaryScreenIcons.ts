/**
 * FieldBoundaryScreenIcons.ts
 *
 * Programmatic home-screen / navigation-bar icons for each screen.
 * Drawn on the standard PhET 548 × 373 canvas using FieldBoundaryColors.
 *
 * Motifs mirror the play area: two media half-planes, a dashed interface, a
 * surface-normal guide, and primary + companion field arrows using the same
 * tip-at-interface convention as BoundaryVectorsNode (medium-2 tip on the
 * boundary, continuous with +n̂).
 */
import type { TReadOnlyProperty } from "scenerystack/axon";
import type { Vector2 } from "scenerystack/dot";
import type { Color } from "scenerystack/scenery";
import { Line, Node, Rectangle } from "scenerystack/scenery";
import { ArrowNode } from "scenerystack/scenery-phet";
import { ScreenIcon } from "scenerystack/sim";
import FieldBoundaryColors from "../FieldBoundaryColors.js";
import {
  DEFAULT_EPS1,
  DEFAULT_EPS2,
  DEFAULT_FIELD_ANGLE,
  DEFAULT_FIELD_MAGNITUDE,
  DEFAULT_MU1,
  DEFAULT_MU2,
  FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS,
} from "../FieldBoundaryConstants.js";
import { fieldFromPolar, refractElectric, refractMagnetic } from "./model/interfaceFields.js";

const W = 548;
const H = 373;

/** Interface origin in icon pixels. */
const OX = W / 2;
const OY = H / 2;

/** Pixels per model field unit — keeps default arrows readable at navbar size. */
const FIELD_SCALE: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.FIELD_SCALE;

const PRIMARY_HEAD_WIDTH: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.PRIMARY_HEAD_WIDTH;
const PRIMARY_HEAD_HEIGHT: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.PRIMARY_HEAD_HEIGHT;
const PRIMARY_TAIL_WIDTH: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.PRIMARY_TAIL_WIDTH;
const COMPANION_HEAD_WIDTH: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.COMPANION_HEAD_WIDTH;
const COMPANION_HEAD_HEIGHT: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.COMPANION_HEAD_HEIGHT;
const COMPANION_TAIL_WIDTH: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.COMPANION_TAIL_WIDTH;

/** Half-length of the surface-normal reference tick (icon px). */
const NORMAL_HALF: number = FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.NORMAL_HALF;

function background(): Rectangle {
  return new Rectangle(0, 0, W, H, { fill: FieldBoundaryColors.backgroundColorProperty });
}

function iconFrom(content: Node): ScreenIcon {
  return new ScreenIcon(content, {
    maxIconWidthProportion: 0.9,
    maxIconHeightProportion: 0.9,
    fill: FieldBoundaryColors.backgroundColorProperty,
  });
}

/** Two media fills + dashed interface and surface-normal guide — same palette as InterfaceBackgroundNode. */
function interfaceBackdrop(): Node {
  const medium1 = new Rectangle(0, 0, W, OY, {
    fill: FieldBoundaryColors.medium1FillProperty,
  });
  const medium2 = new Rectangle(0, OY, W, H - OY, {
    fill: FieldBoundaryColors.medium2FillProperty,
  });
  const interfaceLine = new Line(FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.INTERFACE_LINE_START_X, OY, W - 40, OY, {
    stroke: FieldBoundaryColors.interfaceStrokeProperty,
    lineWidth: FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.INTERFACE_LINE_LINE_WIDTH,
    lineDash: [
      FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.INTERFACE_LINE_LINE_DASH_DASH,
      FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.INTERFACE_BACKDROP_INTERFACE_LINE_LINE_DASH_DASH,
    ],
  });
  // Surface-normal reference through the interface origin (faint; behind arrows).
  const normalLine = new Line(OX, OY - NORMAL_HALF, OX, OY + NORMAL_HALF, {
    stroke: FieldBoundaryColors.normalStrokeProperty,
    lineWidth: FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.NORMAL_LINE_LINE_WIDTH,
    lineDash: [
      FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.NORMAL_LINE_LINE_DASH_DASH,
      FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.INTERFACE_BACKDROP_NORMAL_LINE_LINE_DASH_DASH,
    ],
    opacity: FIELD_BOUNDARY_SCREEN_ICONS_SETTINGS.NORMAL_LINE_OPACITY,
  });
  return new Node({ children: [medium1, medium2, interfaceLine, normalLine] });
}

/**
 * Scale companions so the longest stays comparable to the primary — same idea as
 * BoundaryVectorsNode.companionScale.
 */
function companionScale(primary1: Vector2, primary2: Vector2, companion1: Vector2, companion2: Vector2): number {
  const primaryMax = Math.max(primary1.magnitude, primary2.magnitude, 1e-6);
  const companionMax = Math.max(companion1.magnitude, companion2.magnitude, 1e-6);
  return Math.min(1, (primaryMax * 1.15) / companionMax);
}

/** Medium-1 arrow: tail at the interface, tip at the physics vector (view Y up). */
function arrowMedium1(field: Vector2, fill: TReadOnlyProperty<Color>, companion: boolean): ArrowNode {
  return new ArrowNode(OX, OY, OX + FIELD_SCALE * field.x, OY - FIELD_SCALE * field.y, {
    headWidth: companion ? COMPANION_HEAD_WIDTH : PRIMARY_HEAD_WIDTH,
    headHeight: companion ? COMPANION_HEAD_HEIGHT : PRIMARY_HEAD_HEIGHT,
    tailWidth: companion ? COMPANION_TAIL_WIDTH : PRIMARY_TAIL_WIDTH,
    stroke: null,
    fill,
    opacity: companion ? 0.7 : 1,
  });
}

/**
 * Medium-2 arrow: tip at the interface, tail at −physics so the shaft continues
 * the medium-1 field through the boundary (see BoundaryVectorsNode).
 */
function arrowMedium2(field: Vector2, fill: TReadOnlyProperty<Color>, companion: boolean): ArrowNode {
  return new ArrowNode(OX - FIELD_SCALE * field.x, OY + FIELD_SCALE * field.y, OX, OY, {
    headWidth: companion ? COMPANION_HEAD_WIDTH : PRIMARY_HEAD_WIDTH,
    headHeight: companion ? COMPANION_HEAD_HEIGHT : PRIMARY_HEAD_HEIGHT,
    tailWidth: companion ? COMPANION_TAIL_WIDTH : PRIMARY_TAIL_WIDTH,
    stroke: null,
    fill,
    opacity: companion ? 0.7 : 1,
  });
}

function fieldPair(
  primary1: Vector2,
  primary2: Vector2,
  companion1: Vector2,
  companion2: Vector2,
  primaryFill: TReadOnlyProperty<Color>,
  companionFill: TReadOnlyProperty<Color>,
): Node {
  const scale = companionScale(primary1, primary2, companion1, companion2);
  const c1 = companion1.timesScalar(scale);
  const c2 = companion2.timesScalar(scale);
  return new Node({
    children: [
      arrowMedium1(c1, companionFill, true),
      arrowMedium2(c2, companionFill, true),
      arrowMedium1(primary1, primaryFill, false),
      arrowMedium2(primary2, primaryFill, false),
    ],
  });
}

/** Electric: E (orange) + D (green) refracted at ε₂/ε₁ = 4. */
export function createElectricIcon(): ScreenIcon {
  const e1 = fieldFromPolar(DEFAULT_FIELD_MAGNITUDE, DEFAULT_FIELD_ANGLE);
  const { e2, d1, d2 } = refractElectric(e1, DEFAULT_EPS1, DEFAULT_EPS2);
  return iconFrom(
    new Node({
      children: [
        background(),
        interfaceBackdrop(),
        fieldPair(e1, e2, d1, d2, FieldBoundaryColors.eFieldColorProperty, FieldBoundaryColors.dFieldColorProperty),
      ],
    }),
  );
}

/** Magnetic: H (blue) + B (purple) refracted at μ₂/μ₁ = 4. */
export function createMagneticIcon(): ScreenIcon {
  const h1 = fieldFromPolar(DEFAULT_FIELD_MAGNITUDE, DEFAULT_FIELD_ANGLE);
  const { h2, b1, b2 } = refractMagnetic(h1, DEFAULT_MU1, DEFAULT_MU2);
  return iconFrom(
    new Node({
      children: [
        background(),
        interfaceBackdrop(),
        fieldPair(h1, h2, b1, b2, FieldBoundaryColors.hFieldColorProperty, FieldBoundaryColors.bFieldColorProperty),
      ],
    }),
  );
}
