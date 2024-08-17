import { View, Text,TextInput, Image, TouchableOpacity } from "react-native"
import { imageStyles } from "../styles/image-style"
import { fontStyles as font } from "../styles/fontstyle"

export default  function(){
    return(
        <View   style={{
       
            flexDirection:"row",
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderBottomWidth: 0.3, 
            borderBottomColor:"white",
            width:"100%"
        }}>                      
            
            <Text style={[font.green, font.bold, {
                fontSize: 25,
            }]
            }>Polls
                </Text> 
            <View>
                <Image source={require("../../assets/images/mail.png")} style={imageStyles.logo}/>
            </View>
             <View  >
                <Image source={require("../../assets/images/git.jpg")} style={imageStyles.avatar}/>
                 </View>
                    
           
        </View>
        
    )
}