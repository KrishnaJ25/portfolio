/**
 * SplitText shim — replicates the GSAP Club SplitText plugin API
 * used in this project without requiring a paid membership.
 */

interface SplitTextConfig {
  type?: string;
  linesClass?: string;
  charsClass?: string;
  wordsClass?: string;
}

class SplitTextShim {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];

  private originals: Map<HTMLElement, string> = new Map();
  private targets: HTMLElement[] = [];

  constructor(
    selector: string | string[] | HTMLElement | HTMLElement[],
    config: SplitTextConfig = {}
  ) {
    const types = (config.type || "chars,words,lines").split(",").map((s) => s.trim());
    const linesClass = config.linesClass || "";

    // Normalise input to array of elements
    let elements: HTMLElement[] = [];
    if (typeof selector === "string") {
      elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    } else if (Array.isArray(selector)) {
      selector.forEach((s) => {
        if (typeof s === "string") {
          elements.push(...Array.from(document.querySelectorAll<HTMLElement>(s)));
        } else {
          elements.push(s);
        }
      });
    } else {
      elements = [selector as HTMLElement];
    }

    this.targets = elements;

    elements.forEach((el) => {
      this.originals.set(el, el.innerHTML);
      const text = el.innerText || el.textContent || "";

      if (types.includes("chars") || types.includes("words")) {
        const wordEls: HTMLElement[] = [];

        const wordTexts = text.split(/\s+/).filter(Boolean);
        el.innerHTML = wordTexts
          .map((word) => {
            if (types.includes("chars")) {
              const charSpans = word
                .split("")
                .map((ch) => `<span class="split-char" style="display:inline-block">${ch}</span>`)
                .join("");
              return `<span class="split-word ${linesClass}" style="display:inline-block;overflow:hidden">${charSpans}</span>`;
            }
            return `<span class="split-word ${linesClass}" style="display:inline-block;overflow:hidden">${word}</span>`;
          })
          .join(" ");

        const wordEls2 = Array.from(el.querySelectorAll<HTMLElement>(".split-word"));
        wordEls.push(...wordEls2);
        this.words.push(...wordEls2);

        if (types.includes("chars")) {
          this.chars.push(...Array.from(el.querySelectorAll<HTMLElement>(".split-char")));
        }
      }

      if (types.includes("lines") && !types.includes("chars") && !types.includes("words")) {
        const lineEls = text.split("\n").filter(Boolean).map((line) => {
          const span = document.createElement("span");
          span.className = `split-line ${linesClass}`;
          span.style.display = "block";
          span.textContent = line;
          return span;
        });
        el.innerHTML = "";
        lineEls.forEach((le) => el.appendChild(le));
        this.lines.push(...lineEls);
      }
    });
  }

  revert() {
    this.targets.forEach((el) => {
      const orig = this.originals.get(el);
      if (orig !== undefined) el.innerHTML = orig;
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export { SplitTextShim as SplitText };
