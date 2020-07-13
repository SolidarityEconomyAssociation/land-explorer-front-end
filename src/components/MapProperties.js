import React, { Component } from "react";
import { connect } from "react-redux";
import Property from "../components/Property";
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "./Auth";

class MapProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertiesArray: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) 
      if (this.props.displayActive && this.props.zoom >= 18)
        this.getProperties();
  }

  async getProperties() {
    const mapBoundaries = this.props.map.getBounds();

    axios
      .get(
        `${constants.ROOT_URL}/api/ownership/?sw_lng=` +
          mapBoundaries._sw.lng +
          "&sw_lat=" +
          mapBoundaries._sw.lat +
          "&ne_lng=" +
          mapBoundaries._ne.lng +
          "&ne_lat=" +
          mapBoundaries._ne.lat,
        getAuthHeader()
      )
      .then((response) => {
        let array = [];

        response.data = response.data.slice(0,100);

        response.data.map((property) => {
          let json = JSON.parse(property.geojson);
          property.coordinates = json.coordinates[0];
          array.push(property);
        });

        if (array.length > 0)
          this.setState({
            propertiesArray: array,
          });
      });
  }

  createProperties() {
    let properties = [];

    if (this.state.propertiesArray.length > 0)
      this.state.propertiesArray.map((propertyInfo) =>
        properties.push(<Property propertyInfo={propertyInfo} />)
      );

    
    if(this.props.highlightedProperty){
      console.log(this.props.highlightedProperty)
      properties.push(<Property propertyInfo={this.props.highlightedProperty} highlight={true} />)
    }
    

    return properties;
  }

  render() {
    if (this.props.displayActive && this.props.zoom >= 18)
      return <React.Fragment>{this.createProperties()}</React.Fragment>;
    if(this.props.displayActive && this.props.highlightedProperty)
      return <React.Fragment><Property propertyInfo={this.props.highlightedProperty} highlight={true} /></React.Fragment>
    else return null;
  }
}

const mapStateToProps = ({ landOwnership, map }) => ({
  displayActive: landOwnership.displayActive,
  zoom: map.zoom,
  highlightedProperty: landOwnership.highlightedProperty
});

export default connect(mapStateToProps)(MapProperties);
