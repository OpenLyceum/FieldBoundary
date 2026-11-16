/**
 * FreeSourceControlPanel.ts
 *
 * Slider for the free surface source density on the interface — σ_f on the
 * Electric screen, K_f on the Magnetic screen. Defaults to 0 (no free source).
 */
import type { Property, TReadOnlyProperty } from "scenerystack/axon";
import { Dimension2, type Range } from "scenerystack/dot";
import { StringUtils } from "scenerystack/phetcommon";
import { Text, VBox } from "scenerystack/scenery";
import { NumberControl, PhetFont } from "scenerystack/scenery-phet";
import FieldBoundaryColors from "../../FieldBoundaryColors.js";
import { FREE_SOURCE_CONTROL_PANEL_SETTINGS } from "../../FieldBoundaryConstants.js";
import { FLAT_RECTANGULAR_BUTTON_OPTIONS, LIGHT_SURFACE_TEXT_FILL } from "../FieldBoundaryButtonOptions.js";
import { FieldBoundaryPanel } from "../FieldBoundaryPanel.js";

export class FreeSourceControlPanel extends FieldBoundaryPanel {
  public constructor(
    sourceProperty: Property<number>,
    range: Range,
    titleProperty: TReadOnlyProperty<string>,
    parameterProperty: TReadOnlyProperty<string>,
    accessibleName: TReadOnlyProperty<string>,
    accessibleHelpText: TReadOnlyProperty<string>,
    /** e.g. "{{value}}, out of the page" — a bare number tells a listener nothing. */
    valueTextPattern: TReadOnlyProperty<string>,
  ) {
    const title = new Text(titleProperty, {
      font: new PhetFont({ size: FREE_SOURCE_CONTROL_PANEL_SETTINGS.TITLE_FONT_SIZE, weight: "bold" }),
      fill: FieldBoundaryColors.textColorProperty,
    });

    const numberControl = new NumberControl(parameterProperty, sourceProperty, range, {
      delta: FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_DELTA,
      includeArrowButtons: true,
      soundGenerator: null,
      layoutFunction: NumberControl.createLayoutFunction4({
        verticalSpacing: FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_VERTICAL_SPACING,
      }),
      titleNodeOptions: {
        fill: FieldBoundaryColors.textColorProperty,
        font: new PhetFont(FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_FONT_SIZE),
      },
      numberDisplayOptions: {
        decimalPlaces: 1,
        textOptions: {
          fill: LIGHT_SURFACE_TEXT_FILL,
          font: new PhetFont(FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_FONT_SIZE),
        },
        backgroundFill: FieldBoundaryColors.controlSurfaceColorProperty,
        backgroundStroke: FieldBoundaryColors.panelBorderColorProperty,
      },
      sliderOptions: {
        trackSize: new Dimension2(
          FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_WIDTH,
          FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_HEIGHT,
        ),
        thumbSize: new Dimension2(
          FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_WIDTH_SEGMENT_2,
          FREE_SOURCE_CONTROL_PANEL_SETTINGS.NUMBER_CONTROL_HEIGHT_SEGMENT_2,
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
        spacing: FREE_SOURCE_CONTROL_PANEL_SETTINGS.CONSTRUCTOR_SPACING,
        align: "left",
        children: [title, numberControl],
      }),
    );
  }
}
