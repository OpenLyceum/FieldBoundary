import { Node } from "scenerystack/scenery";
import FieldBoundaryNamespace from "../FieldBoundaryNamespace.js";

/** Empty conventional preferences node; the sim currently uses only framework preferences. */
export class FieldBoundaryPreferencesNode extends Node {}

FieldBoundaryNamespace.register("FieldBoundaryPreferencesNode", FieldBoundaryPreferencesNode);
