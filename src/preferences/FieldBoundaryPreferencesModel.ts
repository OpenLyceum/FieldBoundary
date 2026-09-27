import FieldBoundaryNamespace from "../FieldBoundaryNamespace.js";

/**
 * Reserved for simulation-specific preferences (Preferences → Simulation). Each preference
 * Property should take its initial value from a query parameter in
 * fieldBoundaryQueryParameters.ts; add the matching control to FieldBoundaryPreferencesNode and register the
 * node under `simulationOptions.customPreferences` in src/main.ts.
 */
export class FieldBoundaryPreferencesModel {
  public reset(): void {
    // No simulation-specific preferences yet.
  }
}

FieldBoundaryNamespace.register("FieldBoundaryPreferencesModel", FieldBoundaryPreferencesModel);
