import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getRestaurants} from '../../../actions/locationActions'
import List from './ListItem'

class RestaurantList extends Component {

    render() {
        const list = this.props.localRestaurants.map((e, i)=>{
            return <List key={e.id} name={e.name} address={e.address} rating={e.rating} />
        })
        return (
            <div>
                {console.log(this.props.localRestaurants)}
                {list}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    localRestaurants:state.location.localRestaurants
})

export default connect(mapStateToProps, {getRestaurants})(RestaurantList)
