import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
    date?: Date;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        setMySkills(oldState => [...oldState, data]);
    }

    function handleRemoveSkill(id: string){
        setMySkills(oldstate => oldstate.filter(
            skill => skill.id !== id
        ));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12 && currentHour >= 5) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoob');
        } else {
            setGreeting('Good night');
        }
    }, [])

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Welcome Thiago</Text>

            <Text style={styles.greetings}>
                {greeting}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="New Skill"
                placeholderTextColor="#999"
                onChangeText={setNewSkill}
            />

            <Button
                onPress={handleAddNewSkill}
                title="Add"
            />


            <Text style={[styles.title, { marginVertical: 40 }]}>My Skills</Text>



            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard skill={item.name}
                    onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: 15,
        marginTop: 30,
        borderRadius: 7
    },
    greetings: {
        color: '#fff'
    },
});
