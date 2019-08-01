import React from "react";
import { compose, withProps, withHandlers, withState  } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import {connect} from 'react-redux';
import {getCurrentLocation, getRestaurants} from '../../actions/locationActions'

const MyMapComponent = (compose)(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyC3e9Mu_8YKN5CLDPZsK7NHNLm-9iCRcws&v&v&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withState('selectedPlace', 'updateSelectedPlace', null),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }
        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                const google = window.google;
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                // const request = {
                //     location: new google.maps.LatLng(refs.map.props.defaultCenter),
                //     radius: '1000',
                //     type: ['restaurant']
                // };
                const request = {
                    bounds: bounds,
                    type: ['restaurant']
                };
                service.nearbySearch(request, (results, status) => {
                    console.log(results)
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        updatePlaces(results);
                    }
                })
            },
            onToggleOpen: ({ updateSelectedPlace }) => key => {
                updateSelectedPlace(key);
            }
        }
    }),
    )((props) => { 
        if (props.places.length > 0){
            props.getRestaurants(props.places)
        }
        return (        
            <GoogleMap
                onTilesLoaded={props.fetchPlaces}
                ref={props.onMapMounted}
                defaultZoom={15}
                defaultCenter={props.center}
            >      
                  {props.places && props.places.map((place, i) => (                              
                    <Marker 
                    key={i} 
                    position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} onClick={() => {props.onToggleOpen(place.id)}}>                                  
                    {props.selectedPlace === place.id &&
                 <InfoWindow onCloseClick={props.onToggleOpen()}>
                    <h1>My Window</h1>
                    </InfoWindow>
                    }
                    </Marker> 
                  ))}
                  {console.log(props.selectedPlace)}                                                     
            </GoogleMap>
        )
    })
    
    class MyFancyComponent extends React.PureComponent {
        render() { 
            return (
                <MyMapComponent
                    center={this.props.location}
                    getRestaurants={this.props.getRestaurants}         
                    />            
            )                           
        }
    }
    const mapStateToProps = state => ({
      location: state.location.userLocation,
      localRestaurants: state.location.localRestaurants
    })
    export default connect(mapStateToProps, { getCurrentLocation, getRestaurants })(MyFancyComponent)