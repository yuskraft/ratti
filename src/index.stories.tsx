import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RateStar, type StarRatingVariant } from ".";

const meta = {
	title: "Packages/RateStar",
	component: RateStar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		maxRating: {
			control: { type: "number", min: 1, max: 15 },
			description: "Maximum number of stars to display",
		},
		defaultValue: {
			control: { type: "number", min: 0 },
			description: "Initial rating value (can be fractional)",
		},
		value: {
			control: { type: "number", min: 0 },
			description:
				"Controlled rating value. If set, component ignores defaultValue and relies on onChange to update.",
			table: {
				category: "Controlled State",
			},
		},
		disabled: {
			control: "boolean",
			description: "Whether the star rating is disabled",
		},
		readOnly: {
			control: "boolean",
			description:
				"Whether the star rating is read-only (prevents user interaction)",
		},
		precision: {
			control: { type: "number", min: 0.1, max: 1, step: 0.1 },
			description:
				"Rating precision (e.g., 0.5 for half stars, 1 for full stars)",
		},
		onChange: {
			action: "changed",
			description: "Callback fired when the rating changes",
		},
		onHoverChange: {
			action: "hoverChanged",
			description:
				"Callback fired when the temporary hover rating changes (0 when mouse leaves)",
		},
		onBlur: {
			action: "blurred",
			description: "Callback fired when the component loses focus",
		},
		activeColorsEnabled: {
			control: "boolean",
			description:
				"Whether to enable rating colors (behavior depends on variant)",
		},
		customActiveColors: {
			control: "object",
			description:
				'Optional array of custom colors for rating levels (e.g., ["#ff0000", "#ffa500", ...])',
		},
		variant: {
			control: { type: "radio" },
			options: ["default", "circle", "square"] satisfies StarRatingVariant[],
			description:
				"Visual variant of the stars (default, circle background, square background)",
		},
		svgPathD: {
			control: "text",
			description: "Custom SVG path data (d attribute) for the icon.",
			defaultValue:
				"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
		},
		className: {
			control: "text",
			description: "Custom CSS class name to apply to the root element",
		},
	},
} satisfies Meta<typeof RateStar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		maxRating: 5,
		defaultValue: 0,
		disabled: false,
		readOnly: false,
		precision: 1,
		activeColorsEnabled: false,
		variant: "default",
	},
};

export const WithInitialRating: Story = {
	args: {
		...Default.args,
		defaultValue: 3,
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		defaultValue: 3,
		disabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		...Default.args,
		defaultValue: 4,
		readOnly: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					"The `readOnly` prop prevents user interaction but visually differs slightly from `disabled`.",
			},
		},
	},
};

export const CustomMaxRating: Story = {
	args: {
		...Default.args,
		maxRating: 10,
	},
};

export const Fractional: Story = {
	args: {
		...Default.args,
		defaultValue: 2.5,
		precision: 0.5,
		activeColorsEnabled: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Set the `precision` prop to allow fractional ratings (e.g., `0.5` for half stars).",
			},
		},
	},
};

export const RatingColorsDefaultVariant: Story = {
	name: "Rating Colors (Default Variant)",
	args: {
		...Default.args,
		defaultValue: 3,
		activeColorsEnabled: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Enable `activeColorsEnabled` with the `default` variant. Colors apply directly to the star fill and are distributed proportionally across `maxRating`.",
			},
		},
	},
};

export const CustomRatingColorsDefaultVariant: Story = {
	name: "Custom Rating Colors (Default Variant)",
	args: {
		...Default.args,
		maxRating: 7,
		defaultValue: 4,
		precision: 0.5,
		activeColorsEnabled: true,
		customActiveColors: ["#d90429", "#f77f00", "#fcbf49", "#eae2b7"],
	},
	parameters: {
		docs: {
			description: {
				story:
					"Provide custom colors via `customActiveColors` with the `default` variant.",
			},
		},
	},
};

