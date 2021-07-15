import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home(){
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setmySkills] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    function handleAddNewSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        setmySkills(oldState => [...oldState, data]);
        
    }

    function handleRemoveSkill(id: string){
        setmySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ));
    }


    useEffect(() => {
        const currentHour = 19;
        // new Date().getHours();
        
        if(currentHour < 12){
            setGretting('Good morning');
        }
        else if(currentHour >=12 && currentHour<18){
            setGretting('Good Afternoon')
        }else{
            setGretting('Good night')
        }
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome, José
                </Text>
                <Text style={styles.grettings}>
                    {gretting}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="New skill"
                    placeholderTextColor="#555"
                    onChangeText={setNewSkill}
                />
                
                <Button 
                    onPress={handleAddNewSkill}
                    title='New Skill'    
                />

                <Text style={[styles.title, {marginVertical: 20, marginTop:40}]}>
                    My skills
                </Text>

                <FlatList
                    data = {mySkills}
                    keyExtractor = {item => item.id}
                    renderItem = {({item}) => (
                        <SkillCard 
                            skill={item.name}
                            onPress={() => handleRemoveSkill(item.id)}    
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#121015',
        paddingHorizontal: 25,
        paddingVertical:45,
    },
    input:{
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 20

    },
    title:{
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    grettings:{
        color: '#FFF',
        fontSize: 18
    }
});