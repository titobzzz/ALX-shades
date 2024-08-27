import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { fontStyles } from '../styles/fontstyle';
import { Tabs } from '../interfaces/interfaces';

interface TabProps {
  data?:Tabs;
  likes?: number;
  retweets?: number;
  comments?: number;
}

const Tab: React.FC<TabProps> = ({data, likes, comments, retweets}) => {


    return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
        <Image source={{ uri: data?.creator?.avatar }} style={styles.avatar} />
        <View>
           <Text style={styles.username}>{data?.creator?.username}</Text>
           <Text style={styles.handle}>{data?.creator?.handle}</Text>
        </View>     
      </View>
      <View style={styles.contentContainer} >
        <View style={styles.actionSuperConstainer}>
           <View style={styles.actionsContainer}>  
            <View style={styles.pseudo1}></View>
              <View style={styles.pseudo1cover}></View>         
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="repeat" size={20} color="white" />
          <Text style={styles.actionText}>{retweets}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={20} color="white" />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <View style={styles.pseudo2}></View>
        <View style={styles.pseudo2cover}></View>    
          </View>       
        </View>     
          <View style={styles.contentsubcontainer}>
            <Text style={styles.content}>{data?.text_content}</Text>  
            <View style={styles.imageContainer}>
            {data?.images && data.images.length > 0 && (
              <View style={styles.imageContainer}>
                <TouchableOpacity 
                  style={styles.imageWrapper}
                  onPress={() => {/* Handle first image click */}}
                >
                {data.images[0].image  &&(
                <Image
                  source={{ uri: data.images[0].image }}
                  style={styles.image}
                />
              )}
                 </TouchableOpacity>
                              
                {data.images.length > 1 && (
                  <TouchableOpacity 
                    style={styles.imageWrapper}
                    onPress={() => {/* Handle second image click */}}
                  > 
                {data.images[1].image && (
                  <>
                    <Image source={{ uri: data.images[1].image }} style={styles.image} />
                    {data.images.length > 2 && (
                      <View style={styles.remainingOverlay}>
                        <Text style={styles.remainingText}>+{data.images.length - 2}</Text>
                      </View>
                    )}
                  </>
                )}
                  </TouchableOpacity>
              )}
            </View>
          )}
              </View>
          <TouchableOpacity style={styles.commentButton}>
          <Text style={styles.commentText}>Comment</Text>
        </TouchableOpacity>
          </View>          
      </View>
      </View>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    color:"white",
    padding: 10,
    paddingHorizontal:15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 39,
    height: 39,
    borderRadius: 25,
    marginHorizontal:10,
    marginVertical:15,
  
  },
  username: {
    ...fontStyles.bold,
    fontSize: 17,
    color:"white",
    
  },
  handle:{
    ...fontStyles.meduimFont,
    fontSize: 14,
    color:"white",
  },
  contentContainer:{
    display:'flex',
    flexDirection: 'row',
    marginTop:5,
    position: 'relative',
  },
  content: {
        marginVertical:10,
    flexDirection: 'row',
    marginTop:10,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 10,
    color:"white",
    ...fontStyles.meduimFont
  },
  contentsubcontainer:{
    position: 'relative',
    width: '80%',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageWrapper: {
    width: '49%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  remainingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  commentButton:{
    alignItems:'stretch',
    bottom:-20,
    marginTop:5,
    padding:10,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius:15,
    marginHorizontal:20,
  },
  commentText:{
    color:'white',
    fontSize:15,
    flexWrap:'wrap',
    textAlign:'center',
    ...fontStyles.bold
  },
  subContainer:{
    backgroundColor:'#07EEC4',
    borderRadius:15,
  },
  actionSuperConstainer:{
  backgroundColor:'black',
  borderTopRightRadius:10,
  paddingHorizontal:10,
  },
  pseudo1:{
    position: 'absolute',
    left: -10,
    top: -25,
    backgroundColor: 'black',
    width:20,
    height:25,    
  },
  pseudo1cover:{
    position: 'absolute',
    left: -10.26,
    top: -29.8,
    backgroundColor:'#07EEC4',
    width:24,
    height:20,  
    borderBottomLeftRadius:37,
  },
  pseudo2:{
    position: 'absolute',
    right: -30,
    bottom: -10.26,
    backgroundColor: 'black',
    width:20,
    height:25,    
  },
  pseudo2cover:{
    position: 'absolute',
    right: -34,
    bottom: -10.24,
    backgroundColor:'#07EEC4',
    width:24,
    height:25,  
    borderBottomLeftRadius:20,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius:10,
    padding:15,
    gap:25,
    marginTop: 10,
    marginBottom: 10,

  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: 'white',
  },
});

export default Tab;