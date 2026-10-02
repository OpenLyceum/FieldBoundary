/**
 * FieldBoundaryKeyboardHelpContent.ts
 *
 * Shared keyboard-help dialog content for both Electric and Magnetic screens.
 *
 * The sim has four sliders, two combo boxes, and draggable play-area objects
 * (the field tip, and the pillbox / loop) with distinct normal and shift drag
 * speeds — so basic actions alone would leave most of the keyboard interface
 * undocumented.
 */
import {
  BasicActionsKeyboardHelpSection,
  ComboBoxKeyboardHelpSection,
  KeyboardHelpIconFactory,
  KeyboardHelpSection,
  KeyboardHelpSectionRow,
  LetterKeyNode,
  MoveDraggableItemsKeyboardHelpSection,
  SliderControlsKeyboardHelpSection,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import FieldBoundaryHotkeyData from "./FieldBoundaryHotkeyData.js";

export class FieldBoundaryKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const a11y = StringManager.getInstance().getKeyboardHelpStrings();
    super(
      [
        new MoveDraggableItemsKeyboardHelpSection({
          headingStringProperty: a11y.moveItemsHeadingStringProperty,
        }),
        new KeyboardHelpSection(a11y.protractorHeadingStringProperty, [
          // Q and E have no entry in KeyboardHelpIconFactory's key map, so the row supplies
          // its icon; the keys themselves still come from the HotkeyData.
          KeyboardHelpSectionRow.fromHotkeyData(FieldBoundaryHotkeyData.ROTATE_PROTRACTOR, {
            icon: KeyboardHelpIconFactory.iconOrIcon(new LetterKeyNode("Q"), new LetterKeyNode("E")),
          }),
        ]),
        new SliderControlsKeyboardHelpSection(),
      ],
      [
        new ComboBoxKeyboardHelpSection({
          headingString: a11y.materialListHeadingStringProperty,
          thingAsLowerCaseSingular: a11y.materialSingularStringProperty,
          thingAsLowerCasePlural: a11y.materialPluralStringProperty,
        }),
        new BasicActionsKeyboardHelpSection({ withCheckboxContent: true }),
      ],
    );
  }
}
