import styled from "styled-components"
import * as RadixSelect from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import React from "react"
import { FieldProps } from "formik"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Select({ field, form: { touched, errors }, ...props }: FieldProps) {
	const options = props.options as string[]

	return (
		<RadixSelect.Root
			name={field.name}
			value={field.value}
			onValueChange={field.onChange}
			// {...props}
		>
			<SelectTrigger aria-label='Food'>
				<RadixSelect.Value placeholder='Select a type...'>{field.value}</RadixSelect.Value>
				<RadixSelect.Icon>
					<ChevronDownIcon />
				</RadixSelect.Icon>
			</SelectTrigger>
			<RadixSelect.Portal>
				<SelectContent>
					{/* <SelectScrollUpButton>
                        <ChevronUpIcon />
                    </SelectScrollUpButton> */}
					<SelectViewport>
						{options &&
							options.map((op: any) => {
								return <SelectItem value={op.value}>{op.text}</SelectItem>
							})}
					</SelectViewport>
					{/* <SelectScrollDownButton>
                        <ChevronDownIcon />
                    </SelectScrollDownButton> */}
				</SelectContent>
			</RadixSelect.Portal>
		</RadixSelect.Root>
	)
}

const SelectTrigger = styled(RadixSelect.SelectTrigger)`
	all: "unset";
	display: "inline-flex";
	align-items: "center";
	justify-content: "center";
	border-radius: 4;
	padding: "0 15px";
	font-size: 13;
	line-height: 1;
	height: 35;
	gap: 5;
	background-color: "white";
`

// const SelectIcon = styled(RadixSelect.SelectIcon, {
//     color: violet.violet11,
// });

const SelectContent = styled(RadixSelect.Content)`
	overflow: "hidden";
	background-color: "white";
	border-radius: 6;
	box-shadow: "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)";
`

const SelectViewport = styled(RadixSelect.Viewport)`
	padding: 5;
`

const SelectItem = React.forwardRef(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	({ children, ...props }: any, forwardedRef): any => {
		return (
			<StyledItem {...props} ref={forwardedRef}>
				<RadixSelect.ItemText>{children}</RadixSelect.ItemText>
				<StyledItemIndicator>
					<CheckIcon />
				</StyledItemIndicator>
			</StyledItem>
		)
	},
)

const StyledItem = styled(RadixSelect.Item)`
	font-size: 13;
	line-height: 1;
	border-radius: 3;
	display: "flex";
	align-items: "center";
	height: 25;
	padding: "0 35px 0 25px";
	position: "relative";
	user-select: "none";
`

const SelectLabel = styled(RadixSelect.Label)`
	padding: "0 25px";
	font-size: 12;
	line-height: "25px";
`

const SelectSeparator = styled(RadixSelect.Separator)`
	height: 1;
	margin: 5;
`

const StyledItemIndicator = styled(RadixSelect.ItemIndicator)`
	position: "absolute";
	left: 0;
	width: 25;
	display: "inline-flex";
	align-items: "center";
	justify-content: "center";
`

const SelectScrollUpButton = styled(RadixSelect.ScrollUpButton)`
	display: "flex";
	align-items: "center";
	justify-content: "center";
	height: 25;
	background-color: "white";
	cursor: "default";
`

const SelectScrollDownButton = styled(RadixSelect.ScrollDownButton)`
	display: "flex";
	align-items: "center";
	justify-content: "center";
	height: 25;
	background-color: "white";
	cursor: "default";
`
