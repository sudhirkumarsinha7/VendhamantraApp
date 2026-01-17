import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  AppState,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GOOGLE_API_KEY } from '../../config/api';
import { useAppContext } from '../../context/AppContext';
import { createGlobalStyles } from '../../styles/globalStyles';
import { scale } from '../scale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types
interface PlaceSuggestion {
  placePrediction?: {
    placeId?: string;
    text?: { text?: string };
  };
}

interface PlaceDetails {
  name: string;
  placeId: string;
  lat: number | null;
  lng: number | null;
  address: string;
  mapUrl: string;
  country?: string | null;
  state?: string | null;
  district?: string | null;
  city?: string | null;
  pincode?: string | null;
}

interface GooglePlacesAutocompleteModalProps {
  visible: boolean;
  onClose: () => void;
  onPlaceSelected: (place: PlaceDetails) => void;
}

export const GooglePlacesAutocompleteModal: React.FC<GooglePlacesAutocompleteModalProps> = ({
  visible,
  onClose,
  onPlaceSelected,
}) => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlaceDetails[]>([]);

  const { state } = useAppContext()
  const { theme } = state
  const globalStyles = createGlobalStyles(theme)


  useEffect(() => {
    if (!visible) {
      setInput('');
      setPlaces([]);
      setLoading(false);
    }
  }, [visible]);

  const fetchPlaces = async (text: string) => {
    if (!text.trim()) {
      setPlaces([]);
      return;
    }
    setLoading(true);
    try {
      const autocompleteUrl = 'https://places.googleapis.com/v1/places:autocomplete';

      const body = {
        input: text,
        regionCode: 'IN',
        locationBias: {
          circle: {
            center: {
              latitude: 20.5937, // India center
              longitude: 78.9629,
            },
            radius: 500.0,
          },
        },
      };

      const response = await fetch(autocompleteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      // console.log(' fetching places:', data);

      if (!data.suggestions) {
        setPlaces([]);
        return;
      }

      const placesFromSuggestions: PlaceDetails[] = data.suggestions
        .map((suggestion: PlaceSuggestion) => {
          const placeId = suggestion.placePrediction?.placeId;
          if (!placeId) return null;
          return {
            name: suggestion.placePrediction?.text?.text || '',
            placeId,
            lat: null,
            lng: null,
            city: '',
            address: '',
            mapUrl: '',
          };
        })
        .filter((p: any): p is PlaceDetails => p !== null);

      setPlaces(placesFromSuggestions);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (placeId: string, address: string): Promise<PlaceDetails | null> => {
    try {
      const detailsUrl = `https://places.googleapis.com/v1/places/${placeId}`;
      const detailsResponse = await fetch(detailsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          //   'X-Goog-FieldMask': 'location',
          'X-Goog-FieldMask': 'location,formattedAddress,addressComponents',

        },
      });

      const detailsData = await detailsResponse.json();
      console.log('fetchPlaceDetails detailsData :', detailsData);
      const getComponent = (type: string) =>
        detailsData?.addressComponents?.find((c: any) =>
          c?.types?.includes(type)
        )?.longText || null;

      const country = getComponent('country');
      const state = getComponent('administrative_area_level_1');
      const district =
        getComponent('administrative_area_level_3') ||
        getComponent('administrative_area_level_2');
      const city =
        getComponent('locality') ||
        getComponent('postal_town') ||
        getComponent('sublocality');
      const pincode = getComponent('postal_code');
      // console.log('fetchPlaceDetails country district :',  country,
      // state,
      // district,
      // city,
      // pincode,);

      return {
        name: detailsData?.formattedAddress || address || '',
        placeId,
        lat: detailsData.location?.latitude
          ? parseFloat(detailsData.location.latitude.toFixed(6))
          : null,
        lng: detailsData.location?.longitude
          ? parseFloat(detailsData.location.longitude.toFixed(6))
          : null,
        address: detailsData?.formattedAddress || '',
        mapUrl: `https://www.google.com/maps/search/?api=1&query=${detailsData.location?.latitude},${detailsData.location?.longitude}`,
        country,
        state,
        district,
        city,
        pincode,
      };
    } catch (error) {
      console.log('Error fetching place details:', error);
      return null;
    }
  };

  const onChangeText = (text: string) => {
    setInput(text);
    fetchPlaces(text);
  };
  const insets = useSafeAreaInsets()

  const styles = StyleSheet.create({
    fullScreenContainer: {
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: theme.colors.background,
      marginHorizontal: scale(10),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //   alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingBottom: scale(10),
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius / 2,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      height: scale(40),
      color: theme.colors.text,
    },
    placeItem: {
      padding: 5,

    },

  });
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullScreenContainer}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>Search </Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputContainer}
          placeholder="Search for a place"
          placeholderTextColor={theme.colors.textSecondary}
          value={input}
          onChangeText={onChangeText}
          autoFocus
        />

        {loading && <ActivityIndicator size="small" color={theme.colors.primary} />}
        {!loading && places?.length === 0 && input?.trim()?.length > 0 && (
          <Text style={globalStyles.title}>No results found</Text>
        )}

        <FlatList
          data={places}
          keyExtractor={(item) => item.placeId}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeItem}
              onPress={async () => {
                setLoading(true);
                const detailedPlace = await fetchPlaceDetails(item?.placeId, item?.name);
                setLoading(false);
                if (detailedPlace) {
                  onPlaceSelected(detailedPlace);
                  onClose();
                }
              }}
            >
              <Text style={[globalStyles.textSecondary, { borderBottomWidth: 1, borderColor: theme.colors.border, padding: scale(5) }]}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

