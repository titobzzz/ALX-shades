import { View, Text,TextInput, Image, TouchableOpacity } from "react-native"
import {fontStyles } from "../styles/fontstyle"
import {input} from "../styles/inputstyle"
import lock from "../../assets/images/unlock.png"
import Navbar from "../component/navbar"
import Ballot from "../component/ballot"


export function HomePage({navigation}:any){
  return(
    <View style={{     
      flex:1,
      backgroundColor:'black',
      paddingTop:10 ,   
}}>
  <Navbar/>
            <View>
          <Ballot
        avatar={require('../../assets/images/git.jpg')}
        handle="@johndoe"
        username="Joshua"
        content="This is a sample tweet. React Native with TypeScript is awesome!"
        likes={42}
        retweets={7}
        comments={3}
      />
              </View>
            
</View>
 ) }