/**
 * FluxBoxNode.ts
 *
 * Gaussian pillbox (Electric) / Amperian loop (Magnetic) straddling the
 * interface, with each face's or leg's contribution printed on it.
 *
 * This is the one tool here that a textbook diagram cannot be: the box slides
 * along the boundary and — crucially — collapses toward zero height, so the
 * side contributions (∝ half-height) visibly vanish and
 *
 *   ∮ D·dA = Q_f,enc     becomes    D₁ₙ − D₂ₙ = σ_f
 *   ∮ H·dl = I_f,enc     becomes    H₂ₜ − H₁ₜ = K_f
 *
 * in front of the student, instead of being asserted by the equation strip.
 */
import { Multilink, type TReadOnlyProperty } from "scenerystack/axon";
import { Bounds2, Vector2 } from "scenerystack/dot";
import type { ModelViewTransform2 } from "scenerystack/phetcommon";
import { Circle, Node, Rectangle, RichDragListener, Text } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import FieldBoundaryColors from "../../FieldBoundaryColors.js";
import { FLUX_BOX_HALF_HEIGHT_RANGE, FLUX_BOX_NODE_SETTINGS } from "../../FieldBoundaryConstants.js";
import { FLUX_BOX_CENTER_X_RANGE, type FluxBoxModel } from "../model/FluxBoxModel.js";
import type { InterfaceBoxTally } from "../model/interfaceFields.js";
import { formatTallyValue } from "./fluxTally.js";

export type FluxBoxNodeStrings = {
  /** Accessible name of the draggable box. */
  boxAccessibleName: TReadOnlyProperty<string>;
  /** Accessible name of the collapse handle. */
  heightAccessibleName: TReadOnlyProperty<string>;
};

export class FluxBoxNode extends Node {
  /** Focusable children, in the order they should appear in the PDOM. */
  public readonly focusTargets: Node[];

