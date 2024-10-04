import {Image, Text, View, TouchableOpacity} from "react-native"
import {Feather} from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import {Link} from 'expo-router'

type HeaderProps = {
    title: String,
    cartQuantityItems?: number
}

export function Header({title, cartQuantityItems = 0}: HeaderProps){
    return(
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">

            <View className="flex-1 items-center">
                <Image source={require("@/assets/logo.png")} className="h-6 w-32 mt-5"/>

                {/* <Text className="text-white text-xl font-heading mt-2 text-center mt-10">
                    {title}
                </Text> */}
            </View>

            {cartQuantityItems > 0 &&
            <Link href="/cart" asChild>
                <TouchableOpacity className="relative" >

                    <View className="bg-blue-700 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                        <Text className="text-white font-bold text-xs">{cartQuantityItems}</Text>
                    </View>

                    <Feather name="shopping-bag" color={colors.white} size={24}/>
                </TouchableOpacity>
            </Link>}
        </View>
    )
}