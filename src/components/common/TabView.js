import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from "../../constants";

const TabView = ({tabs, selected, onTabChange}) => (
    <View style={Styles.container}>
        {
            tabs.map((tab, index) => {
                const active = selected === index;

                return (
                    <TouchableOpacity
                        key={`tab_${index}`}
                        style={[Styles.tab, active && Styles.tabActive]}
                        onPress={() => index !== selected && onTabChange && onTabChange(index)}
                    >
                        <Icon
                            style={[Styles.tabIcon, active && Styles.tabIconActive]}
                            name={tab.icon}
                        />
                        <Text style={[Styles.tabText, active && Styles.tabTextActive]}>
                            {tab.text}
                        </Text>
                    </TouchableOpacity>
                );
            })
        }
    </View>
);

TabView.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.string,
    })),
    selected: PropTypes.number,
    onTabChange: PropTypes.func
};

TabView.defaultProps = {
    tabs: [],
    selected: 1
};

const Styles = {
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.charlestonGreen
    },
    tab: {
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent'
    },
    tabActive: {
        borderBottomColor: Colors.maximumRed
    },
    tabIcon: {
        marginRight: 5,
        fontSize: 16,
        color: Colors.silverChalice
    },
    tabIconActive: {
        color: Colors.white
    },
    tabText: {
        fontSize: 16,
        color: Colors.silverChalice
    },
    tabTextActive: {
        color: Colors.white
    }
};

export {TabView};