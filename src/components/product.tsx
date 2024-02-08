/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
	TouchableOpacity,
	type TouchableOpacityProps,
	Image,
	ImageProps,
	View,
	Text,
} from 'react-native';
import { forwardRef } from 'react';

interface ProductDataProps {
	title: string;
	description: string;
	thumbnail: ImageProps;
	quantity?: number;
}

type ProductProps = TouchableOpacityProps & {
	data: ProductDataProps;
};
export const Product = forwardRef<TouchableOpacity, ProductProps>(({ data, ...rest }, ref) => {
	return (
		<TouchableOpacity className="w-full flex-row items-center pb-4" {...rest} ref={ref}>
			<Image source={data.thumbnail} className="w-2- h-20 rounded-md" />
			<View className="ml-3 flex-1">
				<View className="flex-row items-center">
					<Text className="text-slate-100 font-subtitle text-base flex-1">
						{data.title}
					</Text>
					{data.quantity && (
						<Text className="text-slate-400 font-subtitle text-sm">
							x {data.quantity}
						</Text>
					)}
				</View>
				<Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
			</View>
		</TouchableOpacity>
	);
});
