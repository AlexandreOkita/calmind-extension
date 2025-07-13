import type { UserPreferences } from "./user_preferences";

export interface TextNeurodiversityStyles {
  shouldUseBold: boolean;
  className: string;
  style: React.CSSProperties;
}

export class TextNeurodiversityBuilder {
  private textStyles: TextNeurodiversityStyles = {
    shouldUseBold: false,
    className: "",
    style: {},
  };
  private style: Record<string, string> = {};
  private preferences: UserPreferences; // Explicitly define the property

  constructor(preferences: UserPreferences) {
    this.preferences = preferences; // Explicitly assign the parameter to the property
  }

  withFontFamily(fontFamily: string): this {
    if (this.preferences.hasReadingDifficulty) {
      this.textStyles.className += fontFamily;
    }
    this.style.fontFamily = fontFamily;
    return this;
  }

  withDyslexiaStyles(styles: React.CSSProperties): this {
    if (this.preferences.hasReadingDifficulty) {
      this.textStyles.style = { ...this.textStyles.style, ...styles };
    }
    return this;
  }

  withTextColor(textColor: string): this {
    console.log("withTextColor", textColor);
    this.textStyles.className += textColor;
    this.style.color = textColor;
    return this;
  }

  withFontBold(): this {
    if (this.preferences.hasRelevanceDifficulty) {
      this.textStyles.shouldUseBold = true;
    }
    return this;
  }

  build(): TextNeurodiversityStyles {
    return this.textStyles;
  }
}
