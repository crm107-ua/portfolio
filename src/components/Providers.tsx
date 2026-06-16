"use client";

import {
  BorderStyle,
  ChartMode,
  ChartVariant,
  DataThemeProvider,
  IconProvider,
  LayoutProvider,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  ThemeProvider,
  ToastProvider,
  TransitionStyle,
} from "@once-ui-system/core";
import { I18nProvider } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/config";
import { style, dataStyle } from "../resources";
import { iconLibrary } from "../resources/icons";

type ProvidersProps = {
  children: React.ReactNode;
  initialLocale?: Locale;
};

export function Providers({ children, initialLocale }: ProvidersProps) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <LayoutProvider>
        <ThemeProvider
          brand={style.brand as Schemes}
          accent={style.accent as Schemes}
          neutral={style.neutral as NeutralColor}
          solid={style.solid as SolidType}
          solidStyle={style.solidStyle as SolidStyle}
          border={style.border as BorderStyle}
          surface={style.surface as SurfaceStyle}
          transition={style.transition as TransitionStyle}
          scaling={style.scaling as ScalingSize}
        >
          <DataThemeProvider
            variant={dataStyle.variant as ChartVariant}
            mode={dataStyle.mode as ChartMode}
            height={dataStyle.height}
            axis={{
              stroke: dataStyle.axis.stroke,
            }}
            tick={{
              fill: dataStyle.tick.fill,
              fontSize: dataStyle.tick.fontSize,
              line: dataStyle.tick.line,
            }}
          >
            <ToastProvider>
              <IconProvider icons={iconLibrary}>{children}</IconProvider>
            </ToastProvider>
          </DataThemeProvider>
        </ThemeProvider>
      </LayoutProvider>
    </I18nProvider>
  );
}
