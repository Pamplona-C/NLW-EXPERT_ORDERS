import { Header } from "@/components/header";
import { Alert, ScrollView, Text, View, Linking } from "react-native";
import { Product } from "@/components/product";
import { type ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { db } from "@/utils/firebaseConfig"; 
const PHONE_NUMBER = "64999013595"


export default function Cart(){
    const [address, setAddress] = useState("")
    const cartStore = useCartStore()
    const navigation = useNavigation()

    const total = formatCurrency(cartStore.products.reduce((total, Product) => total + Product.price * Product.quantity,0))

    function handleProductRemove(product: ProductCartProps){
        Alert.alert("Remover", `Deseja Reomver ${product.title} da sacola`,[
            {
                text:"Cancelar",
            },
            {
                text:"Remover",
                onPress: () => cartStore.remove(product.id)
            },
        ])
    }

    async function handleOrder() {
        if (address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega!");
        }
    
        // Coletar os produtos do carrinho
        const products = cartStore.products.map((product) => ({
            id: product.id,
            title: product.title,
            quantity: product.quantity,
            price: product.price,
        }));
    
        const totalValue = cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0);
    
        // Dados do pedido
        const orderData = {
            address: address,
            products: products,
            total: totalValue,
            timestamp: Timestamp.now(),
        };
    
        try {
            // Referenciar a coleção 'orders' e adicionar o documento de pedido
            const docRef = await addDoc(collection(db, 'orders'), orderData);
            Alert.alert("Sucesso", "Pedido enviado com sucesso!");
            // console.log("pedido enviado");
            cartStore.clear();
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao enviar pedido: ", error);
            Alert.alert("Erro", "Houve um problema ao enviar o pedido.");
        }
    }

    return(
        <View className="flex-1 pt-8">
            <Header title={"Seu carrinho"}/>

            <KeyboardAwareScrollView 
            showsHorizontalScrollIndicator={false}
            extraHeight={100}
            >
            <ScrollView>
            <View className="p-5 flex-1">
                {cartStore.products.length > 0 ?(
                <View className="p-5 flex-1 border-b border-slate-700">
                    {
                        cartStore.products.map((product) => (
                            <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}/>
                        ))
                    }
                </View>
                ) : (

                <Text className="font-body text-slate-400 text-center my-8">
                    Seu carrinho está vazio
                </Text>
                )}
            
                <View className="flex-row gap-2 items-center mt-5 mb-4">
                    <Text className="text-white text-xl font-subtitle">
                        Total:
                    </Text>

                    <Text className="text-blue-700 text-2xl font-heading">
                        {total}
                    </Text>
                </View>

                <Input 
                placeholder="Informe o endereço de entrega com rua, bairro, CEP, numero e complemento..." onChangeText={setAddress}
                onSubmitEditing={handleOrder}
                blurOnSubmit={true}
                returnKeyType="next"
                />
                </View>
            </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>
                        Enviar Pedido
                    </Button.Text>

                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20}/>
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao Cardápio" href="/"/>
            </View>
            
        </View>
    )
}