  public constructor(
    modelViewTransform: ModelViewTransform2,
    fluxBox: FluxBoxModel,
    tallyProperty: TReadOnlyProperty<InterfaceBoxTally>,
    strings: FluxBoxNodeStrings,
  ) {
    super({ visibleProperty: fluxBox.showProperty });

    const outline = new Rectangle(0, 0, 1, 1, {
      stroke: FieldBoundaryColors.fluxBoxStrokeProperty,
      lineWidth: FLUX_BOX_NODE_SETTINGS.OUTLINE_LINE_WIDTH,
      lineDash: [
        FLUX_BOX_NODE_SETTINGS.OUTLINE_LINE_DASH_DASH,
        FLUX_BOX_NODE_SETTINGS.CONSTRUCTOR_OUTLINE_LINE_DASH_DASH,
      ],
      fill: FieldBoundaryColors.fluxBoxFillProperty,
      cursor: "pointer",
      tagName: "div",
      focusable: true,
      accessibleName: strings.boxAccessibleName,
    });

    const heightHandle = new Circle(FLUX_BOX_NODE_SETTINGS.HEIGHT_HANDLE_RADIUS, {
      fill: FieldBoundaryColors.fluxBoxStrokeProperty,
      stroke: FieldBoundaryColors.dragKnobStrokeProperty,
      lineWidth: 1,
      cursor: "ns-resize",
      tagName: "div",
      focusable: true,
      accessibleName: strings.heightAccessibleName,
    });

    const valueFont = new PhetFont({ size: FLUX_BOX_NODE_SETTINGS.VALUE_FONT_SIZE, weight: "bold" });
    const makeValue = (): Text =>
      new Text("", { font: valueFont, fill: FieldBoundaryColors.fluxBoxStrokeProperty, pickable: false });
    const topValue = makeValue();
    const bottomValue = makeValue();
    const rightValue = new Text("", {
      font: new PhetFont(FLUX_BOX_NODE_SETTINGS.RIGHT_VALUE_FONT_SIZE),
      fill: FieldBoundaryColors.fluxBoxAccentProperty,
      pickable: false,
    });
    const leftValue = new Text("", {
      font: new PhetFont(FLUX_BOX_NODE_SETTINGS.LEFT_VALUE_FONT_SIZE),
      fill: FieldBoundaryColors.fluxBoxAccentProperty,
      pickable: false,
    });

    this.children = [outline, topValue, bottomValue, rightValue, leftValue, heightHandle];
    this.focusTargets = [outline, heightHandle];

    const layout = (): void => {
      const centerX = fluxBox.centerXProperty.value;
      const halfHeight = fluxBox.halfHeightProperty.value;
      const topLeft = modelViewTransform.modelToViewPosition(new Vector2(centerX - fluxBox.width / 2, halfHeight));
      const bottomRight = modelViewTransform.modelToViewPosition(new Vector2(centerX + fluxBox.width / 2, -halfHeight));

      outline.setRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
      heightHandle.center = new Vector2((topLeft.x + bottomRight.x) / 2, topLeft.y);

      topValue.centerBottom = new Vector2(outline.rectX + outline.rectWidth / 2, topLeft.y - 10);
      bottomValue.centerTop = new Vector2(outline.rectX + outline.rectWidth / 2, bottomRight.y + 4);
      rightValue.leftCenter = new Vector2(bottomRight.x + 5, (topLeft.y + bottomRight.y) / 2);
      leftValue.rightCenter = new Vector2(topLeft.x - 5, (topLeft.y + bottomRight.y) / 2);
    };

    Multilink.multilink([fluxBox.centerXProperty, fluxBox.halfHeightProperty], layout);

    tallyProperty.link((tally) => {
      topValue.string = formatTallyValue(tally.top);
      bottomValue.string = formatTallyValue(tally.bottom);
      rightValue.string = formatTallyValue(tally.right);
      leftValue.string = formatTallyValue(tally.left);
      layout();
    });

    // ── Drag the box along the interface ────────────────────────────────────
    const dragBoundsX = new Bounds2(
      modelViewTransform.modelToViewX(FLUX_BOX_CENTER_X_RANGE.min),
      0,
      modelViewTransform.modelToViewX(FLUX_BOX_CENTER_X_RANGE.max),
      0,
    );
    const applyBoxDrag = (viewX: number): void => {
      const clampedX = dragBoundsX.closestPointTo(new Vector2(viewX, 0)).x;
      fluxBox.centerXProperty.value = modelViewTransform.viewToModelX(clampedX);
    };

    outline.addInputListener(
      new RichDragListener({
        dragListenerOptions: {
          drag: (event) => {
            applyBoxDrag(outline.globalToParentPoint(event.pointer.point).x);
          },
        },
        keyboardDragListenerOptions: {
          dragSpeed: 200,
          shiftDragSpeed: 60,
          drag: (_event, listener) => {
            applyBoxDrag(modelViewTransform.modelToViewX(fluxBox.centerXProperty.value) + listener.modelDelta.x);
          },
        },
      }),
    );

    // ── Collapse the box toward zero height ─────────────────────────────────
    const applyHeightDrag = (viewY: number): void => {
      const modelY = Math.abs(modelViewTransform.viewToModelY(viewY));
      fluxBox.halfHeightProperty.value = FLUX_BOX_HALF_HEIGHT_RANGE.constrainValue(modelY);
    };

    heightHandle.addInputListener(
      new RichDragListener({
        dragListenerOptions: {
          drag: (event) => {
            applyHeightDrag(heightHandle.globalToParentPoint(event.pointer.point).y);
          },
        },
        keyboardDragListenerOptions: {
          dragSpeed: 120,
          shiftDragSpeed: 40,
          drag: (_event, listener) => {
            applyHeightDrag(heightHandle.center.y + listener.modelDelta.y);
          },
        },
      }),
    );

    // Keep the handle grabbable even when the box is nearly collapsed.
    fluxBox.halfHeightProperty.link(() => {
      heightHandle.touchArea = heightHandle.localBounds.dilated(FLUX_BOX_NODE_SETTINGS.HEIGHT_HANDLE_DILATION);
      heightHandle.mouseArea = heightHandle.localBounds.dilated(
        FLUX_BOX_NODE_SETTINGS.HEIGHT_HANDLE_DILATION_SEGMENT_2,
      );
    });
  }
}
