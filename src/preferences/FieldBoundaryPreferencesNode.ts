import { FIELD_BOUNDARY_PREFERENCES_NODE_SETTINGS } from "../FieldBoundaryConstants.js";
/**
 * FieldBoundaryPreferencesNode.ts
 *
 * Custom preferences UI shown in Preferences → Simulation. Currently empty —
 * add controls here when the sim gains real preferences.
 */

import { Text, VBox } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import type { Tandem } from "scenerystack/tandem";
import FieldBoundaryColors from "../FieldBoundaryColors.js";
import FieldBoundaryNamespace from "../FieldBoundaryNamespace.js";
import { StringManager } from "../i18n/StringManager.js";
import type { FieldBoundaryPreferencesModel } from "./FieldBoundaryPreferencesModel.js";

/** Preferences dialog content sits on a light background regardless of color profile. */
const PREFERENCES_TEXT_FILL = FieldBoundaryColors.controlSurfaceTextColorProperty;

export class FieldBoundaryPreferencesNode extends VBox {
  public constructor(_preferencesModel: FieldBoundaryPreferencesModel, _tandem?: Tandem) {
    const prefStrings = StringManager.getInstance().getPreferences();

    const header = new Text(prefStrings.titleStringProperty, {
      font: new PhetFont({ size: FIELD_BOUNDARY_PREFERENCES_NODE_SETTINGS.HEADER_FONT_SIZE, weight: "bold" }),
      fill: PREFERENCES_TEXT_FILL,
    });

    super({
      align: "left",
      spacing: FIELD_BOUNDARY_PREFERENCES_NODE_SETTINGS.CONSTRUCTOR_SPACING,
      children: [header],
    });
  }
}

FieldBoundaryNamespace.register("FieldBoundaryPreferencesNode", FieldBoundaryPreferencesNode);
