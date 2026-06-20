/**
 * ScrollSmoother shim — replicates the API surface used in this project
 * without requiring the paid GSAP Club membership.
 */

interface ScrollSmootherConfig {
  wrapper?: string;
  content?: string;
  smooth?: number;
  speed?: number;
  effects?: boolean;
  autoResize?: boolean;
  ignoreMobileResize?: boolean;
}

class ScrollSmootherShim {
  private wrapper: HTMLElement | null;
  private _paused: boolean = false;

  constructor(_config: ScrollSmootherConfig) {
    this.wrapper = document.querySelector(_config.wrapper || "#smooth-wrapper");
    // content is part of the config API but not needed for this shim
  }

  static create(config: ScrollSmootherConfig): ScrollSmootherShim {
    return new ScrollSmootherShim(config);
  }

  static refresh(_hard?: boolean) {
    // No-op shim
  }

  scrollTop(value?: number) {
    if (value !== undefined) {
      window.scrollTo({ top: value });
    }
    return window.scrollY;
  }

  paused(value?: boolean) {
    if (value !== undefined) {
      this._paused = value;
      if (this.wrapper) {
        this.wrapper.style.overflow = value ? "hidden" : "";
      }
    }
    return this._paused;
  }

  scrollTo(target: string, _smooth?: boolean, _position?: string) {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export { ScrollSmootherShim as ScrollSmoother };
