import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ initialPosition, setInitialPosition ] = useState({
        latitude: -34.615689,
        longitude: -58.435104
    });

    useEffect(() => {
        (async () => {
          let { coords } = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          
          setInitialPosition({
            latitude: coords.latitude,
            longitude: coords.longitude
          });

          setHasLocation(true);
        })();
      }, []);

      return {
        hasLocation,
        initialPosition
      }

};