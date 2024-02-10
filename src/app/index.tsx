import { CategoryButton } from "@/components/category-button"
import { Header } from "@/components/header"
import {View, FlatList} from "react-native"
import {CATEGORIES} from '@/utils/data/products'
import { useState } from "react"


export default function Home(){

    const [category, setCategory] = useState(CATEGORIES[0])

    function handleCategorySelect(selectedCategory: string){
        setCategory(selectedCategory)
    }

    return(
        <View className="flex-1 pt-8">
            <Header title="Cardapio" cartQuantityItems={1}/>

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <CategoryButton title={item} isSelected={item===category} onPress={() => handleCategorySelect(item)}/>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="max-h-10 mt-5"
                contentContainerStyle={{gap:12, paddingHorizontal:20}}
               
            />
        </View>
    )
}