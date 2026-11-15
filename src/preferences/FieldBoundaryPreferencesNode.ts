/**
 * FieldBoundaryPreferencesNode.ts
 *
 * Custom preferences UI shown in Preferences → Simulation. Currently empty —
 * add controls here when the sim gains real preferences.
 */

import { Node } from "scenerystack/scenery";
import type { Tandem } from "scenerystack/tandem";
import FieldBoundaryNamespace from "../FieldBoundaryNamespace.js";
import type { FieldBoundaryPreferencesModel } from "./FieldBoundaryPreferencesModel.js";

/** Empty conventional preferences node; the sim currently uses only framework preferences. */
export class FieldBoundaryPreferencesNode extends Node {
  public constructor(_preferencesModel: FieldBoundaryPreferencesModel, _tandem?: Tandem) {
    super();
  }
}

FieldBoundaryNamespace.register("FieldBoundaryPreferencesNode", FieldBoundaryPreferencesNode);
