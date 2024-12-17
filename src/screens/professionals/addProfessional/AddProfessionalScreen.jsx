import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ImageProfessional } from '../../../components/Professionals/addProfessional/imageProfessional/ImageProfessional';
import { InfoForm } from '../../../components/Professionals/addProfessional/InfoForm/InfoForm';
import { useFormik } from 'formik';
import { initialVales } from './AddProfessional.data';
import { Button, Layout } from '@ui-kitten/components';


//Todo falta agregar validaciones con yup, armar dato con uuid y new Date
export const AddProfessionalScreen = () => {
    
    const formik = useFormik({
        initialValues: initialVales(),
        //validationSchema: validationSchema(),
        //validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            const newData = formValue;
            //newData.id = uuid();
            //newData.createdAt = new Date();
    
            console.log({newData})
    
            //navigation.goBack();
          } catch (error) {
            console.log(error);
          }
        },
      });

  return (
    <Layout style={styles.container}>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <ImageProfessional formik={formik}/>
        <InfoForm formik={formik}/>


        <Button onPress={formik.handleSubmit} style={styles.button}>
            Crear Professional
          </Button>
    </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3EAFB', // Color coherente con LoginForm
    },
    scrollContainer: {
      padding: 16,
    },
    button: {
      marginTop: 16,
      backgroundColor: '#7B2CBF',
      borderColor: '#7B2CBF',
      borderRadius: 8,
    },
  });