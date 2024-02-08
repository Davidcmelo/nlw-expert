/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, ScrollView, Alert, Linking } from 'react-native';
import React, { useState } from 'react';
import { Header } from '@/components/header';
import { Product } from '@/components/product';
import { type ProductCartProps, useCartStore } from '@/stores/cart-store';
import { formatCurrency } from '@/utils/functions/format-currency';
import Input from '@/components/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from '@/components/link-button';
import { useNavigation } from 'expo-router';

const PHONE_NUMBER = '5532999788128';
export default function Cart() {
	const navigation = useNavigation();
	const cartStore = useCartStore();
	const [address, setAddress] = useState('');
	const total = formatCurrency(
		cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0)
	);

	function handleProductRemove(product: ProductCartProps) {
		Alert.alert('Remover', `Deseja remover ${product.title} do carrinho?`, [
			{ text: 'Cancelar' },
			{
				text: 'Remover',
				onPress: () => {
					cartStore.remove(product.id);
				},
			},
		]);
	}

	function handleOrder() {
		if (address.trim().length === 0) {
			return Alert.alert('Pedido', 'Informe os dados da entrega');
		}

		const products = cartStore.products
			.map((product) => `\n ${product.quantity} ${product.title}`)
			.join('');

		const message = `
		🍔 NOVO PEDIDO
		\n Entregar em: ${address}
		${products}			\n Valor total: ${total}
		`;
		cartStore.clear();
		navigation.goBack();
		Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);
	}

	return (
		<View className="flex-1 pt-8">
			<Header title="Seu carrinho" />
			<KeyboardAwareScrollView>
				<ScrollView>
					<View className="p-5 flex-1 ">
						{cartStore.products.length > 0 ? (
							<View className="border-b border-slate-700">
								{cartStore.products.map((product) => (
									<Product
										key={product.id}
										data={product}
										onPress={() => {
											handleProductRemove(product);
										}}
									/>
								))}
							</View>
						) : (
							<Text className="font-body text-slate-400 text-center my-8">
								Seu carrinho está vazio.
							</Text>
						)}

						<View className="flex-row gap-2 items-center mt-5 mb-4">
							<Text className="text-white text-xl font-subtitle">Total:</Text>
							<Text className="text-lime-400 text-2xl font-heading">{total}</Text>
						</View>
						<Input
							onChangeText={setAddress}
							onSubmitEditing={handleOrder}
							blurOnSubmit={true}
							returnKeyType="done"
							placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
						/>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>
			<View className="p-5 gap-5 ">
				<Button onPress={handleOrder}>
					<Button.Text>Enviar pedido</Button.Text>
					<Button.Icon>
						<Feather name="arrow-right-circle" size={20} />
					</Button.Icon>
				</Button>
				<LinkButton title="Voltar ao cardápio" href="/" />
			</View>
		</View>
	);
}
