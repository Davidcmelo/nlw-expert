/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { type ReactNode } from 'react';
import { TouchableOpacity, type TouchableOpacityProps, Text } from 'react-native';
type ButtonProps = TouchableOpacityProps & {
	children: ReactNode;
};

interface ButtonTextProps {
	children: ReactNode;
}
interface ButtonIconProps {
	children: ReactNode;
}
function Button({ children, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
			activeOpacity={0.7}
			{...rest}
		>
			{children}
		</TouchableOpacity>
	);
}
function ButtonText({ children }: ButtonTextProps) {
	return <Text className="text-black font-heading text-base mx-2">{children}</Text>;
}

function ButtonIcon({ children }: ButtonIconProps) {
	return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;
export { Button };
