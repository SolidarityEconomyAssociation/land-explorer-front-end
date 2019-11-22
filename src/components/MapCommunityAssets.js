import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';
import {communitySpace,
        publicLayer,
        sportsLeisure,
        communityBusiness,
        businessNight,
        business,
        voluntarySector, } from '../data/councilAssetsNew';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);

        this.createNodal = this.createNodal.bind(this);
        
    }

    createNodal(communityAsset){

        let boundaries = this.props.map.getBounds();

        if(communityAsset.Long < boundaries._ne.lng && communityAsset.Long > boundaries._sw.lng)
        if(communityAsset.Lat < boundaries._ne.lat && communityAsset.Lat > boundaries._sw.lat)
            return <Nodal
                    type = {communityAsset.Layer.slice(0,1)}
                    location = {[communityAsset.Long,communityAsset.Lat]}
                    name = {communityAsset.Name}
                    postcode = {communityAsset.Postcode}
                    subcat = {communityAsset["Sub Cat"]}
                    key = {communityAsset["Ref:No"]}
                    id = {communityAsset["Ref:No"]}
                    telephone = {communityAsset["Telephone No."]}
                    ward = {communityAsset.Ward}
                    website = {communityAsset["Web Address"]}
                    addressLine1 = {communityAsset["Address 1"]}
                    addressLine2 = {communityAsset["Add 2 (RD - St)"]}
                    addressLine3 = {communityAsset["Add 3"]}
                    addressLine4 = {communityAsset["Add 4"]}
                    />
    }

    createNodes(){

        //17 is the magic number. At a zoom level of 17, even all layers on is smooth
        
        let nodes = [];

        if(this.props.activeCommunityAssets.includes("Community Space")){
            nodes.push(communitySpace.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            nodes.push(publicLayer.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            nodes.push(sportsLeisure.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){
            nodes.push(communityBusiness.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){
            nodes.push(businessNight.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business")){
            nodes.push(business.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            nodes.push(voluntarySector.map(this.createNodal))
        }

        return nodes;
    }

    render(){

        return (
            <React.Fragment>
                {this.createNodes()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ communityAssets }) => ({
    activeCommunityAssets: communityAssets.activeCommunityAssets,
});

export default connect(mapStateToProps)(MapCommunityAssets);