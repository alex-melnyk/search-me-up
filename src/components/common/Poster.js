import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text, View} from 'react-native';

import {Colors} from "../../constants";

const Poster = ({style, title, poster}) => (
    <View style={[Styles.container, style]}>
        <Image
            style={Styles.image}
            source={{uri: `https://image.tmdb.org/t/p/w500${poster}`}}
        />
        <View style={Styles.content}>
            <Text style={Styles.title}>
                {title}
            </Text>
        </View>
    </View>
);

Poster.propTypes = {
    title: PropTypes.string,
    poster: PropTypes.string,
};

const Styles = {
    container: {
        marginLeft: 0,
        marginBottom: 20,
        flex: 1,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 10,
        fontWeight: '800',
        color: Colors.white
    }
};

export {Poster};