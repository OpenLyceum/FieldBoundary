/**
 * FieldBoundaryHotkeyData.ts
 *
 * Key bindings that no stock keyboard-help section covers. The protractor's
 * KeyboardListener and its keyboard-help row both read ROTATE_PROTRACTOR, so
 * the two cannot drift apart. Moving the protractor is its RichDragListener's
 * arrow/WASD keys, documented by MoveDraggableItemsKeyboardHelpSection.
 */

import { HotkeyData } from "scenerystack/scenery";
import { StringManager } from "../../i18n/StringManager.js";

const FieldBoundaryHotkeyData = {
  /** Q turns the focused protractor counterclockwise, E clockwise. */
  ROTATE_PROTRACTOR: new HotkeyData({
    keys: ["q", "e"],
    repoName: "field-boundary",
    keyboardHelpDialogLabelStringProperty:
      StringManager.getInstance().getKeyboardHelpStrings().rotateProtractorStringProperty,
  }),
} as const;

export default FieldBoundaryHotkeyData;
