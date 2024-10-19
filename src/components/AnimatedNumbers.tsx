// react-animate-numbers
import { useEffect, useState } from "react"

type NumberRange<
  Start extends number,
  End extends number,
  Acc extends number[] = []
> = Acc['length'] extends End
  ? Acc[number]
  : NumberRange<Start, End, [...Acc, Acc['length']]>;

/**
 * Props for the AnimatedNumbers component.
 */
interface AnimatedNumbersProps {
  /**
   * The number to animate and display.
   * @property {number} value
   */
  value: number;

  /**
   * The maximum length of digits to display. Pads with zeros if necessary.
   * @property {NumberRange<1, 21>} maxLength
   */
  maxLength: NumberRange<1, 21>;

  /**
   * Optional settings for controlling the animation and styling.
   */
  options?: {
    /**
     * Sets the speed of the animation: 'sm' is fast, 'md' is medium, and 'lg' is slow.
     * @default "md"
     */
    animationSpeed?: "sm" | "md" | "lg";

    /**
     * Defines the easing function for the animation.
     * @default "ease-in-out"
     */
    animationType?: "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out";

    /**
     * The background color behind the digits.
     * @property {string} backgroundColor
     * @default ""
     */
    backgroundColor?: string;

    /**
     * Whether the digits should be bold.
     * @property {boolean} bold
     * @default true
     */
    bold?: boolean;

    /**
     * Border around each digit container.
     * @property {string} border
     * @default ""
     * @example "1px solid black"
     */
    border?: string;

    /**
     * The color of the digits.
     * @property {string} color
     * @default ""
     */
    color?: string;

    /**
     * The font size of the digits, in pixels.
     * @property {number} fontSize
     * @default 44
     */
    fontSize?: number;

    /**
     * Space between each digit.
     * @property {number} gap
     * @default 0
     */
    gap?: number;
  };
}

/**
 * AnimatedNumbers component displays a number with a cool animated scroll effect.
 * @returns {JSX.Element} The animated number display component.
 */
const AnimatedNumbers = ({value, maxLength, options = {}}: AnimatedNumbersProps): JSX.Element => {
  const {
    color = "",
    fontSize = 44,
    backgroundColor = "",
    bold = true,
    border = "",
    animationSpeed = "md",
    animationType = "ease-in-out",
    gap = 0,
  } = options;

  const anSpeed = animationSpeed === "sm" ? "1.5s" : animationSpeed === "md" ? "1s" : "0.5s"

  const [digits, setDigits] = useState(Array.from({ length: maxLength }));
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const width = fontSize / 1.6;

  useEffect(() => {
    const numberStr = value.toString().padStart(maxLength, "0")

    setDigits(numberStr.split("").map((digit) => Number(digit)))
  }, [value, maxLength])

  return (
    <div style={{ display: "flex", gap: `${gap}px` }}>
      {digits.map((digit, i) => (
        <div key={i} style={{ position: "relative", height: `${fontSize}px`, width: `${width}px`, overflow: "hidden", backgroundColor: backgroundColor, border: border }}>
          <div style={{ position: "absolute", top: "0", color: color, left: "0", height: `${fontSize * 10}px`, zIndex: "2", transform: `translateY(-${digit}0%)`, transition: `transform ${anSpeed} ${animationType}` }}>
            {numbers.map((number, index) => (
                <div key={`${index}-${i}`} style={{ height: `${fontSize}px`, width: `${width}px`, fontSize: `${fontSize}px`, fontWeight: bold ? "bold" : "normal", display: "flex", justifyContent: "center", justifyItems: "center", alignItems: "center" }}>
                    <p>{number}</p>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnimatedNumbers
