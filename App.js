import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image,TextInput,Button, TouchableOpacity } from 'react-native';

export default function App() {

  const [currentTEMP, setcurrentTEMP] = useState('');
  const [currentHUMD, setcurrentHUMD] = useState('');
  const [hightestTEMP, sethightestTEMP] = useState('');
  const [lowestTEMP, setlowestTEMP] = useState('');
  const [UV , setUV] = useState('');
  const [weather, setweather] = useState('');



  weatherimage = function()
  {
    if(weather == '陰')
    {
      return <Image
      style={styles.main_image}
      source={require('./天氣/陰天.png')}/>
    }
    if(weather == '晴')
    {
      return <Image
      style={styles.main_image}
      source={require('./天氣/晴天.png')}/>
    }
    if(weather == '多雲')
    {
      return <Image
      style={styles.main_image}
      source={require('./天氣/多雲.png')}/>
    }
    if(weather == '陰有雨')
    {
      return <Image
      style={styles.main_image}
      source={require('./天氣/陰有雨.png')}/>
    }
    if(weather == '陰有雷雨')
    {
      return <Image
      style={styles.main_image}
      source={require('./天氣/陰有雷雨.png')}/>
    }
    if(weather == '陰有靄')
    {
      return <Image
      style={styles.main_image}
      source={require('./天氣/陰有靄.png')}/>
    }
  }


  fetchapi = function()
  {
    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-6ABDF1F7-80B4-4A01-AC7E-9D1E2DA99453&locationName=臺中')
       .then(response =>{
          return response.json();
     }).then(data =>{
        const locationData = data.records.location[0];
        
        const weatherElements = data.records.location[0].weatherElement.reduce(
          (needElements, item) => {
            if(['TEMP','HUMD','D_TX','D_TN','H_UVI','Weather'].includes(item.elementName)){
              needElements[item.elementName] = item.elementValue;
            }
            return needElements;
          }
        )
        
        setcurrentTEMP(weatherElements.TEMP);
        setcurrentHUMD(Math.round(weatherElements.HUMD*100));
        sethightestTEMP(weatherElements.D_TX);
        setlowestTEMP(weatherElements.D_TN);
        setUV(weatherElements.H_UVI);
        setweather(weatherElements.Weather);

       


        console.log(weatherElements.TEMP);
        console.log(weatherElements.HUMD);
        console.log(weatherElements.D_TX);
        console.log(weatherElements.D_TN);
        console.log(weatherElements.H_UVI);
        console.log(weatherElements.Weather)
        

     });
     


  }


  UVselect = function()
  {
    if(UV<=2)
    {
      return <Text style={{color:'green',fontSize:20}}>低量級</Text>
    }
    if(3<=UV<=5)
    {
      return <Text style={{color:'orange',fontSize:20}}>中量級</Text>
    }
    if(6<=UV<=7)
    {
      return <Text style={{color:'brown',fontSize:20}}>高量級</Text>
    }
    if(8<=UV<=10)
    {
      return <Text style={{color:'red',fontSize:20}}>過量級</Text>
    }
    if(UV>=11)
    {
      return <Text style={{color:'purple',fontSize:20}}>危險級</Text>
    }
  }

  const humid = () =>{
     
      setcurrentHUMD(currentHUMD*100);

      return <Text style={{color:'green',fontSize:20}}>{currentHUMD}%</Text>
  }

  




  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{width:210,height:200}}>
        {weatherimage()}
        </View>
          
        <View>
          <Text style={styles.tai}>台中市</Text>
           <Text style={styles.TEMP}>{currentTEMP}°c</Text>
           
        </View>
        
        
      </View>
      <View>
        <TouchableOpacity 
          onPress={() =>{
            fetchapi();
          }}
          
          style={styles.button}>
          <Text style={{fontSize:20, color:'white'}}>更新數據</Text>
        </TouchableOpacity>

        <View style={styles.hightlow_TEMP}>
          <View style={styles.highttemp}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>最高溫</Text>
            <View style={{marginLeft:8}}>
              <Image
              style={styles.imagetemp} 
              source={require('./天氣/最高溫.png')}></Image>
            </View>
            <View style={{marginLeft:5}}>
              <Text style={{color:'green',fontSize:20}}>{hightestTEMP}°c</Text>
            </View>
            
          </View>

          <View style={styles.lowtemp}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>最低溫</Text>
            <View style={{marginLeft:8}}>
              <Image
              style={styles.imagetemp} 
              source={require('./天氣/最低溫.png')}></Image>
            </View>
            <View style={{marginLeft:3}}>
              <Text style={{color:'green',fontSize:20}}>{lowestTEMP}°c</Text>
            </View>
            
          </View>
            
        </View>



        
        <View style={styles.bottom}>       
          <View style={styles.humid}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>濕度</Text>
            <View style={{marginLeft:-28}}>
              <Image
              style={styles.imagebottom} 
              source={require('./天氣/濕度.png')}></Image>
            </View>
                
            <Text style={{color:'green',fontSize:20,paddingLeft:8}}>{currentHUMD}%</Text>
          </View>

          <View style={styles.UV}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>紫外線</Text>
            <View style={{marginLeft:-20}}>
              <Image
              style={styles.imagebottom} 
              source={require('./天氣/紫外線.png')}></Image>
            </View>

              {UVselect()}
            
          </View>


            
        </View>




       
        
      </View>
      
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    /*alignItems: 'center',
    justifyContent: 'center',*/
  },
  
  main_image: {
    marginLeft:10,
    width:190,
    height:190,
  },
  top: {
    flexDirection:'row',
    marginTop: 30,
  },
  TEMP: {
    fontSize:50,
    marginTop:10,
    marginLeft:10,
    color:'green',

  },
  tai: {
    fontSize:50,
    paddingTop: 30,
    
  },
  button:{
    backgroundColor:'lightblue',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
  },

  hightlow_TEMP:{
    flexDirection:'row',
    marginTop:30,
  },
  imagetemp: {
    width: 50,
    height: 120,
    
  },
  highttemp:{
    marginLeft:70,
    flexDirection:'column',
  },
  lowtemp:{
    marginLeft:130,
  },
  
  bottom:{
    marginTop:20,
    flexDirection:'row',
  },
  imagebottom:{
    width:100,
    height:100,
  },
  humid:{
    flexDirection:'column',
    paddingLeft:80,
  },

  UV:{
    marginLeft:120,
  }
});
