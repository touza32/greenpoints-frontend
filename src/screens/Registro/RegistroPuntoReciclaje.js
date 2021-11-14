import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import InputFormMask from "../../components/InputFormMask";
import styleButton from "../../styles/Button";
import styleText from "../../styles/Text";
import styleContainer from "../../styles/Container";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function getCuilCuit(document_number, gender) {
  /**
   * Cuil format is: AB - document_number - C
   * Author: Nahuel Sanchez, Woile
   *
   * @param {str} document_number -> string solo digitos
   * @param {str} gender -> debe contener HOMBRE, MUJER o SOCIEDAD
   *
   * @return {str}
   **/
  "use strict";
  const HOMBRE = ["HOMBRE", "M", "MALE"],
    MUJER = ["MUJER", "F", "FEMALE"],
    SOCIEDAD = ["SOCIEDAD", "S", "SOCIETY"];
  let AB, C;

  /**
   * Verifico que el document_number tenga exactamente ocho numeros y que
   * la cadena no contenga letras.
   */
  if (document_number.length != 8 || isNaN(document_number)) {
    if (document_number.length == 7 && !isNaN(document_number)) {
      document_number = "0".concat(document_number);
    } else {
      // Muestro un error en caso de no serlo.
      throw "El numero de document_number ingresado no es correcto.";
    }
  }

  /**
   * De esta manera permitimos que el gender venga en minusculas,
   * mayusculas y titulo.
   */
  gender = gender.toUpperCase();

  // Defino el valor del prefijo.
  if (HOMBRE.indexOf(gender) >= 0) {
    AB = "20";
  } else if (MUJER.indexOf(gender) >= 0) {
    AB = "27";
  } else {
    AB = "30";
  }

  /*
   * Los numeros (excepto los dos primeros) que le tengo que
   * multiplicar a la cadena formada por el prefijo y por el
   * numero de document_number los tengo almacenados en un arreglo.
   */
  const multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];

  // Realizo las dos primeras multiplicaciones por separado.
  let calculo = parseInt(AB.charAt(0)) * 5 + parseInt(AB.charAt(1)) * 4;

  /*
   * Recorro el arreglo y el numero de document_number para
   * realizar las multiplicaciones.
   */
  for (let i = 0; i < 8; i++) {
    calculo += parseInt(document_number.charAt(i)) * multiplicadores[i];
  }

  // Calculo el resto.
  let resto = parseInt(calculo) % 11;

  /*
   * Llevo a cabo la evaluacion de las tres condiciones para
   * determinar el valor de C y conocer el valor definitivo de
   * AB.
   */
  if (SOCIEDAD.indexOf(gender) < 0 && resto == 1) {
    if (HOMBRE.indexOf(gender) >= 0) {
      C = "9";
    } else {
      C = "4";
    }
    AB = "23";
  } else if (resto === 0) {
    C = "0";
  } else {
    C = 11 - resto;
  }
  const example = `${AB}-${document_number}-${C}`;

  // Generate cuit
  const cuil_cuit = `${AB}${document_number}${C}`;
  return cuil_cuit;
}

const schema = yup.object().shape({
  email: yup.
      string().
      email('Correo electrónico inválido').
      required('Requerido'),
  password: yup.
    string().
    required('Requerido').
    matches(/^.{8,32}$/, 'Contraseña muy débil: debe ser mayor o igual a 8 caracteres').
    matches(/^(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ]).{8,32}$/, 'Contraseña débil: debe tener al menos una minúscula y una mayúscula').
    matches(/^(?=.*[a-zñáéíóú])(?=.*[A-ZÑÁÉÍÓÚ])(?=.*\d).{8,}$/, 'Contraseña moderada: debe tener al menos un número'),
  passwordConfirmation: yup.
    string().
    oneOf([yup.ref('password'), null], 'La contraseña debe coincidir').
    required('Requerido'),
  customerName: yup.
    string().
    required('Requerido'),
  document: yup.string().
    required('Requerido').
    transform(value => value.replace(/-/g, '')).
    test('test-name', 'El CUIT es inválido', value => { return value !== undefined && value.length === 11 && getCuilCuit(value.substring(2, 10), 'S') === value })
});

export default function RegistroPuntoReciclaje({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data) => { navigation.navigate('ConfirmarDireccion', data) }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styleContainer.main, { padding: 20, paddingTop: 5 }]}
    >
      <Text style={{marginVertical: 10, textDecorationLine: 'underline'}}>Todos los campos son requeridos</Text>
      <InputForm
          control={control}
          errors={errors}
          name="email"
          title="Correo electrónico"
          placeholder="ejemplo@dominio.com"
          keyboardType="email-address"
      />
      <InputForm
        control={control}
        errors={errors}
        name="password"
        title="Contraseña"
        placeholder="Contraseña123"
        secureTextEntry={true}
      />
      <InputForm
        control={control}
        errors={errors}
        name="passwordConfirmation"
        title="Repetir contraseña"
        placeholder="Contraseña123"
        secureTextEntry={true}
      />
      <InputForm
        control={control}
        errors={errors}
        name="customerName"
        title="Nombre de la empresa"
        placeholder="Empresa"
      />
      <InputFormMask
        control={control}
        errors={errors}
        name="document"
        title="CUIT"
        type="datetime"
        maskOptions={{ format: "99-99999999-9" }}
        placeholder="20-12345678-0"
        keyboardType="numeric"
      />
      <TouchableOpacity style={[styleButton.base,{marginTop:10}]} onPress={handleSubmit(onSubmit)}>
        <Text style={styleText.button}>SIGUIENTE</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}