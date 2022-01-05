import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    texto: string
}

export const BotonCalc = ({ texto }: Props) => {
    return (
        <View style={ styles.boton }>
            <Text style={ styles.botonTexto }>{ texto }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    boton: {
        height: 80,
        width: 80,
        backgroundColor: '#9B9B9B',
        borderRadius: 100,
        justifyContent: 'center',

    },
    botonTexto: {
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        color: 'black',
        fontWeight: '300',
    }
})