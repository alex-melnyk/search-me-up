import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../../constants';

class SearchField extends Component {
    state = {
        listVisible: true
    };

    itemPressed = (item) => {
        Keyboard.dismiss();

        this.setState({
            listVisible: false
        });

        const {onItemPress} = this.props;
        onItemPress && onItemPress(item);
    };

    render() {
        const {
            value,
            placeholder,
            results,
            onChangeText,
        } = this.props;

        const {
            listVisible
        } = this.state;

        return (
            <View style={Styles.container}>
                <View style={Styles.positionWrapper}>
                    <View style={Styles.radiusWrapper}>
                        <BlurView>
                            <View style={Styles.search}>
                                <Icon
                                    name="search"
                                    style={Styles.searchIcon}
                                />
                                <TextInput
                                    style={Styles.searchInput}
                                    placeholderTextColor={Colors.silverChalice}
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    keyboardAppearance="dark"
                                    returnKeyType="search"
                                    placeholder={placeholder}
                                    value={value}
                                    onFocus={() => this.setState({listVisible: true})}
                                    onChangeText={(text) => onChangeText && onChangeText(text)}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                />
                            </View>
                            {
                                listVisible && (
                                    <FlatList
                                        keyExtractor={(item) => `item_${item.id}`}
                                        data={results}
                                        renderItem={({item}) => (
                                            <View style={Styles.listItemContainer}>
                                                <TouchableOpacity
                                                    style={Styles.listItem}
                                                    onPress={() => this.itemPressed(item)}
                                                >
                                                    <Text style={Styles.listItemText}>
                                                        {item.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                )
                            }
                        </BlurView>
                    </View>
                </View>
            </View>
        );
    }
}

SearchField.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired
    })),
    blurRef: PropTypes.func,
    onChangeText: PropTypes.func,
    onItemPress: PropTypes.func
};

SearchField.defaultProps = {
    placeholder: 'Search...',
    results: []
};

const Styles = {
    container: {
        marginVertical: 10,
        height: 56,
        zIndex: 100
    },
    positionWrapper: {
        position: 'absolute',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%'
    },
    radiusWrapper: {
        borderRadius: 20,
        overflow: 'hidden'
    },
    search: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        marginRight: 5,
        fontSize: 16,
        color: Colors.silverChalice
    },
    searchInput: {
        flex: 1,
        color: Colors.white
    },
    listItemContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.white + '55'
    },
    listItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    listItemText: {
        color: Colors.white
    }
};

export {SearchField};