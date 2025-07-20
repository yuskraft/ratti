/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import {
	type ForwardedRef,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import "./index.css";
import { StarIcon } from "./SvgItem";
import { getColorForRating, roundToPrecision } from "./utils";

export type StarRatingVariant = "default" | "circle" | "square";

export interface StarRatingProps {
	maxRating?: number;
	defaultValue?: number;
	value?: number;
	onChange?: (rating: number) => void;
	onHoverChange?: (hoverRating: number) => void;
	onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
	disabled?: boolean;
	readOnly?: boolean;
	precision?: number;
	activeColorsEnabled?: boolean;
	customActiveColors?: string[];
	variant?: StarRatingVariant;
	svgPathD?: string;
	className?: string;
}

// Star rating component with keyboard and mouse support
export const RateStar = forwardRef<HTMLDivElement, StarRatingProps>(
	(
		{
			maxRating = 5,
			defaultValue = 0,
			value,
			onChange,
			onHoverChange,
			onBlur,
			disabled = false,
			readOnly = false,
			precision = 1,
			activeColorsEnabled = false,
			customActiveColors,
			variant = "default",
			svgPathD,
			className = "",
		}: StarRatingProps,
		ref: ForwardedRef<HTMLDivElement>,
	) => {
		const isControlled = value !== undefined;
		const [internalRating, setInternalRating] = useState(defaultValue);
		const [hoverRating, setHoverRating] = useState(0);
		const [keyboardFocusValue, setKeyboardFocusValue] = useState<number | null>(null);
		const [usingKeyboard, setUsingKeyboard] = useState(false);

		const isInteractive = !disabled && !readOnly;

		const componentId = useRef(
			`star-rating-${Math.random().toString(36).substring(2, 9)}`,
		).current;
		const containerRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

		const rating = isControlled ? value : internalRating;

		useEffect(() => {
			const handleKeyDown = () => setUsingKeyboard(true);
			const handleMouseDown = () => setUsingKeyboard(false);
			if (isInteractive) {
				document.addEventListener("keydown", handleKeyDown);
				document.addEventListener("mousedown", handleMouseDown);
			}
			return () => {
				document.removeEventListener("keydown", handleKeyDown);
				document.removeEventListener("mousedown", handleMouseDown);
			};
		}, [isInteractive]);

		function calculateRating(event: React.MouseEvent<HTMLDivElement>, index: number): number {
			if (!isInteractive) return rating;
			const { left, width } = event.currentTarget.getBoundingClientRect();
			const percent = (event.clientX - left) / width;
			const fraction = Math.ceil(percent / precision) * precision;
			const value = index + Math.min(fraction, 1);
			return Math.min(Math.max(value, 0), maxRating);
		}

		function updateRating(newValue: number) {
			if (isControlled) {
				onChange?.(newValue);
			} else {
				setInternalRating(newValue);
				onChange?.(newValue);
			}
		}

		function handleClick(event: React.MouseEvent<HTMLDivElement>, index: number) {
			if (!isInteractive) return;
			const newValue = roundToPrecision(calculateRating(event, index), precision);
			if (newValue === rating) {
				setHoverRating(0);
				setKeyboardFocusValue(0);
				updateRating(0);
			} else {
				updateRating(newValue);
				setHoverRating(0);
				setKeyboardFocusValue(newValue);
			}
		}

		function handleMouseEnter(event: React.MouseEvent<HTMLDivElement>, index: number) {
			if (!isInteractive) return;
			const newValue = calculateRating(event, index);
			setHoverRating(newValue);
			onHoverChange?.(newValue);
		}

		function handleMouseMove(event: React.MouseEvent<HTMLDivElement>, index: number) {
			if (!isInteractive) return;
			const newValue = calculateRating(event, index);
			setHoverRating(newValue);
			onHoverChange?.(newValue);
		}

		function handleMouseLeave() {
			if (!isInteractive) return;
			setHoverRating(0);
			onHoverChange?.(0);
		}

		function handleFocus() {
			if (!isInteractive) return;
			if (usingKeyboard && keyboardFocusValue === null) {
				setKeyboardFocusValue(rating);
			}
		}

		function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
			if (!isInteractive) return;
			setKeyboardFocusValue(null);
			setHoverRating(0);
			onBlur?.(event);
		}

		function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
			if (!isInteractive) return;
			let newValue: number | undefined;
			const currentValue = keyboardFocusValue ?? rating;
			switch (event.key) {
				case "ArrowRight":
				case "ArrowUp":
					newValue = Math.min(maxRating, currentValue + precision);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					newValue = Math.max(0, currentValue > 0 ? currentValue - precision : 0);
					break;
				case "Home":
					newValue = 0;
					break;
				case "End":
					newValue = maxRating;
					break;
				case "Enter":
				case " ": {
					event.preventDefault();
					const valueToSet = roundToPrecision(currentValue, precision);
					if (valueToSet !== rating) updateRating(valueToSet);
					setKeyboardFocusValue(valueToSet);
					setHoverRating(0);
					return;
				}
				default:
					return;
			}
			if (newValue !== undefined) {
				event.preventDefault();
				const rounded = roundToPrecision(newValue, precision);
				setKeyboardFocusValue(rounded);
				setHoverRating(rounded);
			}
		}

		const displayRating =
			hoverRating > 0
				? hoverRating
				: keyboardFocusValue !== null
					? keyboardFocusValue
					: rating;

		return (
			<div
				ref={containerRef}
				className={`star-rating variant-${variant} ${!isInteractive ? "readonly-or-disabled" : ""} ${className}`}
				role="slider"
				aria-orientation="horizontal"
				aria-valuemin={0}
				aria-valuemax={maxRating}
				aria-valuenow={isInteractive ? rating : undefined}
				aria-valuetext={`${rating.toFixed(precision === 1 ? 0 : 1)} out of ${maxRating} stars`}
				aria-label="Star Rating"
				aria-disabled={disabled}
				aria-readonly={readOnly}
				onMouseLeave={isInteractive ? handleMouseLeave : undefined}
				onFocus={isInteractive ? handleFocus : undefined}
				onBlur={isInteractive ? handleBlur : undefined}
				onKeyDown={isInteractive ? handleKeyDown : undefined}
				tabIndex={isInteractive ? 0 : -1}
			>
				{[...Array(maxRating)].map((_, index) => {
					const starValue = index + 1;
					const starId = `${componentId}-${index}`;
					const isActive = displayRating >= starValue;
					const fractionalPart = displayRating - index;
					let fillPercentage = 0;
					if (isActive) {
						fillPercentage = 1;
					} else if (displayRating > index) {
						fillPercentage = Math.ceil(fractionalPart / precision) * precision;
						fillPercentage = Math.max(0, Math.min(1, fillPercentage));
					}

					const isCurrentKeyboardFocus =
						keyboardFocusValue !== null &&
						index === Math.max(0, Math.ceil(keyboardFocusValue) - 1);
					const itemClasses = `star-item ${isCurrentKeyboardFocus && usingKeyboard ? "keyboard-focused" : ""} ${isActive ? "active" : ""} ${!isInteractive ? "non-interactive" : ""}`;
					const starFillColor = activeColorsEnabled
						? getColorForRating(
							displayRating,
							maxRating,
							activeColorsEnabled,
							customActiveColors,
						)
						: undefined;

					if (variant === "circle" || variant === "square") {
						const activeColorForGradient = activeColorsEnabled
							? getColorForRating(
								displayRating,
								maxRating,
								activeColorsEnabled,
								customActiveColors,
							)
							: "var(--star-bg-selected)";
						return (
							<div
								role="presentation"
								key={starId}
								className={`${itemClasses} star-background star-background--${variant}`}
								style={{
									"--star-fill-percentage": fillPercentage,
									"--star-active-bg-color": activeColorForGradient,
								} as React.CSSProperties}
								onClick={isInteractive ? (e) => handleClick(e, index) : undefined}
								onMouseEnter={isInteractive ? (e) => handleMouseEnter(e, index) : undefined}
								onMouseMove={isInteractive ? (e) => handleMouseMove(e, index) : undefined}
							>
								<StarIcon
									starId={starId}
									fillPercentage={1}
									forcedColor={"var(--star-icon-on-bg)"}
									svgPathD={svgPathD}
								/>
							</div>
						);
					}

					return (
						<div
							role="presentation"
							key={starId}
							className={`${itemClasses} star-button ${disabled ? "disabled" : ""} ${readOnly ? "readonly" : ""}`}
							onClick={isInteractive ? (e) => handleClick(e, index) : undefined}
							onMouseEnter={isInteractive ? (e) => handleMouseEnter(e, index) : undefined}
							onMouseMove={isInteractive ? (e) => handleMouseMove(e, index) : undefined}
						>
							<StarIcon
								fillPercentage={fillPercentage}
								starId={starId}
								fillColor={starFillColor}
								svgPathD={svgPathD}
							/>
						</div>
					);
				})}
			</div>
		);
	},
);
