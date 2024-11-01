import { OutlinedInput } from '@mui/material'
import React from 'react'
import { IMaskInput } from 'react-imask'

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
	const { onChange, ...other } = props
	return (
		<IMaskInput
			{...other}
			mask="00000-000"
			definitions={{
				'#': /[1-9]/,
			}}
			inputRef={ref}
			onAccept={(value) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	)
})

function BaseOutlinedZipInput({
	placeholder,
	label,
	value,
	onChange,
	size,

	name,
	error,
}) {
	return (
		<OutlinedInput
			onChange={onChange}
			name={name}
			value={value}
			placeholder={placeholder}
			id="formatted-text-mask-input"
			inputComponent={TextMaskCustom}
			label={label}
			size={size}
			// startAdornment={
			//   <InputAdornment position="start">
			//     <Typography variant="p" sx={{ color: "#7450F0" }}>
			//       Eg: 00000-000
			//     </Typography>
			//   </InputAdornment>
			// }
		/>
	)
}

export default BaseOutlinedZipInput
