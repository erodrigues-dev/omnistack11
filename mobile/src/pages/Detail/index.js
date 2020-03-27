import React from 'react';
import { Linking, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import logoImg from '../../../assets/logo.png';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const route = useRoute()
    const navigation = useNavigation()
    const { incident } = route.params
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${getValue()}'`

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    function getValue() {
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                    <Text style={styles.incidentValue}>{incident.description}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{getValue()}</Text>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>Whastsapp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}