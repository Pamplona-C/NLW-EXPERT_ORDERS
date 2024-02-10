import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import {View, Text} from "react-native"


export default function Home(){
    return(
        <View className="flex-1 pt-8">
            <Header title="Cardapio" cartQuantityItems={1}/>

            <CategoryButton title="Lanche do dia"/>
        </View>
    )
}