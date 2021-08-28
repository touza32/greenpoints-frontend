import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
      onPress={getPremiosFromApi}
      title="test"
      color="green"
      />
    </View>
  );
}

const getPremiosFromApi = () => {
  console.log("click")
  fetch('https://localhost:5001/premio', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
