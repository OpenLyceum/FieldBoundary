/**
 * MagnitudeControlPanel.ts
 *
 * Slider for the primary-field magnitude (angle is set by dragging the tip).
 */
import type { Property, TReadOnlyProperty } from "scenerystack/axon";
import { Dimension2 } from "scenerystack/dot";
import { StringUtils } from "scenerystack/phetcommon";
import { Text, VBox } from "scenerystack/scenery";
import { NumberControl, PhetFont } from "scenerystack/scenery-phet";
import FieldBoundaryColors from "../../FieldBoundaryColors.js";
import { FIELD_MAGNITUDE_RANGE, MAGNITUDE_CONTROL_PANEL_SETTINGS } from "../../FieldBoundaryConstants.js";
import { FLAT_RECTANGULAR_BUTTON_OPTIONS, LIGHT_SURFACE_TEXT_FILL } from "../FieldBoundaryButtonOptions.js";
import { FieldBoundaryPanel } from "../FieldBoundaryPanel.js";

export class MagnitudeControlPanel extends FieldBoundaryPanel {
  public constructor(
    magnitudeProperty: Property<number>,
    titleProperty: TReadOnlyProperty<string>,
    accessibleName: TReadOnlyProperty<string>,
    accessibleHelpText: TReadOnlyProperty<string>,
    /** e.g. "{{value}} field units" — a bare number tells a listener nothing. */
    valueTextPattern: TReadOnlyProperty<string>,
  ) {
    const title = new Text(titleProperty, {
      font: new PhetFont({ size: MAGNITUDE_CONTROL_PANEL_SETTINGS.TITLE_FONT_SIZE, weight: "bold" }),
      fill: FieldBoundaryColors.textColorProperty,
    });

    const numberControl = new NumberControl("", magnitudeProperty, FIELD_MAGNITUDE_RANGE, {
      delta: MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_DELTA,
      includeArrowButtons: true,
      soundGenerator: null,
      layoutFunction: NumberControl.createLayoutFunction4({
        verticalSpacing: MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_VERTICAL_SPACING,
      }),
      titleNodeOptions: {
        fill: FieldBoundaryColors.textColorProperty,
        font: new PhetFont(MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_FONT_SIZE),
      },
      numberDisplayOptions: {
        decimalPlaces: 1,
        textOptions: {
          fill: LIGHT_SURFACE_TEXT_FILL,
          font: new PhetFont(MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_FONT_SIZE),
        },
        backgroundFill: FieldBoundaryColors.controlSurfaceColorProperty,
        backgroundStroke: FieldBoundaryColors.panelBorderColorProperty,
      },
      sliderOptions: {
        trackSize: new Dimension2(
          MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_WIDTH,
          MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_HEIGHT,
        ),
        thumbSize: new Dimension2(
          MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_WIDTH_SEGMENT_2,
          MAGNITUDE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_HEIGHT_SEGMENT_2,
        ),
        pdomCreateAriaValueText: (value: number) =>
          StringUtils.fillIn(valueTextPattern, { value: StringUtils.toFixedLTR(value, 1) }),
      },
      accessibleName,
      accessibleHelpText,
      arrowButtonOptions: FLAT_RECTANGULAR_BUTTON_OPTIONS,
    });

    super(
      new VBox({
        spacing: MAGNITUDE_CONTROL_PANEL_SETTINGS.CONSTRUCTOR_SPACING,
        align: "left",
        children: [title, numberControl],
      }),
    );
  }
}
