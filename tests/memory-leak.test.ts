/**
 * Fleet-standard memory-leak regression suite (SceneryStackTemplate / QubitSketch pattern).
 *
 * Creates a disposable model object inside a function boundary, disposes it, forces
 * garbage collection via global.gc (--expose-gc in vitest.config.ts), then asserts via
 * WeakRef that the object was collected. V8 requires a function boundary (not merely
 * a block scope) so local strong references die when the helper returns.
 *
 * This points at the sim's own models rather than a template placeholder: the
 * screen models register a Multilink on their parameter Properties, so a model
 * that fails to dispose that link stays reachable forever.
 */

import { describe, expect, it } from "vitest";
import { FluxBoxModel } from "../src/common/model/FluxBoxModel.js";
import { SharedModel } from "../src/common/model/SharedModel.js";
import { ElectricModel } from "../src/electric/model/ElectricModel.js";
import { MagneticModel } from "../src/magnetic/model/MagneticModel.js";
import { describeDisposalLeaks, forceGC } from "./helpers/memoryLeak.js";

function createAndDisposeElectricModel(): WeakRef<object> {
  const model = new ElectricModel();
  // Exercise the field multilink so the dependency graph is fully wired.
  model.setE1FromTip(model.e1Property.value);
  model.eps2Property.value = 12;
  const ref = new WeakRef<object>(model);
  model.dispose();
  return ref;
}

function createAndDisposeMagneticModel(): WeakRef<object> {
  const model = new MagneticModel();
  model.surfaceCurrentProperty.value = 1;
  const ref = new WeakRef<object>(model);
  model.dispose();
  return ref;
}

describe("Memory leak regression", () => {
  it("ElectricModel is collected after dispose", async () => {
    const ref = createAndDisposeElectricModel();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("MagneticModel is collected after dispose", async () => {
    const ref = createAndDisposeMagneticModel();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("repeated create/dispose cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDisposeElectricModel());
      refs.push(createAndDisposeMagneticModel());
    }
    await forceGC(refs);
    const survivors = refs.filter((r) => r.deref() !== undefined).length;
    expect(survivors).toBe(0);
  }, 90_000);
});

describeDisposalLeaks([
  { name: "FluxBoxModel", create: () => new FluxBoxModel() },
  { name: "SharedModel", create: () => new SharedModel() },
  { name: "ElectricModel", create: () => new ElectricModel() },
  { name: "MagneticModel", create: () => new MagneticModel() },
]);
