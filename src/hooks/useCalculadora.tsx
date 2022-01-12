import { useRef, useState } from "react"

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('0')

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumero('0')
        setNumeroAnterior('0')
    }

    const armarNumero = (numeroTexto: string) => {
        //No aceptar doble punto
        if( numero.includes('.') && numeroTexto === '.' ) return

        if( numero.startsWith('0') || numero.startsWith('-0') ){

            //Punto decimal
            if( numeroTexto === '.' ){
                setNumero(numero + numeroTexto)

                //Evaluar si es otro 0 y si hay un .
            } else if ( numeroTexto === '0' && numero.includes('.') ){
                setNumero(numero + numeroTexto)

                //Evaluar si es diferente de 0 y si no hay un .
            } else if ( numeroTexto !== '0' && !numero.includes('.') ){
                setNumero(numeroTexto)
                //Evitar el 000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ){
                setNumero(numeroTexto)
            } else {
                setNumero(numero + numeroTexto)
            }

        } else {
            setNumero( numero + numeroTexto )
        }
    }

    const positivoNegativo = () => {
        if(numero.includes('-')){
            setNumero(numero.replace('-', ''))
        }else{
            setNumero('-' + numero)
        }
    }

    const btnDelete = () => {
        if(numero.length === 1){
            setNumero('0')
        } else if ( numero.length === 2 && numero.startsWith('-') ){
            setNumero('0')
        }else{
            setNumero(numero.slice(0, -1))
        }
    }

    const cambiarNumPorAnterior = () => {
        if( numero.endsWith('.') ){
            setNumeroAnterior( numero.slice( 0, -1 ) )
        } else {
            setNumeroAnterior( numero )
        }
        setNumero('0')
    }

    const btnDividir = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.dividir
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.multiplicar
    }

    const btnSumar = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.sumar
    }

    const btnRestar = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.restar
    }

    const calcular = () => {
        const num1 = Number( numero )
        const num2 = Number( numeroAnterior )

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero( String( num1 + num2 ) )
                break;
            case Operadores.restar:
                setNumero( String( num2 - num1 ) )
                break;
            case Operadores.multiplicar:
                setNumero( String( num1 * num2 ) )
                break;
            case Operadores.dividir:
                if( num1 !== 0 ){
                    setNumero( String( num2 / num1 ) )
                } else {
                    setNumero( '0' )
                }
                break;
        
            default:
                break;
        }

        setNumeroAnterior('0')
    }

    return {
        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnSumar,
        btnRestar,
        calcular
    }
}
