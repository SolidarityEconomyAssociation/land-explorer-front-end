import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Source, Layer } from 'react-mapbox-gl';

class MapLayers extends Component {
    render() {
        let { landDataLayers } = this.props;

        return (
            <React.Fragment>
                <Source
                    tileJsonSource={{
                        "type": "vector",
                        "url": "mapbox://joolzt.ay7acj73,joolzt.9edhyytu,joolzt.6dd4p92w,joolzt.50odxxr1,joolzt.cpacrvmx,joolzt.c3j1rh4t,joolzt.75llshed,joolzt.4i2tzpgj,kingmob.8cgpa2xi"
                    }}
                    id="composite"
                />
                <Layer
                    id="provisional-agricultural-land-ab795l"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Provisional_Agricultural_Land-ab795l"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": [
                            "match",
                            [
                                "get",
                                "ALC_GRADE"
                            ],
                            "Grade 1",
                            "#3980d0",
                            "Grade 2",
                            "#10c3ef",
                            "Grade 3",
                            "#0fb08f",
                            "Grade 4",
                            "#f9f90d",
                            "Grade 5",
                            "#c9748e",
                            "Exclusion",
                            "#b2b2b2",
                            "Non Agricultural",
                            "#b2b2b2",
                            "Urban",
                            "#b2b2b2",
                            "hsl(0, 83%, 56%)"
                        ],
                        "fill-opacity": landDataLayers.indexOf('provisional-agricultural-land-ab795l') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="national-forest-estate-soil-g-18j2ga"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="NATIONAL_FOREST_ESTATE_SOIL_G-18j2ga"
                    minZoom={8}
                    layout={{
                        "visibility": "visible",
                    }}
                    paint={{
                        "fill-color": [
                            "match",
                            [
                                "get",
                                "S1_Group"
                            ],
                            "Basin Bog",
                            "#b2b2b2",
                            "Brown Earth",
                            "#895c44",
                            "Calcareous Soil",
                            "#4de600",
                            "Eroded Bog",
                            "#9c9c9c",
                            "Flat or Raised Bogs",
                            "#686868",
                            "Flushed Blanket Bog",
                            "#333333",
                            "Ground-water Gley",
                            "#014ea6",
                            "Ironpan Soil",
                            "#fc5601",
                            "Littoral Soil",
                            "#fefe67",
                            "Man-made Soil",
                            "#ab00e5",
                            "Peaty Surface-water Gley",
                            "#0085a8",
                            "Podzol",
                            "#e60002",
                            "Skeletal Soil",
                            "#e7e600",
                            "Surface-water Gley",
                            "#00a8e7",
                            "Unflushed Blanket Bog",
                            "#010101",
                            "Valley Complex",
                            "#8d8ead",
                            "#3980d0"
                        ],
                        "fill-opacity": landDataLayers.indexOf('national-forest-estate-soil-g-18j2ga') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="historic-flood-map-5y05ao"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Historic_Flood_Map-5y05ao"
                    minZoom={8}
                    layout={{
                        "visibility": "visible",
                    }}
                    paint={{
                        "fill-color": "hsl(196, 80%, 70%)",
                        "fill-opacity": landDataLayers.indexOf('historic-flood-map-5y05ao') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="sites-of-special-scientific-i-09kaq4"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Sites_of_Special_Scientific_I-09kaq4"
                    minZoom={8}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsl(1, 40%, 40%)",
                        "fill-opacity": landDataLayers.indexOf('sites-of-special-scientific-i-09kaq4') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="special-protection-areas-engl-71pdjg"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Special_Protection_Areas_Engl-71pdjg"
                    minZoom={8}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsl(51, 40%, 40%)",
                        "fill-opacity": landDataLayers.indexOf('special-protection-areas-engl-71pdjg') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="special-areas-of-conservation-bm41zr"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Special_Areas_of_Conservation-bm41zr"
                    minZoom={8}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsl(101, 40%, 40%)",
                        "fill-opacity": landDataLayers.indexOf('special-areas-of-conservation-bm41zr') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="local-authority-greenbelt-bou-9r44t6"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Local_Authority_Greenbelt_bou-9r44t6"
                    minZoom={8}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(113, 97%, 50%, 0.4)",
                        "fill-opacity": landDataLayers.indexOf('local-authority-greenbelt-bou-9r44t6') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="ncc-brownfield-sites"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="NCC_Brownfield_Sites"
                    minZoom={8}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(0, 24%, 20%, 0.5)",
                        "fill-opacity": landDataLayers.indexOf('ncc-brownfield-sites') !== -1 ? .4 : 0,
                    }}
                />
                <Layer
                    id="wards-may-2019-boundaries-uk-d9ukjy"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="Wards_May_2019_Boundaries_UK_-d9ukjy"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(0, 100%, 0%, 0.8)",
                        "fill-opacity": landDataLayers.indexOf('wards-may-2019-boundaries-uk-d9ukjy') !== -1 ? .4 : 0,
                    }}
                />
            </React.Fragment>
        );
    }
}

MapLayers.propTypes = {

};

const mapStateToProps = ({ mapLayers }) => ({
    landDataLayers: mapLayers.landDataLayers,
});

export default connect(mapStateToProps)(MapLayers);