export const CircleVariant: Story = {
	name: "Variant: Circle",
	args: {
		...Default.args,
		variant: "circle",
		defaultValue: 3,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use `variant="circle"`. Stars appear on a circular background. Default selected color is used for the background.',
			},
		},
	},
};

export const CircleVariantFraction: Story = {
	name: "Variant: Circle (fraction)",
	args: {
		...Default.args,
		variant: "circle",
		defaultValue: 3,
		precision: 0.5,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use `variant="circle"`. Stars appear on a circular background. Default selected color is used for the background.',
			},
		},
	},
};

export const CircleVariantRatingColors: Story = {
	name: "Variant: Circle (Rating Colors)",
	args: {
		...CircleVariant.args,
		activeColorsEnabled: true,
		defaultValue: 4,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Combine `variant="circle"` and `activeColorsEnabled`. Rating colors apply to the background.',
			},
		},
	},
};

export const SquareVariant: Story = {
	name: "Variant: Square",
	args: {
		...Default.args,
		variant: "square",
		defaultValue: 2,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use `variant="square"`. Stars appear on a square background. Default selected color is used for the background.',
			},
		},
	},
};

export const SquareVariantFraction: Story = {
	name: "Variant: Square (fraction)",
	args: {
		...Default.args,
		variant: "square",
		defaultValue: 2,
		precision: 0.5,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use `variant="square"`. Stars appear on a square background. Default selected color is used for the background.',
			},
		},
	},
};

export const SquareVariantCustomColors: Story = {
	name: "Variant: Square (Custom Colors)",
	args: {
		...SquareVariant.args,
		activeColorsEnabled: true,
		customActiveColors: ["#ef4444", "#f59e0b", "#10b981"],
		defaultValue: 4,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Combine `variant="square"`, `activeColorsEnabled`, and `customActiveColors`. Custom colors apply proportionally to the background.',
			},
		},
	},
};

export const CircleVariantReadOnly: Story = {
	name: "Variant: Circle (readonly)",
	args: {
		...CircleVariant.args,
		readOnly: true,
		defaultValue: 3.5,
		precision: 0.5,
	},
	parameters: {
		docs: {
			description: {
				story: "A read-only star rating with the `circle` variant.",
			},
		},
	},
};

export const SquareVariantReadonly: Story = {
	name: "Variant: Square (readonly)",
	args: {
		...SquareVariant.args,
		activeColorsEnabled: true,
		defaultValue: 3.5,
		precision: 0.5,
		readOnly: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Combine `variant="square"`, `activeColorsEnabled`, and `customActiveColors`. Custom colors apply proportionally to the background.',
			},
		},
	},
};

export const CustomIconPath: Story = {
	name: "Custom Icon Path (Star)",
	args: {
		...Default.args,
		defaultValue: 3.5,
		precision: 0.5,
		activeColorsEnabled: true,
		svgPathD:
			"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Use the `svgPathD` prop to provide a custom SVG path for the icons. This example uses the traditional star shape.",
			},
		},
	},
};

export const Controlled: Story = {
	args: {
		maxRating: 5,
		precision: 0.5,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Demonstrates using the `value` prop for controlled state. The rating is managed externally.",
			},
		},
	},
	render: (args) => {
		const [rating, setRating] = useState(2.5);

		return (
			<div>
				<RateStar
					{...args}
					value={rating}
					onChange={(newRating) => {
						args.onChange?.(newRating);
						setRating(newRating);
					}}
				/>
				<p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
					Current controlled value: {rating}
				</p>
			</div>
		);
	},
};

export const WithCustomClass: Story = {
	args: {
		...Default.args,
		defaultValue: 3,
		className: "custom-styling-example",
	},
	parameters: {
		docs: {
			description: {
				story:
					"Applies a custom CSS class name to the root element for additional styling.",
			},
		},
	},
};
