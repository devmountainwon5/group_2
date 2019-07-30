
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentLocation, getCityBars } from '../../actions/locationActions'
import MyFancyComponent from './MapComponent'

class Home extends Component {
  constructor(){
    super();
    this.state = {
      error: {},
      location: {},
      locationReceived: false
    }
    this.onClick = this.onClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userLocation){
      this.setState({
        locationReceived: true,
        location: nextProps.userLocation
      })
    }

  }

  componentWillMount() {
    this.props.getCurrentLocation();    
    // this.props.getCityBars();
  }



  onClick(e) {
    e.preventDefault();
    this.props.logoutUser()
  }
  render() {
    const { error } = this.state

    let { locationReceived } = this.state;
    return (
      <div className="container">
        { locationReceived ? <MyFancyComponent className="mt-5"/> : <h2>Loading...</h2> }
      </div>
    );
  }
}
// Home.propTypes = {
//   auth: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
  // auth: state.auth,
  // error: state.error,
  userLocation: state.location.userLocation,
})

export default connect(mapStateToProps, {  getCurrentLocation, getCityBars })(Home);